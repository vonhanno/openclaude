"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AgentMascot from "@/components/mascot/AgentMascot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Mail, Calendar, Search, Megaphone } from "lucide-react";
import type { SkillCategory } from "@/lib/types";

const LS_EQUIPPED_KEY = "openclaude_equipped_skills";

const INTENT_OPTIONS = [
  {
    id: "email",
    label: "Email",
    description: "Manage and respond to emails",
    icon: Mail,
    loadoutSkills: [
      "skill-email-summary",
      "skill-smart-reply",
      "skill-doc-summarizer",
    ],
    categories: ["communication"] as SkillCategory[],
  },
  {
    id: "meetings",
    label: "Meetings",
    description: "Prepare for and follow up on meetings",
    icon: Calendar,
    loadoutSkills: [
      "skill-meeting-prep",
      "skill-doc-summarizer",
      "skill-report-generator",
    ],
    categories: ["productivity"] as SkillCategory[],
  },
  {
    id: "research",
    label: "Research",
    description: "Gather and analyze information",
    icon: Search,
    loadoutSkills: [
      "skill-news-brief",
      "skill-competitor-monitor",
      "skill-doc-summarizer",
    ],
    categories: ["data"] as SkillCategory[],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Create content and monitor competitors",
    icon: Megaphone,
    loadoutSkills: [
      "skill-content-writer",
      "skill-seo-audit",
      "skill-competitor-monitor",
    ],
    categories: ["marketing"] as SkillCategory[],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const totalSteps = 3;
  const progressValue = (step / totalSteps) * 100;

  const selectedOption = INTENT_OPTIONS.find((o) => o.id === selectedIntent);
  const equippedCategories = new Set<string>(
    selectedOption?.categories ?? []
  );

  const handleIntentSelect = (intentId: string) => {
    setSelectedIntent(intentId);
  };

  const handleIntentContinue = () => {
    if (!selectedIntent) return;
    const option = INTENT_OPTIONS.find((o) => o.id === selectedIntent);
    if (option) {
      localStorage.setItem(
        LS_EQUIPPED_KEY,
        JSON.stringify(option.loadoutSkills)
      );
    }
    setStep(3);
  };

  const handleGoToDashboard = () => {
    router.push("/agent");
  };

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <Progress value={progressValue} className="h-2" />

      {/* Step 1: Welcome */}
      <div
        className={cn(
          "transition-all duration-300",
          step === 1
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 absolute pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center text-center space-y-6 pt-12">
          <AgentMascot equippedCategories={new Set()} />
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Welcome to OpenClaude
          </h1>
          <p className="max-w-md text-muted-foreground">
            Build your own AI assistant by equipping skills. It takes less
            than a minute to get started.
          </p>
          <p className="max-w-md text-sm text-muted-foreground">
            Powered by your Claude Max subscription — no API key needed.
          </p>
          <Button size="lg" className="px-8" onClick={() => setStep(2)}>
            Get Started
          </Button>
        </div>
      </div>

      {/* Step 2: Intent Selection */}
      <div
        className={cn(
          "transition-all duration-300",
          step === 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 absolute pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center text-center space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            What will you use this for?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Pick a focus area and we will pre-equip relevant skills for you.
          </p>
          <div className="grid w-full grid-cols-2 gap-3">
            {INTENT_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedIntent === option.id;
              return (
                <Card
                  key={option.id}
                  className={cn(
                    "cursor-pointer p-4 transition-all",
                    isSelected
                      ? "border-[#4A7DFF] ring-2 ring-[#4A7DFF]/20 shadow-md"
                      : "hover:border-[#4A7DFF]/40 hover:shadow-sm"
                  )}
                  onClick={() => handleIntentSelect(option.id)}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        isSelected
                          ? "bg-[#4A7DFF]/10 text-[#4A7DFF]"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Button
            size="lg"
            className="px-8"
            onClick={handleIntentContinue}
            disabled={!selectedIntent}
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Step 3: Ready */}
      <div
        className={cn(
          "transition-all duration-300",
          step === 3
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 absolute pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center text-center space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Your assistant is ready!
          </h2>
          <AgentMascot equippedCategories={equippedCategories} />
          <p className="max-w-md text-muted-foreground">
            We have equipped 3 skills based on your selection. You can always
            change these later from the dashboard.
          </p>
          <Button
            size="lg"
            className="px-8"
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
