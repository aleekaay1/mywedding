import { useState, useEffect, useCallback } from 'react';
import { Guest } from '../types';
import { getGuestBySlug, markGuestAsViewed } from '../services/guestService';

interface UseGuestDataResult {
  guest: Guest | null;
  loading: boolean;
  error: string | null;
  markViewed: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useGuestData(slug?: string): UseGuestDataResult {
  const [guest, setGuest] = useState<Guest | null>(null);
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
      const data = await getGuestBySlug(slug);
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
    loading,
    error,
    markViewed,
    refetch: fetchGuest,
  };
}
