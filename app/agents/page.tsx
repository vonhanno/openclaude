"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  AGENT_RECIPES,
  CATEGORY_META,
  type AgentRecipe,
} from "@/lib/agents-catalog";
import {
  ArrowRight,
  Clock,
} from "lucide-react";
import MiniMascot from "@/components/mascot/MiniMascot";

/* -------------------------------------------------------------------------- */
/* Difficulty badge config                                                    */
/* -------------------------------------------------------------------------- */

const DIFFICULTY_CONFIG = {
  easy: {
    label: "Easy",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  advanced: {
    label: "Advanced",
    className: "bg-red-100 text-red-700 border-red-200",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Category filter pills                                                      */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  { key: "all" as const, label: "All" },
  ...Object.entries(CATEGORY_META).map(([key, meta]) => ({
    key: key as AgentRecipe["category"],
    label: meta.label,
  })),
];

/* -------------------------------------------------------------------------- */
/* Process step flow component                                                */
/* -------------------------------------------------------------------------- */

function ProcessFlow({ steps }: { steps: string[] }) {
  // Show up to 3 steps to keep cards compact
  const visible = steps.slice(0, 3);
  const remaining = steps.length - 3;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((step, i) => (
        <React.Fragment key={i}>
          <span className="rounded-md bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {step}
          </span>
          {i < visible.length - 1 && (
            <span className="text-[10px] text-muted-foreground/50">
              &rarr;
            </span>
          )}
        </React.Fragment>
      ))}
      {remaining > 0 && (
        <>
          <span className="text-[10px] text-muted-foreground/50">&rarr;</span>
          <span className="rounded-md bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            +{remaining} more
          </span>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page component                                                             */
/* -------------------------------------------------------------------------- */

export default function AgentCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | AgentRecipe["category"]
  >("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return AGENT_RECIPES;
    return AGENT_RECIPES.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="pb-8 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Agent Catalog
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">
          Ready-made AI agents you can set up in minutes
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Category filter pills                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#1A1A1A] text-white shadow-sm"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-[#1A1A1A]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Agent grid                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => {
          const diff = DIFFICULTY_CONFIG[recipe.difficulty];

          return (
            <Link
              key={recipe.id}
              href={`/agents/${recipe.slug}`}
              className="group"
            >
              <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-border hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                {/* Top row: mascot + arrow */}
                <div className="flex items-start justify-between">
                  <MiniMascot variant={recipe.slug} size={48} />
                  <ArrowRight
                    size={16}
                    className="mt-1 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#1A1A1A]"
                  />
                </div>

                {/* Name + tagline */}
                <h3 className="mt-4 text-[15px] font-semibold text-[#1A1A1A]">
                  {recipe.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {recipe.tagline}
                </p>

                {/* Process steps flow */}
                <div className="mt-3 flex-1">
                  <ProcessFlow steps={recipe.process_steps} />
                </div>

                {/* Bottom row: difficulty + time */}
                <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4">
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0.5 font-medium ${diff.className}`}
                  >
                    {diff.label}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {recipe.setup_time}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            No agents found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
