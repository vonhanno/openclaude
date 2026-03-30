"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RunStreamProps {
  streamContent: string;
  isStreaming: boolean;
}

export default function RunStream({
  streamContent,
  isStreaming,
}: RunStreamProps) {
  const [displayedLength, setDisplayedLength] = useState(0);

  // Typing animation: gradually reveal characters
  useEffect(() => {
    if (streamContent.length > displayedLength) {
      const timer = setTimeout(() => {
        // Reveal in chunks for smoother appearance
        const chunkSize = Math.max(
          1,
          Math.ceil((streamContent.length - displayedLength) / 10)
        );
        setDisplayedLength((prev) =>
          Math.min(prev + chunkSize, streamContent.length)
        );
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [streamContent, displayedLength]);

  // Reset when new stream begins
  useEffect(() => {
    if (streamContent.length === 0) {
      setDisplayedLength(0);
    }
  }, [streamContent]);

  const visibleText = streamContent.slice(0, displayedLength);
  const showThinking = isStreaming && streamContent.length === 0;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-opacity duration-300",
        showThinking ? "opacity-70" : "opacity-100"
      )}
    >
      <CardContent className="p-4">
        <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#1A1A1A]">
          {showThinking ? (
            <span className="text-muted-foreground animate-pulse">
              Thinking...
            </span>
          ) : (
            <>
              {visibleText}
              {isStreaming && (
                <span className="inline-block w-2 h-4 ml-0.5 bg-[#4A7DFF] animate-pulse rounded-sm" />
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
