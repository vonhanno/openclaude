import { NextResponse } from 'next/server';
import { PRESET_SKILLS } from '@/lib/skills-data';

export async function GET() {
  return NextResponse.json(PRESET_SKILLS);
}
