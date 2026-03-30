"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Run } from "@/lib/types";

const LS_RUNS_KEY = "openclaude_runs";

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export default function ActivityPage() {
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_RUNS_KEY);
      if (raw) {
        setRuns(JSON.parse(raw) as Run[]);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Activity</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your recent agent runs and their results.
        </p>
      </div>

      {runs.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent className="p-0">
            <p className="text-muted-foreground">
              No runs yet. Equip some skills and try your first prompt!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {runs.map((run) => (
            <Card key={run.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {truncate(run.prompt, 80)}
                  </CardTitle>
                  <span className="flex-shrink-0 text-xs text-muted-foreground">
                    {formatTimestamp(run.created_at)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Response preview */}
                {run.response && (
                  <p className="text-sm text-[#1A1A1A] font-mono bg-[#F7F5F0] rounded-lg p-3 leading-relaxed">
                    {truncate(run.response, 200)}
                  </p>
                )}

                {/* Skills used */}
                <div className="flex flex-wrap gap-1.5">
                  {run.skills_used.map((skillName) => (
                    <Badge
                      key={skillName}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5"
                    >
                      {skillName}
                    </Badge>
                  ))}
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      run.status === "completed"
                        ? "bg-green-500"
                        : run.status === "failed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {run.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
