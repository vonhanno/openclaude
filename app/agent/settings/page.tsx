"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
import { Check, Eye, EyeOff, ExternalLink, X } from "lucide-react";

const LS_API_KEY = "openclaude_api_key";

function maskKey(key: string): string {
  if (key.length <= 8) return "*".repeat(key.length);
  return key.slice(0, 4) + "*".repeat(key.length - 8) + key.slice(-4);
}

interface ServiceConfig {
  name: string;
  status: "connected" | "not_connected";
  guideContent: string;
}

const SERVICES: ServiceConfig[] = [
  {
    name: "Gmail",
    status: "not_connected",
    guideContent: `To connect Gmail, you need to set up OAuth credentials:\n\n1. Go to the Google Cloud Console\n2. Create a new project or select an existing one\n3. Enable the Gmail API\n4. Create OAuth 2.0 credentials\n5. Download the credentials JSON file\n6. Run the following in your terminal:\n\n  npx openclaude connect gmail\n\nFollow the prompts to paste your credentials.`,
  },
  {
    name: "Calendar",
    status: "not_connected",
    guideContent: `To connect Google Calendar:\n\n1. Go to the Google Cloud Console\n2. Enable the Google Calendar API\n3. Use the same OAuth credentials as Gmail (or create new ones)\n4. Run the following in your terminal:\n\n  npx openclaude connect calendar\n\nFollow the prompts to authorize access.`,
  },
];

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_API_KEY) ?? "";
    setApiKey(saved);
    setInputKey(saved);
    if (saved) {
      setIsValid(saved.startsWith("sk-ant-"));
    }
  }, []);

  const handleUpdate = () => {
    const trimmed = inputKey.trim();
    localStorage.setItem(LS_API_KEY, trimmed);
    setApiKey(trimmed);
    setIsValid(trimmed.startsWith("sk-ant-"));
  };

  const handleRemove = () => {
    localStorage.removeItem(LS_API_KEY);
    setApiKey("");
    setInputKey("");
    setIsValid(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your API key and connected services.
        </p>
      </div>

      {/* API Key Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">API Key</CardTitle>
            {isValid === true && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Check className="mr-1 h-3 w-3" />
                Valid
              </Badge>
            )}
            {isValid === false && (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
              >
                <X className="mr-1 h-3 w-3" />
                Invalid format
              </Badge>
            )}
          </div>
          <CardDescription>
            Your Anthropic API key is stored locally in your browser and never
            sent to our servers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="sk-ant-..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1A1A1A] transition-colors"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Button onClick={handleUpdate} size="sm">
              Update
            </Button>
            {apiKey && (
              <Button onClick={handleRemove} variant="destructive" size="sm">
                Remove
              </Button>
            )}
          </div>
          {apiKey && !showKey && (
            <p className="text-xs text-muted-foreground font-mono">
              Current: {maskKey(apiKey)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Connected Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Connected Services</CardTitle>
          <CardDescription>
            Connect external services to unlock more powerful skills.
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
                      Follow these steps to connect {service.name} to
                      OpenClaude.
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
