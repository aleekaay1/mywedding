import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { InvitationShell } from './InvitationShell';
import { OrnamentDivider } from './OrnamentDivider';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: opening ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full h-full"
    >
      <InvitationShell
        as="button"
        variant="teaser"
        onClick={handleOpen}
        ariaLabel="Open wedding invitation"
      >
        <p className="font-serif-display text-[15px] leading-none text-[#4A2F38] sm:text-[18px]">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        <p className="font-label mt-1.5 text-[7px] uppercase tracking-[0.22em] text-[#6B4A55] sm:mt-2 sm:text-[8px]">
          With Allah&apos;s Blessings
        </p>

        <p className="font-serif-display mt-2 text-[11px] italic text-[#6B4A55]">
          A personal invitation for
        </p>
        <p className="font-serif-display max-w-[200px] text-[15px] font-semibold leading-tight text-[#3D2430] sm:text-[17px]">
          {guest.honorific ? `${guest.honorific} ` : ''}
          {guest.full_name}
        </p>

        <OrnamentDivider className="my-2.5 max-w-[120px] sm:my-3" />

        <p className="font-label mb-0.5 text-[7px] uppercase tracking-[0.24em] text-[#8B6A72]">
          The wedding of
        </p>
        <h1
          className="font-script mb-3 text-[30px] leading-[1.15] text-[#5C2E3E] sm:text-[40px]"
          style={{ fontFamily: '"Alex Brush", cursive' }}
        >
          {coupleLine}
        </h1>

        <motion.span
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-label inline-flex h-9 items-center justify-center rounded-full bg-[#6B3A4A] px-5 text-[9px] font-medium uppercase tracking-[0.18em] text-white leading-none sm:h-8"
        >
          {opening ? 'Opening…' : 'Tap to open'}
        </motion.span>
      </InvitationShell>
    </motion.div>
  );
};
