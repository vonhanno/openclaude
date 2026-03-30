import { buildSystemPrompt } from '@/lib/anthropic';
import { PRESET_SKILLS } from '@/lib/skills-data';
import { spawn } from 'child_process';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { prompt, skillIds } = await request.json();

  if (!prompt) {
    return new Response(
      JSON.stringify({ error: 'Missing prompt' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const skills = PRESET_SKILLS.filter((s) => skillIds?.includes(s.id));
  const systemPrompt = buildSystemPrompt(skills);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Spawn claude CLI with --print and --system-prompt
      // Prompt is piped via stdin to avoid shell escaping issues
      const claude = spawn('claude', [
        '--print',
        '--system-prompt', systemPrompt,
      ], {
        env: { ...process.env },
      });

      // Write user prompt to stdin
      claude.stdin.write(prompt);
      claude.stdin.end();

      claude.stdout.on('data', (data: Buffer) => {
        const text = data.toString();
        controller.enqueue(
          encoder.encode(
            `event: token\ndata: ${JSON.stringify({ text })}\n\n`
          )
        );
      });

      claude.stderr.on('data', (data: Buffer) => {
        const message = data.toString().trim();
        if (message && message.toLowerCase().includes('error')) {
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({ message })}\n\n`
            )
          );
        }
      });

      claude.on('close', (code) => {
        if (code !== 0) {
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({ message: `Claude exited with code ${code}` })}\n\n`
            )
          );
        }
        controller.enqueue(
          encoder.encode(
            `event: done\ndata: ${JSON.stringify({ finished: true })}\n\n`
          )
        );
        controller.close();
      });

      claude.on('error', (err) => {
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ message: err.message })}\n\n`
          )
        );
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
