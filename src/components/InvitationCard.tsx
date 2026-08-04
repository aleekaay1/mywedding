import React from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors, WeddingEvent } from '../types';
import { InvitationShell } from './InvitationShell';
import { getDateParts } from '../utils/dateParts';
import {
  getCoupleLine,
  getInvitePhrase,
  getRsvpUrl,
  isBothEvents,
  resolveGuestEvents,
} from '../utils/guestEvents';
import { OrnamentDivider } from './OrnamentDivider';

interface InvitationCardProps {
  guest: Guest;
  theme: ThemeColors;
  onReseal?: () => void;
}

function formatEventLine(event: WeddingEvent) {
  const parts = getDateParts(event.event_date, event.event_time);
  const dayShort = parts.day.slice(0, 3);
  const dayLabel = dayShort.charAt(0) + dayShort.slice(1).toLowerCase();
  const monthLabel = parts.month.charAt(0) + parts.month.slice(1).toLowerCase();
  const timeLabel = parts.time.replace(/^AT\s+/i, '').replace(/\s*Onwards/i, '');
  return {
    dateLine: `${dayLabel}, ${monthLabel} ${parts.dateNum}`,
    timeLine: timeLabel,
  };
}

/** Compact column for dual-event side-by-side layout */
const SideEventColumn: React.FC<{ event: WeddingEvent }> = ({ event }) => {
  const { dateLine, timeLine } = formatEventLine(event);
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center px-1">
      <p className="font-label text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6B3A4A]">
        {event.event_name}
      </p>
      <p className="font-serif-display mt-0.5 text-[12px] font-semibold leading-tight text-[#3B2A1E]">
        {dateLine}
      </p>
      <p className="font-serif-display text-[12px] text-[#5C4634]">{timeLine}</p>
      <p className="font-serif-display mt-1 text-[12px] font-semibold leading-snug text-[#3B2A1E]">
        {event.venue_name}
      </p>
      <a
        href={event.maps_url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif-display mt-0.5 text-[11px] italic text-[#6B3A4A] underline-offset-2 hover:underline"
      >
        Directions
      </a>
    </div>
  );
};

const SingleEventBlock: React.FC<{ event: WeddingEvent }> = ({ event }) => {
  const parts = getDateParts(event.event_date, event.event_time);
  const dayLabel = parts.day.charAt(0) + parts.day.slice(1).toLowerCase();
  const monthLabel = parts.month.charAt(0) + parts.month.slice(1).toLowerCase();
  const timeLabel = parts.time.replace(/^AT\s+/i, '');

  return (
    <>
      <p className="font-label text-[10px] font-medium uppercase tracking-[0.16em] text-[#3B2A1E] sm:text-[11px]">
        {event.event_name}
      </p>
      <p className="font-serif-display mt-0.5 text-[17px] font-semibold leading-tight text-[#3B2A1E] sm:text-[18px]">
        {dayLabel}, {monthLabel} {parts.dateNum}
      </p>
      <p className="font-serif-display mt-0.5 text-[14px] text-[#5C4634] sm:text-[15px]">
        {timeLabel} · {parts.year}
      </p>
      <p className="font-label mt-2.5 text-[10px] uppercase tracking-[0.16em] text-[#3B2A1E] sm:text-[11px]">
        {event.venue_name}
      </p>
      <p className="font-serif-display mt-1 max-w-[230px] text-[13px] leading-snug text-[#5C4634] line-clamp-2 sm:text-[14px]">
        {event.venue_address}
      </p>
    </>
  );
};

export const InvitationCard: React.FC<InvitationCardProps> = ({ guest, onReseal }) => {
  const events = resolveGuestEvents(guest);
  const both = isBothEvents(guest);
  const coupleLine = getCoupleLine(guest);
  const invitePhrase = getInvitePhrase(guest);
  const rsvpUrl = getRsvpUrl(guest);
  const single = events[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="w-full h-full"
    >
      <InvitationShell variant="details" compact={both}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className={`flex w-full flex-col items-center ${both ? 'max-w-[300px]' : 'max-w-[290px]'}`}
        >
          <p
            className={`font-serif-display leading-none text-[#3B2A1E] ${
              both ? 'text-[18px] sm:text-[20px]' : 'text-[21px] sm:text-[24px]'
            }`}
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p
            className={`font-label uppercase tracking-[0.22em] text-[#5C4634] ${
              both ? 'mt-1.5 text-[9px]' : 'mt-2.5 text-[10px] sm:text-[11px]'
            }`}
          >
            With Allah&apos;s Blessings
          </p>

          <p
            className={`font-serif-display leading-snug text-[#5C4634] ${
              both
                ? 'mt-1.5 max-w-[260px] text-[13px]'
                : 'mt-2.5 max-w-[240px] text-[14px] sm:text-[15px]'
            }`}
          >
            You are invited to the {invitePhrase} of
          </p>

          <h1
            className={`font-script leading-[1.1] text-[#3B2A1E] ${
              both ? 'mt-1 mb-1 text-[38px] sm:text-[44px]' : 'mt-2 mb-2 text-[44px] sm:text-[52px]'
            }`}
            style={{ fontFamily: '"Alex Brush", cursive' }}
          >
            {coupleLine}
          </h1>

          <OrnamentDivider className={`max-w-[140px] ${both ? 'mb-1.5' : 'mb-2.5 sm:mb-3'}`} />

          {both ? (
            <div className="flex w-full max-w-[280px] items-stretch">
              <SideEventColumn event={events[0]} />
              <div className="w-px self-stretch bg-[#3B2A1E]/20" />
              <SideEventColumn event={events[1]} />
            </div>
          ) : single ? (
            <SingleEventBlock event={single} />
          ) : null}

          <OrnamentDivider className={`max-w-[140px] ${both ? 'mt-2 mb-1.5' : 'mt-3 mb-2.5'}`} />

          <p className={`font-serif-display italic text-[#5C4634] ${both ? 'text-[12px]' : 'text-[13px] sm:text-[14px]'}`}>
            Prepared for
          </p>
          <p
            className={`font-serif-display max-w-[240px] font-semibold leading-tight text-[#3B2A1E] ${
              both ? 'text-[14px]' : 'text-[16px] sm:text-[17px]'
            }`}
          >
            {guest.honorific ? `${guest.honorific} ` : ''}
            {guest.full_name}
          </p>

          <div
            className={`flex w-full flex-col items-center gap-1.5 ${
              both ? 'mt-2 max-w-[250px]' : 'mt-3.5 max-w-[230px] gap-2 sm:mt-4 sm:max-w-[240px]'
            }`}
          >
            <a
              href={rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full items-center justify-center rounded-full bg-[#6B3A4A] font-label font-medium uppercase tracking-[0.12em] text-white leading-none ${
                both ? 'h-9 text-[10px]' : 'h-10 text-[11px]'
              }`}
            >
              RSVP on WhatsApp
            </a>

            {!both && single && (
              <a
                href={single.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center rounded-full border-2 border-[#6B3A4A] bg-[#FBF7F0]/95 text-[11px] font-label font-medium uppercase tracking-[0.12em] text-[#6B3A4A] leading-none"
              >
                Get Directions
              </a>
            )}
          </div>

          {onReseal && (
            <button
              type="button"
              onClick={onReseal}
              className={`font-label uppercase tracking-[0.18em] text-[#8A7060] pb-[env(safe-area-inset-bottom)] ${
                both ? 'mt-1 text-[7px]' : 'mt-2 text-[8px]'
              }`}
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
