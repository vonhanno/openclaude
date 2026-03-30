"use client";

import React from "react";
import SkillCard from "@/components/skills/SkillCard";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/lib/types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/types";

const ALL_CATEGORIES: SkillCategory[] = [
  "communication",
  "data",
  "productivity",
  "development",
  "marketing",
  "design",
];

interface SkillGridProps {
  skills: Skill[];
  equippedSkillIds: Set<string>;
  onToggleSkill: (skillId: string) => void;
  filterCategory?: SkillCategory;
  onFilterChange?: (category: SkillCategory | undefined) => void;
}

export default function SkillGrid({
  skills,
  equippedSkillIds,
  onToggleSkill,
  filterCategory,
  onFilterChange,
}: SkillGridProps) {
  const filteredSkills = filterCategory
    ? skills.filter((s) => s.category === filterCategory)
    : skills;

  return (
    <div className="space-y-4">
      {/* Category filter tabs */}
      {onFilterChange && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
              !filterCategory
                ? "bg-[#1A1A1A] text-white"
                : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
            )}
            onClick={() => onFilterChange(undefined)}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const color = CATEGORY_COLORS[cat];
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "text-white"
                    : "text-[#6B7280] hover:opacity-80"
                )}
                style={
                  isActive
                    ? { backgroundColor: color }
                    : { backgroundColor: `${color}18`, color }
                }
                onClick={() => onFilterChange(cat)}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      )}

      {/* Skill cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isEquipped={equippedSkillIds.has(skill.id)}
            onToggle={() => onToggleSkill(skill.id)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No skills found in this category.</p>
        </div>
      )}
    </div>
  );
}
