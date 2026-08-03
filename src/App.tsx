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
      accent: isBride ? '#6B3A4A' : '#4A3A4A',
      accentBg: '#6B3A4A12',
      accentBorder: '#6B3A4A40',
      label: isBride ? "Baraat · Girl's side" : "Walima · Boy's side",
      gold: '#C4A35A',
      parchment: '#FBF7F2',
      ink: '#3D2430',
    };
  }, [guest?.side]);

  const handleEnvelopeOpen = () => {
    setIsOpen(true);
    markViewed();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, #FFF9F6 0%, #F6EEE8 50%, #EDE0DC 100%)',
      }}
    >
      <main className="w-full max-w-[420px] mx-auto my-auto py-3 relative z-10 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-[#8B5A6A]">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-xs uppercase tracking-widest font-semibold text-[#6B4A55]">
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

      <footer className="mt-auto py-3 text-center text-[10px] text-[#3D2430]/35 tracking-wider uppercase font-medium">
        Ali Shah & Ammara Saleem
      </footer>
    </div>
  );
}
