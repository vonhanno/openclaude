"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface RunPromptProps {
  onRun: (prompt: string) => void;
  isRunning: boolean;
  disabled: boolean;
  disabledReason?: string;
}

export default function RunPrompt({
  onRun,
  isRunning,
  disabled,
  disabledReason,
}: RunPromptProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim() || isRunning || disabled) return;
    onRun(prompt.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-3">
        <div className="relative flex-1">
          <Textarea
            placeholder="What would you like your assistant to do?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRunning}
            className={cn(
              "min-h-[80px] resize-none rounded-xl bg-white pr-4 text-sm",
              disabled && "opacity-60"
            )}
            rows={3}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isRunning || disabled}
          className="h-[80px] rounded-xl px-6"
        >
          {isRunning ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Play className="h-5 w-5" />
          )}
          <span className="ml-2">{isRunning ? "Running..." : "Run"}</span>
        </Button>
      </div>
      {disabled && disabledReason && (
        <p className="text-xs text-muted-foreground">{disabledReason}</p>
      )}
      {!disabled && (
        <p className="text-xs text-muted-foreground">
          Press Cmd+Enter to run
        </p>
      )}
    </div>
  );
}
