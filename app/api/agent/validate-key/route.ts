import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  const { apiKey } = await request.json();

  if (!apiKey) {
    return new Response(
      JSON.stringify({ valid: false, error: 'No API key provided' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const client = new Anthropic({ apiKey });
    // Make a minimal call to validate the key
    await client.messages.create({
      model: 'claude-sonnet-4-6-20250514',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hi' }],
    });
    return Response.json({ valid: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Invalid API key';
    return Response.json({ valid: false, error: message }, { status: 401 });
  }
}
