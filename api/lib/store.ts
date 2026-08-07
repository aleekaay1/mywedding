import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Guest } from '../../src/types';

const BLOB_PATHNAME = 'wedding-guests.json';

function dataFilePath(): string {
  // Prefer project-root data/guests.json
  const candidates = [
    path.join(process.cwd(), 'data', 'guests.json'),
    path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'data', 'guests.json'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return candidates[0];
}

function readSeedFromDisk(): Guest[] {
  try {
    const raw = fs.readFileSync(dataFilePath(), 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Guest[];
  } catch {
    // ignore
  }
  return [];
}

async function readFromBlob(): Promise<Guest[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 20 });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME) ?? blobs[0];
    if (!blob?.url) return null;
    const res = await fetch(blob.url);
    if (!res.ok) return null;
    const parsed = await res.json();
    return Array.isArray(parsed) ? (parsed as Guest[]) : null;
  } catch {
    return null;
  }
}

async function writeToBlob(guests: Guest[]): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;
  try {
    const { put } = await import('@vercel/blob');
    await put(BLOB_PATHNAME, JSON.stringify(guests, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return true;
  } catch {
    return false;
  }
}

function writeToDisk(guests: Guest[]): boolean {
  try {
    const file = dataFilePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(guests, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}

export async function getGuests(): Promise<Guest[]> {
  const fromBlob = await readFromBlob();
  if (fromBlob?.length) return fromBlob;

  const fromDisk = readSeedFromDisk();
  if (fromDisk.length) return fromDisk;

  return [];
}

export async function setGuests(guests: Guest[]): Promise<{ ok: true } | { ok: false; error: string }> {
  // Prefer Blob on Vercel so invites work for everyone
  if (process.env.VERCEL || process.env.BLOB_READ_WRITE_TOKEN) {
    const blobOk = await writeToBlob(guests);
    if (blobOk) return { ok: true };
    if (process.env.VERCEL) {
      return {
        ok: false,
        error:
          'Could not save guests. Add BLOB_READ_WRITE_TOKEN in Vercel (Storage → Blob) so uploads persist.',
      };
    }
  }

  if (writeToDisk(guests)) return { ok: true };
  return { ok: false, error: 'Could not write guests.json on this server.' };
}
