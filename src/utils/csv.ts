import { EventKey, Guest } from '../types';
import { normalizePhone, slugifyName } from './slug';

function parseEvents(raw: string): EventKey[] {
  const v = raw.trim().toLowerCase();
  if (v === 'both' || v === 'baraat & walima' || v === 'baraat and walima' || v === 'baraat,walima') {
    return ['baraat', 'walima'];
  }
  if (v === 'walima' || v === 'groom') return ['walima'];
  if (v === 'baraat' || v === 'bride') return ['baraat'];
  // comma-separated
  const parts = v.split(/[,|/]+/).map((p) => p.trim());
  const out: EventKey[] = [];
  if (parts.some((p) => p === 'baraat' || p === 'bride')) out.push('baraat');
  if (parts.some((p) => p === 'walima' || p === 'groom')) out.push('walima');
  return out.length ? out : ['baraat'];
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      cells.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  cells.push(cur.trim());
  return cells;
}

/**
 * Parse guest CSV.
 * Required headers: full_name, events
 * Optional: honorific, phone, slug
 */
export function parseGuestsCsv(text: string): Guest[] {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error('CSV needs a header row and at least one guest.');
  }

  const headers = splitCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, '_'));
  const idx = (name: string) => headers.indexOf(name);

  const nameI = idx('full_name') >= 0 ? idx('full_name') : idx('name');
  const eventsI = idx('events') >= 0 ? idx('events') : idx('event');
  const honorI = idx('honorific');
  const phoneI = idx('phone') >= 0 ? idx('phone') : idx('whatsapp');
  const slugI = idx('slug');

  if (nameI < 0 || eventsI < 0) {
    throw new Error('CSV must include full_name and events columns.');
  }

  const guests: Guest[] = [];
  const usedSlugs = new Set<string>();

  for (let r = 1; r < lines.length; r++) {
    const cells = splitCsvLine(lines[r]);
    const full_name = (cells[nameI] || '').trim();
    if (!full_name) continue;

    let slug = (slugI >= 0 ? cells[slugI] : '')?.trim() || slugifyName(full_name);
    slug = slugifyName(slug);
    let base = slug;
    let n = 2;
    while (usedSlugs.has(slug)) {
      slug = `${base}-${n++}`;
    }
    usedSlugs.add(slug);

    guests.push({
      slug,
      full_name,
      honorific: honorI >= 0 ? cells[honorI]?.trim() || undefined : undefined,
      events: parseEvents(cells[eventsI] || 'baraat'),
      phone: phoneI >= 0 ? normalizePhone(cells[phoneI]) : undefined,
      viewed: false,
    });
  }

  if (!guests.length) {
    throw new Error('No valid guest rows found in the CSV.');
  }

  return guests;
}

export function inviteUrl(slug: string, origin?: string): string {
  const base = (origin || (typeof window !== 'undefined' ? window.location.origin : '')).replace(
    /\/$/,
    '',
  );
  return `${base}/i/${slug}`;
}

export function whatsappInviteUrl(phone: string, slug: string, origin?: string): string {
  const link = inviteUrl(slug, origin);
  const text = `Assalamu Alaikum!\n\nYou're invited to our wedding. Please open your personal invitation here:\n${link}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
