function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'wedding2026';
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as { password?: string };
    const password = String(body?.password ?? '');
    if (!password || password !== adminPassword()) {
      return Response.json({ error: 'Wrong password' }, { status: 401 });
    }
    return Response.json({ token: adminPassword() });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
