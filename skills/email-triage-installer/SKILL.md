---
name: email-triage-installer
description: Install and configure an Email Triage Agent that summarizes unread emails, flags urgent items, and delivers daily digests. This skill should be used when a user wants to set up email triage, email summary, inbox management, or email prioritization automation. Triggers on "install email triage", "set up email agent", "email summary agent", or "triage my inbox".
---

# Email Triage Agent Installer

## Overview

This skill creates a fully configured Email Triage Agent that connects to Gmail, triages unread emails by priority, and delivers a structured summary. The installer walks through each step interactively, asking questions to customize the agent to the user's needs.

## Installation Workflow

Follow these steps in order. Ask the user each question and wait for their response before proceeding.

### Step 1: Gather Preferences

Ask the user these questions one at a time using AskUserQuestion:

1. "Who are your VIP senders? (People whose emails should always be flagged as urgent — e.g., boss name, key clients)"
2. "What keywords should always be flagged as urgent? (e.g., deadline, invoice, payment, ASAP)"
3. "How many days back should the triage cover? (e.g., 1 for today only, 3 for last 3 days)"
4. "Where should I deliver the summary?" — Options: "Terminal only", "Telegram", "Slack", "Email"
5. "How often should this agent run?" — Options: "Every morning at 7:00", "Twice a day (7:00 & 17:00)", "Every hour", "Manual only"

Store all answers for use in the following steps.

### Step 2: Create the Skill Directory

Run this command:

```bash
mkdir -p ~/.claude/skills/email-triage
```

### Step 3: Write the SKILL.md File

Create the file `~/.claude/skills/email-triage/SKILL.md` with the following content, inserting the user's preferences where indicated:

```markdown
---
name: email-triage
description: Triage unread emails — summarize, prioritize, extract action items. Use when asked to check email, summarize inbox, or triage messages.
---

# Email Triage Agent

## Purpose
Summarize unread emails, flag urgent items, and extract action items with deadlines.

## Process
1. Use the Gmail MCP to search for unread emails: `gmail_search_messages` with query `is:unread`
2. For each email, read the full message using `gmail_read_message`
3. Categorize each email into: URGENT, ACTION NEEDED, FYI, or LOW PRIORITY
4. Extract any deadlines, meeting requests, or explicit asks
5. Generate a prioritized summary digest

## Priority Rules
- VIP senders (always urgent): {{VIP_SENDERS}}
- Urgent keywords: {{URGENT_KEYWORDS}}
- Time range: Last {{DAYS_BACK}} day(s)

## Output Format

### 🔴 Urgent (Respond Today)
- [Sender] Subject — one-line summary. **Action:** what to do. **Deadline:** if any

### 🟡 Action Needed (This Week)
- [Sender] Subject — one-line summary. **Action:** what to do

### 📋 FYI (Read When Free)
- [Sender] Subject — one-line summary

### Summary Stats
- Total unread: X
- Urgent: X | Action needed: X | FYI: X
- Oldest unread: date

## Rules
- Never mark emails as read unless explicitly asked
- Never send replies unless explicitly asked
- Flag anything from VIP senders or with urgent keywords as URGENT
- Group related email threads together
- Keep summaries to one line per email
```

Replace `{{VIP_SENDERS}}`, `{{URGENT_KEYWORDS}}`, and `{{DAYS_BACK}}` with the user's actual answers from Step 1.

### Step 4: Connect Gmail MCP

Check if Gmail MCP is already connected by looking at the available MCP tools. If not connected, tell the user:

"Gmail is not connected yet. To connect it:"
1. Run `/mcp` in this terminal
2. Find 'Gmail' in the list
3. Click 'Connect' and approve in the browser popup
4. Come back here when done

Wait for the user to confirm Gmail is connected before proceeding.

### Step 5: Set Up Delivery Channel (if not Terminal only)

If the user chose Telegram:
- Tell them: "To deliver summaries via Telegram, connect the Telegram MCP. Run `/mcp`, find 'Telegram', and follow the setup."

If the user chose Slack:
- Tell them: "To deliver summaries via Slack, connect the Slack MCP. Run `/mcp`, find 'Slack', and authorize your workspace."

Wait for confirmation before proceeding.

### Step 6: Set Up Schedule (if not Manual only)

If the user chose a schedule, create a scheduled trigger:

For "Every morning at 7:00":
```bash
claude /schedule create --cron "0 7 * * *" --prompt "Run email triage: Triage my unread emails, summarize each one, flag urgent items, and list action items."
```

For "Twice a day":
```bash
claude /schedule create --cron "0 7,17 * * *" --prompt "Run email triage: Triage my unread emails, summarize each one, flag urgent items, and list action items."
```

For "Every hour":
```bash
claude /schedule create --cron "0 * * * *" --prompt "Run email triage: Triage my unread emails, summarize each one, flag urgent items, and list action items."
```

### Step 7: Test the Agent

Run a test to verify everything works:

```
Triage my unread emails. Summarize each one, flag urgent items, and list action items.
```

Show the user the results and ask: "Does this look right? Would you like to adjust any of the settings?"

### Step 8: Confirm Installation

When the test passes, tell the user:

"✅ Your Email Triage Agent is installed and ready!

Here's what's set up:
- Skill: ~/.claude/skills/email-triage/SKILL.md
- Gmail: Connected
- Delivery: [their choice]
- Schedule: [their choice]

To run it anytime, just say: 'Triage my emails'
To modify settings, edit ~/.claude/skills/email-triage/SKILL.md"
