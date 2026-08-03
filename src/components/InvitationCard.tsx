import React from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { InvitationShell } from './InvitationShell';
import { getDateParts } from '../utils/dateParts';

interface InvitationCardProps {
  guest: Guest;
  theme: ThemeColors;
  onReseal?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ guest, onReseal }) => {
  const parts = getDateParts(guest.event_date, guest.event_time);
  const brideFirst = guest.side === 'bride';
  const topName = brideFirst ? 'Ammara Saleem' : 'Ali Shah';
  const bottomName = brideFirst ? 'Ali Shah' : 'Ammara Saleem';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <InvitationShell variant="details">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full flex-col items-center"
        >
          <p className="font-serif-display text-[clamp(14px,3.8vw,18px)] leading-none text-[#4A2F38]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="font-label mt-1.5 text-[8px] uppercase tracking-[0.28em] text-[#6B4A55]">
            With Allah&apos;s Blessings
          </p>

          <p className="font-serif-display mt-1 max-w-[230px] text-[11px] italic leading-snug text-[#6B4A55]">
            Together with our families, we invite you to the {guest.event_name.toLowerCase()} of
          </p>

          <div className="mt-1 mb-0.5">
            <h1 className="font-script text-[clamp(32px,9vw,44px)] leading-[0.9] text-[#5C2E3E]">
              {topName}
            </h1>
            <p className="font-script text-[clamp(20px,5.5vw,28px)] leading-none text-[#8B5A6A]">
              &
            </p>
            <h1 className="font-script text-[clamp(32px,9vw,44px)] leading-[0.9] text-[#5C2E3E]">
              {bottomName}
            </h1>
          </div>

          <div className="mt-1 flex items-baseline justify-center gap-2 text-[#4A2F38]">
            <span className="font-label text-[8px] uppercase tracking-[0.18em]">{parts.day}</span>
            <span className="text-[#C4A0A8] text-[10px]">·</span>
            <span className="font-serif-display text-[20px] font-semibold leading-none">
              {parts.dateNum}
            </span>
            <span className="text-[#C4A0A8] text-[10px]">·</span>
            <span className="font-label text-[8px] uppercase tracking-[0.18em]">
              {parts.time.replace(/^AT\s+/i, '')}
            </span>
          </div>

          <p className="font-label mt-0.5 text-[8px] uppercase tracking-[0.22em] text-[#6B4A55]">
            {parts.month} {parts.year}
          </p>

          <p className="font-label mt-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#3D2430]">
            {guest.venue_name}
          </p>

          <p className="font-serif-display mt-1 text-[11px] text-[#4A2F38]">
            For{' '}
            <span className="italic font-semibold">
              {guest.honorific ? `${guest.honorific} ` : ''}
              {guest.full_name}
            </span>
          </p>

          <div className="mt-2 flex w-full max-w-[220px] flex-col items-stretch gap-1.5">
            <a
              href={guest.rsvp_whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center justify-center rounded-full bg-[#6B3A4A] px-4 text-[10px] font-label font-medium uppercase tracking-[0.14em] text-white leading-none"
            >
              RSVP on WhatsApp
            </a>
            <a
              href={guest.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif-display text-[11px] italic text-[#6B3A4A] underline-offset-2 hover:underline"
            >
              Get directions
            </a>
          </div>

          {onReseal && (
            <button
              type="button"
              onClick={onReseal}
              className="font-label mt-1 text-[7px] uppercase tracking-[0.2em] text-[#9A7A82]"
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
