import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  AGENT_RECIPES,
  CATEGORY_META,
} from "@/lib/agents-catalog";
import {
  ArrowLeft,
  Clock,
  Terminal,
  Settings,
  Plug,
  Play,
} from "lucide-react";
import MiniMascot from "@/components/mascot/MiniMascot";
import AgentCustomization from "./AgentCustomization";

/* -------------------------------------------------------------------------- */
/* Shared constants                                                           */
/* -------------------------------------------------------------------------- */

const STEP_TYPE_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  command: Terminal,
  config: Settings,
  connect: Plug,
  test: Play,
};

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
/* Page (Server Component)                                                    */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AgentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = AGENT_RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  const diff = DIFFICULTY_CONFIG[recipe.difficulty];
  const catMeta = CATEGORY_META[recipe.category];

  return (
    <div className="pb-16">
      {/* ------------------------------------------------------------------ */}
      {/* Back link                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Link
        href="/agents"
        className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#1A1A1A]"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        All agents
      </Link>

      {/* ------------------------------------------------------------------ */}
      {/* Hero section                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-12">
        {/* Icon + Name */}
        <div className="flex items-start gap-4">
          <MiniMascot variant={recipe.slug} size={72} />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
              {recipe.name}
            </h1>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">
              {recipe.tagline}
            </p>
          </div>
        </div>

        {/* Metadata badges */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${catMeta.color}12`,
              color: catMeta.color,
              borderColor: `${catMeta.color}30`,
            }}
          >
            {catMeta.label}
          </Badge>
          <Badge
            variant="outline"
            className={`px-2.5 py-0.5 text-xs font-medium ${diff.className}`}
          >
            {diff.label}
          </Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock size={14} />
            {recipe.setup_time}
          </span>
        </div>

        {/* Requirements */}
        {recipe.requires.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Requires:
            </span>
            {recipe.requires.map((req) => (
              <Badge
                key={req}
                variant="outline"
                className="px-2 py-0.5 text-xs font-normal text-muted-foreground"
              >
                {req}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* What it does                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">
          What it does
        </h2>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {recipe.description}
        </p>

        {/* Process flow — vertical numbered list */}
        <div className="mt-6 space-y-0">
          {recipe.process_steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-3 py-2.5">
              {/* Vertical line */}
              {i < recipe.process_steps.length - 1 && (
                <div className="absolute left-[13px] top-[34px] h-[calc(100%-22px)] w-px bg-border/60" />
              )}
              {/* Number */}
              <div className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-xs font-bold text-white">
                {i + 1}
              </div>
              {/* Step text */}
              <p className="text-[15px] leading-relaxed text-[#1A1A1A] pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Customization + Setup (Client component)                            */}
      {/* ------------------------------------------------------------------ */}
      <AgentCustomization
        customizationPrompts={recipe.customization_prompts}
        setupSteps={recipe.setup_steps}
        skillContent={recipe.skill_content}
        stepTypeIcons={Object.keys(STEP_TYPE_ICON)}
        agentName={recipe.name}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Static params for build                                                    */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return AGENT_RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}
