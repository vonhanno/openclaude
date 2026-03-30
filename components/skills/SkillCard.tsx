"use client";

import React from "react";
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
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/lib/types";
import { CATEGORY_COLORS, CATEGORY_LABELS, COMPLEXITY_LABELS } from "@/lib/types";

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

interface SkillCardProps {
  skill: Skill;
  isEquipped: boolean;
  onToggle: () => void;
}

export default function SkillCard({ skill, isEquipped, onToggle }: SkillCardProps) {
  const IconComponent = ICON_MAP[skill.icon_name] || Code;

  return (
    <Card
      className={cn(
        "relative flex flex-col p-4 transition-all duration-200 cursor-pointer border",
        "hover:shadow-md hover:-translate-y-0.5",
        isEquipped
          ? "border-l-4 border-l-[#34D399] border-t-[#E5E7EB] border-r-[#E5E7EB] border-b-[#E5E7EB] shadow-[0_0_12px_rgba(52,211,153,0.15)]"
          : "border-[#E5E7EB]"
      )}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        {/* Pixel-art style icon */}
        <div
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg"
          style={{
            backgroundColor: `${skill.color || CATEGORY_COLORS[skill.category]}15`,
          }}
        >
          <IconComponent
            size={20}
            strokeWidth={2.5}
            style={{
              color: skill.color || CATEGORY_COLORS[skill.category],
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm text-[#1A1A1A] truncate">
              {skill.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
            {skill.description}
          </p>
        </div>

        {/* Toggle button */}
        <div className="flex-shrink-0">
          {isEquipped ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#34D399]/10 text-[#34D399] hover:bg-[#34D399]/20 hover:text-[#34D399]"
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
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <Plus size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Bottom badges */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F3F4F6]">
        <Badge
          variant="outline"
          className="text-[10px] px-2 py-0.5 font-medium"
          style={getCategoryBadgeStyle(skill.category)}
        >
          {CATEGORY_LABELS[skill.category]}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] px-2 py-0.5 font-medium",
            COMPLEXITY_COLORS[skill.complexity]
          )}
        >
          {COMPLEXITY_LABELS[skill.complexity]}
        </Badge>
      </div>
    </Card>
  );
}
