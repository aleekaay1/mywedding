import { Guest } from '../types';
import { GUESTS } from '../data/guests';

const LOCAL_CACHE_KEY = 'wedding_invitations_guests_v7';
const VIEWED_KEY = 'wedding_invitations_viewed_v7';

function readLocalCache(): Guest[] | null {
  try {
    const saved = localStorage.getItem(LOCAL_CACHE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as Guest[]) : null;
  } catch {
    return null;
  }
}

export function saveLocalGuestCache(guests: Guest[]): void {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(guests));
  } catch {
    // ignore
  }
}

function readViewedSlugs(): Set<string> {
  try {
    const raw = localStorage.getItem(VIEWED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.map(String) : []);
  } catch {
    return new Set();
  }
}

function writeViewedSlugs(slugs: Set<string>): void {
  try {
    localStorage.setItem(VIEWED_KEY, JSON.stringify([...slugs]));
  } catch {
    // ignore
  }
}

function withLocalViewed(guest: Guest): Guest {
  const viewed = readViewedSlugs().has(guest.slug.toLowerCase());
  return viewed ? { ...guest, viewed: true } : { ...guest };
}

export async function fetchAllGuests(): Promise<Guest[]> {
  try {
    const res = await fetch('/api/guests', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.guests) && data.guests.length > 0) {
        saveLocalGuestCache(data.guests);
        return data.guests as Guest[];
      }
    }
  } catch {
    // fall through
  }

  return readLocalCache() ?? GUESTS;
}

export async function replaceAllGuests(guests: Guest[], token: string): Promise<void> {
  const res = await fetch('/api/guests', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ guests }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Save failed (${res.status})`);
  }

  saveLocalGuestCache(guests);
}

export async function loginAdmin(password: string): Promise<string> {
  const res = await fetch('/api/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Login failed');
  }
  const data = await res.json();
  return String(data.token);
}

export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  const guests = await fetchAllGuests();
  const found = guests.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
  return found ? withLocalViewed(found) : null;
}

export async function markGuestAsViewed(slug: string): Promise<Guest | null> {
  const guest = await getGuestBySlug(slug);
  if (!guest) return null;

  const viewed = readViewedSlugs();
  viewed.add(slug.toLowerCase());
  writeViewedSlugs(viewed);

  return { ...guest, viewed: true };
}
