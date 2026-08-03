import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { InvitationShell } from './InvitationShell';

interface InvitationEnvelopeProps {
  guest: Guest;
  theme: ThemeColors;
  onOpen: () => void;
}

export const InvitationEnvelope: React.FC<InvitationEnvelopeProps> = ({
  guest,
  onOpen,
}) => {
  const [opening, setOpening] = useState(false);
  const coupleLine = guest.side === 'bride' ? 'Ammara & Ali' : 'Ali & Ammara';

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 380);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: opening ? 0 : 1, y: opening ? -6 : 0, scale: opening ? 0.98 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <InvitationShell
        as="button"
        variant="teaser"
        onClick={handleOpen}
        ariaLabel="Open wedding invitation"
      >
        <p className="font-serif-display text-[clamp(15px,4.2vw,20px)] leading-none text-[#4A2F38]">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        <p className="font-label mt-2 text-[8px] uppercase tracking-[0.28em] text-[#6B4A55]">
          With Allah&apos;s Blessings
        </p>

        <p className="font-serif-display mt-2 text-[12px] italic text-[#6B4A55]">
          A personal invitation for
        </p>
        <p className="font-serif-display text-[clamp(16px,4.2vw,20px)] font-semibold leading-tight text-[#3D2430]">
          {guest.honorific ? `${guest.honorific} ` : ''}
          {guest.full_name}
        </p>

        <h1
          className="font-script mt-3 mb-3 text-[clamp(32px,9vw,44px)] leading-[1.2] text-[#5C2E3E] whitespace-nowrap"
          style={{ fontFamily: '"Great Vibes", cursive' }}
        >
          {coupleLine}
        </h1>

        <motion.span
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-label inline-flex h-8 items-center justify-center rounded-full bg-[#6B3A4A] px-5 text-[9px] font-medium uppercase tracking-[0.2em] text-white leading-none"
        >
          {opening ? 'Opening…' : 'Tap to open'}
        </motion.span>
      </InvitationShell>
    </motion.div>
  );
};
