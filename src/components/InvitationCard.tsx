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
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <InvitationShell variant="details">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex w-full max-w-[280px] flex-col items-center"
        >
          <p className="font-serif-display text-[clamp(18px,4.8vw,24px)] leading-none text-[#3B2A1E]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="font-label mt-3 text-[9px] uppercase tracking-[0.28em] text-[#5C4634]">
            With Allah&apos;s Blessings
          </p>

          <p className="font-serif-display mt-2 max-w-[250px] text-[12px] sm:text-[13px] leading-relaxed text-[#5C4634]">
            Together with our families we request the honour of your presence at the{' '}
            <span className="font-semibold lowercase">{guest.event_name}</span> of
          </p>

          {/* Couple names — large flowing script */}
          <div className="my-3 w-full">
            <h1 className="font-script text-[clamp(40px,11vw,54px)] leading-[0.95] text-[#3B2A1E]">
              {topName}
            </h1>
            <p className="font-script my-0.5 text-[clamp(26px,7vw,34px)] leading-none text-[#7A5A3A]">
              &
            </p>
            <h1 className="font-script text-[clamp(40px,11vw,54px)] leading-[0.95] text-[#3B2A1E]">
              {bottomName}
            </h1>
          </div>

          {/* Date bar */}
          <div className="mb-3 flex w-full max-w-[270px] overflow-hidden rounded-sm text-white shadow-sm">
            <div className="flex w-[27%] items-center justify-center bg-[#3B2A1E] px-1 py-2.5 text-[8px] font-label font-semibold uppercase tracking-wider">
              {parts.day}
            </div>
            <div className="flex flex-1 items-center justify-center bg-[#6B3A4A] px-2 py-2.5 text-[9px] font-label font-semibold uppercase tracking-[0.12em]">
              {parts.dateLine}
            </div>
            <div className="flex w-[28%] items-center justify-center bg-[#3B2A1E] px-1 py-2.5 text-[8px] font-label font-semibold uppercase tracking-wider">
              {parts.time}
            </div>
          </div>

          <p className="font-label text-[10px] font-medium uppercase tracking-[0.2em] text-[#3B2A1E]">
            {guest.venue_name}
          </p>
          <p className="font-serif-display mt-1 max-w-[250px] text-[11px] leading-snug text-[#5C4634]">
            {guest.venue_address}
          </p>

          <p className="font-serif-display mt-3 text-[12px] text-[#3B2A1E]">
            Prepared for{' '}
            <span className="italic font-semibold">
              {guest.honorific ? `${guest.honorific} ` : ''}
              {guest.full_name}
            </span>
          </p>

          {guest.custom_message && (
            <p className="font-serif-display mt-2 max-w-[240px] text-[11px] italic leading-relaxed text-[#5C4634]">
              {guest.custom_message}
            </p>
          )}

          <div className="mt-4 flex w-full max-w-[240px] flex-col items-stretch gap-2">
            <a
              href={guest.rsvp_whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#6B3A4A] px-4 text-[10px] font-label font-medium uppercase tracking-[0.14em] text-white leading-none shadow-sm"
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
              className="font-label mt-2 text-[8px] uppercase tracking-[0.2em] text-[#8A7060]"
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
