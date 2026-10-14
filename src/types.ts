export type EventKey = 'baraat' | 'walima';

/** Bride's side (girl's) or groom's side (boy's) RSVP */
export type RsvpSide = 'bride' | 'groom';

export interface RsvpSettings {
  bride_number: string;
  groom_number: string;
}

export interface WeddingEvent {
  key: EventKey;
  event_name: string;
  event_date: string;
  event_time: string;
  venue_name: string;
  venue_address: string;
  maps_url: string;
}

export interface Guest {
  slug: string;
  full_name: string;
  honorific?: string;
  /** Which ceremonies this guest is invited to */
  events: EventKey[];
  /** WhatsApp number digits, e.g. 923001234567 */
  phone?: string;
  /** Which RSVP buttons this guest sees (bride and/or groom) */
  rsvp_sides?: RsvpSide[];
  /**
   * Per-event time overrides shown on this guest's invite.
   * Example: `{ baraat: '5:00 PM Onwards' }` — omits use the event default.
   */
  event_times?: Partial<Record<EventKey, string>>;
  viewed: boolean;
  custom_message?: string;
}

export interface ThemeColors {
  accent: string;
  accentBg: string;
  accentBorder: string;
  label: string;
  gold: string;
  parchment: string;
  ink: string;
}
