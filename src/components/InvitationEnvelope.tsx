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

  const brideFirst = guest.side === 'bride';
  const topName = brideFirst ? 'Ammara Saleem' : 'Ali Shah';
  const bottomName = brideFirst ? 'Ali Shah' : 'Ammara Saleem';

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 380);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: opening ? 0 : 1, y: opening ? -6 : 0, scale: opening ? 0.98 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <InvitationShell as="button" onClick={handleOpen} ariaLabel="Open wedding invitation">
        <p className="font-serif-display text-[clamp(16px,4.6vw,22px)] leading-none text-[#4A2F38] mb-1.5">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        <p className="text-[9px] uppercase tracking-[0.22em] text-[#6B4A55] mb-2">
          With Allah&apos;s blessings
        </p>

        <p className="text-[10px] text-[#6B4A55] mb-0.5">A personal invitation for</p>
        <p className="font-serif-display text-[clamp(15px,4vw,18px)] font-semibold text-[#3D2430] mb-3 leading-tight">
          {guest.honorific ? `${guest.honorific} ` : ''}
          {guest.full_name}
        </p>

        <div className="mb-3">
          <p className="font-script text-[clamp(28px,8vw,40px)] leading-[0.95] text-[#5C2E3E]">
            {topName}
          </p>
          <p className="font-script text-[clamp(18px,5vw,26px)] leading-none text-[#8B5A6A] my-0.5">
            &
          </p>
          <p className="font-script text-[clamp(28px,8vw,40px)] leading-[0.95] text-[#5C2E3E]">
            {bottomName}
          </p>
        </div>

        <motion.span
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-white"
          style={{ backgroundColor: '#6B3A4A' }}
        >
          {opening ? 'Opening…' : 'Tap to open'}
        </motion.span>
      </InvitationShell>
    </motion.div>
  );
};
