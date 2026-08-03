import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { JaaliBackground } from './JaaliBackground';
import { Calendar, Clock, MapPin, Check, Copy, Sparkles } from 'lucide-react';

interface InvitationCardProps {
  guest: Guest;
  theme: ThemeColors;
  onReseal?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  guest,
  theme,
  onReseal,
}) => {
  const [copied, setCopied] = useState(false);

  const coupleNames = guest.couple_names || (guest.side === 'bride' ? 'Zoya & Bilal' : 'Bilal & Zoya');

  const handleCopyLink = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Build Google Calendar Add Link
  const buildGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${guest.event_name} - ${coupleNames}`);
    const details = encodeURIComponent(`Wedding Invitation for ${guest.honorific ? guest.honorific + ' ' : ''}${guest.full_name}.\nVenue: ${guest.venue_name}, ${guest.venue_address}`);
    const location = encodeURIComponent(`${guest.venue_name}, ${guest.venue_address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[420px] mx-auto rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center overflow-hidden border border-[#B08D3F]/50"
      style={{
        backgroundColor: '#F5EFE2',
        backgroundImage: 'radial-gradient(ellipse at top, #FAF6EE 0%, #F0E8D7 100%)',
      }}
    >
      {/* Jaali background lattice pattern fades up to ~15% opacity on reveal */}
      <JaaliBackground opacity={0.15} color={theme.gold} />

      {/* Gold Foil Double Frame */}
      <div className="absolute inset-3.5 rounded-xl border border-[#B08D3F]/50 pointer-events-none p-1">
        <div className="w-full h-full border border-[#B08D3F]/25 rounded-lg" />
      </div>

      {/* Card Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* 1. Eyebrow label (event + side) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-xs border mb-5"
          style={{
            color: theme.accent,
            backgroundColor: `${theme.accent}12`,
            borderColor: `${theme.accent}40`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
          {theme.label}
        </motion.div>

        {/* 2. "We joyfully welcome" greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[#241C15]/70 mb-2"
        >
          We Joyfully Welcome
        </motion.p>

        {/* 3. Guest's name in a large serif display font */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="w-full px-2 my-1"
        >
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#241C15] leading-tight tracking-wide">
            {guest.honorific ? (
              <span className="block text-lg sm:text-xl font-normal text-[#241C15]/80 italic mb-0.5">
                {guest.honorific}
              </span>
            ) : null}
            {guest.full_name}
          </h1>
        </motion.div>

        {/* 4. Thin gold ornament / divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="w-full max-w-[200px] my-4 flex items-center justify-center gap-2"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B08D3F] to-transparent" />
          <Sparkles className="w-3.5 h-3.5 text-[#B08D3F] flex-shrink-0" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B08D3F] to-transparent" />
        </motion.div>

        {/* 5. "to celebrate the wedding of [Couple Names]" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-[#241C15]/70 mb-1 font-medium">
            To Celebrate The Wedding Of
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold italic tracking-wide" style={{ color: theme.accent }}>
            {coupleNames}
          </h2>
          {guest.custom_message && (
            <p className="text-xs text-[#241C15]/80 italic max-w-[280px] mx-auto mt-2 leading-relaxed">
              "{guest.custom_message}"
            </p>
          )}
        </motion.div>

        {/* 6. Event Details in clean 2-column label/value layout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="w-full rounded-xl bg-[#FAF6EE]/90 border border-[#B08D3F]/30 p-4 shadow-sm mb-6 text-left"
        >
          <div className="grid grid-cols-1 gap-3.5 divide-y divide-[#B08D3F]/15">
            {/* Event Name & Date */}
            <div className="flex items-start gap-3 pt-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs"
                style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
              >
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B08D3F]">
                  Date & Event
                </span>
                <span className="block font-semibold text-sm text-[#241C15]">
                  {guest.event_name} · {guest.event_date}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3 pt-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs"
                style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B08D3F]">
                  Timing
                </span>
                <span className="block font-semibold text-sm text-[#241C15]">
                  {guest.event_time}
                </span>
              </div>
            </div>

            {/* Venue & Address */}
            <div className="flex items-start gap-3 pt-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs"
                style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B08D3F]">
                  Venue
                </span>
                <span className="block font-semibold text-sm text-[#241C15] leading-snug">
                  {guest.venue_name}
                </span>
                <span className="block text-xs text-[#241C15]/75 mt-0.5 leading-tight">
                  {guest.venue_address}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 7. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          className="w-full flex flex-col gap-2.5 mb-6"
        >
          {/* Primary Button: RSVP on WhatsApp */}
          <a
            href={guest.rsvp_whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-xl text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.accent,
            }}
          >
            <span>RSVP on WhatsApp</span>
          </a>

          {/* Secondary Outline Button: View map */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <a
              href={guest.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-[#B08D3F] text-[#241C15] bg-[#FAF6EE] font-medium text-xs tracking-wide shadow-2xs hover:bg-[#F5EFE2] transition-colors flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B08D3F]" />
              <span>View Map</span>
            </a>

            {/* Extra Guest Delight: Add to Calendar */}
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-[#B08D3F]/60 text-[#241C15] bg-[#FAF6EE] font-medium text-xs tracking-wide shadow-2xs hover:bg-[#F5EFE2] transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B08D3F]" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </motion.div>

        {/* 8. Small footer line confirming invitation was made for that specific guest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="w-full pt-4 border-t border-[#B08D3F]/25 flex flex-col items-center gap-2"
        >
          <p className="text-[11px] text-[#241C15]/70 italic max-w-[320px]">
            Personal invitation prepared exclusively for{' '}
            <strong className="font-semibold text-[#241C15]">
              {guest.honorific ? `${guest.honorific} ` : ''}
              {guest.full_name}
            </strong>
          </p>

          {/* Utility Toolbar for guest link copy & envelope re-seal */}
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 text-[11px] text-[#B08D3F] font-semibold hover:underline cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Guest Link</span>
                </>
              )}
            </button>

            {onReseal && (
              <>
                <span className="text-[#B08D3F]/40">•</span>
                <button
                  type="button"
                  onClick={onReseal}
                  className="inline-flex items-center gap-1 text-[11px] text-[#241C15]/60 hover:text-[#241C15] font-medium cursor-pointer"
                >
                  <span>Re-seal Envelope</span>
                </button>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
