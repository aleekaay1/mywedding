import React from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { InvitationShell } from './InvitationShell';
import { getDateParts } from '../utils/dateParts';
import { OrnamentDivider } from './OrnamentDivider';

interface InvitationCardProps {
  guest: Guest;
  theme: ThemeColors;
  onReseal?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ guest, onReseal }) => {
  const parts = getDateParts(guest.event_date, guest.event_time);
  const coupleLine = guest.side === 'bride' ? 'Ammara & Ali' : 'Ali & Ammara';
  const timeLabel = parts.time.replace(/^AT\s+/i, '');
  const dayLabel = parts.day.charAt(0) + parts.day.slice(1).toLowerCase();
  const monthLabel = parts.month.charAt(0) + parts.month.slice(1).toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="w-full h-full"
    >
      <InvitationShell variant="details">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex w-full max-w-[260px] flex-col items-center"
        >
          <p className="font-serif-display text-[15px] leading-none text-[#3B2A1E] sm:text-[18px]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="font-label mt-1.5 text-[7px] uppercase tracking-[0.22em] text-[#5C4634] sm:mt-2 sm:text-[8px]">
            With Allah&apos;s Blessings
          </p>

          <p className="font-serif-display mt-1.5 max-w-[200px] text-[11px] leading-snug text-[#5C4634] sm:mt-2 sm:text-[12px]">
            You are invited to the {guest.event_name.toLowerCase()} of
          </p>

          <h1
            className="font-script mt-1 mb-1 text-[28px] leading-[1.15] text-[#3B2A1E] sm:mt-2 sm:mb-2 sm:text-[38px]"
            style={{ fontFamily: '"Alex Brush", cursive' }}
          >
            {coupleLine}
          </h1>

          <OrnamentDivider className="mb-1.5 max-w-[120px] sm:mb-2.5" />

          <p className="font-serif-display text-[13px] font-semibold leading-tight text-[#3B2A1E] sm:text-[15px]">
            {dayLabel}, {monthLabel} {parts.dateNum}
          </p>
          <p className="font-serif-display mt-0.5 text-[12px] text-[#5C4634] sm:text-[13px]">
            {timeLabel} · {parts.year}
          </p>

          <p className="font-label mt-2 text-[8px] uppercase tracking-[0.16em] text-[#3B2A1E] sm:mt-3 sm:text-[9px]">
            {guest.venue_name}
          </p>
          <p className="font-serif-display mt-0.5 max-w-[200px] text-[10px] leading-snug text-[#5C4634] line-clamp-2 sm:max-w-[220px] sm:text-[11px]">
            {guest.venue_address}
          </p>

          <OrnamentDivider className="mt-2 mb-1.5 max-w-[120px] sm:mt-3 sm:mb-2" />

          <p className="font-serif-display text-[10px] italic text-[#5C4634] sm:text-[11px]">
            Prepared for
          </p>
          <p className="font-serif-display max-w-[200px] text-[12px] font-semibold leading-tight text-[#3B2A1E] sm:text-[13px]">
            {guest.honorific ? `${guest.honorific} ` : ''}
            {guest.full_name}
          </p>

          <div className="mt-2.5 flex w-full max-w-[190px] flex-col items-center gap-1.5 sm:mt-3.5 sm:max-w-[200px] sm:gap-2">
            <a
              href={guest.rsvp_whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[#6B3A4A] text-[9px] font-label font-medium uppercase tracking-[0.12em] text-white leading-none sm:h-8"
            >
              RSVP on WhatsApp
            </a>
            <a
              href={guest.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-full items-center justify-center rounded-full border-2 border-[#6B3A4A] bg-[#FBF7F0]/95 text-[9px] font-label font-medium uppercase tracking-[0.12em] text-[#6B3A4A] leading-none sm:h-8"
            >
              Get Directions
            </a>
          </div>

          {onReseal && (
            <button
              type="button"
              onClick={onReseal}
              className="font-label mt-1.5 pb-[env(safe-area-inset-bottom)] text-[7px] uppercase tracking-[0.18em] text-[#8A7060]"
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
