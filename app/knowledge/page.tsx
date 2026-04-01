"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building2,
  User,
  Plus,
  X,
  Copy,
  Check,
  FileText,
  Upload,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AgentMascot from "@/components/mascot/AgentMascot";

type KBType = "business" | "personal" | null;

export default function KnowledgeBasePage() {
  const [kbType, setKbType] = useState<KBType>(null);

  // Business fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState("");
  const [products, setProducts] = useState("");
  const [clients, setClients] = useState<string[]>([]);
  const [newClient, setNewClient] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newTeamMember, setNewTeamMember] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  // Business extra fields
  const [brandVoice, setBrandVoice] = useState("");
  const [languages, setLanguages] = useState("");
  const [timezone, setTimezone] = useState("");
  const [tools, setTools] = useState("");

  // Personal fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState("");
  const [writingStyle, setWritingStyle] = useState("");
  const [personalLanguage, setPersonalLanguage] = useState("");
  const [personalTimezone, setPersonalTimezone] = useState("");
  const [personalNotes, setPersonalNotes] = useState("");

  // Files list (visual only — actual upload in Tauri)
  const [files, setFiles] = useState<string[]>([]);
  const [newFile, setNewFile] = useState("");

  // Output
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const addClient = () => {
    if (newClient.trim()) {
      setClients((prev) => [...prev, newClient.trim()]);
      setNewClient("");
    }
  };

  const addTeamMember = () => {
    if (newTeamMember.trim()) {
      setTeamMembers((prev) => [...prev, newTeamMember.trim()]);
      setNewTeamMember("");
    }
  };

  const addFile = () => {
    if (newFile.trim()) {
      setFiles((prev) => [...prev, newFile.trim()]);
      setNewFile("");
    }
  };

  // Generate SKILL.md content
  const generateSkillContent = () => {
    if (kbType === "business") {
      let content = `---
name: company-knowledge
description: Company knowledge base for ${companyName || "your business"}. All agents should reference this skill for company context, tone, client info, and business rules.
---

# Company Knowledge Base

## Company
- Name: ${companyName || "(not set)"}
- Industry: ${industry || "(not set)"}
- Communication tone: ${tone || "(not set)"}
${languages ? `- Languages: ${languages}` : ""}
${timezone ? `- Timezone: ${timezone}` : ""}

## Brand Voice & Tone
${brandVoice || "(not set)"}

## Products & Services
${products || "(not set)"}
${tools ? `\n## Tools & Platforms\n${tools}` : ""}
`;

      if (clients.length > 0) {
        content += `\n## Key Clients\n${clients.map((c) => `- ${c}`).join("\n")}\n`;
      }

      if (teamMembers.length > 0) {
        content += `\n## Team\n${teamMembers.map((m) => `- ${m}`).join("\n")}\n`;
      }

      if (customNotes) {
        content += `\n## Additional Notes\n${customNotes}\n`;
      }

      if (files.length > 0) {
        content += `\n## Reference Files\nThe following files are available in references/:\n${files.map((f) => `- ${f}`).join("\n")}\n`;
      }

      content += `\n## How Agents Should Use This\n- Always match the communication tone described above\n- Reference client preferences when relevant\n- Use company context to personalize all outputs\n- Check reference files for detailed information when needed`;

      return content;
    } else {
      let content = `---
name: personal-knowledge
description: Personal knowledge base for ${name || "the user"}. All agents should reference this skill for personal context, preferences, and communication style.
---

# Personal Knowledge Base

## About
- Name: ${name || "(not set)"}
- Role: ${role || "(not set)"}
- Interests: ${interests || "(not set)"}
${personalLanguage ? `- Language: ${personalLanguage}` : ""}
${personalTimezone ? `- Timezone: ${personalTimezone}` : ""}

## Tone of Voice
${writingStyle || "(not set)"}
`;

      if (personalNotes) {
        content += `\n## Notes & Preferences\n${personalNotes}\n`;
      }

      if (files.length > 0) {
        content += `\n## Reference Files\nThe following files are available in references/:\n${files.map((f) => `- ${f}`).join("\n")}\n`;
      }

      content += `\n## How Agents Should Use This\n- Match the communication style described above\n- Use personal context to personalize outputs\n- Reference preferences when making decisions\n- Check reference files for detailed information when needed`;

      return content;
    }
  };

  const skillContent = showOutput ? generateSkillContent() : "";
  const slug = kbType === "business" ? "company-knowledge" : "personal-knowledge";

  const handleCopy = () => {
    navigator.clipboard.writeText(skillContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Type selection screen
  if (!kbType) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#1A1A1A]"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>

        <div className="flex flex-col items-center text-center">
          <AgentMascot equippedCategories={new Set()} />

          <h1 className="mt-6 text-3xl font-bold text-[#1A1A1A]">
            Knowledge Base
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Build a knowledge base that all your agents can reference.
            They&apos;ll understand your context and deliver better results.
          </p>

          <div className="mt-10 grid w-full grid-cols-2 gap-4">
            <button
              onClick={() => setKbType("business")}
              className="flex flex-col items-center gap-3 rounded-xl border-2 border-border/60 bg-white p-8 transition-all hover:border-[#4A7DFF] hover:shadow-md"
            >
              <Building2 size={32} className="text-[#4A7DFF]" />
              <span className="text-lg font-semibold text-[#1A1A1A]">Business</span>
              <span className="text-sm text-muted-foreground">
                Company info, clients, team, brand
              </span>
            </button>

            <button
              onClick={() => setKbType("personal")}
              className="flex flex-col items-center gap-3 rounded-xl border-2 border-border/60 bg-white p-8 transition-all hover:border-[#8B5CF6] hover:shadow-md"
            >
              <User size={32} className="text-[#8B5CF6]" />
              <span className="text-lg font-semibold text-[#1A1A1A]">Personal</span>
              <span className="text-sm text-muted-foreground">
                Preferences, style, interests
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form screen
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button
        onClick={() => { setKbType(null); setShowOutput(false); }}
        className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#1A1A1A]"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          {kbType === "business" ? (
            <Building2 size={24} className="text-[#4A7DFF]" />
          ) : (
            <User size={24} className="text-[#8B5CF6]" />
          )}
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            {kbType === "business" ? "Business" : "Personal"} Knowledge Base
          </h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill in what you know. Skip anything you&apos;re not sure about — you can always add more later.
        </p>
      </div>

      <div className="space-y-8">
        {/* Business fields */}
        {kbType === "business" && (
          <>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Company</h2>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Company name</label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Vibelabs" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Industry</label>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="AI education, software" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Communication tone</label>
                <Input value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Professional but friendly, understated, evidence-based" className="rounded-xl" />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Brand Voice & Tone</h2>
              <p className="text-sm text-muted-foreground">How should agents communicate on behalf of your business?</p>
              <Textarea value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} placeholder="E.g., professional but approachable. We avoid buzzwords and corporate jargon. Always evidence-based. Understated — never boastful (Janteloven)." rows={4} className="rounded-xl" />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Products & Services</h2>
              <Textarea value={products} onChange={(e) => setProducts(e.target.value)} placeholder="AI courses for businesses, consulting, agent development..." rows={3} className="rounded-xl" />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Language & Region</h2>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Languages</label>
                <Input value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="Norwegian (Bokmål), English" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Timezone</label>
                <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="CET (Europe/Oslo)" className="rounded-xl" />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Tools & Platforms</h2>
              <p className="text-sm text-muted-foreground">What tools does your team use daily?</p>
              <Textarea value={tools} onChange={(e) => setTools(e.target.value)} placeholder="Slack for comms, Linear for projects, Notion for docs, Google Workspace for email/calendar..." rows={3} className="rounded-xl" />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Key Clients</h2>
              {clients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {clients.map((c, i) => (
                    <Badge key={i} variant="outline" className="gap-1 px-3 py-1.5 text-sm">
                      {c}
                      <button onClick={() => setClients((prev) => prev.filter((_, j) => j !== i))} className="ml-1 hover:text-red-500"><X size={12} /></button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input value={newClient} onChange={(e) => setNewClient(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addClient()} placeholder="Add a client..." className="rounded-xl" />
                <Button variant="outline" size="icon" onClick={addClient} disabled={!newClient.trim()} className="rounded-xl flex-shrink-0"><Plus size={16} /></Button>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Team Members</h2>
              {teamMembers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {teamMembers.map((m, i) => (
                    <Badge key={i} variant="outline" className="gap-1 px-3 py-1.5 text-sm">
                      {m}
                      <button onClick={() => setTeamMembers((prev) => prev.filter((_, j) => j !== i))} className="ml-1 hover:text-red-500"><X size={12} /></button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input value={newTeamMember} onChange={(e) => setNewTeamMember(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTeamMember()} placeholder="Name — Role (e.g., Jonas — CTO)" className="rounded-xl" />
                <Button variant="outline" size="icon" onClick={addTeamMember} disabled={!newTeamMember.trim()} className="rounded-xl flex-shrink-0"><Plus size={16} /></Button>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Additional Notes</h2>
              <Textarea value={customNotes} onChange={(e) => setCustomNotes(e.target.value)} placeholder="Anything else your agents should know..." rows={3} className="rounded-xl" />
            </section>
          </>
        )}

        {/* Personal fields */}
        {kbType === "personal" && (
          <>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">About You</h2>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Christian" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Role / Title</label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Founder & CEO, Product Designer..." className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Interests & Focus Areas</label>
                <Input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="AI, startups, product design..." className="rounded-xl" />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Tone of Voice</h2>
              <p className="text-sm text-muted-foreground">How should your agents sound when writing for you?</p>
              <Textarea value={writingStyle} onChange={(e) => setWritingStyle(e.target.value)} placeholder="E.g., concise and direct. Never use corporate jargon. Friendly but professional. I prefer short sentences and bullet points over long paragraphs." rows={4} className="rounded-xl" />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Language & Region</h2>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Primary language</label>
                <Input value={personalLanguage} onChange={(e) => setPersonalLanguage(e.target.value)} placeholder="Norwegian, English, both..." className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Timezone</label>
                <Input value={personalTimezone} onChange={(e) => setPersonalTimezone(e.target.value)} placeholder="CET (Europe/Oslo)" className="rounded-xl" />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Notes & Preferences</h2>
              <Textarea value={personalNotes} onChange={(e) => setPersonalNotes(e.target.value)} placeholder="Things your agents should always remember. E.g., I'm a morning person — schedule summaries before 8am. I don't check email on weekends." rows={4} className="rounded-xl" />
            </section>
          </>
        )}

        {/* Reference files */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Reference Files</h2>
          <p className="text-sm text-muted-foreground">
            List files you want your agents to reference. With the desktop app, you&apos;ll be able to drag and drop files directly.
          </p>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border/60 bg-white px-3 py-2">
                  <FileText size={14} className="text-muted-foreground" />
                  <span className="flex-1 text-sm text-[#1A1A1A]">{f}</span>
                  <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input value={newFile} onChange={(e) => setNewFile(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFile()} placeholder="brand-guidelines.pdf, client-list.csv..." className="rounded-xl" />
            <Button variant="outline" size="icon" onClick={addFile} disabled={!newFile.trim()} className="rounded-xl flex-shrink-0"><Plus size={16} /></Button>
          </div>

          {/* Drop zone placeholder */}
          <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-white/50 px-6 py-8 text-center">
            <Upload size={24} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Drag & drop available in desktop app
            </p>
          </div>
        </section>

        {/* Generate button */}
        <section className="border-t border-border/60 pt-8">
          <Button
            size="lg"
            onClick={() => setShowOutput(true)}
            className="h-12 rounded-xl px-8 text-base font-semibold"
          >
            <Terminal size={18} className="mr-2" />
            Generate Knowledge Base
          </Button>
        </section>

        {/* Output */}
        {showOutput && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">Setup Guide</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-sm font-bold text-white">1</div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Create the skill folder</h3>
                  <div className="mt-2 rounded-xl bg-[#1A1A1A] px-4 py-3">
                    <code className="text-sm text-emerald-400 font-mono">mkdir -p ~/.claude/skills/{slug}/references</code>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-sm font-bold text-white">2</div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Save the SKILL.md file</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Copy the content below and save to the skill folder.</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-sm font-bold text-white">3</div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Add your reference files</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Copy these files to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">~/.claude/skills/{slug}/references/</code>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* SKILL.md preview */}
            <div className="mt-8 rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h3 className="text-base font-semibold text-[#1A1A1A]">
                Your generated SKILL.md
              </h3>
              <div className="relative mt-4 max-h-64 overflow-y-auto rounded-xl bg-[#1A1A1A] px-4 py-3">
                <pre className="text-xs leading-relaxed text-emerald-400/80 font-mono whitespace-pre-wrap">
                  {skillContent}
                </pre>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={handleCopy} className="h-10 rounded-xl px-6 font-semibold">
                  {copied ? <><Check size={16} className="mr-1.5" />Copied!</> : <><Copy size={16} className="mr-1.5" />Copy SKILL.md</>}
                </Button>
                <span className="text-xs text-muted-foreground">
                  Save to ~/.claude/skills/{slug}/SKILL.md
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
