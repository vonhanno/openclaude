"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Calendar,
  MessageSquare,
  Newspaper,
  FileText,
  Search,
  Pencil,
  Code,
  Radar,
  BarChart3,
  Check,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/lib/types";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  COMPLEXITY_LABELS,
} from "@/lib/types";

// ── Icon map ──────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Mail,
  Calendar,
  MessageSquare,
  Newspaper,
  FileText,
  Search,
  Pencil,
  Code,
  Radar,
  BarChart3,
};

// ── Badge helpers ─────────────────────────────────────────────────────
const COMPLEXITY_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  advanced: "bg-red-100 text-red-700 border-red-200",
};

function getCategoryBadgeStyle(category: SkillCategory) {
  const color = CATEGORY_COLORS[category];
  return {
    backgroundColor: `${color}18`,
    color: color,
    borderColor: `${color}30`,
  };
}

// ── Props ─────────────────────────────────────────────────────────────
interface SkillListItemProps {
  skill: Skill;
  isEquipped: boolean;
  onToggle: () => void;
  rules: string[];
  onRulesChange: (rules: string[]) => void;
  processSteps: string[];
}

// ── Component ─────────────────────────────────────────────────────────
export default function SkillListItem({
  skill,
  isEquipped,
  onToggle,
  rules,
  onRulesChange,
  processSteps,
}: SkillListItemProps) {
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [newRule, setNewRule] = useState("");
  const rulesRef = useRef<HTMLDivElement>(null);
  const [rulesHeight, setRulesHeight] = useState(0);

  const IconComponent = ICON_MAP[skill.icon_name] || Code;
  const accentColor = skill.color || CATEGORY_COLORS[skill.category];

  // Measure the rules section height for smooth animation
  useEffect(() => {
    if (rulesRef.current) {
      setRulesHeight(rulesRef.current.scrollHeight);
    }
  }, [rules, rulesExpanded, newRule]);

  // Collapse rules when skill is unequipped
  useEffect(() => {
    if (!isEquipped) {
      setRulesExpanded(false);
    }
  }, [isEquipped]);

  function handleAddRule() {
    const trimmed = newRule.trim();
    if (trimmed.length === 0) return;
    onRulesChange([...rules, trimmed]);
    setNewRule("");
  }

  function handleDeleteRule(index: number) {
    onRulesChange(rules.filter((_, i) => i !== index));
  }

  function handleRowClick(e: React.MouseEvent) {
    // Don't toggle when interacting with the rules section
    const target = e.target as HTMLElement;
    if (target.closest("[data-rules-area]")) return;
    onToggle();
  }

  return (
    <Card
      className={cn(
        "relative w-full bg-white transition-all duration-200 cursor-pointer border",
        "hover:shadow-md",
        isEquipped
          ? "border-l-4 border-l-[#34D399] border-t-[#E5E7EB] border-r-[#E5E7EB] border-b-[#E5E7EB] shadow-[0_0_12px_rgba(52,211,153,0.15)]"
          : "border-[#E5E7EB]"
      )}
      onClick={handleRowClick}
    >
      <div className="p-4">
        {/* ── Top row ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <IconComponent
              size={20}
              strokeWidth={2.5}
              style={{ color: accentColor }}
            />
          </div>

          {/* Skill name */}
          <h3 className="font-semibold text-sm text-[#1A1A1A] truncate">
            {skill.name}
          </h3>

          {/* Category badge */}
          <Badge
            variant="outline"
            className="text-[10px] px-2 py-0.5 font-medium flex-shrink-0"
            style={getCategoryBadgeStyle(skill.category)}
          >
            {CATEGORY_LABELS[skill.category]}
          </Badge>

          {/* Complexity badge */}
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-2 py-0.5 font-medium flex-shrink-0",
              COMPLEXITY_COLORS[skill.complexity]
            )}
          >
            {COMPLEXITY_LABELS[skill.complexity]}
          </Badge>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Equip toggle button */}
          {isEquipped ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#34D399]/10 text-[#34D399] hover:bg-[#34D399]/20 hover:text-[#34D399] flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <Check size={16} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <Plus size={16} />
            </Button>
          )}
        </div>

        {/* ── Process steps row ───────────────────────────────── */}
        {processSteps.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {processSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[11px] text-[#6B7280] font-medium whitespace-nowrap">
                  {step}
                </span>
                {idx < processSteps.length - 1 && (
                  <ArrowRight
                    size={12}
                    className="text-[#D1D5DB] flex-shrink-0"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── Expandable rules section (equipped only) ────────── */}
        {isEquipped && (
          <div data-rules-area>
            {/* Divider + toggle */}
            <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setRulesExpanded((prev) => !prev);
                }}
              >
                {rulesExpanded ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
                <span>
                  Rules{rules.length > 0 ? ` (${rules.length})` : ""}
                </span>
              </button>
            </div>

            {/* Animated rules content */}
            <div
              className="overflow-hidden transition-all duration-200 ease-in-out"
              style={{
                maxHeight: rulesExpanded ? `${rulesHeight + 16}px` : "0px",
                opacity: rulesExpanded ? 1 : 0,
              }}
            >
              <div ref={rulesRef} className="pt-2">
                {/* Existing rules */}
                {rules.length > 0 && (
                  <ul className="space-y-1.5 mb-2">
                    {rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="group flex items-center gap-2 text-sm text-[#374151] bg-[#F9FAFB] rounded-md px-3 py-1.5"
                      >
                        <span className="flex-1 min-w-0 truncate">{rule}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRule(idx);
                          }}
                        >
                          <X size={12} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Add rule input */}
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Input
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRule();
                      }
                    }}
                    placeholder="Add a rule..."
                    className="h-8 text-sm border-[#E5E7EB] focus-visible:ring-[#34D399]/30"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 text-[#9CA3AF] hover:text-[#34D399] hover:bg-[#34D399]/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddRule();
                    }}
                    disabled={newRule.trim().length === 0}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
