import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { FloralCorners } from './FloralCorners';
import { CoupleIllustration } from './CoupleIllustration';

interface InvitationEnvelopeProps {
  guest: Guest;
  theme: ThemeColors;
  onOpen: () => void;
}

export const InvitationEnvelope: React.FC<InvitationEnvelopeProps> = ({
  guest,
  theme,
  onOpen,
}) => {
  const [opening, setOpening] = useState(false);

  const brideFirst = guest.side === 'bride';
  const topName = brideFirst ? 'Ammara Saleem' : 'Ali Shah';
  const bottomName = brideFirst ? 'Ali Shah' : 'Ammara Saleem';

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 420);
  };

  return (
    <motion.button
      type="button"
      onClick={handleOpen}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: opening ? 0 : 1, y: opening ? -8 : 0, scale: opening ? 0.97 : 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-[400px] mx-auto text-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C4A35A]/40 rounded-[28px]"
      aria-label="Open wedding invitation"
    >
      <div
        className="relative overflow-hidden rounded-[28px] px-5 pt-8 pb-5 shadow-[0_22px_50px_-18px_rgba(59,42,30,0.35)]"
        style={{
          background:
            'linear-gradient(180deg, #FBF7F0 0%, #F3EADF 45%, #EADDC8 100%)',
        }}
      >
        <FloralCorners />

        {/* Soft scalloped center panel */}
        <div
          className="relative z-10 mx-auto mt-6 mb-2 w-[88%] rounded-[40px] px-4 py-7"
          style={{
            background: 'linear-gradient(180deg, #E8D7BC 0%, #DFC9A8 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(90,64,40,0.12)',
          }}
        >
          <p className="font-serif-display text-[22px] leading-none text-[#3B2A1E] mb-3">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="text-[10px] uppercase tracking-[0.22em] text-[#5C4634]/80 mb-1">
            With Allah&apos;s blessings
          </p>
          <p className="text-[12px] text-[#5C4634] leading-relaxed max-w-[240px] mx-auto mb-4">
            A personal invitation for
          </p>

          <p className="font-serif-display text-xl text-[#3B2A1E] font-semibold mb-5">
            {guest.honorific ? `${guest.honorific} ` : ''}
            {guest.full_name}
          </p>

          <div className="mb-5">
            <p className="font-script text-[42px] leading-[0.95] text-[#3B2A1E]">{topName}</p>
            <p className="font-script text-[28px] leading-none text-[#7A5A3A] my-1">&</p>
            <p className="font-script text-[42px] leading-[0.95] text-[#3B2A1E]">{bottomName}</p>
          </div>

          <p
            className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-1"
            style={{ color: theme.accent }}
          >
            {guest.event_name}
          </p>
          <p className="text-[12px] text-[#5C4634] mb-5">{guest.event_date}</p>

          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold text-white"
            style={{ backgroundColor: theme.accent }}
          >
            {opening ? 'Opening…' : 'Tap to open'}
          </motion.span>
        </div>

        <CoupleIllustration side={guest.side} className="relative z-10 mx-auto mt-1 w-[220px]" />
      </div>
    </motion.button>
  );
};
