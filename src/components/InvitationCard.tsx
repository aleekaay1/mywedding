import React from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { InvitationShell } from './InvitationShell';
import { getDateParts } from '../utils/dateParts';
import { MapPin } from 'lucide-react';

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
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <InvitationShell>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex h-full w-full flex-col items-center justify-center"
        >
          <p className="font-serif-display text-[clamp(15px,4.2vw,20px)] leading-none text-[#4A2F38] mb-1">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="text-[8px] uppercase tracking-[0.2em] text-[#6B4A55] mb-1">
            With Allah&apos;s blessings
          </p>

          <p className="text-[10px] sm:text-[11px] text-[#6B4A55] leading-snug max-w-[240px] mb-1">
            Together with our families we invite you to the{' '}
            <span className="font-semibold text-[#5C2E3E]">{guest.event_name}</span> of
          </p>

          <div className="my-1.5">
            <h1 className="font-script text-[clamp(30px,8.5vw,42px)] leading-[0.92] text-[#5C2E3E]">
              {topName}
            </h1>
            <p className="font-script text-[clamp(18px,5vw,24px)] leading-none text-[#8B5A6A]">&</p>
            <h1 className="font-script text-[clamp(30px,8.5vw,42px)] leading-[0.92] text-[#5C2E3E]">
              {bottomName}
            </h1>
          </div>

          {/* Compact date row matching the artwork palette */}
          <div className="mb-1.5 flex w-full max-w-[250px] items-center justify-center gap-2 text-[#4A2F38]">
            <span className="text-[9px] uppercase tracking-wider font-medium">{parts.day}</span>
            <span className="text-[#C4A0A8]">|</span>
            <span className="font-serif-display text-[15px] sm:text-[17px] font-semibold leading-none">
              {parts.dateNum}
            </span>
            <span className="text-[#C4A0A8]">|</span>
            <span className="text-[9px] uppercase tracking-wider font-medium">
              {parts.time.replace(/^AT\s+/i, '')}
            </span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.16em] text-[#6B4A55] mb-1.5">
            {parts.month} {parts.year}
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3D2430]">
            {guest.venue_name}
          </p>
          <p className="mt-0.5 text-[9px] leading-snug text-[#6B4A55] max-w-[230px] line-clamp-2">
            {guest.venue_address}
          </p>

          <p className="mt-1.5 text-[9px] text-[#4A2F38]">
            For{' '}
            <span className="font-semibold">
              {guest.honorific ? `${guest.honorific} ` : ''}
              {guest.full_name}
            </span>
          </p>

          <div className="mt-2 flex w-full max-w-[240px] flex-col gap-1.5">
            <a
              href={guest.rsvp_whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#6B3A4A] py-2 text-[11px] font-semibold tracking-wide text-white shadow-sm active:scale-[0.98] transition-transform"
            >
              RSVP on WhatsApp
            </a>
            <a
              href={guest.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-full border border-[#6B3A4A]/30 bg-white/70 py-1.5 text-[10px] font-medium text-[#5C2E3E]"
            >
              <MapPin className="h-3 w-3" />
              Get Directions
            </a>
          </div>

          {onReseal && (
            <button
              type="button"
              onClick={onReseal}
              className="mt-1.5 text-[8px] uppercase tracking-[0.18em] text-[#8B6A72] hover:text-[#5C2E3E]"
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
