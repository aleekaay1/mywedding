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

/**
 * Single RSVP link.
 * Both-event guests → girl's side number, message confirms both events.
 */
export function getRsvpUrl(guest: Guest): string {
  const events = normalizeEvents(guest.events);
  const guestLabel = [guest.honorific, guest.full_name].filter(Boolean).join(' ');
  const eventLabel =
    events.length === 2
      ? 'Baraat & Walima'
      : events[0] === 'walima'
        ? 'Walima'
        : 'Baraat';
  const number = events.length === 1 && events[0] === 'walima' ? RSVP_WALIMA : RSVP_BARAAT;
  const text = `Assalamu Alaikum! ${guestLabel} confirms RSVP for the ${eventLabel}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Theme accent: walima-only emerald; otherwise bride maroon (including both). */
export function usesBrideTheme(guest: Guest | null | undefined): boolean {
  if (!guest) return true;
  const events = normalizeEvents(guest.events);
  return !(events.length === 1 && events[0] === 'walima');
}
