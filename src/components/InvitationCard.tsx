import React from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { FloralCorners } from './FloralCorners';
import { CoupleIllustration } from './CoupleIllustration';
import { getDateParts } from '../utils/dateParts';
import { MapPin } from 'lucide-react';

interface InvitationCardProps {
  guest: Guest;
  theme: ThemeColors;
  onReseal?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ guest, theme, onReseal }) => {
  const parts = getDateParts(guest.event_date, guest.event_time);
  const brideFirst = guest.side === 'bride';
  const topName = brideFirst ? 'Ammara Saleem' : 'Ali Shah';
  const bottomName = brideFirst ? 'Ali Shah' : 'Ammara Saleem';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[400px] mx-auto"
    >
      <div
        className="relative overflow-hidden rounded-[28px] px-4 pt-7 pb-5 shadow-[0_22px_50px_-18px_rgba(59,42,30,0.35)]"
        style={{
          background: 'linear-gradient(180deg, #FBF7F0 0%, #F3EADF 40%, #EADDC8 100%)',
        }}
      >
        <FloralCorners />

        <div
          className="relative z-10 mx-auto w-[92%] rounded-[42px] px-4 pt-8 pb-6 text-center"
          style={{
            background: 'linear-gradient(180deg, #E8D7BC 0%, #E0C9A6 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(90,64,40,0.12)',
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif-display text-[22px] sm:text-[24px] leading-none text-[#3B2A1E] mb-3"
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="text-[10px] uppercase tracking-[0.2em] text-[#5C4634]/85 mb-1"
          >
            With Allah&apos;s blessings
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
            className="text-[12px] sm:text-[13px] text-[#5C4634] leading-relaxed max-w-[260px] mx-auto mb-1"
          >
            Together with our families we request the honour of your presence at the{' '}
            <span className="font-semibold lowercase">{guest.event_name}</span> of
          </motion.p>

          {/* Couple names — script, stacked like the reference */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="my-4"
          >
            <h1 className="font-script text-[46px] sm:text-[50px] leading-[0.95] text-[#3B2A1E]">
              {topName}
            </h1>
            <p className="font-script text-[30px] leading-none text-[#7A5A3A] my-0.5">&</p>
            <h1 className="font-script text-[46px] sm:text-[50px] leading-[0.95] text-[#3B2A1E]">
              {bottomName}
            </h1>
          </motion.div>

          {/* Date bar — day | date | time */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mx-auto mb-4 flex w-full max-w-[300px] overflow-hidden rounded-md text-white shadow-sm"
          >
            <div
              className="flex w-[28%] items-center justify-center px-1 py-2.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#3B2A1E' }}
            >
              {parts.day}
            </div>
            <div
              className="flex flex-1 items-center justify-center px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: theme.accent }}
            >
              {parts.dateLine}
            </div>
            <div
              className="flex w-[30%] items-center justify-center px-1 py-2.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#3B2A1E' }}
            >
              {parts.time}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3B2A1E]">
              {guest.venue_name}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#5C4634] max-w-[270px] mx-auto">
              {guest.venue_address}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.56 }}
            className="text-[11px] italic text-[#5C4634] max-w-[260px] mx-auto mb-5 leading-relaxed"
          >
            {guest.custom_message ||
              'We invite you to come together to honor the couple and celebrate their special day.'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[11px] text-[#3B2A1E] mb-4"
          >
            Prepared for{' '}
            <span className="font-semibold">
              {guest.honorific ? `${guest.honorific} ` : ''}
              {guest.full_name}
            </span>
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68 }}
            className="flex flex-col gap-2"
          >
            <a
              href={guest.rsvp_whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full py-3 text-sm font-semibold tracking-wide text-white shadow-md active:scale-[0.98] transition-transform"
              style={{ backgroundColor: theme.accent }}
            >
              RSVP on WhatsApp
            </a>
            <a
              href={guest.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#3B2A1E]/25 bg-[#FBF7F0]/70 py-2.5 text-xs font-medium text-[#3B2A1E]"
            >
              <MapPin className="h-3.5 w-3.5" />
              Get Directions
            </a>
          </motion.div>
        </div>

        <CoupleIllustration side={guest.side} className="relative z-10 mx-auto -mt-1 w-[240px]" />

        {onReseal && (
          <button
            type="button"
            onClick={onReseal}
            className="relative z-10 mx-auto mt-1 block text-[10px] uppercase tracking-[0.18em] text-[#5C4634]/70 hover:text-[#3B2A1E]"
          >
            Close invitation
          </button>
        )}
      </div>
    </motion.div>
  );
};
