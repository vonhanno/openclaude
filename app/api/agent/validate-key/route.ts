// This endpoint is no longer needed — OpenClaude uses Claude Max subscription
// via Claude Code CLI instead of direct API keys.
// Kept as a placeholder for future API-key mode if scaling requires it.

export async function POST() {
  return Response.json({
    message: 'API key validation is not needed. OpenClaude uses your Claude Max subscription.'
  });
}
