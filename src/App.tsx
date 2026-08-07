import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { useGuestData } from './hooks/useGuestData';
import { ThemeColors } from './types';
import { InvitationEnvelope } from './components/InvitationEnvelope';
import { InvitationCard } from './components/InvitationCard';
import { NotFoundCard } from './components/NotFoundCard';
import { usesBrideTheme } from './utils/guestEvents';
import { AdminPage } from './pages/AdminPage';
import { Loader2 } from 'lucide-react';

function getSlugFromLocation(): string | null {
  const path = window.location.pathname;
  const match = path.match(/\/i\/([^/]+)/);
  if (match?.[1]) return match[1];

  const guestParam = new URLSearchParams(window.location.search).get('guest');
  return guestParam || null;
}

function isAdminPath(): boolean {
  return window.location.pathname.replace(/\/$/, '') === '/admin';
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(isAdminPath);
  const [activeSlug, setActiveSlug] = useState<string | null>(getSlugFromLocation);
  const [isOpen, setIsOpen] = useState(false);

  const { guest, loading, error, markViewed } = useGuestData(
    isAdmin ? undefined : (activeSlug ?? undefined),
  );

  useEffect(() => {
    const handlePopState = () => {
      setIsAdmin(isAdminPath());
      setActiveSlug(getSlugFromLocation());
      setIsOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const theme: ThemeColors = useMemo(() => {
    const brideTheme = usesBrideTheme(guest);

    return {
      accent: brideTheme ? '#6B3A4A' : '#1F4B3F',
      accentBg: brideTheme ? '#6B3A4A12' : '#1F4B3F12',
      accentBorder: brideTheme ? '#6B3A4A40' : '#1F4B3F40',
      label: brideTheme ? 'Baraat' : 'Walima',
      gold: '#C4A35A',
      parchment: '#FBF7F2',
      ink: '#3D2430',
    };
  }, [guest]);

  const handleEnvelopeOpen = () => {
    setIsOpen(true);
    markViewed();
  };

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full overflow-hidden bg-[#F6EEE8] sm:min-h-screen sm:h-auto sm:overflow-x-hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-5">
      <main className="relative z-10 h-full w-full sm:h-auto sm:max-w-[420px] sm:py-4">
        {loading ? (
          <div className="flex h-full min-h-[100dvh] flex-col items-center justify-center p-12 text-[#8B5A6A] sm:min-h-0">
            <Loader2 className="mb-3 h-8 w-8 animate-spin" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B4A55]">
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

      <footer className="hidden py-3 text-center text-[10px] font-medium uppercase tracking-wider text-[#3D2430]/35 sm:block">
        Ali Shah & Ammara Saleem
      </footer>
    </div>
  );
}
