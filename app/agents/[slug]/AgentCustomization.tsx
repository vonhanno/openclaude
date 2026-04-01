"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { CustomizationPrompt, SetupStep } from "@/lib/agents-catalog";
import {
  Copy,
  Check,
  Terminal,
  Settings,
  Plug,
  Play,
  X,
  Plus,
  MessageCircle,
  Hash,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Command block                                                              */
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
/* Channel options                                                            */
/* -------------------------------------------------------------------------- */

const CHANNELS = [
  { id: "telegram", label: "Telegram", icon: Send, color: "#0088cc" },
  { id: "slack", label: "Slack", icon: Hash, color: "#4A154B" },
  { id: "email", label: "Email", icon: Mail, color: "#4A7DFF" },
] as const;

const SCHEDULE_OPTIONS = [
  { id: "morning", label: "Every morning at 7:00" },
  { id: "twice", label: "Twice a day (7:00 & 17:00)" },
  { id: "hourly", label: "Every hour" },
  { id: "manual", label: "Manual only (no schedule)" },
] as const;

/* -------------------------------------------------------------------------- */
/* Step type icons                                                            */
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
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

interface AgentCustomizationProps {
  customizationPrompts: CustomizationPrompt[];
  setupSteps: SetupStep[];
  skillContent: string;
  stepTypeIcons: string[];
  agentName: string;
}

export default function AgentCustomization({
  customizationPrompts,
  setupSteps,
  skillContent,
  agentName,
}: AgentCustomizationProps) {
  /* Customization values */
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const prompt of customizationPrompts) {
      initial[prompt.field] = "";
    }
    return initial;
  });

  /* Custom rules */
  const [rules, setRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState("");

  const addRule = () => {
    const trimmed = newRule.trim();
    if (trimmed) {
      setRules((prev) => [...prev, trimmed]);
      setNewRule("");
    }
  };

  const removeRule = (index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  /* Channels */
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(
    new Set()
  );

  const toggleChannel = (channelId: string) => {
    setSelectedChannels((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) {
        next.delete(channelId);
      } else {
        next.add(channelId);
      }
      return next;
    });
  };

  /* Schedule */
  const [schedule, setSchedule] = useState("morning");

  /* Install state */
  const [showSetup, setShowSetup] = useState(false);
  const [skillCopied, setSkillCopied] = useState(false);

  /* Build complete SKILL.md with frontmatter + all user customizations */
  const processedSkillContent = React.useMemo(() => {
    const slug = agentName.toLowerCase().replace(/\s+/g, "-");

    // Build the skill body from the template
    let body = skillContent;
    for (const [field, value] of Object.entries(values)) {
      if (value) {
        body = body.replace(
          new RegExp(`\\{\\{${field}\\}\\}`, "g"),
          value
        );
      }
    }

    // Clean up any remaining unfilled placeholders
    body = body.replace(/\{\{[^}]+\}\}/g, "(not set)");

    // Add custom rules
    if (rules.length > 0) {
      body += "\n\n## Custom Rules\nAlways follow these rules:\n";
      body += rules.map((r) => `- ${r}`).join("\n");
    }

    // Add delivery config
    if (selectedChannels.size > 0) {
      const channelNames = Array.from(selectedChannels)
        .map((id) => CHANNELS.find((c) => c.id === id)?.label)
        .filter(Boolean);
      body += `\n\n## Delivery\nAfter generating results, send a summary to: ${channelNames.join(", ")}`;
    }

    // Add schedule info
    const scheduleOption = SCHEDULE_OPTIONS.find((s) => s.id === schedule);
    if (schedule !== "manual" && scheduleOption) {
      body += `\n\n## Schedule\nThis agent is configured to run: ${scheduleOption.label}`;
    }

    // Build complete SKILL.md with YAML frontmatter
    const triggerHints = `Triggers on requests about ${agentName.toLowerCase()}, or related tasks.`;
    const fullSkill = `---
name: ${slug}
description: ${agentName} — configured via OpenClaude.io. ${triggerHints}
---

${body}`;

    return fullSkill;
  }, [skillContent, values, rules, selectedChannels, schedule, agentName]);

  /* Build simplified setup steps based on user choices */
  const dynamicSetupSteps = React.useMemo(() => {
    const slug = agentName.toLowerCase().replace(/\s+/g, "-");
    const steps: SetupStep[] = [];

    // Step 1: Create skill folder
    steps.push({
      title: "Create the skill folder",
      description: "Create a directory for your agent's skill file.",
      command: `mkdir -p ~/.claude/skills/${slug}`,
      type: "command",
    });

    // Step 2: Save SKILL.md (user copies from the preview below)
    steps.push({
      title: "Save the SKILL.md file",
      description: "Copy the generated SKILL.md below and save it to the skill folder. Use the \"Copy SKILL.md\" button, then paste it:",
      command: `cat > ~/.claude/skills/${slug}/SKILL.md << 'SKILLEOF'\n# Paste the copied SKILL.md content here\nSKILLEOF`,
      type: "config",
    });

    // Step 3: Connect required services
    const mcpServices: string[] = [];
    // Check original setup steps for MCP requirements
    for (const step of setupSteps) {
      if (step.type === "connect") {
        mcpServices.push(step.title.replace("Connect ", ""));
      }
    }
    // Add user-selected channels
    if (selectedChannels.has("telegram")) mcpServices.push("Telegram");
    if (selectedChannels.has("slack")) mcpServices.push("Slack");

    if (mcpServices.length > 0) {
      steps.push({
        title: `Connect ${mcpServices.join(" & ")}`,
        description: `Open Claude Code and connect the required services. Run /mcp and connect: ${mcpServices.join(", ")}.`,
        command: "claude /mcp",
        type: "connect",
      });
    }

    // Step 4: Set up schedule (if not manual)
    if (schedule !== "manual") {
      const scheduleOption = SCHEDULE_OPTIONS.find((s) => s.id === schedule);
      const cronExpr =
        schedule === "morning"
          ? "0 7 * * *"
          : schedule === "twice"
            ? "0 7,17 * * *"
            : "0 * * * *";
      steps.push({
        title: "Set up automatic schedule",
        description: `The agent will run: ${scheduleOption?.label}.`,
        command: `claude /schedule create --cron "${cronExpr}" --prompt "Run my ${agentName}"`,
        type: "config",
      });
    }

    // Final step: Test
    steps.push({
      title: "Test your agent",
      description: "Run a quick test to make sure everything works.",
      command: `claude -p "Run my ${agentName}"`,
      type: "test",
    });

    return steps;
  }, [setupSteps, selectedChannels, schedule, agentName]);

  const copySkill = useCallback(() => {
    navigator.clipboard.writeText(processedSkillContent).then(() => {
      setSkillCopied(true);
      setTimeout(() => setSkillCopied(false), 2500);
    });
  }, [processedSkillContent]);

  return (
    <div className="space-y-10">
      {/* ------------------------------------------------------------------ */}
      {/* Customization fields                                                */}
      {/* ------------------------------------------------------------------ */}
      {customizationPrompts.length > 0 && (
        <section>
          <h2 className="mb-5 text-lg font-semibold text-[#1A1A1A]">
            Customize your agent
          </h2>
          <div className="space-y-4">
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
                  className="max-w-lg rounded-xl border-border/60 bg-white"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Custom rules                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="mb-2 text-lg font-semibold text-[#1A1A1A]">
          Your rules
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Add custom rules in plain language. The agent will always follow these.
        </p>

        {rules.length > 0 && (
          <div className="mb-3 space-y-2">
            {rules.map((rule, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-white px-3 py-2"
              >
                <span className="flex-1 text-sm text-[#1A1A1A]">{rule}</span>
                <button
                  onClick={() => removeRule(i)}
                  className="rounded p-1 text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 max-w-lg">
          <Input
            placeholder='e.g. "Ignore emails from newsletters"'
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRule()}
            className="rounded-xl border-border/60 bg-white"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={addRule}
            disabled={!newRule.trim()}
            className="rounded-xl flex-shrink-0"
          >
            <Plus size={16} />
          </Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Delivery channels                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="mb-2 text-lg font-semibold text-[#1A1A1A]">
          Deliver to
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Where should the agent send results? Select one or more channels.
        </p>

        <div className="flex flex-wrap gap-3">
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            const isSelected = selectedChannels.has(channel.id);
            return (
              <button
                key={channel.id}
                onClick={() => toggleChannel(channel.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border-2 px-4 py-3 transition-all",
                  isSelected
                    ? "border-[#4A7DFF] bg-[#4A7DFF]/5 shadow-sm"
                    : "border-border/60 bg-white hover:border-border hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    isSelected ? "bg-[#4A7DFF]/10" : "bg-muted"
                  )}
                >
                  <Icon
                    size={16}
                    style={{ color: isSelected ? channel.color : undefined }}
                    className={cn(!isSelected && "text-muted-foreground")}
                  />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-[#1A1A1A]" : "text-muted-foreground"
                  )}
                >
                  {channel.label}
                </span>
                {isSelected && (
                  <Check size={14} className="text-[#4A7DFF] ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Schedule                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="mb-2 text-lg font-semibold text-[#1A1A1A]">
          Schedule
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          How often should this agent run automatically?
        </p>

        <div className="flex flex-wrap gap-2">
          {SCHEDULE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSchedule(option.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all",
                schedule === option.id
                  ? "border-[#4A7DFF] bg-[#4A7DFF]/5 text-[#1A1A1A]"
                  : "border-border/60 bg-white text-muted-foreground hover:border-border"
              )}
            >
              <Clock size={14} />
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Install button                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border/60 pt-8">
        <Button
          size="lg"
          onClick={() => setShowSetup(true)}
          className="h-12 rounded-xl px-8 text-base font-semibold"
        >
          <Terminal size={18} className="mr-2" />
          Install Agent
        </Button>

        {!showSetup && (
          <p className="mt-2 text-xs text-muted-foreground">
            Click to see the step-by-step terminal setup guide
          </p>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Setup guide (shown after clicking Install)                          */}
      {/* ------------------------------------------------------------------ */}
      {showSetup && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="mb-6 text-lg font-semibold text-[#1A1A1A]">
            Setup Guide
          </h2>

          <div className="space-y-0">
            {dynamicSetupSteps.map((step, i) => {
              const StepIcon = STEP_TYPE_ICON[step.type] || Terminal;
              const stepLabel = STEP_TYPE_LABEL[step.type] || step.type;

              return (
                <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < dynamicSetupSteps.length - 1 && (
                    <div className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-px bg-border/60" />
                  )}
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border bg-white text-sm font-bold text-[#1A1A1A]">
                    {i + 1}
                  </div>
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

          {/* SKILL.md preview */}
          <div className="mt-8 rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="text-base font-semibold text-[#1A1A1A]">
              Your generated SKILL.md
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This includes your customizations, rules,
              {selectedChannels.size > 0 ? " channels," : ""} and schedule.
            </p>

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
                Save to ~/.claude/skills/{agentName.toLowerCase().replace(/\s+/g, "-")}/SKILL.md
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
