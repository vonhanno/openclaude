"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "What Is This?",
    items: [
      {
        question: "What's the difference between this and ChatGPT?",
        answer:
          "OpenClaude is a visual AI agent builder. Rather than just chatting, you equip your assistant with specific skills (like email summarization, code review, or meeting prep) and then run tasks against those skills. Your assistant is specialized for the work you need it to do, rather than being a generic chatbot.",
      },
      {
        question: 'What are "skills"?',
        answer:
          "Skills are specialized capabilities you can equip on your AI assistant. Each skill comes with a fine-tuned system prompt that makes the assistant an expert in that area. For example, the Email Summary skill makes your assistant great at extracting key points and action items from email threads.",
      },
    ],
  },
  {
    title: "How Does It Work?",
    items: [
      {
        question: "Why do I need a terminal?",
        answer:
          "Some advanced features (like connecting Gmail or Calendar) require running a setup command in your terminal. This is a one-time process that authorizes OpenClaude to access your accounts. Don't worry — the setup guide walks you through every step.",
      },
      {
        question: "What's an API key?",
        answer:
          "An API key is your personal access token from Anthropic that lets OpenClaude use Claude (the AI) on your behalf. You can get one from console.anthropic.com. Your key is stored locally in your browser and is never sent to our servers — it goes directly to Anthropic's API.",
      },
    ],
  },
  {
    title: "Privacy & Safety",
    items: [
      {
        question: "Is this GDPR compliant?",
        answer:
          "Yes. OpenClaude stores your API key and run history locally in your browser's localStorage. We don't collect, store, or process your personal data on our servers. Your prompts and responses go directly between your browser and Anthropic's API. You can clear all local data at any time from Settings.",
      },
      {
        question: "Will it send emails without asking?",
        answer:
          "No. OpenClaude will never take actions on your behalf without explicit confirmation. When a skill involves external actions (like sending an email), you'll always see a preview and must approve it before anything is sent. Safety is a core design principle.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        question: "Terminal command didn't work",
        answer:
          'Make sure you have Node.js (v18+) installed. Open a fresh terminal window and try running "node --version" to confirm. If the setup command fails, try running it with "npx" prefix. If you\'re on macOS and get a permissions error, try prefixing with "sudo". Still stuck? Check our GitHub issues page for known solutions.',
      },
      {
        question: "API key not recognized",
        answer:
          'Make sure your API key starts with "sk-ant-" and that you\'ve copied the complete key without any extra spaces. You can verify your key is valid by visiting console.anthropic.com and checking that your account is active with available credits. If you recently created the key, wait a few minutes for it to propagate.',
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-8">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/agent">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to dashboard
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            Help & FAQ
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you need to know about using OpenClaude.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${section.title}-${index}`}
                  >
                    <AccordionTrigger className="text-left text-[#1A1A1A]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
