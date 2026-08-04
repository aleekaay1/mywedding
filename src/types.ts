export type EventKey = 'baraat' | 'walima';

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
