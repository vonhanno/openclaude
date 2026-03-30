"use client";

import React from "react";
import Link from "next/link";
import AgentMascot from "@/components/mascot/AgentMascot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, FileText } from "lucide-react";

const SAMPLE_SKILLS = [
  {
    name: "Email Summary",
    description: "Summarize long email threads into actionable points.",
    icon: Mail,
    color: "#4A7DFF",
    category: "Communication",
  },
  {
    name: "Meeting Prep",
    description: "Generate agendas and talking points for meetings.",
    icon: Calendar,
    color: "#8B5CF6",
    category: "Productivity",
  },
  {
    name: "Document Summarizer",
    description: "Condense long documents into clear summaries.",
    icon: FileText,
    color: "#8B5CF6",
    category: "Productivity",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <span className="font-pixel text-[10px] text-[#1A1A1A]">
          OpenClaude
        </span>
        <Link href="/agent">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-8">
        <div className="flex flex-col items-center text-center">
          {/* Mascot */}
          <div className="mb-8">
            <AgentMascot equippedCategories={new Set()} />
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
            Meet your AI assistant
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Equip skills. Run tasks. See results.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex items-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="rounded-lg px-8">
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg px-8"
              onClick={() => {
                document
                  .getElementById("demo-preview")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Demo preview section */}
      <section
        id="demo-preview"
        className="mx-auto w-full max-w-4xl px-6 pb-24"
      >
        <h2 className="mb-6 text-center text-xl font-semibold text-[#1A1A1A]">
          Skill cards preview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SAMPLE_SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.name}
                className="pointer-events-none select-none p-4"
              >
                <CardContent className="flex flex-col gap-3 p-0">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${skill.color}15` }}
                    >
                      <Icon size={20} style={{ color: skill.color }} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-[#1A1A1A]">
                        {skill.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#F3F4F6] pt-3">
                    <Badge
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 font-medium"
                      style={{
                        backgroundColor: `${skill.color}18`,
                        color: skill.color,
                        borderColor: `${skill.color}30`,
                      }}
                    >
                      {skill.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
