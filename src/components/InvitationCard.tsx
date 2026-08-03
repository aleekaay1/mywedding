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
  const coupleLine = guest.side === 'bride' ? 'Ammara Weds Ali' : 'Ali Weds Ammara';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <InvitationShell variant="details">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex w-full max-w-[240px] flex-col items-center px-1"
        >
          <p className="font-serif-display text-[18px] sm:text-[20px] leading-none text-[#3B2A1E]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="font-label mt-2.5 text-[8px] uppercase tracking-[0.26em] text-[#5C4634]">
            With Allah&apos;s Blessings
          </p>

          <p className="font-serif-display mt-2 text-[12px] leading-snug text-[#5C4634]">
            You are invited to the {guest.event_name.toLowerCase()} of
          </p>

          <h1 className="font-script mt-2 mb-3 text-[clamp(28px,8vw,36px)] leading-none text-[#3B2A1E] whitespace-nowrap">
            {coupleLine}
          </h1>

          {/* Simple date / time — no heavy bar */}
          <p className="font-serif-display text-[15px] font-semibold text-[#3B2A1E]">
            {parts.day.charAt(0) + parts.day.slice(1).toLowerCase()}, {parts.month.charAt(0)}
            {parts.month.slice(1).toLowerCase()} {parts.dateNum}
          </p>
          <p className="font-serif-display mt-0.5 text-[13px] text-[#5C4634]">
            {parts.time.replace(/^AT\s+/i, '')} · {parts.year}
          </p>

          <div className="my-3 h-px w-12 bg-[#3B2A1E]/25" />

          <p className="font-label text-[9px] uppercase tracking-[0.18em] text-[#3B2A1E]">
            {guest.venue_name}
          </p>
          <p className="font-serif-display mt-1 max-w-[220px] text-[11px] leading-snug text-[#5C4634] line-clamp-2">
            {guest.venue_address}
          </p>

          <p className="font-serif-display mt-3 text-[12px] text-[#3B2A1E]">
            For{' '}
            <span className="italic font-semibold">
              {guest.honorific ? `${guest.honorific} ` : ''}
              {guest.full_name}
            </span>
          </p>

          <div className="mt-3.5 flex w-full max-w-[200px] flex-col items-center gap-2">
            <a
              href={guest.rsvp_whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-full items-center justify-center rounded-full bg-[#6B3A4A] text-[9px] font-label font-medium uppercase tracking-[0.14em] text-white leading-none"
            >
              RSVP on WhatsApp
            </a>
            <a
              href={guest.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif-display text-[12px] italic text-[#6B3A4A] underline-offset-2 hover:underline"
            >
              Get directions
            </a>
          </div>

          {onReseal && (
            <button
              type="button"
              onClick={onReseal}
              className="font-label mt-2 text-[7px] uppercase tracking-[0.2em] text-[#8A7060]"
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
