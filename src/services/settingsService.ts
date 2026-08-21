import { DEFAULT_RSVP_SETTINGS } from '../data/rsvpDefaults';
import { RsvpSettings } from '../types';

const SETTINGS_CACHE_KEY = 'wedding_rsvp_settings_v1';

export async function fetchRsvpSettings(): Promise<RsvpSettings> {
  try {
    const res = await fetch('/api/settings', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.settings?.bride_number && data.settings?.groom_number) {
        const settings = data.settings as RsvpSettings;
        try {
          localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(settings));
        } catch {
          // ignore
        }
        return settings;
      }
    }
  } catch {
    // fall through
  }

  try {
    const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
    if (cached) return JSON.parse(cached) as RsvpSettings;
  } catch {
    // ignore
  }

  return DEFAULT_RSVP_SETTINGS;
}

export async function saveRsvpSettings(settings: RsvpSettings, token: string): Promise<RsvpSettings> {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ settings }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Save failed (${res.status})`);
  }

  const data = await res.json();
  const saved = (data.settings ?? settings) as RsvpSettings;
  try {
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(saved));
  } catch {
    // ignore
  }
  return saved;
}
