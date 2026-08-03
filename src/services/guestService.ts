import { Guest } from '../types';
import { GUESTS } from '../data/guests';

const LOCAL_STORAGE_KEY = 'wedding_invitations_guests_v1';

function getStoredGuests(): Guest[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fall through to defaults
  }
  return GUESTS;
}

function saveGuestsToStorage(guests: Guest[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guests));
  } catch {
    // Storage may be unavailable (private browsing, quota, etc.)
  }
}

export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  const guests = getStoredGuests();
  const found = guests.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
  return found ? { ...found } : null;
}

export async function markGuestAsViewed(slug: string): Promise<Guest | null> {
  const guests = getStoredGuests();
  let updatedGuest: Guest | null = null;
  const updatedGuests = guests.map((g) => {
    if (g.slug.toLowerCase() === slug.toLowerCase()) {
      updatedGuest = { ...g, viewed: true };
      return updatedGuest;
    }
    return g;
  });

  if (updatedGuest) {
    saveGuestsToStorage(updatedGuests);
  }
  return updatedGuest;
}
