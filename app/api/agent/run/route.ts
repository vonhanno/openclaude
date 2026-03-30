import { createAnthropicClient, buildSystemPrompt } from '@/lib/anthropic';
import { PRESET_SKILLS } from '@/lib/skills-data';

export async function POST(request: Request) {
  const { prompt, apiKey, skillIds } = await request.json();

  if (!prompt || !apiKey) {
    return new Response(
      JSON.stringify({ error: 'Missing prompt or API key' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const skills = PRESET_SKILLS.filter((s) => skillIds?.includes(s.id));
  const systemPrompt = buildSystemPrompt(skills);
  const client = createAnthropicClient(apiKey);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.create({
          model: 'claude-sonnet-4-6-20250514',
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }],
          stream: true,
        });

        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(
              encoder.encode(
                `event: token\ndata: ${JSON.stringify({ text: event.delta.text })}\n\n`
              )
            );
          }
          if (event.type === 'message_stop') {
            controller.enqueue(
              encoder.encode(
                `event: done\ndata: ${JSON.stringify({ finished: true })}\n\n`
              )
            );
          }
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Unknown error';
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ message })}\n\n`
          )
        );
      } finally {
        controller.close();
      }
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
