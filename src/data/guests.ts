import { Guest, GuestSide } from '../types';

const RSVP_NUMBERS: Record<GuestSide, string> = {
  bride: '923325017233',
  groom: '923145248496',
};

const BARAAT = {
  event_name: 'Baraat',
  event_date: 'Friday, October 23, 2026',
  event_time: '7:00 PM Onwards',
  venue_name: 'Paramount Marquee',
  venue_address:
    'PSO Petrol Pump (Dhaniyal Petroleum), Main Lehtarar Road, Jhang Sayedan, Opp Eden Life Society, Islamabad',
  maps_url:
    'https://www.google.com/maps/search/?api=1&query=Paramount+Marquee+Main+Lehtarar+Road+Jhang+Sayedan+Islamabad',
  couple_names: 'Ammara & Ali',
} as const;

const WALIMA = {
  event_name: 'Walima',
  event_date: 'Saturday, October 24, 2026',
  event_time: '7:00 PM Onwards',
  venue_name: 'Reet Marquee',
  venue_address: 'Near Khana Pull, Service Road East, Street No. 2, Khanna, Islamabad',
  maps_url:
    'https://www.google.com/maps/search/?api=1&query=Reet+Marquee+Khanna+Pull+Islamabad',
  couple_names: 'Ali & Ammara',
} as const;

function rsvpUrl(
  side: GuestSide,
  honorific: string | undefined,
  name: string,
  event: string,
): string {
  const guestLabel = [honorific, name].filter(Boolean).join(' ');
  const text = `Assalamu Alaikum! ${guestLabel} confirms RSVP for the ${event}.`;
  return `https://wa.me/${RSVP_NUMBERS[side]}?text=${encodeURIComponent(text)}`;
}

export const GUESTS: Guest[] = [
  {
    slug: 'ahmad-family',
    full_name: 'Ahmad & Family',
    honorific: 'Mr & Mrs',
    side: 'bride',
    ...BARAAT,
    rsvp_whatsapp_url: rsvpUrl('bride', 'Mr & Mrs', 'Ahmad & Family', 'Baraat'),
    viewed: false,
    custom_message:
      'We request the honor of your presence and blessings as we celebrate this sacred union.',
  },
  {
    slug: 'tariq-malik',
    full_name: 'Tariq Malik',
    honorific: 'Mr',
    side: 'groom',
    ...WALIMA,
    rsvp_whatsapp_url: rsvpUrl('groom', 'Mr', 'Tariq Malik', 'Walima'),
    viewed: false,
    custom_message: 'Join us for a joyous evening of feast, gratitude, and celebration.',
  },
  {
    slug: 'zainab-khan',
    full_name: 'Zainab Khan & Guests',
    honorific: 'Ms',
    side: 'bride',
    ...BARAAT,
    rsvp_whatsapp_url: rsvpUrl('bride', 'Ms', 'Zainab Khan', 'Baraat'),
    viewed: false,
    custom_message: 'Your presence will add warmth and happiness to our special evening.',
  },
  {
    slug: 'dr-usman-ali',
    full_name: 'Dr. Usman Ali & Family',
    honorific: 'Dr & Mrs',
    side: 'groom',
    ...WALIMA,
    rsvp_whatsapp_url: rsvpUrl('groom', 'Dr & Mrs', 'Usman Ali & Family', 'Walima'),
    viewed: false,
    custom_message: 'We look forward to welcoming you to our Walima reception.',
  },
  {
    slug: 'fatima-syed',
    full_name: 'Fatima Syed',
    honorific: 'Ms',
    side: 'bride',
    ...BARAAT,
    rsvp_whatsapp_url: rsvpUrl('bride', 'Ms', 'Fatima Syed', 'Baraat'),
    viewed: false,
  },
  {
    slug: 'hamza-farooq',
    full_name: 'Hamza Farooq',
    honorific: 'Mr',
    side: 'groom',
    ...WALIMA,
    rsvp_whatsapp_url: rsvpUrl('groom', 'Mr', 'Hamza Farooq', 'Walima'),
    viewed: false,
  },
];
