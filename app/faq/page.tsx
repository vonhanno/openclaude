"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ChevronDown,
  Send,
  Rocket,
  Settings,
  Bot,
  BookOpen,
  Shield,
  Brain,
  Radio,
  CreditCard,
  Wrench,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MiniMascot from "@/components/mascot/MiniMascot";

/* -------------------------------------------------------------------------- */
/* FAQ Data                                                                    */
/* -------------------------------------------------------------------------- */

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    items: [
      { q: "What is OpenClaude?", a: "OpenClaude is an agent recipe platform where you browse pre-built AI agents, customize them with your own rules, and install them as Claude Code skills on your machine. Think of it as an app store for AI agents that run locally." },
      { q: "What do I need to get started?", a: "You need Claude Code installed and a Claude Max subscription. That's it. OpenClaude generates step-by-step setup guides — no coding experience required." },
      { q: "How long does setup take?", a: "Most agents take 2-5 minutes to set up. You'll copy a few commands into your terminal and follow guided steps. Simple agents like news briefings take about 2 minutes." },
      { q: "Do I need to know how to code?", a: "No. OpenClaude generates everything for you. You customize agents by answering simple questions like 'Who are your VIP senders?' and 'What topics do you follow?' Then follow the terminal guide." },
      { q: "What's the difference between OpenClaude and ChatGPT/Claude?", a: "ChatGPT and Claude answer questions in a conversation. OpenClaude creates persistent agents that do tasks automatically — like triaging your email every morning or monitoring competitors daily. They run on a schedule without you having to ask." },
      { q: "Will there be a desktop app?", a: "Yes, we're building a desktop app (Mac and Windows) that will make setup even easier — drag-and-drop files, direct agent management, and no terminal needed. Coming soon." },
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    icon: Settings,
    items: [
      { q: "Where is my data stored?", a: "Everything is stored locally on your machine in the ~/.claude/skills/ directory. Your agents, rules, and knowledge base never leave your computer. The OpenClaude website only generates setup instructions — it never sees or stores your data." },
      { q: "How do agents actually run?", a: "Agents run as Claude Code skills. When you trigger an agent (manually or on a schedule), Claude Code reads the SKILL.md file and executes the instructions using your Max subscription. It's like giving Claude a detailed job description for a specific task." },
      { q: "What's a SKILL.md file?", a: "It's a simple text file that describes what an agent should do, how it should behave, and what tools it can use. OpenClaude generates these for you based on your customizations. You can also edit them directly if you want to fine-tune behavior." },
      { q: "How do agents connect to email, calendar, and other services?", a: "Through MCPs (Model Context Protocol). You connect services once in Claude Code by running /mcp — it handles all the authentication. Once connected, any agent can use those services." },
      { q: "Can multiple agents share the same connections?", a: "Yes. Once you connect Gmail, every agent that needs email access can use it. You set up connections once, and all agents benefit." },
      { q: "What happens if my computer is off?", a: "Agents only run when your computer and Claude Code are active. For always-on scheduling, the desktop app (coming soon) will support background execution." },
    ],
  },
  {
    id: "agents",
    title: "Agents",
    icon: Bot,
    items: [
      { q: "Can I create my own custom agents?", a: "Yes. Write your own SKILL.md file and save it to ~/.claude/skills/[agent-name]/SKILL.md. The format is simple markdown — describe what the agent should do, what tools to use, and what the output should look like. Check our existing agents for examples." },
      { q: "Can I have multiple agents running?", a: "Yes. Each agent is independent. You can have an email triage agent, a meeting prep agent, and a news briefing agent all installed at the same time, each on its own schedule." },
      { q: "Can one agent handle multiple email accounts?", a: "Yes, if you connect multiple Gmail accounts in Claude Code (/mcp). Configure the agent's rules to specify which accounts to check, or let it check all of them." },
      { q: "Can agents communicate with each other?", a: "Not directly yet. But you can set up agents that read the output of other agents. For example, a summary agent could read the output file from your email triage agent." },
      { q: "How do I update an agent?", a: "Edit the SKILL.md file directly in ~/.claude/skills/[agent-name]/, or reinstall from OpenClaude to get the latest version. Your custom rules and preferences will need to be re-added if you reinstall." },
      { q: "Can I customize pre-built agents after installing?", a: "Absolutely. The SKILL.md file is just text — edit it anytime. Change rules, modify the output format, add new instructions, or restrict what the agent can do." },
    ],
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    icon: BookOpen,
    items: [
      { q: "What is the Knowledge Base?", a: "It's a special skill that stores context about you or your business — company info, clients, tone of voice, team members, preferences. All your agents automatically reference it, so they understand your context without you repeating yourself." },
      { q: "How do agents use the Knowledge Base?", a: "When an agent runs, it reads your Knowledge Base for context. Your email triage agent knows your VIP clients. Your content writer knows your brand voice. Your meeting prep agent knows your role and team structure." },
      { q: "Can I have both business and personal Knowledge Bases?", a: "Yes. Create a business KB for company context and a personal KB for your individual preferences. Agents can reference both." },
      { q: "What should I include in my Knowledge Base?", a: "For business: company name, industry, brand voice, products, key clients, team members, tools you use. For personal: your name, role, communication style, interests, timezone. The more context, the better your agents perform." },
      { q: "Can I add files to my Knowledge Base?", a: "Yes. Save documents (brand guidelines, client lists, product specs) to the references/ folder in your knowledge base skill. Agents can read and reference these files when they need detailed information." },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    items: [
      { q: "Where is my data sent?", a: "Your data is sent to Claude's API (Anthropic's servers) only when you run an agent — and only the data the agent needs for that specific task. The OpenClaude website never sees your data. Your local files never leave your machine." },
      { q: "Can agents access everything on my computer?", a: "No. Agents can only access what you explicitly give them permission to through Claude Code's permission system. They use MCP connections you set up and can only read/write to the directories you allow." },
      { q: "Is my data encrypted?", a: "Your skill files are stored as plain text locally. They're as secure as any other files on your computer. For sensitive information, use file permissions and avoid storing passwords or secrets in SKILL.md files." },
      { q: "Is OpenClaude GDPR compliant?", a: "Since all data is stored locally and only sent to Anthropic's API when agents run, your GDPR compliance depends on how you handle the data. Anthropic is GDPR compliant. We recommend not storing personal data of others in your agent configurations." },
      { q: "Can I completely delete an agent and its data?", a: "Yes. Delete the ~/.claude/skills/[agent-name]/ folder and everything is gone. No cloud backups, no residual data. You have complete control." },
      { q: "What about agents that send emails or messages?", a: "Agents that send emails or Slack messages always require your explicit approval in the setup. By default, agents only draft content for your review — they never send anything without your permission." },
    ],
  },
  {
    id: "learning",
    title: "Learning & Feedback",
    icon: Brain,
    items: [
      { q: "Do agents learn from my feedback?", a: "You can improve agents by editing their SKILL.md files or adding notes to a feedback file. When you notice an agent getting something wrong, add a rule like 'Always mark emails from X as urgent' and it will follow that rule going forward." },
      { q: "Can I teach an agent new things?", a: "Yes. Add reference files to the agent's references/ folder, update the SKILL.md instructions, or expand your Knowledge Base. Agents use whatever context you provide." },
      { q: "Do agents improve over time automatically?", a: "Agents improve as Claude's underlying model improves (Anthropic releases updates). Individual agents don't automatically learn from their own outputs yet, but you can make them smarter by providing better context and instructions." },
      { q: "Can I see what an agent did?", a: "Yes. Claude Code shows the agent's output in the terminal. You can also configure agents to save their output to files for later review." },
    ],
  },
  {
    id: "channels",
    title: "Channels & Scheduling",
    icon: Radio,
    items: [
      { q: "How does Telegram/Slack delivery work?", a: "Connect Telegram or Slack through Claude Code's MCP system. When an agent runs, it sends the results to your chosen channel. It's one-way delivery — the agent pushes updates to you." },
      { q: "Can I schedule agents to run automatically?", a: "Yes. Use Claude Code's /schedule command to set up cron jobs. For example, email triage every morning at 7am, news briefing at 8am, competitor report every Monday." },
      { q: "Can I change the schedule later?", a: "Yes. Edit or delete the schedule anytime with /schedule in Claude Code. No reinstall needed." },
      { q: "What channels are supported?", a: "Telegram, Slack, and Email. More channels coming soon. Configuration happens during agent customization on OpenClaude." },
    ],
  },
  {
    id: "costs",
    title: "Costs & Plans",
    icon: CreditCard,
    items: [
      { q: "Is OpenClaude free?", a: "Yes. The platform and all current pre-built agents are free. You only need a Claude Max subscription ($20/month) for agents to run. Agent execution uses your existing subscription." },
      { q: "How much does it cost to run agents daily?", a: "It depends on the agent. A simple news briefing costs about $0.10-0.30 per run. Email triage with 50 emails costs about $0.20-0.50. Most daily use fits well within the Max subscription limits." },
      { q: "Will there be premium agents?", a: "Yes, we're planning premium agents ($5-10 each) for specialized use cases — legal document review, financial analysis, advanced sales workflows. Free agents will always be available." },
      { q: "Are there any hidden costs?", a: "No. OpenClaude is free. Your only cost is the Claude Max subscription you already have. If you approach token limits with heavy agent use, Anthropic's usage-based pricing applies." },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: Wrench,
    items: [
      { q: "My agent isn't working. What should I do?", a: "Check Claude Code's terminal output for error messages. Common issues: MCP connection not set up (run /mcp), SKILL.md has a typo, or the agent is trying to access something it doesn't have permission for." },
      { q: "How do I reset an agent?", a: "Delete the ~/.claude/skills/[agent-name]/ folder and reinstall from OpenClaude. Or just edit the SKILL.md file to fix the issue." },
      { q: "How do I uninstall an agent?", a: "Delete the folder: rm -rf ~/.claude/skills/[agent-name]/ — that's it. No cleanup needed." },
      { q: "My MCP connection stopped working.", a: "Re-run /mcp in Claude Code and reconnect the service. This can happen if you changed your password, revoked permissions, or if the auth token expired." },
      { q: "How do I report a bug?", a: "Visit github.com/vonhanno/openclaude and open an issue. Include the error message and which agent you're using." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Accordion component                                                        */
/* -------------------------------------------------------------------------- */

function FaqAccordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-[#4A7DFF]"
      >
        <span className="pr-4 text-[15px] font-medium text-[#1A1A1A]">{item.q}</span>
        <ChevronDown
          size={16}
          className={cn(
            "flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-40 pb-4" : "max-h-0"
        )}
      >
        <p className="text-sm leading-relaxed text-muted-foreground pr-8">{item.a}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isChatting, setIsChatting] = useState(false);

  // Filter FAQ items by search
  const filteredCategories = FAQ_DATA.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !searchQuery ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  // Simple chat — search FAQ for answer
  const handleChat = () => {
    if (!chatMessage.trim()) return;
    setIsChatting(true);

    const query = chatMessage.toLowerCase();
    let bestMatch: FaqItem | null = null;
    let bestScore = 0;

    for (const cat of FAQ_DATA) {
      for (const item of cat.items) {
        const words = query.split(" ").filter((w) => w.length > 2);
        const matchCount = words.filter(
          (w) =>
            item.q.toLowerCase().includes(w) ||
            item.a.toLowerCase().includes(w)
        ).length;
        if (matchCount > bestScore) {
          bestScore = matchCount;
          bestMatch = item;
        }
      }
    }

    setTimeout(() => {
      if (bestMatch && bestScore > 0) {
        setChatResponse(bestMatch.a);
      } else {
        setChatResponse(
          "I don't have a specific answer for that yet. Try browsing the FAQ sections below, or check our GitHub for more help: github.com/vonhanno/openclaude"
        );
      }
      setIsChatting(false);
      setChatMessage("");
    }, 800);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#1A1A1A]"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Home
      </Link>

      <h1 className="text-3xl font-bold text-[#1A1A1A]">
        Frequently Asked Questions
      </h1>
      <p className="mt-2 text-muted-foreground">
        Everything you need to know about OpenClaude.
      </p>

      {/* Mascot chat */}
      <div className="mt-8 rounded-2xl border border-border/60 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-start gap-3">
          <MiniMascot variant="email-triage" size={44} />
          <div className="flex-1">
            <p className="text-sm font-medium text-[#1A1A1A]">
              Ask me anything
            </p>
            <p className="text-xs text-muted-foreground">
              I&apos;ll find the answer from our FAQ
            </p>
          </div>
        </div>

        {chatResponse && (
          <div className="mt-4 rounded-xl bg-[#F7F5F0] px-4 py-3">
            <p className="text-sm leading-relaxed text-[#1A1A1A]">{chatResponse}</p>
          </div>
        )}

        <div className="mt-3 flex gap-2">
          <Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChat()}
            placeholder="How does data storage work?"
            className="rounded-xl"
          />
          <Button
            size="icon"
            onClick={handleChat}
            disabled={!chatMessage.trim() || isChatting}
            className="rounded-xl flex-shrink-0"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-8 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="rounded-xl pl-9"
        />
      </div>

      {/* FAQ sections */}
      <div className="mt-10 space-y-10">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-4">
                <Icon size={18} className="text-[#4A7DFF]" />
                <h2 className="text-lg font-semibold text-[#1A1A1A]">
                  {cat.title}
                </h2>
                <span className="text-xs text-muted-foreground">
                  ({cat.items.length})
                </span>
              </div>
              <div className="rounded-xl border border-border/60 bg-white px-5">
                {cat.items.map((item, i) => (
                  <FaqAccordion key={i} item={item} />
                ))}
              </div>
            </section>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
