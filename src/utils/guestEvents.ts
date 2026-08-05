import { EVENTS_BY_KEY, RSVP_BARAAT, RSVP_WALIMA } from '../data/guests';
import { EventKey, Guest, WeddingEvent } from '../types';

export function normalizeEvents(events: EventKey[]): EventKey[] {
  const ordered: EventKey[] = [];
  if (events.includes('baraat')) ordered.push('baraat');
  if (events.includes('walima')) ordered.push('walima');
  return ordered;
}

export function resolveGuestEvents(guest: Guest): WeddingEvent[] {
  return normalizeEvents(guest.events).map((key) => EVENTS_BY_KEY[key]);
}

export function isBothEvents(guest: Guest): boolean {
  return normalizeEvents(guest.events).length === 2;
}

/** Walima-only → Ali & Ammara; baraat-only or both → Ammara & Ali */
export function getCoupleLine(guest: Guest): string {
  const events = normalizeEvents(guest.events);
  if (events.length === 1 && events[0] === 'walima') return 'Ali & Ammara';
  return 'Ammara & Ali';
}

export function getInviteLabel(guest: Guest): string {
  const events = normalizeEvents(guest.events);
  if (events.length === 2) return 'Baraat & Walima';
  if (events[0] === 'walima') return 'Walima';
  return 'Baraat';
}

export function getInvitePhrase(guest: Guest): string {
  const events = normalizeEvents(guest.events);
  if (events.length === 2) return 'baraat & walima';
  if (events[0] === 'walima') return 'walima';
  return 'baraat';
}

function guestLabel(guest: Guest): string {
  return [guest.honorific, guest.full_name].filter(Boolean).join(' ');
}

function waLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Single-event RSVP link (baraat → bride number, walima → groom number). */
export function getRsvpUrl(guest: Guest): string {
  const events = normalizeEvents(guest.events);
  const isWalimaOnly = events.length === 1 && events[0] === 'walima';
  const eventLabel = isWalimaOnly ? 'Walima' : 'Baraat';
  const number = isWalimaOnly ? RSVP_WALIMA : RSVP_BARAAT;
  const text = `Assalamu Alaikum! ${guestLabel(guest)} warmly confirms attendance for the ${eventLabel}.`;
  return waLink(number, text);
}

/** Dual-event: separate RSVP links for bride's side (Baraat) and groom's side (Walima). */
export function getDualRsvpLinks(guest: Guest): {
  bride: { href: string; label: string };
  groom: { href: string; label: string };
} {
  const label = guestLabel(guest);
  return {
    bride: {
      label: "Bride's Side",
      href: waLink(
        RSVP_BARAAT,
        `Assalamu Alaikum! ${label} warmly confirms attendance for the Baraat.`,
      ),
    },
    groom: {
      label: "Groom's Side",
      href: waLink(
        RSVP_WALIMA,
        `Assalamu Alaikum! ${label} warmly confirms attendance for the Walima.`,
      ),
    },
  };
}

/** Theme accent: walima-only emerald; otherwise bride maroon (including both). */
export function usesBrideTheme(guest: Guest | null | undefined): boolean {
  if (!guest) return true;
  const events = normalizeEvents(guest.events);
  return !(events.length === 1 && events[0] === 'walima');
}
