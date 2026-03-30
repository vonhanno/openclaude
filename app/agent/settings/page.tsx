"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, ExternalLink, Zap } from "lucide-react";

interface ServiceConfig {
  name: string;
  status: "connected" | "not_connected";
  guideContent: string;
}

const SERVICES: ServiceConfig[] = [
  {
    name: "Gmail",
    status: "not_connected",
    guideContent: `To connect Gmail via Claude Code:\n\n1. Open your terminal\n2. Run: claude /mcp\n3. Find "Gmail" in the list\n4. Click "Connect"\n5. Approve in the browser popup\n6. Come back here — done!\n\nThis uses your Claude Max subscription.\nNo API keys or OAuth setup needed.`,
  },
  {
    name: "Google Calendar",
    status: "not_connected",
    guideContent: `To connect Google Calendar via Claude Code:\n\n1. Open your terminal\n2. Run: claude /mcp\n3. Find "Google Calendar" in the list\n4. Click "Connect"\n5. Approve in the browser popup\n6. Come back here — done!\n\nThis uses your Claude Max subscription.\nNo API keys or OAuth setup needed.`,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your connections and preferences.
        </p>
      </div>

      {/* Subscription Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Subscription</CardTitle>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Check className="mr-1 h-3 w-3" />
              Active
            </Badge>
          </div>
          <CardDescription>
            OpenClaude runs through your Claude Max subscription via Claude
            Code. No separate API key needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg bg-[#4A7DFF]/5 border border-[#4A7DFF]/20 p-4">
            <Zap className="h-5 w-5 text-[#4A7DFF]" />
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                Claude Max Plan
              </p>
              <p className="text-xs text-muted-foreground">
                Powered by Claude Code running locally on your machine
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Connected Services</CardTitle>
          <CardDescription>
            Connect external services through Claude Code&apos;s MCP system to
            unlock more powerful skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between rounded-lg border border-[#E5E7EB] p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {service.name}
                </span>
                <Badge
                  variant="outline"
                  className={
                    service.status === "connected"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }
                >
                  {service.status === "connected"
                    ? "Connected"
                    : "Not connected"}
                </Badge>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Setup Guide
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Connect {service.name}</SheetTitle>
                    <SheetDescription>
                      Follow these steps to connect {service.name} via Claude
                      Code.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <pre className="whitespace-pre-wrap rounded-lg bg-[#1A1A1A] p-4 text-sm text-green-400 font-mono leading-relaxed">
                      {service.guideContent}
                    </pre>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
          <CardDescription>
            Authentication and account settings will be available here in a
            future update.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Coming soon: Sign in with email, manage your profile, and sync
            settings across devices.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
