// Skill types
export type SkillCategory = 'communication' | 'data' | 'productivity' | 'development' | 'marketing' | 'design';
export type SkillComplexity = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: SkillCategory;
  complexity: SkillComplexity;
  icon_name: string;
  color: string;
  system_prompt: string;
  process_steps?: string[];
  is_preset: boolean;
  created_at: string;
}

export interface AgentSkill {
  id: string;
  user_id: string;
  skill_id: string;
  equipped_at: string;
  skill?: Skill; // joined
}

export interface Loadout {
  id: string;
  name: string;
  description: string;
  skill_slugs: string[];
  icon_name: string | null;
  is_preset: boolean;
  user_id: string | null;
  created_at: string;
}

export interface Run {
  id: string;
  user_id: string;
  prompt: string;
  response: string | null;
  skills_used: string[];
  model: string;
  tokens_used: number | null;
  duration_ms: number | null;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  anthropic_api_key_encrypted: string | null;
  active_loadout_id: string | null;
  created_at: string;
  updated_at: string;
}

// Category metadata for display
export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  communication: '#4A7DFF',
  data: '#F59E0B',
  productivity: '#8B5CF6',
  development: '#EF4444',
  marketing: '#10B981',
  design: '#EC4899',
};

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  communication: 'Communication',
  data: 'Data',
  productivity: 'Productivity',
  development: 'Development',
  marketing: 'Marketing',
  design: 'Design',
};

export const COMPLEXITY_LABELS: Record<SkillComplexity, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
