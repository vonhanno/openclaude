import type { Skill } from './types';

export function buildSystemPrompt(skills: Skill[], skillRules?: Record<string, string[]>): string {
  const base = `You are a helpful AI assistant powered by OpenClaude. You have the following skills equipped:\n\n`;

  const skillPrompts = skills.map((skill) => {
    let prompt = `## ${skill.name}\n${skill.system_prompt}`;
    const rules = skillRules?.[skill.id];
    if (rules && rules.length > 0) {
      prompt += `\n\n### User Rules for ${skill.name}\nIMPORTANT — Always follow these custom rules:\n${rules.map(r => `- ${r}`).join('\n')}`;
    }
    return prompt;
  }).join('\n\n---\n\n');

  const footer = `\n\nUse only the skills that are relevant to the user's request. If the user asks about something outside your equipped skills, let them know which skills might help and suggest they equip those.`;

  return base + skillPrompts + footer;
}
