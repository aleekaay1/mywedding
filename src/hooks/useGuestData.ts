import { useState, useEffect, useCallback } from 'react';
import { Guest, RsvpSettings } from '../types';
import { DEFAULT_RSVP_SETTINGS } from '../data/rsvpDefaults';
import { getGuestBySlug, markGuestAsViewed } from '../services/guestService';
import { fetchRsvpSettings } from '../services/settingsService';

interface UseGuestDataResult {
  guest: Guest | null;
  rsvpSettings: RsvpSettings;
  loading: boolean;
  error: string | null;
  markViewed: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useGuestData(slug?: string): UseGuestDataResult {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [rsvpSettings, setRsvpSettings] = useState<RsvpSettings>(DEFAULT_RSVP_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuest = useCallback(async () => {
    if (!slug) {
      setGuest(null);
      setError('No invitation link provided.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [data, settings] = await Promise.all([getGuestBySlug(slug), fetchRsvpSettings()]);
      setRsvpSettings(settings);
      setGuest(data);
      if (!data) {
        setError(`Invitation for "${slug}" was not found.`);
      }
    } catch {
      setError('An error occurred while loading your invitation.');
      setGuest(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchGuest();
  }, [fetchGuest]);

  const markViewed = useCallback(async () => {
    if (slug && guest && !guest.viewed) {
      try {
        const updated = await markGuestAsViewed(slug);
        if (updated) {
          setGuest(updated);
        }
      } catch {
        // Non-critical; invitation still works if viewed tracking fails
      }
    }
  }, [slug, guest]);

  return {
    guest,
    rsvpSettings,
    loading,
    error,
    markViewed,
    refetch: fetchGuest,
  };
}
