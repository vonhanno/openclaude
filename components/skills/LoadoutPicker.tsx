"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { Loadout } from "@/lib/types";

interface LoadoutPickerProps {
  loadouts: Loadout[];
  activeLoadoutId: string | null;
  onSelectLoadout: (loadout: Loadout) => void;
}

export default function LoadoutPicker({
  loadouts,
  activeLoadoutId,
  onSelectLoadout,
}: LoadoutPickerProps) {
  if (loadouts.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-stretch gap-3 min-w-min">
        {loadouts.map((loadout) => {
          const isActive = loadout.id === activeLoadoutId;
          return (
            <button
              key={loadout.id}
              onClick={() => onSelectLoadout(loadout)}
              className={cn(
                "flex flex-col items-start gap-1.5 px-4 py-3 rounded-lg border transition-all duration-200",
                "min-w-[180px] max-w-[240px] text-left cursor-pointer",
                "hover:shadow-md hover:-translate-y-0.5",
                isActive
                  ? "border-[#4A7DFF] border-2 bg-[#4A7DFF]/5 shadow-sm"
                  : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
              )}
            >
              <h4
                className={cn(
                  "text-sm font-medium truncate w-full",
                  isActive ? "text-[#4A7DFF]" : "text-[#1A1A1A]"
                )}
              >
                {loadout.name}
              </h4>
              {loadout.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 w-full">
                  {loadout.description}
                </p>
              )}
              <span
                className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full",
                  isActive
                    ? "bg-[#4A7DFF]/10 text-[#4A7DFF]"
                    : "bg-[#F3F4F6] text-[#6B7280]"
                )}
              >
                {loadout.skill_slugs.length}{" "}
                {loadout.skill_slugs.length === 1 ? "skill" : "skills"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
