import { EVENTS_BY_KEY } from '../data/guests';
import { DEFAULT_RSVP_SETTINGS } from '../data/rsvpDefaults';
import { EventKey, Guest, RsvpSettings, RsvpSide, WeddingEvent } from '../types';

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

/** Default RSVP sides when not set on the guest */
export function defaultRsvpSides(events: EventKey[]): RsvpSide[] {
  const normalized = normalizeEvents(events);
  if (normalized.length === 2) return ['bride', 'groom'];
  if (normalized[0] === 'walima') return ['groom'];
  return ['bride'];
}

export function resolveRsvpSides(guest: Guest): RsvpSide[] {
  if (guest.rsvp_sides?.length) {
    const sides: RsvpSide[] = [];
    if (guest.rsvp_sides.includes('bride')) sides.push('bride');
    if (guest.rsvp_sides.includes('groom')) sides.push('groom');
    if (sides.length) return sides;
  }
  return defaultRsvpSides(guest.events);
}

function rsvpEventLabel(guest: Guest, side: RsvpSide): string {
  const events = normalizeEvents(guest.events);
  if (side === 'bride') {
    return events.includes('baraat') ? 'Baraat' : 'Walima';
  }
  return 'Walima';
}

export interface GuestRsvpLink {
  side: RsvpSide;
  label: string;
  href: string;
}

/** RSVP buttons for a guest — only the sides selected in admin */
export function getGuestRsvpLinks(
  guest: Guest,
  settings: RsvpSettings = DEFAULT_RSVP_SETTINGS,
): GuestRsvpLink[] {
  const sides = resolveRsvpSides(guest);
  const label = guestLabel(guest);
  const links: GuestRsvpLink[] = [];

  if (sides.includes('bride')) {
    const eventLabel = rsvpEventLabel(guest, 'bride');
    links.push({
      side: 'bride',
      label: sides.length > 1 ? "Bride's Side" : 'RSVP on WhatsApp',
      href: waLink(
        settings.bride_number,
        `Assalamu Alaikum! ${label} warmly confirms attendance for the ${eventLabel}.`,
      ),
    });
  }

  if (sides.includes('groom')) {
    const eventLabel = rsvpEventLabel(guest, 'groom');
    links.push({
      side: 'groom',
      label: sides.length > 1 ? "Groom's Side" : 'RSVP on WhatsApp',
      href: waLink(
        settings.groom_number,
        `Assalamu Alaikum! ${label} warmly confirms attendance for the ${eventLabel}.`,
      ),
    });
  }

  return links;
}

/** Theme accent: walima-only emerald; otherwise bride maroon (including both). */
export function usesBrideTheme(guest: Guest | null | undefined): boolean {
  if (!guest) return true;
  const events = normalizeEvents(guest.events);
  return !(events.length === 1 && events[0] === 'walima');
}
