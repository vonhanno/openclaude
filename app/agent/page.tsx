"use client";

import React, { useState, useEffect, useCallback } from "react";
import AgentMascot from "@/components/mascot/AgentMascot";
import SkillListItem from "@/components/skills/SkillListItem";
import RunPrompt from "@/components/agent/RunPrompt";
import RunStream from "@/components/agent/RunStream";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Skill, Loadout, Run, SkillCategory } from "@/lib/types";
import { PRESET_LOADOUTS } from "@/lib/skills-data";

const LS_EQUIPPED_KEY = "openclaude_equipped_skills";
const LS_RUNS_KEY = "openclaude_runs";
const LS_RULES_KEY = "openclaude_skill_rules";

function getFromLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function AgentPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [equippedIds, setEquippedIds] = useState<Set<string>>(new Set());
  const [runs, setRuns] = useState<Run[]>([]);
  const [skillRules, setSkillRules] = useState<Record<string, string[]>>({});
  const [selectedLoadout, setSelectedLoadout] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data: Skill[]) => setSkills(data))
      .catch(() => {});

    const savedIds = getFromLS<string[]>(LS_EQUIPPED_KEY, []);
    setEquippedIds(new Set(savedIds));

    const savedRuns = getFromLS<Run[]>(LS_RUNS_KEY, []);
    setRuns(savedRuns);

    const savedRules = getFromLS<Record<string, string[]>>(LS_RULES_KEY, {});
    setSkillRules(savedRules);

    setLoaded(true);
  }, []);

  // Persist equipped skills (only after initial load)
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      LS_EQUIPPED_KEY,
      JSON.stringify(Array.from(equippedIds))
    );
  }, [equippedIds, loaded]);

  // Persist skill rules
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(LS_RULES_KEY, JSON.stringify(skillRules));
  }, [skillRules, loaded]);

  const toggleSkill = useCallback((id: string) => {
    setEquippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const updateRules = useCallback((skillId: string, rules: string[]) => {
    setSkillRules((prev) => ({ ...prev, [skillId]: rules }));
  }, []);

  const applyLoadout = useCallback(
    (loadout: Loadout) => {
      const slugSet = new Set(loadout.skill_slugs);
      const matchingIds = skills
        .filter((s) => slugSet.has(s.slug))
        .map((s) => s.id);
      setEquippedIds(new Set(matchingIds));
      setSelectedLoadout(loadout.id);
    },
    [skills]
  );

  const equippedSkills = skills.filter((s) => equippedIds.has(s.id));

  const equippedCategories = new Set<string>(
    equippedSkills.map((s) => s.category)
  );

  const handleRun = useCallback(
    async (prompt: string) => {
      if (equippedIds.size === 0) return;

      setIsRunning(true);
      setStreamContent("");

      const runId = `run-${Date.now()}`;
      let fullResponse = "";

      // Only send rules for equipped skills
      const activeRules: Record<string, string[]> = {};
      for (const id of equippedIds) {
        if (skillRules[id]?.length) {
          activeRules[id] = skillRules[id];
        }
      }

      try {
        const res = await fetch("/api/agent/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            skillIds: Array.from(equippedIds),
            skillRules: activeRules,
          }),
        });

        if (!res.ok || !res.body) {
          throw new Error("Failed to start run");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const payload = JSON.parse(line.slice(6));
                if (payload.text) {
                  fullResponse += payload.text;
                  setStreamContent(fullResponse);
                }
              } catch {
                // ignore parse errors on partial data
              }
            }
          }
        }
      } catch (err) {
        fullResponse =
          fullResponse ||
          `Error: ${err instanceof Error ? err.message : "Unknown error"}`;
        setStreamContent(fullResponse);
      }

      const newRun: Run = {
        id: runId,
        user_id: "local",
        prompt,
        response: fullResponse,
        skills_used: equippedSkills.map((s) => s.name),
        model: "claude-sonnet-4-6-20250514",
        tokens_used: null,
        duration_ms: null,
        status: fullResponse.startsWith("Error:") ? "failed" : "completed",
        created_at: new Date().toISOString(),
      };

      const updatedRuns = [newRun, ...runs];
      setRuns(updatedRuns);
      localStorage.setItem(LS_RUNS_KEY, JSON.stringify(updatedRuns));
      setIsRunning(false);
    },
    [equippedIds, equippedSkills, runs, skillRules]
  );

  return (
    <div className="space-y-8">
      {/* Loadout Picker */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Loadouts
        </h2>
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-3">
            {PRESET_LOADOUTS.map((loadout) => (
              <Button
                key={loadout.id}
                variant={selectedLoadout === loadout.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex-shrink-0 rounded-full px-4",
                  selectedLoadout === loadout.id && "shadow-md"
                )}
                onClick={() => applyLoadout(loadout)}
              >
                {loadout.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Mascot */}
      <section className="flex justify-center py-4">
        <AgentMascot
          equippedCategories={equippedCategories as Set<SkillCategory>}
          isRunning={isRunning}
          status={
            isRunning
              ? "Processing your request..."
              : equippedIds.size === 0
                ? "Equip some skills to get started"
                : undefined
          }
        />
      </section>

      {/* Skill List */}
      <section id="skills">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Skills
        </h2>
        <div className="space-y-3">
          {skills.map((skill) => (
            <SkillListItem
              key={skill.id}
              skill={skill}
              isEquipped={equippedIds.has(skill.id)}
              onToggle={() => toggleSkill(skill.id)}
              rules={skillRules[skill.id] || []}
              onRulesChange={(rules) => updateRules(skill.id, rules)}
              processSteps={skill.process_steps || []}
            />
          ))}
        </div>
      </section>

      {/* Stream Output */}
      {(isRunning || streamContent) && (
        <section>
          <RunStream streamContent={streamContent} isStreaming={isRunning} />
        </section>
      )}

      {/* Run Prompt */}
      <section className="sticky bottom-0 bg-background pb-4 pt-4 border-t border-[#E5E7EB]">
        <RunPrompt
          onRun={handleRun}
          isRunning={isRunning}
          disabled={equippedIds.size === 0}
          disabledReason={
            equippedIds.size === 0
              ? "Equip at least one skill"
              : undefined
          }
        />
      </section>
    </div>
  );
}
