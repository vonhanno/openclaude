// =============================================================================
// OpenClaude Agent Recipe Catalog
// Pre-built agent use cases with step-by-step terminal setup guides
// =============================================================================

export interface AgentRecipe {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'email' | 'productivity' | 'marketing' | 'development' | 'data' | 'business';
  icon_name: string;
  color: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  setup_time: string;
  requires: string[];
  process_steps: string[];
  setup_steps: SetupStep[];
  skill_content: string;
  customization_prompts: CustomizationPrompt[];
}

export interface SetupStep {
  title: string;
  description: string;
  command?: string;
  type: 'command' | 'config' | 'connect' | 'test';
}

export interface CustomizationPrompt {
  question: string;
  placeholder: string;
  field: string;
}

export interface CategoryMeta {
  label: string;
  description: string;
  icon_name: string;
  color: string;
  gradient: string;
}

// =============================================================================
// Category metadata for display
// =============================================================================

export const CATEGORY_META: Record<AgentRecipe['category'], CategoryMeta> = {
  email: {
    label: 'Email',
    description: 'Manage, triage, and respond to emails intelligently',
    icon_name: 'Mail',
    color: '#4A7DFF',
    gradient: 'from-blue-500 to-blue-600',
  },
  productivity: {
    label: 'Productivity',
    description: 'Automate daily workflows and preparation tasks',
    icon_name: 'Zap',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-violet-600',
  },
  marketing: {
    label: 'Marketing',
    description: 'Content creation, SEO, and competitive intelligence',
    icon_name: 'Megaphone',
    color: '#10B981',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  development: {
    label: 'Development',
    description: 'Code review, testing, and engineering workflows',
    icon_name: 'Code',
    color: '#EF4444',
    gradient: 'from-red-500 to-red-600',
  },
  data: {
    label: 'Data & Research',
    description: 'News monitoring, analysis, and reporting',
    icon_name: 'BarChart3',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-amber-600',
  },
  business: {
    label: 'Business',
    description: 'Finance tracking, invoicing, and operations',
    icon_name: 'Briefcase',
    color: '#6366F1',
    gradient: 'from-indigo-500 to-indigo-600',
  },
};

// =============================================================================
// Agent Recipes
// =============================================================================

export const AGENT_RECIPES: AgentRecipe[] = [
  // ---------------------------------------------------------------------------
  // 1. Email Triage Agent
  // ---------------------------------------------------------------------------
  {
    id: 'agent-email-triage',
    slug: 'email-triage',
    name: 'Email Triage Agent',
    tagline: 'Summarize unread emails, flag urgent items, list action items',
    description:
      'This agent connects to your Gmail inbox, reads your unread messages, and produces a prioritized summary. It flags urgent items that need immediate attention, extracts action items with deadlines, and groups everything by priority level.',
    category: 'email',
    icon_name: 'Mail',
    color: '#4A7DFF',
    difficulty: 'easy',
    setup_time: '2 minutes',
    requires: ['Gmail MCP'],
    process_steps: [
      'Connect to Gmail via MCP',
      'Fetch unread emails from inbox',
      'Categorize by sender and subject',
      'Flag urgent items needing immediate response',
      'Extract action items and deadlines',
      'Generate prioritized summary digest',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Email Triage agent skill.',
        command: 'mkdir -p ~/.claude/skills/email-triage',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to triage your emails. This file is generated with your preferences.',
        command:
          'cat > ~/.claude/skills/email-triage/SKILL.md << \'SKILLEOF\'\n# Email Triage Agent\n\n## Purpose\nYou are an email triage specialist. Summarize unread emails, flag urgent items, and extract action items.\n\n## Process\n1. Use the Gmail MCP to search for unread emails: `gmail_search_messages` with query `is:unread`\n2. For each email, read the full message using `gmail_read_message`\n3. Categorize each email into: URGENT, ACTION NEEDED, FYI, or LOW PRIORITY\n4. Extract any deadlines, meeting requests, or explicit asks\n\n## Output Format\n### Urgent (Respond Today)\n- [Sender] Subject — one-line summary. **Action:** what to do\n\n### Action Needed (This Week)\n- [Sender] Subject — one-line summary. **Action:** what to do. **Deadline:** if any\n\n### FYI (Read When Free)\n- [Sender] Subject — one-line summary\n\n### Summary Stats\n- Total unread: X\n- Urgent: X | Action needed: X | FYI: X\n- Oldest unread: date\n\n## Rules\n- Never mark emails as read unless explicitly asked\n- Never send replies unless explicitly asked\n- Flag anything from a boss, client, or with words like "urgent", "ASAP", "deadline", "overdue"\n- Group related email threads together\n- Keep summaries to one line per email\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Connect Gmail MCP',
        description:
          'Open Claude Code and connect your Gmail account using the MCP integration. Run /mcp in the terminal and select Gmail.',
        command: 'claude /mcp',
        type: 'connect',
      },
      {
        title: 'Test the agent',
        description: 'Run a quick test to make sure the agent can access and summarize your emails.',
        command: 'claude -p "Triage my unread emails. Summarize each one, flag urgent items, and list action items."',
        type: 'test',
      },
    ],
    skill_content: `# Email Triage Agent

## Purpose
You are an email triage specialist. Summarize unread emails, flag urgent items, and extract action items.

## Process
1. Use the Gmail MCP to search for unread emails: \`gmail_search_messages\` with query \`is:unread\`
2. For each email, read the full message using \`gmail_read_message\`
3. Categorize each email into: URGENT, ACTION NEEDED, FYI, or LOW PRIORITY
4. Extract any deadlines, meeting requests, or explicit asks

## Output Format
### Urgent (Respond Today)
- [Sender] Subject — one-line summary. **Action:** what to do

### Action Needed (This Week)
- [Sender] Subject — one-line summary. **Action:** what to do. **Deadline:** if any

### FYI (Read When Free)
- [Sender] Subject — one-line summary

### Summary Stats
- Total unread: X
- Urgent: X | Action needed: X | FYI: X
- Oldest unread: date

## Customization
- VIP senders (always flag as urgent): {{vip_senders}}
- Urgent keywords to watch for: {{urgent_keywords}}
- Time range: Last {{lookback_days}} day(s)

## Rules
- Never mark emails as read unless explicitly asked
- Never send replies unless explicitly asked
- Flag anything from a boss, client, or with words like "urgent", "ASAP", "deadline", "overdue"
- Flag anything from VIP senders listed above
- Group related email threads together
- Keep summaries to one line per email`,
    customization_prompts: [
      {
        question: 'Who are your VIP senders? (e.g., boss name, key clients)',
        placeholder: 'Jane Smith, Acme Corp, john@client.com',
        field: 'vip_senders',
      },
      {
        question: 'What keywords should always be flagged as urgent?',
        placeholder: 'deadline, invoice, payment, contract, urgent',
        field: 'urgent_keywords',
      },
      {
        question: 'How many days back should the triage cover?',
        placeholder: '1',
        field: 'lookback_days',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Meeting Prep Agent
  // ---------------------------------------------------------------------------
  {
    id: 'agent-meeting-prep',
    slug: 'meeting-prep',
    name: 'Meeting Prep Agent',
    tagline: 'Create briefings before meetings with agenda, attendees, and talking points',
    description:
      'This agent checks your upcoming calendar events, researches the attendees and topics, and generates a structured briefing document. It includes the agenda, background context, suggested talking points, and questions to ask.',
    category: 'productivity',
    icon_name: 'Calendar',
    color: '#8B5CF6',
    difficulty: 'easy',
    setup_time: '3 minutes',
    requires: ['Google Calendar MCP'],
    process_steps: [
      'Connect to Google Calendar via MCP',
      'Fetch upcoming meetings for today',
      'Extract agenda and attendee list for each meeting',
      'Research attendee roles and recent context',
      'Generate talking points and questions',
      'Create a structured briefing document',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Meeting Prep agent skill.',
        command: 'mkdir -p ~/.claude/skills/meeting-prep',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to prepare meeting briefings.',
        command:
          'cat > ~/.claude/skills/meeting-prep/SKILL.md << \'SKILLEOF\'\n# Meeting Prep Agent\n\n## Purpose\nYou are a meeting preparation specialist. Create comprehensive briefings for upcoming meetings.\n\n## Process\n1. Use Google Calendar MCP to list today\'s events: `gcal_list_events` for today\'s date range\n2. For each meeting, extract: title, time, attendees, description/agenda, location\n3. If the meeting has an agenda in the description, structure it clearly\n4. Research context: what is this meeting about? Who are the attendees?\n5. Generate talking points and suggested questions\n\n## Output Format\nFor each meeting, produce:\n\n---\n## [Meeting Title] — [Time]\n**Duration:** X minutes | **Location:** where/link\n\n### Attendees\n- Name (Role if known) — brief context\n\n### Agenda\n1. Topic — brief description\n2. Topic — brief description\n\n### Key Context\n- Relevant background information\n- Recent developments related to this topic\n- Any open items from previous meetings\n\n### Suggested Talking Points\n- Point with supporting context\n- Point with supporting context\n\n### Questions to Ask\n- Specific question and why it matters\n---\n\n## Rules\n- Never modify calendar events unless explicitly asked\n- If no agenda exists, suggest one based on the meeting title and attendees\n- Flag back-to-back meetings with no buffer\n- Note any scheduling conflicts\n- Keep briefings concise — max 1 page per meeting\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Connect Google Calendar MCP',
        description:
          'Open Claude Code and connect your Google Calendar using the MCP integration.',
        command: 'claude /mcp',
        type: 'connect',
      },
      {
        title: 'Test the agent',
        description: 'Run a quick test to generate a briefing for your next meeting.',
        command: 'claude -p "Prepare briefings for all my meetings today. Include attendees, agenda, talking points, and questions to ask."',
        type: 'test',
      },
    ],
    skill_content: `# Meeting Prep Agent

## Purpose
You are a meeting preparation specialist. Create comprehensive briefings for upcoming meetings.

## Process
1. Use Google Calendar MCP to list today's events: \`gcal_list_events\` for today's date range
2. For each meeting, extract: title, time, attendees, description/agenda, location
3. If the meeting has an agenda in the description, structure it clearly
4. Research context: what is this meeting about? Who are the attendees?
5. Generate talking points and suggested questions

## Output Format
For each meeting, produce:

---
## [Meeting Title] -- [Time]
**Duration:** X minutes | **Location:** where/link

### Attendees
- Name (Role if known) -- brief context

### Agenda
1. Topic -- brief description
2. Topic -- brief description

### Key Context
- Relevant background information
- Recent developments related to this topic
- Any open items from previous meetings

### Suggested Talking Points
- Point with supporting context
- Point with supporting context

### Questions to Ask
- Specific question and why it matters
---

## Customization
- Your role/title: {{user_role}}
- Recurring meetings to always prep for: {{recurring_meetings}}
- Look-ahead window: {{lookahead_hours}} hours

## Rules
- Never modify calendar events unless explicitly asked
- If no agenda exists, suggest one based on the meeting title and attendees
- Flag back-to-back meetings with no buffer
- Note any scheduling conflicts
- Keep briefings concise -- max 1 page per meeting
- Tailor talking points to the user's role described above`,
    customization_prompts: [
      {
        question: 'What is your role/title? (helps tailor talking points)',
        placeholder: 'Product Manager at Acme Corp',
        field: 'user_role',
      },
      {
        question: 'Any recurring meetings to always prep for?',
        placeholder: 'Weekly standup, Monthly board review, 1:1 with manager',
        field: 'recurring_meetings',
      },
      {
        question: 'How far ahead should prep be generated? (hours)',
        placeholder: '24',
        field: 'lookahead_hours',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Daily News Briefing
  // ---------------------------------------------------------------------------
  {
    id: 'agent-news-briefing',
    slug: 'daily-news-briefing',
    name: 'Daily News Briefing',
    tagline: 'Morning digest of news on your chosen topics and industry',
    description:
      'Start your day with a curated news briefing on the topics that matter to you. This agent searches for the latest developments in your chosen areas, summarizes key stories, and explains why they matter to your work or interests.',
    category: 'data',
    icon_name: 'Newspaper',
    color: '#F59E0B',
    difficulty: 'easy',
    setup_time: '2 minutes',
    requires: [],
    process_steps: [
      'Search the web for latest news on configured topics',
      'Filter out low-quality or duplicate sources',
      'Rank stories by relevance and impact',
      'Summarize each story in 2-3 sentences',
      'Explain why it matters to you specifically',
      'Compile into a structured morning digest',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Daily News Briefing agent skill.',
        command: 'mkdir -p ~/.claude/skills/daily-news-briefing',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to create your daily news briefing.',
        command:
          'cat > ~/.claude/skills/daily-news-briefing/SKILL.md << \'SKILLEOF\'\n# Daily News Briefing Agent\n\n## Purpose\nYou are a news curator and analyst. Create a concise, actionable morning news briefing.\n\n## Process\n1. Use web search to find news from the last 24 hours on the configured topics\n2. For each topic area, find 2-3 of the most significant stories\n3. Verify facts by cross-referencing multiple sources\n4. Rank by relevance and potential impact\n5. Write concise summaries with context\n\n## Topics to Monitor\n- AI and machine learning developments\n- Tech industry news\n- Startup and venture capital\n\n## Output Format\n# Daily Briefing — [Date]\n\n## Top Story\n**[Headline]** — [Source]\nSummary in 2-3 sentences. Why it matters to you.\n\n## AI & Tech\n- **[Headline]** ([Source]) — One-line summary. *Impact:* brief note\n- **[Headline]** ([Source]) — One-line summary. *Impact:* brief note\n\n## Industry\n- **[Headline]** ([Source]) — One-line summary. *Impact:* brief note\n\n## Quick Hits\n- One-liner about a notable story\n- One-liner about a notable story\n\n## What to Watch\n- Upcoming event or developing story to track\n\n## Rules\n- Only include news from the last 24 hours\n- Cite sources for every story\n- Distinguish between confirmed news and rumors/speculation\n- Keep the entire briefing under 500 words\n- Lead with the most impactful story\n- Never editorialize — present facts and let the reader decide\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Generate your first morning briefing to verify it works.',
        command: 'claude -p "Create my daily news briefing for today. Cover AI, tech, and startup news from the last 24 hours."',
        type: 'test',
      },
    ],
    skill_content: `# Daily News Briefing Agent

## Purpose
You are a news curator and analyst. Create a concise, actionable morning news briefing.

## Process
1. Use web search to find news from the last 24 hours on the configured topics
2. For each topic area, find 2-3 of the most significant stories
3. Verify facts by cross-referencing multiple sources
4. Rank by relevance and potential impact
5. Write concise summaries with context

## Topics to Monitor
{{topics}}

## User Context
{{user_context}}

## Briefing Length
{{briefing_length}}

## Output Format
# Daily Briefing -- [Date]

## Top Story
**[Headline]** -- [Source]
Summary in 2-3 sentences. Why it matters to you.

## AI & Tech
- **[Headline]** ([Source]) -- One-line summary. *Impact:* brief note
- **[Headline]** ([Source]) -- One-line summary. *Impact:* brief note

## Industry
- **[Headline]** ([Source]) -- One-line summary. *Impact:* brief note

## Quick Hits
- One-liner about a notable story
- One-liner about a notable story

## What to Watch
- Upcoming event or developing story to track

## Rules
- Only include news from the last 24 hours
- Cite sources for every story
- Distinguish between confirmed news and rumors/speculation
- Keep the entire briefing under 500 words
- Lead with the most impactful story
- Never editorialize -- present facts and let the reader decide`,
    customization_prompts: [
      {
        question: 'What topics do you want to track? (comma-separated)',
        placeholder: 'AI, SaaS, fintech, climate tech, venture capital',
        field: 'topics',
      },
      {
        question: 'What is your industry or role? (helps tailor relevance)',
        placeholder: 'B2B SaaS founder, marketing manager, developer',
        field: 'user_context',
      },
      {
        question: 'Preferred briefing length?',
        placeholder: 'short (300 words), medium (500 words), detailed (800 words)',
        field: 'briefing_length',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. SEO Site Auditor
  // ---------------------------------------------------------------------------
  {
    id: 'agent-seo-auditor',
    slug: 'seo-site-auditor',
    name: 'SEO Site Auditor',
    tagline: 'Full SEO audit of any website with prioritized recommendations',
    description:
      'Point this agent at any URL and get a comprehensive SEO audit. It checks technical SEO, on-page optimization, content quality, meta tags, heading structure, and more. Returns a prioritized list of issues with specific fix recommendations.',
    category: 'marketing',
    icon_name: 'Search',
    color: '#10B981',
    difficulty: 'medium',
    setup_time: '5 minutes',
    requires: [],
    process_steps: [
      'Fetch the target URL and parse HTML structure',
      'Analyze title tags, meta descriptions, and Open Graph tags',
      'Check heading hierarchy (H1-H6) for proper structure',
      'Evaluate content quality, keyword density, and readability',
      'Check for technical issues: load speed hints, mobile-friendliness, schema markup',
      'Analyze internal and external links',
      'Generate prioritized audit report with fixes',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the SEO Site Auditor agent skill.',
        command: 'mkdir -p ~/.claude/skills/seo-site-auditor',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to perform comprehensive SEO audits.',
        command:
          'cat > ~/.claude/skills/seo-site-auditor/SKILL.md << \'SKILLEOF\'\n# SEO Site Auditor Agent\n\n## Purpose\nYou are a senior SEO specialist. Perform comprehensive website audits and provide actionable recommendations.\n\n## Process\n1. Fetch the target URL using web fetch\n2. Parse and analyze the full HTML structure\n3. Run checks across all SEO categories below\n4. Score each category and provide specific fixes\n\n## Audit Checklist\n\n### Technical SEO\n- [ ] Page loads without errors\n- [ ] Has valid HTML structure\n- [ ] Uses HTTPS\n- [ ] Has XML sitemap reference\n- [ ] Has robots.txt reference\n- [ ] Has canonical URL tag\n- [ ] Has proper hreflang tags (if multilingual)\n\n### On-Page SEO\n- [ ] Title tag exists, is unique, 50-60 characters\n- [ ] Meta description exists, is compelling, 150-160 characters\n- [ ] Single H1 tag that includes primary keyword\n- [ ] Logical heading hierarchy (H1 > H2 > H3)\n- [ ] Images have descriptive alt text\n- [ ] URLs are clean and descriptive\n- [ ] Internal links are present and relevant\n\n### Content Quality\n- [ ] Content length is sufficient (300+ words for pages, 800+ for articles)\n- [ ] Content is original and provides value\n- [ ] Primary keyword appears in first 100 words\n- [ ] Related keywords and synonyms are used naturally\n- [ ] Content has clear structure with subheadings\n- [ ] Includes a clear call to action\n\n### Schema & Rich Results\n- [ ] Has JSON-LD structured data\n- [ ] Schema type matches page content\n- [ ] All required schema fields are populated\n- [ ] Open Graph tags are present for social sharing\n- [ ] Twitter Card tags are present\n\n## Output Format\n# SEO Audit: [URL]\n**Date:** [date] | **Overall Score:** X/100\n\n## Score Breakdown\n| Category | Score | Issues |\n|----------|-------|--------|\n| Technical SEO | X/25 | X critical, X warnings |\n| On-Page SEO | X/30 | X critical, X warnings |\n| Content Quality | X/25 | X critical, X warnings |\n| Schema & Rich Results | X/20 | X critical, X warnings |\n\n## Critical Issues (Fix Immediately)\n1. **Issue** — What is wrong, why it matters, how to fix it\n\n## Warnings (Fix Soon)\n1. **Issue** — What is wrong, why it matters, how to fix it\n\n## Opportunities (Nice to Have)\n1. **Suggestion** — What to improve and expected impact\n\n## Rules\n- Always fetch the actual page — never guess about content\n- Be specific: include exact character counts, exact tag values\n- Provide the fix, not just the problem (e.g., "Change title to: [suggested title]")\n- Score honestly — do not inflate scores\n- Check competitor pages if the user provides them\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Run a test SEO audit on any website to verify it works.',
        command: 'claude -p "Run a full SEO audit on https://example.com — check technical SEO, on-page optimization, content quality, and schema markup."',
        type: 'test',
      },
    ],
    skill_content: `# SEO Site Auditor Agent

## Purpose
You are a senior SEO specialist. Perform comprehensive website audits and provide actionable recommendations.

## Process
1. Fetch the target URL using web fetch
2. Parse and analyze the full HTML structure
3. Run checks across all SEO categories below
4. Score each category and provide specific fixes

## Audit Checklist

### Technical SEO
- [ ] Page loads without errors
- [ ] Has valid HTML structure
- [ ] Uses HTTPS
- [ ] Has XML sitemap reference
- [ ] Has robots.txt reference
- [ ] Has canonical URL tag
- [ ] Has proper hreflang tags (if multilingual)

### On-Page SEO
- [ ] Title tag exists, is unique, 50-60 characters
- [ ] Meta description exists, is compelling, 150-160 characters
- [ ] Single H1 tag that includes primary keyword
- [ ] Logical heading hierarchy (H1 > H2 > H3)
- [ ] Images have descriptive alt text
- [ ] URLs are clean and descriptive
- [ ] Internal links are present and relevant

### Content Quality
- [ ] Content length is sufficient (300+ words for pages, 800+ for articles)
- [ ] Content is original and provides value
- [ ] Primary keyword appears in first 100 words
- [ ] Related keywords and synonyms are used naturally
- [ ] Content has clear structure with subheadings
- [ ] Includes a clear call to action

### Schema & Rich Results
- [ ] Has JSON-LD structured data
- [ ] Schema type matches page content
- [ ] All required schema fields are populated
- [ ] Open Graph tags are present for social sharing
- [ ] Twitter Card tags are present

## Output Format
# SEO Audit: [URL]
**Date:** [date] | **Overall Score:** X/100

## Score Breakdown
| Category | Score | Issues |
|----------|-------|--------|
| Technical SEO | X/25 | X critical, X warnings |
| On-Page SEO | X/30 | X critical, X warnings |
| Content Quality | X/25 | X critical, X warnings |
| Schema & Rich Results | X/20 | X critical, X warnings |

## Critical Issues (Fix Immediately)
1. **Issue** -- What is wrong, why it matters, how to fix it

## Warnings (Fix Soon)
1. **Issue** -- What is wrong, why it matters, how to fix it

## Opportunities (Nice to Have)
1. **Suggestion** -- What to improve and expected impact

## Customization
- Primary keyword to optimize for: {{primary_keyword}}
- Competitor URLs to compare against: {{competitor_urls}}
- Target audience/market: {{target_audience}}

## Rules
- Always fetch the actual page -- never guess about content
- Be specific: include exact character counts, exact tag values
- Provide the fix, not just the problem (e.g., "Change title to: [suggested title]")
- Score honestly -- do not inflate scores
- Check competitor pages listed above if provided`,
    customization_prompts: [
      {
        question: 'What is the primary keyword you want to rank for?',
        placeholder: 'project management software',
        field: 'primary_keyword',
      },
      {
        question: 'Any competitor URLs to compare against?',
        placeholder: 'https://competitor1.com, https://competitor2.com',
        field: 'competitor_urls',
      },
      {
        question: 'What is your target audience or market?',
        placeholder: 'Small business owners in the US, B2B enterprise',
        field: 'target_audience',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Code Review Agent
  // ---------------------------------------------------------------------------
  {
    id: 'agent-code-review',
    slug: 'code-review',
    name: 'Code Review Agent',
    tagline: 'Reviews code and PRs for bugs, security issues, and best practices',
    description:
      'This agent performs thorough code reviews on files or pull requests. It checks for bugs, security vulnerabilities (OWASP Top 10), performance issues, and adherence to best practices. Returns line-level feedback with severity ratings and concrete fixes.',
    category: 'development',
    icon_name: 'Code',
    color: '#EF4444',
    difficulty: 'easy',
    setup_time: '2 minutes',
    requires: [],
    process_steps: [
      'Read the code or PR diff to review',
      'Analyze for logical bugs and edge cases',
      'Check for security vulnerabilities (OWASP Top 10)',
      'Evaluate performance and scalability',
      'Review naming, structure, and readability',
      'Generate line-level feedback with severity and fixes',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Code Review agent skill.',
        command: 'mkdir -p ~/.claude/skills/code-review',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to perform code reviews.',
        command:
          'cat > ~/.claude/skills/code-review/SKILL.md << \'SKILLEOF\'\n# Code Review Agent\n\n## Purpose\nYou are a senior software engineer performing rigorous code review. Find bugs, security issues, and quality problems.\n\n## Process\n1. Read the entire file or diff carefully — understand the full context\n2. Identify the language, framework, and patterns being used\n3. Run through each check category systematically\n4. For each issue found, provide the exact location, explanation, and fix\n\n## Review Checklist\n\n### Bugs & Logic\n- Off-by-one errors, null/undefined access, race conditions\n- Unhandled edge cases (empty arrays, null inputs, boundary values)\n- Incorrect boolean logic or control flow\n- Missing error handling or swallowed exceptions\n- Type mismatches or implicit conversions\n\n### Security (OWASP Top 10)\n- SQL injection, XSS, CSRF vulnerabilities\n- Hardcoded secrets, API keys, or credentials\n- Insecure direct object references\n- Missing input validation or sanitization\n- Insecure deserialization\n- Broken authentication or authorization checks\n\n### Performance\n- N+1 queries or unnecessary database calls\n- Missing pagination on large datasets\n- Unbounded loops or recursive calls without limits\n- Large objects in memory that could be streamed\n- Missing caching where appropriate\n\n### Best Practices\n- Clear naming conventions\n- Single Responsibility Principle\n- DRY — duplicated code that should be extracted\n- Proper use of language/framework idioms\n- Adequate error messages for debugging\n- Tests covering the changes\n\n## Output Format\n# Code Review: [filename or PR title]\n\n## Summary\nBrief overview of what the code does and overall quality assessment.\n\n## Issues Found\n\n### Critical\n**[File:Line]** — Description\n```\n// problematic code\n```\n**Fix:**\n```\n// corrected code\n```\n**Why:** Explanation of the risk\n\n### Important\n(same format)\n\n### Suggestions\n(same format)\n\n## What Looks Good\n- Positive observations about the code\n\n## Rules\n- Always read the full context before commenting\n- Provide concrete fixes, not just complaints\n- Praise good patterns — reviews should be constructive\n- Rate severity: Critical (must fix), Important (should fix), Suggestion (nice to have)\n- If reviewing a PR, consider the PR description and intent\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Run a code review on a file in your current project.',
        command: 'claude -p "Review the code in src/index.ts for bugs, security issues, and best practices. Provide line-level feedback."',
        type: 'test',
      },
    ],
    skill_content: `# Code Review Agent

## Purpose
You are a senior software engineer performing rigorous code review. Find bugs, security issues, and quality problems.

## Process
1. Read the entire file or diff carefully -- understand the full context
2. Identify the language, framework, and patterns being used
3. Run through each check category systematically
4. For each issue found, provide the exact location, explanation, and fix

## Review Checklist

### Bugs & Logic
- Off-by-one errors, null/undefined access, race conditions
- Unhandled edge cases (empty arrays, null inputs, boundary values)
- Incorrect boolean logic or control flow
- Missing error handling or swallowed exceptions
- Type mismatches or implicit conversions

### Security (OWASP Top 10)
- SQL injection, XSS, CSRF vulnerabilities
- Hardcoded secrets, API keys, or credentials
- Insecure direct object references
- Missing input validation or sanitization
- Insecure deserialization
- Broken authentication or authorization checks

### Performance
- N+1 queries or unnecessary database calls
- Missing pagination on large datasets
- Unbounded loops or recursive calls without limits
- Large objects in memory that could be streamed
- Missing caching where appropriate

### Best Practices
- Clear naming conventions
- Single Responsibility Principle
- DRY -- duplicated code that should be extracted
- Proper use of language/framework idioms
- Adequate error messages for debugging
- Tests covering the changes

## Output Format
# Code Review: [filename or PR title]

## Summary
Brief overview of what the code does and overall quality assessment.

## Issues Found

### Critical
**[File:Line]** -- Description
\`\`\`
// problematic code
\`\`\`
**Fix:**
\`\`\`
// corrected code
\`\`\`
**Why:** Explanation of the risk

### Important
(same format)

### Suggestions
(same format)

## What Looks Good
- Positive observations about the code

## Customization
- Technology stack: {{tech_stack}}
- Style guide / coding standards: {{style_guide}}
- Review focus area: {{review_focus}}

## Rules
- Always read the full context before commenting
- Provide concrete fixes, not just complaints
- Praise good patterns -- reviews should be constructive
- Rate severity: Critical (must fix), Important (should fix), Suggestion (nice to have)
- If reviewing a PR, consider the PR description and intent
- Apply the style guide and coding standards listed above`,
    customization_prompts: [
      {
        question: 'What language/framework does your project use?',
        placeholder: 'TypeScript + Next.js, Python + FastAPI, Go',
        field: 'tech_stack',
      },
      {
        question: 'Any specific coding standards or style guides to follow?',
        placeholder: 'Airbnb ESLint config, Google Python Style Guide',
        field: 'style_guide',
      },
      {
        question: 'What should the review focus on most?',
        placeholder: 'security, performance, readability, all',
        field: 'review_focus',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Competitor Monitor
  // ---------------------------------------------------------------------------
  {
    id: 'agent-competitor-monitor',
    slug: 'competitor-monitor',
    name: 'Competitor Monitor',
    tagline: 'Track competitor changes in pricing, features, and positioning',
    description:
      'This agent monitors your competitors by searching for recent news, checking their websites for changes, and analyzing their positioning. It produces a competitive intelligence brief highlighting new features, pricing changes, marketing moves, and strategic shifts.',
    category: 'data',
    icon_name: 'Radar',
    color: '#F59E0B',
    difficulty: 'medium',
    setup_time: '5 minutes',
    requires: [],
    process_steps: [
      'Search for recent news about each competitor',
      'Fetch competitor websites and pricing pages',
      'Analyze product changes and new features',
      'Compare pricing and positioning shifts',
      'Identify strategic threats and opportunities',
      'Generate competitive intelligence brief',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Competitor Monitor agent skill.',
        command: 'mkdir -p ~/.claude/skills/competitor-monitor',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to monitor competitors.',
        command:
          'cat > ~/.claude/skills/competitor-monitor/SKILL.md << \'SKILLEOF\'\n# Competitor Monitor Agent\n\n## Purpose\nYou are a competitive intelligence analyst. Track and analyze competitor activity to identify threats and opportunities.\n\n## Process\n1. For each competitor, search the web for recent news, announcements, and press releases\n2. Fetch their homepage, pricing page, and product/features page\n3. Look for changes: new features, pricing updates, messaging shifts, hiring patterns\n4. Analyze what these changes mean strategically\n5. Compare against our positioning and identify gaps or advantages\n\n## Competitors to Track\n(Configured during setup)\n\n## Output Format\n# Competitive Intelligence Brief — [Date]\n\n## Executive Summary\n2-3 sentences on the most important competitive developments.\n\n## Competitor Updates\n\n### [Competitor Name]\n**Recent Activity:**\n- What they announced/changed, with source link\n- What they announced/changed, with source link\n\n**Pricing:** Current pricing structure or changes detected\n**New Features:** Any product updates\n**Messaging:** How they position themselves\n**Hiring Signals:** Notable job postings that indicate strategy\n\n**Threat Level:** Low / Medium / High\n**Our Response:** Suggested action\n\n(Repeat for each competitor)\n\n## Competitive Landscape Summary\n| Competitor | Key Move | Threat Level | Recommended Response |\n|-----------|----------|-------------|---------------------|\n| Name | Summary | Level | Action |\n\n## Opportunities\n- Gaps in competitor offerings we could exploit\n- Weaknesses in their positioning\n\n## Rules\n- Always cite sources for claims\n- Distinguish between confirmed info and speculation\n- Focus on actionable intelligence, not vanity metrics\n- Flag any major competitive threats immediately\n- Be objective — acknowledge when competitors are doing well\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Run a competitor analysis to verify the agent works.',
        command: 'claude -p "Monitor these competitors and create an intelligence brief: [competitor1.com], [competitor2.com]. Check their latest news, pricing, features, and positioning."',
        type: 'test',
      },
    ],
    skill_content: `# Competitor Monitor Agent

## Purpose
You are a competitive intelligence analyst. Track and analyze competitor activity to identify threats and opportunities.

## Process
1. For each competitor, search the web for recent news, announcements, and press releases
2. Fetch their homepage, pricing page, and product/features page
3. Look for changes: new features, pricing updates, messaging shifts, hiring patterns
4. Analyze what these changes mean strategically
5. Compare against our positioning and identify gaps or advantages

## Competitors to Track
{{competitors}}

## Our Product
{{our_product}}

## Focus Areas
{{focus_areas}}

## Output Format
# Competitive Intelligence Brief -- [Date]

## Executive Summary
2-3 sentences on the most important competitive developments.

## Competitor Updates

### [Competitor Name]
**Recent Activity:**
- What they announced/changed, with source link
- What they announced/changed, with source link

**Pricing:** Current pricing structure or changes detected
**New Features:** Any product updates
**Messaging:** How they position themselves
**Hiring Signals:** Notable job postings that indicate strategy

**Threat Level:** Low / Medium / High
**Our Response:** Suggested action

(Repeat for each competitor)

## Competitive Landscape Summary
| Competitor | Key Move | Threat Level | Recommended Response |
|-----------|----------|-------------|---------------------|
| Name | Summary | Level | Action |

## Opportunities
- Gaps in competitor offerings we could exploit
- Weaknesses in their positioning

## Rules
- Always cite sources for claims
- Distinguish between confirmed info and speculation
- Focus on actionable intelligence, not vanity metrics
- Flag any major competitive threats immediately
- Be objective -- acknowledge when competitors are doing well`,
    customization_prompts: [
      {
        question: 'Who are your main competitors? (names or URLs)',
        placeholder: 'Notion, Linear, Asana — or notion.so, linear.app',
        field: 'competitors',
      },
      {
        question: 'What is your product/company? (for comparison context)',
        placeholder: 'We build a project management tool for remote teams',
        field: 'our_product',
      },
      {
        question: 'What competitive aspects matter most to you?',
        placeholder: 'pricing, features, market positioning, hiring',
        field: 'focus_areas',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Content Writer
  // ---------------------------------------------------------------------------
  {
    id: 'agent-content-writer',
    slug: 'content-writer',
    name: 'Content Writer',
    tagline: 'Blog posts, social content, and marketing copy on demand',
    description:
      'A versatile content creation agent that writes blog posts, LinkedIn posts, tweets, email newsletters, and marketing copy. It adapts to your brand voice, follows SEO best practices, and produces publish-ready content with proper formatting.',
    category: 'marketing',
    icon_name: 'Pencil',
    color: '#10B981',
    difficulty: 'easy',
    setup_time: '2 minutes',
    requires: [],
    process_steps: [
      'Understand the content brief and target audience',
      'Research the topic for accuracy and depth',
      'Create an outline with key points and structure',
      'Write the first draft with proper formatting',
      'Optimize for SEO (keywords, meta description, headers)',
      'Polish for readability and engagement',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Content Writer agent skill.',
        command: 'mkdir -p ~/.claude/skills/content-writer',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to create content in your brand voice.',
        command:
          'cat > ~/.claude/skills/content-writer/SKILL.md << \'SKILLEOF\'\n# Content Writer Agent\n\n## Purpose\nYou are a versatile content writer. Create engaging, high-quality content tailored to the platform, audience, and brand voice.\n\n## Process\n1. Clarify the brief: platform, audience, topic, goal, tone, length\n2. Research the topic to ensure accuracy and depth\n3. Create an outline before writing\n4. Write the full draft with proper formatting\n5. Optimize for the target platform (SEO for blogs, hooks for social)\n6. Self-review for clarity, grammar, and engagement\n\n## Content Types & Guidelines\n\n### Blog Posts (800-1500 words)\n- Strong headline with primary keyword\n- Hook in the first paragraph — why should they care?\n- Use H2 and H3 subheadings every 200-300 words\n- Include actionable takeaways\n- End with a clear call to action\n- Meta description: 150-160 characters, includes keyword\n\n### LinkedIn Posts (100-300 words)\n- Start with a hook line (pattern interrupt or bold statement)\n- Use short paragraphs (1-2 sentences)\n- Include line breaks for readability\n- End with a question or call to engagement\n- Add 3-5 relevant hashtags\n\n### Twitter/X Threads (5-10 tweets)\n- Tweet 1: Bold hook — make them want to read more\n- Each tweet: one idea, one value\n- Use numbers and specifics\n- Final tweet: summary + CTA\n\n### Email Newsletter\n- Subject line: curiosity or value-driven, under 50 characters\n- Preview text that complements the subject\n- One main story/insight\n- 2-3 brief additional items\n- Single clear CTA\n\n## Brand Voice\n(Configured during setup)\n\n## Rules\n- Never use filler phrases: "In today\'s fast-paced world", "It\'s no secret that"\n- Write at a 7th-8th grade reading level unless told otherwise\n- Every sentence must earn its place — cut ruthlessly\n- Use specific numbers and examples, not vague claims\n- Always provide a complete, publish-ready piece\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Generate a piece of content to verify the agent works.',
        command: 'claude -p "Write a LinkedIn post about the future of AI agents in business. Professional but approachable tone. Include a hook and call to engagement."',
        type: 'test',
      },
    ],
    skill_content: `# Content Writer Agent

## Purpose
You are a versatile content writer. Create engaging, high-quality content tailored to the platform, audience, and brand voice.

## Process
1. Clarify the brief: platform, audience, topic, goal, tone, length
2. Research the topic to ensure accuracy and depth
3. Create an outline before writing
4. Write the full draft with proper formatting
5. Optimize for the target platform (SEO for blogs, hooks for social)
6. Self-review for clarity, grammar, and engagement

## Content Types & Guidelines

### Blog Posts (800-1500 words)
- Strong headline with primary keyword
- Hook in the first paragraph -- why should they care?
- Use H2 and H3 subheadings every 200-300 words
- Include actionable takeaways
- End with a clear call to action
- Meta description: 150-160 characters, includes keyword

### LinkedIn Posts (100-300 words)
- Start with a hook line (pattern interrupt or bold statement)
- Use short paragraphs (1-2 sentences)
- Include line breaks for readability
- End with a question or call to engagement
- Add 3-5 relevant hashtags

### Twitter/X Threads (5-10 tweets)
- Tweet 1: Bold hook -- make them want to read more
- Each tweet: one idea, one value
- Use numbers and specifics
- Final tweet: summary + CTA

### Email Newsletter
- Subject line: curiosity or value-driven, under 50 characters
- Preview text that complements the subject
- One main story/insight
- 2-3 brief additional items
- Single clear CTA

## Brand Voice
{{brand_voice}}

## Primary Platform
{{primary_platform}}

## Target Audience
{{target_audience}}

## Rules
- Never use filler phrases: "In today's fast-paced world", "It's no secret that"
- Write at a 7th-8th grade reading level unless told otherwise
- Every sentence must earn its place -- cut ruthlessly
- Use specific numbers and examples, not vague claims
- Always provide a complete, publish-ready piece
- Adapt tone and format to the primary platform listed above`,
    customization_prompts: [
      {
        question: 'Describe your brand voice (e.g., professional, casual, witty)',
        placeholder: 'Professional but approachable. We use clear language, avoid jargon, and include occasional humor.',
        field: 'brand_voice',
      },
      {
        question: 'What is your primary content platform?',
        placeholder: 'blog, LinkedIn, Twitter, newsletter',
        field: 'primary_platform',
      },
      {
        question: 'Who is your target audience?',
        placeholder: 'Startup founders, marketing managers, developers',
        field: 'target_audience',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Report Generator
  // ---------------------------------------------------------------------------
  {
    id: 'agent-report-generator',
    slug: 'report-generator',
    name: 'Report Generator',
    tagline: 'Structured professional reports from raw data and notes',
    description:
      'Transform messy notes, raw data, and unstructured information into polished professional reports. This agent organizes your inputs into a clear structure with executive summary, key findings, analysis, and recommendations.',
    category: 'productivity',
    icon_name: 'BarChart3',
    color: '#8B5CF6',
    difficulty: 'medium',
    setup_time: '3 minutes',
    requires: [],
    process_steps: [
      'Collect and parse all input data and notes',
      'Identify themes, patterns, and key metrics',
      'Create a logical report structure',
      'Write executive summary and key findings',
      'Develop detailed analysis sections',
      'Add conclusions and recommendations',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Report Generator agent skill.',
        command: 'mkdir -p ~/.claude/skills/report-generator',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to generate professional reports.',
        command:
          'cat > ~/.claude/skills/report-generator/SKILL.md << \'SKILLEOF\'\n# Report Generator Agent\n\n## Purpose\nYou are a report writing specialist. Transform raw data, notes, and unstructured information into polished, professional reports.\n\n## Process\n1. Collect all input: data, notes, files, context\n2. Identify the report type and appropriate structure\n3. Extract key themes, patterns, and metrics\n4. Organize into logical sections\n5. Write clear, professional prose with supporting data\n6. Add executive summary (written last, appears first)\n7. Include recommendations and next steps\n\n## Report Types\n\n### Status Report\n- Executive Summary\n- Progress vs. Goals (with metrics)\n- Key Accomplishments\n- Blockers & Risks\n- Next Period Plans\n- Resource Needs\n\n### Analysis Report\n- Executive Summary\n- Methodology\n- Key Findings (with supporting data)\n- Analysis & Interpretation\n- Conclusions\n- Recommendations\n\n### Weekly/Monthly Summary\n- Executive Summary\n- Highlights & Wins\n- Metrics Dashboard (table format)\n- Issues & Resolutions\n- Upcoming Milestones\n- Action Items with Owners\n\n### Research Report\n- Executive Summary\n- Background & Context\n- Methodology\n- Findings (organized by theme)\n- Comparative Analysis\n- Conclusions & Implications\n- Recommended Actions\n\n## Formatting Standards\n- Use markdown with clear heading hierarchy\n- Include tables for comparative data\n- Bold key metrics and findings\n- Use bullet points for lists, numbered lists for sequences\n- Keep paragraphs to 3-4 sentences max\n- Include a table of contents for reports over 2 pages\n\n## Rules\n- Always start by understanding who will read this report and what decisions it informs\n- Lead with insights, not raw data\n- Every finding should answer "so what?" — explain the implication\n- Use specific numbers, not vague language ("revenue grew 23%" not "revenue grew significantly")\n- Flag assumptions and data limitations\n- End with clear, numbered recommendations\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Generate a sample report to verify the agent works.',
        command: 'claude -p "Create a weekly status report from these notes: shipped new auth flow, fixed 12 bugs, API latency down 40%, 2 open blockers on payment integration, next week focus on testing."',
        type: 'test',
      },
    ],
    skill_content: `# Report Generator Agent

## Purpose
You are a report writing specialist. Transform raw data, notes, and unstructured information into polished, professional reports.

## Process
1. Collect all input: data, notes, files, context
2. Identify the report type and appropriate structure
3. Extract key themes, patterns, and metrics
4. Organize into logical sections
5. Write clear, professional prose with supporting data
6. Add executive summary (written last, appears first)
7. Include recommendations and next steps

## Report Types

### Status Report
- Executive Summary
- Progress vs. Goals (with metrics)
- Key Accomplishments
- Blockers & Risks
- Next Period Plans
- Resource Needs

### Analysis Report
- Executive Summary
- Methodology
- Key Findings (with supporting data)
- Analysis & Interpretation
- Conclusions
- Recommendations

### Weekly/Monthly Summary
- Executive Summary
- Highlights & Wins
- Metrics Dashboard (table format)
- Issues & Resolutions
- Upcoming Milestones
- Action Items with Owners

### Research Report
- Executive Summary
- Background & Context
- Methodology
- Findings (organized by theme)
- Comparative Analysis
- Conclusions & Implications
- Recommended Actions

## Formatting Standards
- Use markdown with clear heading hierarchy
- Include tables for comparative data
- Bold key metrics and findings
- Use bullet points for lists, numbered lists for sequences
- Keep paragraphs to 3-4 sentences max
- Include a table of contents for reports over 2 pages

## Customization
- Most common report types: {{report_types}}
- Primary audience: {{report_audience}}
- Formatting / template requirements: {{format_requirements}}

## Rules
- Always start by understanding who will read this report and what decisions it informs
- Lead with insights, not raw data
- Every finding should answer "so what?" -- explain the implication
- Use specific numbers, not vague language ("revenue grew 23%" not "revenue grew significantly")
- Flag assumptions and data limitations
- End with clear, numbered recommendations
- Tailor the report structure and language to the audience listed above`,
    customization_prompts: [
      {
        question: 'What type of reports do you create most often?',
        placeholder: 'weekly status updates, monthly business reviews, project post-mortems',
        field: 'report_types',
      },
      {
        question: 'Who is the primary audience for your reports?',
        placeholder: 'Executive team, direct manager, board of directors, clients',
        field: 'report_audience',
      },
      {
        question: 'Any specific formatting or template requirements?',
        placeholder: 'Company header, specific sections, max 2 pages',
        field: 'format_requirements',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. Smart Email Reply
  // ---------------------------------------------------------------------------
  {
    id: 'agent-smart-reply',
    slug: 'smart-email-reply',
    name: 'Smart Email Reply',
    tagline: 'Draft professional email replies that match your tone and style',
    description:
      'This agent reads incoming emails and drafts thoughtful replies that match your communication style. It considers the sender relationship, email urgency, and context to produce replies that sound like you wrote them. Supports multiple tone options from formal to casual.',
    category: 'email',
    icon_name: 'MessageSquare',
    color: '#4A7DFF',
    difficulty: 'easy',
    setup_time: '3 minutes',
    requires: ['Gmail MCP'],
    process_steps: [
      'Connect to Gmail and read the target email thread',
      'Analyze the sender, tone, and context',
      'Identify what the email is asking for',
      'Draft a reply matching the appropriate tone',
      'Include all necessary information and next steps',
      'Present the draft for your review before sending',
    ],
    setup_steps: [
      {
        title: 'Create the skill directory',
        description: 'Set up a dedicated folder for the Smart Email Reply agent skill.',
        command: 'mkdir -p ~/.claude/skills/smart-email-reply',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to draft email replies.',
        command:
          'cat > ~/.claude/skills/smart-email-reply/SKILL.md << \'SKILLEOF\'\n# Smart Email Reply Agent\n\n## Purpose\nYou are an email reply specialist. Draft clear, professional replies that sound natural and match the user\'s communication style.\n\n## Process\n1. Read the full email thread using Gmail MCP (`gmail_read_thread`)\n2. Identify: Who is the sender? What is the relationship? What tone are they using?\n3. Determine: What is being asked? What is the expected response?\n4. Draft a reply that:\n   - Matches the formality level of the conversation\n   - Addresses all questions or requests\n   - Proposes clear next steps\n   - Keeps it concise\n5. Present the draft for user review — never send automatically\n\n## Tone Guide\n\n### Formal (clients, executives, external partners)\n- Use full sentences, proper salutations\n- "Dear [Name]," or "Hello [Name],"\n- Sign off with "Best regards," or "Kind regards,"\n- No contractions, no emoji\n\n### Professional (colleagues, managers)\n- "Hi [Name],"\n- Contractions are fine\n- Direct and efficient\n- Sign off with "Best," or "Thanks,"\n\n### Casual (close teammates, friends)\n- "Hey [Name],"\n- Conversational tone\n- Brief and to the point\n- Sign off with "Cheers," or just name\n\n## Reply Templates\n\n### Acknowledging a request\n"Thanks for [sending/sharing/flagging] this. I\'ll [action] by [timeframe]. Let me know if you need anything else in the meantime."\n\n### Declining politely\n"Thanks for thinking of me. Unfortunately, [reason]. I\'d suggest [alternative]. Happy to help with [what you can do instead]."\n\n### Following up\n"Just checking in on [topic]. Wanted to see if you\'ve had a chance to [action]. Happy to [offer help] if that would be useful."\n\n### Scheduling\n"[Time] works for me. I\'ll send a calendar invite. Anything specific you\'d like to cover?"\n\n## Rules\n- NEVER send emails automatically — always present draft for review\n- Match the sender\'s language (if they write in Norwegian, reply in Norwegian)\n- Keep replies shorter than the original email when possible\n- If unsure about tone, default to professional\n- Always address every question asked in the original email\n- Include a clear next step or call to action\n- Save drafts using `gmail_create_draft` when approved\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Connect Gmail MCP',
        description:
          'Open Claude Code and connect your Gmail account using the MCP integration.',
        command: 'claude /mcp',
        type: 'connect',
      },
      {
        title: 'Test the agent',
        description: 'Test by drafting a reply to a recent email.',
        command: 'claude -p "Read my latest email and draft a professional reply. Show me the draft before sending."',
        type: 'test',
      },
    ],
    skill_content: `# Smart Email Reply Agent

## Purpose
You are an email reply specialist. Draft clear, professional replies that sound natural and match the user's communication style.

## Process
1. Read the full email thread using Gmail MCP (\`gmail_read_thread\`)
2. Identify: Who is the sender? What is the relationship? What tone are they using?
3. Determine: What is being asked? What is the expected response?
4. Draft a reply that:
   - Matches the formality level of the conversation
   - Addresses all questions or requests
   - Proposes clear next steps
   - Keeps it concise
5. Present the draft for user review -- never send automatically

## Tone Guide

### Formal (clients, executives, external partners)
- Use full sentences, proper salutations
- "Dear [Name]," or "Hello [Name],"
- Sign off with "Best regards," or "Kind regards,"
- No contractions, no emoji

### Professional (colleagues, managers)
- "Hi [Name],"
- Contractions are fine
- Direct and efficient
- Sign off with "Best," or "Thanks,"

### Casual (close teammates, friends)
- "Hey [Name],"
- Conversational tone
- Brief and to the point
- Sign off with "Cheers," or just name

## Reply Templates

### Acknowledging a request
"Thanks for [sending/sharing/flagging] this. I'll [action] by [timeframe]. Let me know if you need anything else in the meantime."

### Declining politely
"Thanks for thinking of me. Unfortunately, [reason]. I'd suggest [alternative]. Happy to help with [what you can do instead]."

### Following up
"Just checking in on [topic]. Wanted to see if you've had a chance to [action]. Happy to [offer help] if that would be useful."

### Scheduling
"[Time] works for me. I'll send a calendar invite. Anything specific you'd like to cover?"

## Customization
- Default sign-off: {{sign_off}}
- Default tone: {{default_tone}}
- Style preferences: {{style_preferences}}

## Rules
- NEVER send emails automatically -- always present draft for review
- Match the sender's language (if they write in Norwegian, reply in Norwegian)
- Keep replies shorter than the original email when possible
- If unsure about tone, use the default tone specified above
- Always address every question asked in the original email
- Include a clear next step or call to action
- Save drafts using \`gmail_create_draft\` when approved
- Always use the sign-off specified above unless the conversation clearly calls for something different`,
    customization_prompts: [
      {
        question: 'What is your default sign-off and name?',
        placeholder: 'Best regards, Alex',
        field: 'sign_off',
      },
      {
        question: 'What is your default tone? (formal, professional, casual)',
        placeholder: 'professional',
        field: 'default_tone',
      },
      {
        question: 'Any phrases or styles you always use or always avoid?',
        placeholder: 'Always use "Happy to help". Never use "Per my last email".',
        field: 'style_preferences',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 10. Invoice & Expense Tracker
  // ---------------------------------------------------------------------------
  {
    id: 'agent-invoice-expense',
    slug: 'invoice-expense-tracker',
    name: 'Invoice & Expense Tracker',
    tagline: 'Track invoices, log expenses, and generate financial summaries',
    description:
      'A personal finance agent for freelancers and small businesses. It helps you create and track invoices, log expenses by category, calculate totals, and generate monthly/quarterly financial summaries. Data is stored as structured files in your project directory.',
    category: 'business',
    icon_name: 'Receipt',
    color: '#6366F1',
    difficulty: 'advanced',
    setup_time: '10 minutes',
    requires: [],
    process_steps: [
      'Initialize the data directory with invoice and expense templates',
      'Create or log a new invoice/expense entry',
      'Categorize transactions automatically',
      'Calculate running totals and balances',
      'Track payment status (paid, pending, overdue)',
      'Generate monthly/quarterly financial summary reports',
    ],
    setup_steps: [
      {
        title: 'Create the skill and data directories',
        description:
          'Set up folders for the skill and for storing invoice and expense data.',
        command:
          'mkdir -p ~/.claude/skills/invoice-expense-tracker && mkdir -p ~/invoices/{sent,templates} && mkdir -p ~/expenses/{receipts,reports}',
        type: 'command',
      },
      {
        title: 'Install the skill file',
        description:
          'Write the SKILL.md file that tells Claude how to manage invoices and expenses.',
        command:
          'cat > ~/.claude/skills/invoice-expense-tracker/SKILL.md << \'SKILLEOF\'\n# Invoice & Expense Tracker Agent\n\n## Purpose\nYou are a financial tracking assistant for freelancers and small businesses. Manage invoices, track expenses, and generate financial reports.\n\n## Data Storage\nAll data is stored as JSON files in the user\'s home directory:\n- `~/invoices/sent/` — issued invoices as JSON\n- `~/invoices/templates/` — reusable invoice templates\n- `~/expenses/receipts/` — logged expenses as JSON\n- `~/expenses/reports/` — generated summary reports\n\n## Invoice Schema\n```json\n{\n  "invoice_number": "INV-2026-001",\n  "date_issued": "2026-03-01",\n  "due_date": "2026-03-31",\n  "client": {\n    "name": "Client Name",\n    "email": "client@example.com",\n    "address": "123 Main St"\n  },\n  "items": [\n    {\n      "description": "Service description",\n      "quantity": 1,\n      "unit_price": 1000,\n      "total": 1000\n    }\n  ],\n  "subtotal": 1000,\n  "tax_rate": 0.25,\n  "tax_amount": 250,\n  "total": 1250,\n  "currency": "USD",\n  "status": "pending",\n  "notes": "Payment terms: Net 30"\n}\n```\n\n## Expense Schema\n```json\n{\n  "id": "EXP-2026-03-001",\n  "date": "2026-03-15",\n  "category": "software",\n  "vendor": "Vendor Name",\n  "description": "Annual subscription",\n  "amount": 299,\n  "currency": "USD",\n  "tax_deductible": true,\n  "receipt": "receipt-filename.pdf"\n}\n```\n\n## Expense Categories\n- software — SaaS subscriptions, tools, licenses\n- hardware — Equipment, devices\n- office — Rent, supplies, furniture\n- travel — Flights, hotels, transport\n- meals — Business meals, client dinners\n- marketing — Ads, sponsorships, content\n- professional — Legal, accounting, consulting fees\n- education — Courses, books, conferences\n- other — Anything that doesn\'t fit above\n\n## Commands\n\n### Create Invoice\nWhen asked to create an invoice:\n1. Ask for: client name, items/services, amounts, due date\n2. Auto-generate invoice number (INV-YYYY-NNN)\n3. Calculate subtotal, tax, and total\n4. Save to ~/invoices/sent/INV-YYYY-NNN.json\n5. Display a formatted summary\n\n### Log Expense\nWhen asked to log an expense:\n1. Ask for: date, vendor, description, amount, category\n2. Auto-generate expense ID (EXP-YYYY-MM-NNN)\n3. Determine tax deductibility based on category\n4. Save to ~/expenses/receipts/EXP-YYYY-MM-NNN.json\n5. Confirm the entry\n\n### Financial Summary\nWhen asked for a summary:\n1. Read all invoices and expenses for the requested period\n2. Calculate: total invoiced, total collected, total outstanding, total expenses\n3. Break down expenses by category\n4. Calculate net income (collected - expenses)\n5. Flag overdue invoices\n6. Save report to ~/expenses/reports/\n\n## Output Format for Financial Summary\n# Financial Summary — [Period]\n\n## Revenue\n| Metric | Amount |\n|--------|--------|\n| Total Invoiced | $X |\n| Collected | $X |\n| Outstanding | $X |\n| Overdue | $X |\n\n## Expenses by Category\n| Category | Amount | % of Total |\n|----------|--------|------------|\n| Category | $X | X% |\n| **Total** | **$X** | **100%** |\n\n## Net Income\n| Metric | Amount |\n|--------|--------|\n| Revenue Collected | $X |\n| Total Expenses | $X |\n| **Net Income** | **$X** |\n\n## Overdue Invoices\n- INV-XXXX — Client Name — $X — X days overdue\n\n## Rules\n- Always confirm before creating or modifying financial records\n- Use consistent invoice numbering (auto-increment)\n- Default tax rate is 25% (configurable)\n- Flag any invoice overdue by more than 30 days\n- All amounts should include currency symbol\n- Never delete financial records — mark as void instead\nSKILLEOF',
        type: 'config',
      },
      {
        title: 'Create an invoice template',
        description: 'Set up a reusable invoice template with your business details.',
        command:
          'cat > ~/invoices/templates/default.json << \'TEMPLATEEOF\'\n{\n  "from": {\n    "name": "Your Business Name",\n    "email": "you@example.com",\n    "address": "Your Address",\n    "tax_id": "Your Tax ID"\n  },\n  "currency": "USD",\n  "tax_rate": 0.25,\n  "payment_terms": "Net 30",\n  "bank_details": "Bank: Your Bank | Account: XXXX | Routing: XXXX"\n}\nTEMPLATEEOF',
        type: 'config',
      },
      {
        title: 'Test the agent',
        description: 'Create a test invoice and log a test expense to verify everything works.',
        command: 'claude -p "Create an invoice for Acme Corp for 10 hours of consulting at $150/hour, due in 30 days. Then log an expense: $49/month for GitHub Team subscription, software category."',
        type: 'test',
      },
    ],
    skill_content: `# Invoice & Expense Tracker Agent

## Purpose
You are a financial tracking assistant for freelancers and small businesses. Manage invoices, track expenses, and generate financial reports.

## Data Storage
All data is stored as JSON files in the user's home directory:
- \`~/invoices/sent/\` -- issued invoices as JSON
- \`~/invoices/templates/\` -- reusable invoice templates
- \`~/expenses/receipts/\` -- logged expenses as JSON
- \`~/expenses/reports/\` -- generated summary reports

## Invoice Schema
\`\`\`json
{
  "invoice_number": "INV-2026-001",
  "date_issued": "2026-03-01",
  "due_date": "2026-03-31",
  "client": {
    "name": "Client Name",
    "email": "client@example.com",
    "address": "123 Main St"
  },
  "items": [
    {
      "description": "Service description",
      "quantity": 1,
      "unit_price": 1000,
      "total": 1000
    }
  ],
  "subtotal": 1000,
  "tax_rate": 0.25,
  "tax_amount": 250,
  "total": 1250,
  "currency": "USD",
  "status": "pending",
  "notes": "Payment terms: Net 30"
}
\`\`\`

## Expense Schema
\`\`\`json
{
  "id": "EXP-2026-03-001",
  "date": "2026-03-15",
  "category": "software",
  "vendor": "Vendor Name",
  "description": "Annual subscription",
  "amount": 299,
  "currency": "USD",
  "tax_deductible": true,
  "receipt": "receipt-filename.pdf"
}
\`\`\`

## Expense Categories
- software -- SaaS subscriptions, tools, licenses
- hardware -- Equipment, devices
- office -- Rent, supplies, furniture
- travel -- Flights, hotels, transport
- meals -- Business meals, client dinners
- marketing -- Ads, sponsorships, content
- professional -- Legal, accounting, consulting fees
- education -- Courses, books, conferences
- other -- Anything that doesn't fit above

## Commands

### Create Invoice
When asked to create an invoice:
1. Ask for: client name, items/services, amounts, due date
2. Auto-generate invoice number (INV-YYYY-NNN)
3. Calculate subtotal, tax, and total
4. Save to ~/invoices/sent/INV-YYYY-NNN.json
5. Display a formatted summary

### Log Expense
When asked to log an expense:
1. Ask for: date, vendor, description, amount, category
2. Auto-generate expense ID (EXP-YYYY-MM-NNN)
3. Determine tax deductibility based on category
4. Save to ~/expenses/receipts/EXP-YYYY-MM-NNN.json
5. Confirm the entry

### Financial Summary
When asked for a summary:
1. Read all invoices and expenses for the requested period
2. Calculate: total invoiced, total collected, total outstanding, total expenses
3. Break down expenses by category
4. Calculate net income (collected - expenses)
5. Flag overdue invoices
6. Save report to ~/expenses/reports/

## Output Format for Financial Summary
# Financial Summary -- [Period]

## Revenue
| Metric | Amount |
|--------|--------|
| Total Invoiced | $X |
| Collected | $X |
| Outstanding | $X |
| Overdue | $X |

## Expenses by Category
| Category | Amount | % of Total |
|----------|--------|------------|
| Category | $X | X% |
| **Total** | **$X** | **100%** |

## Net Income
| Metric | Amount |
|--------|--------|
| Revenue Collected | $X |
| Total Expenses | $X |
| **Net Income** | **$X** |

## Overdue Invoices
- INV-XXXX -- Client Name -- $X -- X days overdue

## Customization
- Business name and contact info: {{business_info}}
- Currency and tax rate: {{currency_tax}}
- Standard payment terms: {{payment_terms}}

## Rules
- Always confirm before creating or modifying financial records
- Use consistent invoice numbering (auto-increment)
- Use the tax rate and currency specified above
- Flag any invoice overdue by more than 30 days
- All amounts should include currency symbol
- Never delete financial records -- mark as void instead
- Apply the payment terms specified above to all new invoices`,
    customization_prompts: [
      {
        question: 'What is your business name and contact info?',
        placeholder: 'Acme Consulting, hello@acme.com, 123 Main St',
        field: 'business_info',
      },
      {
        question: 'What currency and tax rate do you use?',
        placeholder: 'USD, 25% (or NOK, 25% MVA)',
        field: 'currency_tax',
      },
      {
        question: 'What are your standard payment terms?',
        placeholder: 'Net 30, Net 14, Due on receipt',
        field: 'payment_terms',
      },
    ],
  },
];

// =============================================================================
// Helper functions
// =============================================================================

export function getRecipeBySlug(slug: string): AgentRecipe | undefined {
  return AGENT_RECIPES.find((r) => r.slug === slug);
}

export function getRecipesByCategory(category: AgentRecipe['category']): AgentRecipe[] {
  return AGENT_RECIPES.filter((r) => r.category === category);
}

export function getRecipesByDifficulty(difficulty: AgentRecipe['difficulty']): AgentRecipe[] {
  return AGENT_RECIPES.filter((r) => r.difficulty === difficulty);
}

export function getRecipesRequiringMCP(): AgentRecipe[] {
  return AGENT_RECIPES.filter((r) => r.requires.length > 0);
}

export function getRecipesNoMCPRequired(): AgentRecipe[] {
  return AGENT_RECIPES.filter((r) => r.requires.length === 0);
}

export function getAllCategories(): AgentRecipe['category'][] {
  return [...new Set(AGENT_RECIPES.map((r) => r.category))];
}

export function getRecipeCount(): number {
  return AGENT_RECIPES.length;
}
