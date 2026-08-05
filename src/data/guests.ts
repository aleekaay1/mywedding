import { EventKey, Guest, WeddingEvent } from '../types';

/** Girl's side RSVP number */
export const RSVP_BARAAT = '923325017233';
/** Boy's side RSVP number */
export const RSVP_WALIMA = '923145248496';

export const BARAAT: WeddingEvent = {
  key: 'baraat',
  event_name: 'Baraat',
  event_date: 'Friday, October 23, 2026',
  event_time: '7:00 PM Onwards',
  venue_name: 'Paramount Marquee',
  venue_address:
    'PSO Petrol Pump (Dhaniyal Petroleum), Main Lehtarar Road, Jhang Sayedan, Opp Eden Life Society, Islamabad',
  maps_url:
    'https://www.google.com/maps/search/?api=1&query=Paramount+Marquee+Main+Lehtarar+Road+Jhang+Sayedan+Islamabad',
};

export const WALIMA: WeddingEvent = {
  key: 'walima',
  event_name: 'Walima',
  event_date: 'Saturday, October 24, 2026',
  event_time: '7:00 PM Onwards',
  venue_name: 'Reet Marquee',
  venue_address: 'Near Khana Pull, Service Road East, Street No. 2, Khanna, Islamabad',
  maps_url:
    'https://www.google.com/maps/search/?api=1&query=Reet+Marquee+Khanna+Pull+Islamabad',
};

export const EVENTS_BY_KEY: Record<EventKey, WeddingEvent> = {
  baraat: BARAAT,
  walima: WALIMA,
};

export const GUESTS: Guest[] = [
  {
    slug: 'ahmad-family',
    full_name: 'Ahmad & Family',
    honorific: 'Mr & Mrs',
    events: ['baraat'],
    viewed: false,
  },
  {
    slug: 'tariq-malik',
    full_name: 'Tariq Malik',
    honorific: 'Mr',
    events: ['walima'],
    viewed: false,
  },
  {
    slug: 'zainab-khan',
    full_name: 'Zainab Khan & Guests',
    honorific: 'Ms',
    events: ['baraat'],
    viewed: false,
  },
  {
    slug: 'dr-usman-ali',
    full_name: 'Dr. Usman Ali & Family',
    honorific: 'Dr & Mrs',
    events: ['walima'],
    viewed: false,
  },
  {
    slug: 'fatima-syed',
    full_name: 'Fatima Syed',
    honorific: 'Ms',
    events: ['baraat'],
    viewed: false,
  },
  {
    slug: 'hamza-farooq',
    full_name: 'Hamza Farooq',
    honorific: 'Mr',
    events: ['walima'],
    viewed: false,
  },
  // Sample guest invited to both ceremonies
  {
    slug: 'raza-family',
    full_name: 'Raza & Family',
    honorific: 'Mr & Mrs',
    events: ['baraat', 'walima'],
    viewed: false,
  },
  {
    slug: 'khursheed-family',
    full_name: 'Khursheed & Family',
    honorific: 'Mr & Mrs',
    events: ['baraat', 'walima'],
    viewed: false,
  },
];
