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
  const dayLabel = parts.day.charAt(0) + parts.day.slice(1).toLowerCase();
  const monthLabel = parts.month.charAt(0) + parts.month.slice(1).toLowerCase();
  const timeLabel = parts.time.replace(/^AT\s+/i, '');
  return {
    dateLine: `${dayLabel}, ${monthLabel} ${parts.dateNum}`,
    timeLine: `${timeLabel} · ${parts.year}`,
  };
}

const CompactEventBlock: React.FC<{ event: WeddingEvent; showDirections?: boolean }> = ({
  event,
  showDirections = true,
}) => {
  const { dateLine, timeLine } = formatEventLine(event);
  return (
    <div className="w-full max-w-[240px]">
      <p className="font-label text-[9px] font-medium uppercase tracking-[0.16em] text-[#3B2A1E] sm:text-[10px]">
        {event.event_name}
      </p>
      <p className="font-serif-display mt-0.5 text-[14px] font-semibold leading-tight text-[#3B2A1E] sm:text-[15px]">
        {dateLine}
      </p>
      <p className="font-serif-display text-[12px] text-[#5C4634] sm:text-[13px]">{timeLine}</p>
      <p className="font-serif-display mt-1 text-[12px] font-semibold text-[#3B2A1E] sm:text-[13px]">
        {event.venue_name}
      </p>
      {showDirections && (
        <a
          href={event.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif-display mt-0.5 inline-block text-[11px] italic text-[#6B3A4A] underline-offset-2 hover:underline sm:text-[12px]"
        >
          Directions
        </a>
      )}
    </div>
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
      <InvitationShell variant="details">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex w-full max-w-[290px] flex-col items-center"
        >
          <p className="font-serif-display text-[19px] leading-none text-[#3B2A1E] sm:text-[22px]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          <p className="font-label mt-2.5 text-[9px] uppercase tracking-[0.24em] text-[#5C4634] sm:text-[10px]">
            With Allah&apos;s Blessings
          </p>

          <p className="font-serif-display mt-2.5 max-w-[230px] text-[13px] leading-snug text-[#5C4634] sm:text-[14px]">
            You are invited to the {invitePhrase} of
          </p>

          <h1
            className="font-script mt-2 mb-2 text-[40px] leading-[1.15] text-[#3B2A1E] sm:text-[48px]"
            style={{ fontFamily: '"Alex Brush", cursive' }}
          >
            {coupleLine}
          </h1>

          <OrnamentDivider className="mb-2.5 max-w-[150px] sm:mb-3" />

          {both ? (
            <div className="flex w-full flex-col items-center gap-2">
              {events.map((event, index) => (
                <React.Fragment key={event.key}>
                  {index > 0 && <div className="h-px w-16 bg-[#3B2A1E]/20" />}
                  <CompactEventBlock event={event} />
                </React.Fragment>
              ))}
            </div>
          ) : single ? (
            <>
              <CompactEventBlock event={single} showDirections={false} />
              <p className="font-serif-display mt-1 max-w-[230px] text-[12px] leading-snug text-[#5C4634] line-clamp-2 sm:text-[13px]">
                {single.venue_address}
              </p>
            </>
          ) : null}

          <OrnamentDivider className="mt-3 mb-2.5 max-w-[150px]" />

          <p className="font-serif-display text-[12px] italic text-[#5C4634] sm:text-[13px]">
            Prepared for
          </p>
          <p className="font-serif-display max-w-[230px] text-[15px] font-semibold leading-tight text-[#3B2A1E] sm:text-[16px]">
            {guest.honorific ? `${guest.honorific} ` : ''}
            {guest.full_name}
          </p>

          <div className="mt-3.5 flex w-full max-w-[220px] flex-col items-center gap-2 sm:mt-4 sm:max-w-[230px]">
            <a
              href={rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#6B3A4A] text-[10px] font-label font-medium uppercase tracking-[0.12em] text-white leading-none"
            >
              RSVP on WhatsApp
            </a>

            {!both && single && (
              <a
                href={single.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center rounded-full border-2 border-[#6B3A4A] bg-[#FBF7F0]/95 text-[10px] font-label font-medium uppercase tracking-[0.12em] text-[#6B3A4A] leading-none"
              >
                Get Directions
              </a>
            )}
          </div>

          {onReseal && (
            <button
              type="button"
              onClick={onReseal}
              className="font-label mt-2 pb-[env(safe-area-inset-bottom)] text-[8px] uppercase tracking-[0.18em] text-[#8A7060]"
            >
              Close
            </button>
          )}
        </motion.div>
      </InvitationShell>
    </motion.div>
  );
};
