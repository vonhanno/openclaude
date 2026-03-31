import React from "react";
import Link from "next/link";
import AgentMascot from "@/components/mascot/AgentMascot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AGENT_RECIPES, CATEGORY_META } from "@/lib/agents-catalog";
import {
  ArrowRight,
  Clock,
} from "lucide-react";
import MiniMascot from "@/components/mascot/MiniMascot";

// Icon map removed — using MiniMascot instead

const DIFFICULTY_CONFIG = {
  easy: { label: "Easy", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700 border-amber-200" },
  advanced: { label: "Advanced", className: "bg-red-100 text-red-700 border-red-200" },
} as const;

export default function LandingPage() {
  const featured = AGENT_RECIPES.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* Minimal header                                                      */}
      {/* ------------------------------------------------------------------ */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-pixel text-[10px] tracking-wide text-[#1A1A1A]">
          OpenClaude
        </span>
        <Link href="/agents">
          <Button variant="ghost" size="sm" className="text-sm font-medium">
            Browse Agents
          </Button>
        </Link>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="flex flex-col items-center px-6 pb-20 pt-12 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Mascot */}
          <div className="mb-10">
            <AgentMascot equippedCategories={new Set()} />
          </div>

          {/* Headline */}
          <h1 className="max-w-lg text-4xl font-bold leading-[1.1] tracking-tight text-[#1A1A1A] sm:text-5xl md:text-6xl">
            Build AI agents
            <br />
            in minutes
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Browse ready-made agents. Get step-by-step setup guides.
            <br className="hidden sm:block" />
            Powered by Claude Code.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link href="/agents">
              <Button
                size="lg"
                className="h-12 rounded-xl px-8 text-base font-semibold shadow-sm transition-all hover:shadow-md"
              >
                Browse Agents
                <ArrowRight size={18} className="ml-1" />
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No API keys needed — uses your Claude Max subscription
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How it works                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <h2 className="mb-14 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          How it works
        </h2>

        <div className="relative flex flex-col items-start gap-12 sm:flex-row sm:items-start sm:gap-0">
          {/* Connecting line (desktop only) */}
          <div
            className="absolute left-0 right-0 top-6 hidden h-px sm:block"
            style={{
              background:
                "repeating-linear-gradient(90deg, #D1D5DB 0, #D1D5DB 6px, transparent 6px, transparent 12px)",
            }}
          />

          {[
            {
              num: "1",
              title: "Browse",
              desc: "Pick an agent from our catalog",
            },
            {
              num: "2",
              title: "Customize",
              desc: "Answer a few questions to tailor it",
            },
            {
              num: "3",
              title: "Install",
              desc: "Follow the terminal guide, agent is ready",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="relative flex flex-1 flex-col items-center text-center"
            >
              {/* Number circle */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1A1A1A] bg-background text-lg font-bold text-[#1A1A1A]">
                {step.num}
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[180px] text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Featured agents                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-28">
        <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Featured agents
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((recipe) => {
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
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {recipe.tagline}
                  </p>

                  {/* Bottom row: badges */}
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

        {/* View all link */}
        <div className="mt-8 text-center">
          <Link
            href="/agents"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:text-primary"
          >
            View all agents
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="mt-auto border-t border-border/40 px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-pixel text-[8px] text-[#1A1A1A]">
              OpenClaude
            </span>
            <span className="text-xs text-muted-foreground">
              Built by Vibelabs
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              className="text-xs text-muted-foreground transition-colors hover:text-[#1A1A1A]"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <Link
              href="/help"
              className="text-xs text-muted-foreground transition-colors hover:text-[#1A1A1A]"
            >
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
