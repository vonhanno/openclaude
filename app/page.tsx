import React from "react";
import Link from "next/link";
import AgentMascot from "@/components/mascot/AgentMascot";
import { Button } from "@/components/ui/button";
import { AGENT_RECIPES } from "@/lib/agents-catalog";
import { ArrowRight } from "lucide-react";
import MiniMascot from "@/components/mascot/MiniMascot";
import { BrowseMascot, CustomizeMascot, InstallMascot } from "@/components/mascot/StepMascots";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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

      {/* Hero */}
      <section className="flex flex-col items-center px-6 pb-16 pt-12 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10">
            <AgentMascot equippedCategories={new Set()} />
          </div>

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

      {/* Agent ticker — horizontal scroll of all agents */}
      <section className="pb-20 overflow-hidden">
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#F7F5F0] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#F7F5F0] to-transparent" />

          {/* Scrolling track — duplicated for infinite loop effect */}
          <div className="flex animate-scroll gap-3 px-6">
            {[...AGENT_RECIPES, ...AGENT_RECIPES].map((recipe, i) => (
              <Link
                key={`${recipe.id}-${i}`}
                href={`/agents/${recipe.slug}`}
                className="group flex-shrink-0"
              >
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-white px-5 py-4 w-[160px] h-[130px] justify-center shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-border hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <MiniMascot variant={recipe.slug} size={52} />
                  <p className="text-sm font-medium text-[#1A1A1A] text-center leading-tight">
                    {recipe.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <h2 className="mb-14 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          How it works
        </h2>

        <div className="relative flex flex-col items-start gap-12 sm:flex-row sm:items-start sm:gap-0">

          {[
            {
              num: "1",
              title: "Browse",
              desc: "Pick an agent from our catalog",
              Mascot: BrowseMascot,
            },
            {
              num: "2",
              title: "Customize",
              desc: "Answer a few questions to tailor it",
              Mascot: CustomizeMascot,
            },
            {
              num: "3",
              title: "Install",
              desc: "Follow the terminal guide, agent is ready",
              Mascot: InstallMascot,
            },
          ].map((step) => (
            <div
              key={step.title}
              className="relative flex flex-1 flex-col items-center text-center"
            >
              <div className="relative z-10 mb-1">
                <step.Mascot size={96} />
                {/* Number badge — integrated with illustration */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-sm font-bold text-white shadow-md ring-3 ring-[#F7F5F0]">
                  {step.num}
                </div>
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

      {/* Footer */}
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
              href="https://github.com/vonhanno/openclaude"
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
