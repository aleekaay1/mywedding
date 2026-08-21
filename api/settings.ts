import { get, put } from '@vercel/blob';

interface RsvpSettings {
  bride_number: string;
  groom_number: string;
}

const BLOB_PATHNAME = 'wedding-settings.json';

const DEFAULT_SETTINGS: RsvpSettings = {
  bride_number: '923325017233',
  groom_number: '923145248496',
};

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'wedding2026';
}

function isAuthorized(request: Request): boolean {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  return auth.slice(7).trim() === adminPassword();
}

async function readSettings(): Promise<RsvpSettings> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return DEFAULT_SETTINGS;
  }

  try {
    const result = await get(BLOB_PATHNAME, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return DEFAULT_SETTINGS;
    }

    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as Partial<RsvpSettings>;
    return {
      bride_number: parsed.bride_number || DEFAULT_SETTINGS.bride_number,
      groom_number: parsed.groom_number || DEFAULT_SETTINGS.groom_number,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

async function writeSettings(settings: RsvpSettings): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'BLOB_READ_WRITE_TOKEN is missing. Connect your Blob store in Vercel and redeploy.',
    );
  }

  await put(BLOB_PATHNAME, JSON.stringify(settings, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function GET(): Promise<Response> {
  try {
    const settings = await readSettings();
    return Response.json(
      { settings },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request): Promise<Response> {
  try {
    if (!isAuthorized(request)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { settings?: Partial<RsvpSettings> };
    const current = await readSettings();
    const next: RsvpSettings = {
      bride_number: String(body.settings?.bride_number ?? current.bride_number).replace(/\D/g, ''),
      groom_number: String(body.settings?.groom_number ?? current.groom_number).replace(/\D/g, ''),
    };

    if (!next.bride_number || !next.groom_number) {
      return Response.json({ error: 'Both RSVP numbers are required.' }, { status: 400 });
    }

    await writeSettings(next);
    return Response.json({ ok: true, settings: next });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return Response.json({ error: message }, { status: 503 });
  }
}
