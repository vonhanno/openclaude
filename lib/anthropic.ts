import type { Skill } from './types';

export function buildSystemPrompt(skills: Skill[]): string {
  const base = `You are a helpful AI assistant powered by OpenClaude. You have the following skills equipped:\n\n`;

  const skillPrompts = skills.map((skill) => {
    return `## ${skill.name}\n${skill.system_prompt}`;
  }).join('\n\n---\n\n');

  const footer = `\n\nUse only the skills that are relevant to the user's request. If the user asks about something outside your equipped skills, let them know which skills might help and suggest they equip those.`;

  return base + skillPrompts + footer;
}
