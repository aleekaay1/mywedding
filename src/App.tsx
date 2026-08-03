import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { useGuestData } from './hooks/useGuestData';
import { ThemeColors } from './types';
import { InvitationEnvelope } from './components/InvitationEnvelope';
import { InvitationCard } from './components/InvitationCard';
import { NotFoundCard } from './components/NotFoundCard';
import { Loader2 } from 'lucide-react';

function getSlugFromLocation(): string | null {
  const path = window.location.pathname;
  const match = path.match(/\/i\/([^/]+)/);
  if (match?.[1]) return match[1];

  const guestParam = new URLSearchParams(window.location.search).get('guest');
  return guestParam || null;
}

export default function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(getSlugFromLocation);
  const [isOpen, setIsOpen] = useState(false);

  const { guest, loading, error, markViewed } = useGuestData(activeSlug ?? undefined);

  useEffect(() => {
    const handlePopState = () => {
      setActiveSlug(getSlugFromLocation());
      setIsOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const theme: ThemeColors = useMemo(() => {
    const isBride = (guest?.side || 'bride') === 'bride';

    return {
      accent: isBride ? '#7A2331' : '#1F4B3F',
      accentBg: isBride ? '#7A233112' : '#1F4B3F12',
      accentBorder: isBride ? '#7A233140' : '#1F4B3F40',
      label: isBride ? "Baraat · Girl's side" : "Walima · Boy's side",
      gold: '#B08D3F',
      parchment: '#F5EFE2',
      ink: '#241C15',
    };
  }, [guest?.side]);

  const handleEnvelopeOpen = () => {
    setIsOpen(true);
    markViewed();
  };

  return (
    <div className="min-h-screen bg-[#F5EFE2] text-[#241C15] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden">
      <main className="w-full max-w-[420px] mx-auto my-auto py-4 relative z-10 flex items-center justify-center min-h-[580px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-[#B08D3F]">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-xs uppercase tracking-widest font-semibold">
              Preparing Your Invitation...
            </p>
          </div>
        ) : error || !guest ? (
          <NotFoundCard />
        ) : (
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <InvitationEnvelope
                key={`envelope-${guest.slug}`}
                guest={guest}
                theme={theme}
                onOpen={handleEnvelopeOpen}
              />
            ) : (
              <InvitationCard
                key={`card-${guest.slug}`}
                guest={guest}
                theme={theme}
                onReseal={() => setIsOpen(false)}
              />
            )}
          </AnimatePresence>
        )}
      </main>

      <footer className="mt-auto py-4 text-center text-[10px] text-[#241C15]/40 tracking-wider uppercase font-medium">
        Made with affection for {guest?.couple_names || 'Ammara & Ali'}
      </footer>
    </div>
  );
}
