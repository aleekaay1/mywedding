export type GuestSide = 'bride' | 'groom';

export interface Guest {
  slug: string;
  full_name: string;
  honorific?: string;
  side: GuestSide;
  event_name: string;
  event_date: string;
  event_time: string;
  venue_name: string;
  venue_address: string;
  maps_url: string;
  rsvp_whatsapp_url: string;
  viewed: boolean;
  couple_names?: string;
  custom_message?: string;
}

export interface ThemeColors {
  accent: string;       // #7A2331 (bride maroon) or #1F4B3F (groom emerald)
  accentBg: string;     // Translucent accent background
  accentBorder: string; // Border color matching accent
  label: string;        // "Baraat · Girl's side" or "Walima · Boy's side"
  gold: string;         // #B08D3F
  parchment: string;    // #F5EFE2
  ink: string;          // #241C15
}
