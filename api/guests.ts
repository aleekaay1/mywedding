import { list, put } from '@vercel/blob';

type EventKey = 'baraat' | 'walima';

interface Guest {
  slug: string;
  full_name: string;
  honorific?: string;
  events: EventKey[];
  phone?: string;
  viewed: boolean;
  custom_message?: string;
}

const BLOB_PATHNAME = 'wedding-guests.json';

const SEED_GUESTS: Guest[] = [
  {
    slug: 'ahmad-family',
    full_name: 'Ahmad & Family',
    honorific: 'Mr & Mrs',
    events: ['baraat'],
    viewed: false,
  },
  {
    slug: 'tariq-malik',
    full_name: 'Tariq Malik',
    honorific: 'Mr',
    events: ['walima'],
    viewed: false,
  },
  {
    slug: 'zainab-khan',
    full_name: 'Zainab Khan & Guests',
    honorific: 'Ms',
    events: ['baraat'],
    viewed: false,
  },
  {
    slug: 'raza-family',
    full_name: 'Raza & Family',
    honorific: 'Mr & Mrs',
    events: ['baraat', 'walima'],
    viewed: false,
  },
  {
    slug: 'khursheed-family',
    full_name: 'Khursheed & Family',
    honorific: 'Mr & Mrs',
    events: ['baraat', 'walima'],
    viewed: false,
  },
  {
    slug: 'alex-paz',
    full_name: 'Alex Paz',
    honorific: 'Mr',
    events: ['baraat', 'walima'],
    viewed: false,
  },
];

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'wedding2026';
}

function isAuthorized(request: Request): boolean {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return false;
  return auth.slice(7).trim() === adminPassword();
}

async function readGuests(): Promise<Guest[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return SEED_GUESTS;
  }

  try {
    const { blobs } = await list({
      prefix: BLOB_PATHNAME,
      limit: 20,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME) ?? blobs[0];
    if (!blob?.url) return SEED_GUESTS;

    const res = await fetch(blob.url);
    if (!res.ok) return SEED_GUESTS;
    const parsed = await res.json();
    return Array.isArray(parsed) && parsed.length ? (parsed as Guest[]) : SEED_GUESTS;
  } catch {
    return SEED_GUESTS;
  }
}

async function writeGuests(guests: Guest[]): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'BLOB_READ_WRITE_TOKEN is missing. Connect your Blob store in Vercel and redeploy.',
    );
  }

  await put(BLOB_PATHNAME, JSON.stringify(guests, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function GET(): Promise<Response> {
  try {
    const guests = await readGuests();
    return Response.json(
      { guests },
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

    const body = (await request.json()) as { guests?: Guest[] };
    if (!Array.isArray(body?.guests)) {
      return Response.json({ error: 'Body must be { guests: Guest[] }' }, { status: 400 });
    }

    await writeGuests(body.guests);
    return Response.json({ ok: true, count: body.guests.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return Response.json({ error: message }, { status: 503 });
  }
}
