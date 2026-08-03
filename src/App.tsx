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
      gold: '#C4A35A',
      parchment: '#F7F2EA',
      ink: '#3B2A1E',
    };
  }, [guest?.side]);

  const handleEnvelopeOpen = () => {
    setIsOpen(true);
    markViewed();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top, #FFFDF8 0%, #F7F2EA 45%, #EFE6D8 100%)',
      }}
    >
      <main className="w-full max-w-[420px] mx-auto my-auto py-4 relative z-10 flex items-center justify-center min-h-[620px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-[#C4A35A]">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-xs uppercase tracking-widest font-semibold text-[#5C4634]">
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

      <footer className="mt-auto py-4 text-center text-[10px] text-[#3B2A1E]/35 tracking-wider uppercase font-medium">
        Ali Shah & Ammara Saleem
      </footer>
    </div>
  );
}
