"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CustomizationPrompt, SetupStep } from "@/lib/agents-catalog";
import {
  Copy,
  Check,
  Terminal,
  Settings,
  Plug,
  Play,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Step type icon mapping                                                     */
/* -------------------------------------------------------------------------- */

const STEP_TYPE_ICON: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  command: Terminal,
  config: Settings,
  connect: Plug,
  test: Play,
};

const STEP_TYPE_LABEL: Record<string, string> = {
  command: "Terminal",
  config: "Configuration",
  connect: "Connect",
  test: "Verify",
};

/* -------------------------------------------------------------------------- */
/* Command block with copy button                                             */
/* -------------------------------------------------------------------------- */

function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = useCallback(() => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [command]);

  return (
    <div className="group relative mt-2 rounded-xl bg-[#1A1A1A] px-4 py-3">
      <code className="block overflow-x-auto whitespace-pre text-sm leading-relaxed text-emerald-400 font-mono">
        {command}
      </code>
      <button
        onClick={copyCommand}
        className="absolute right-2 top-2 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
        title="Copy command"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

interface AgentCustomizationProps {
  customizationPrompts: CustomizationPrompt[];
  setupSteps: SetupStep[];
  skillContent: string;
  stepTypeIcons: string[];
}

export default function AgentCustomization({
  customizationPrompts,
  setupSteps,
  skillContent,
}: AgentCustomizationProps) {
  /* Customization state */
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const prompt of customizationPrompts) {
      initial[prompt.field] = "";
    }
    return initial;
  });

  /* Copy skill content */
  const [skillCopied, setSkillCopied] = useState(false);

  const processedSkillContent = React.useMemo(() => {
    let content = skillContent;
    for (const [field, value] of Object.entries(values)) {
      if (value) {
        content = content.replace(new RegExp(`\\{\\{${field}\\}\\}`, "g"), value);
      }
    }
    return content;
  }, [skillContent, values]);

  const copySkill = useCallback(() => {
    navigator.clipboard.writeText(processedSkillContent).then(() => {
      setSkillCopied(true);
      setTimeout(() => setSkillCopied(false), 2500);
    });
  }, [processedSkillContent]);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Customization section                                               */}
      {/* ------------------------------------------------------------------ */}
      {customizationPrompts.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-lg font-semibold text-[#1A1A1A]">
            Customize your agent
          </h2>

          <div className="space-y-5">
            {customizationPrompts.map((prompt) => (
              <div key={prompt.field}>
                <label
                  htmlFor={prompt.field}
                  className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
                >
                  {prompt.question}
                </label>
                <Input
                  id={prompt.field}
                  placeholder={prompt.placeholder}
                  value={values[prompt.field] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [prompt.field]: e.target.value,
                    }))
                  }
                  className="max-w-lg rounded-xl border-border/60 bg-white transition-colors focus:border-primary"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Setup guide section                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="mb-12">
        <h2 className="mb-6 text-lg font-semibold text-[#1A1A1A]">
          Setup Guide
        </h2>

        <div className="space-y-0">
          {setupSteps.map((step, i) => {
            const StepIcon = STEP_TYPE_ICON[step.type] || Terminal;
            const stepLabel = STEP_TYPE_LABEL[step.type] || step.type;

            return (
              <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Vertical connecting line */}
                {i < setupSteps.length - 1 && (
                  <div className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-px bg-border/60" />
                )}

                {/* Number circle */}
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border bg-white text-sm font-bold text-[#1A1A1A]">
                  {i + 1}
                </div>

                {/* Step content */}
                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-[#1A1A1A]">
                      {step.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      <StepIcon size={10} />
                      {stepLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  {step.command && <CommandBlock command={step.command} />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="text-base font-semibold text-[#1A1A1A]">
          Ready to install?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Copy the SKILL.md content below and save it to your agents directory.
          Your customizations are included automatically.
        </p>

        {/* Skill preview */}
        <div className="relative mt-4 max-h-64 overflow-y-auto rounded-xl bg-[#1A1A1A] px-4 py-3">
          <pre className="text-xs leading-relaxed text-emerald-400/80 font-mono whitespace-pre-wrap">
            {processedSkillContent}
          </pre>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={copySkill}
            className="h-10 rounded-xl px-6 font-semibold"
          >
            {skillCopied ? (
              <>
                <Check size={16} className="mr-1.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} className="mr-1.5" />
                Copy SKILL.md
              </>
            )}
          </Button>
          <span className="text-xs text-muted-foreground">
            Save as SKILL.md in your agent directory
          </span>
        </div>
      </section>
    </>
  );
}
