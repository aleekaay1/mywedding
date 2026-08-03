import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Guest, ThemeColors } from '../types';
import { WaxSeal } from './WaxSeal';
import { JaaliBackground } from './JaaliBackground';
import { Sparkles } from 'lucide-react';

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
  const [isCracking, setIsCracking] = useState(false);

  const handleSealTap = () => {
    if (isCracking) return;
    setIsCracking(true);
    // Short delay for crack animation before revealing card
    setTimeout(() => {
      onOpen();
    }, 550);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[420px] mx-auto min-h-[540px] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center overflow-hidden border border-[#B08D3F]/40"
      style={{
        backgroundColor: '#F5EFE2',
        backgroundImage: 'radial-gradient(ellipse at top, #FAF6EE 0%, #F0E8D7 100%)',
      }}
    >
      {/* Subtle Islamic Jaali pattern at near-zero opacity (~4%) in closed state */}
      <JaaliBackground opacity={0.04} color={theme.gold} />

      {/* Gold Foil Envelope Frame Border */}
      <div className="absolute inset-3 rounded-xl border border-[#B08D3F]/40 pointer-events-none flex flex-col justify-between p-1">
        <div className="w-full h-full border border-[#B08D3F]/20 rounded-lg" />
      </div>

      {/* Top Header & Bismillah / Monogram */}
      <div className="relative z-10 pt-4 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border border-[#B08D3F]/40 flex items-center justify-center mb-3 bg-[#FAF6EE]/80 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#B08D3F]" />
        </div>
        
        {/* Arabic Bismillah / Ornamental Header */}
        <p className="font-serif-display text-xl sm:text-2xl text-[#7A2331] font-semibold tracking-wide drop-shadow-xs">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#241C15]/60 mt-1 font-medium">
          Wedding Invitation
        </p>
      </div>

      {/* Middle Center Envelope Body with Recipient Name & Wax Seal */}
      <div className="relative z-10 my-6 w-full flex flex-col items-center justify-center">
        {/* Envelope Top Flap Graphic Lines */}
        <div className="w-full max-w-[280px] h-[1px] bg-gradient-to-r from-transparent via-[#B08D3F]/60 to-transparent mb-6" />

        <div className="mb-6 px-4 py-3 rounded-lg bg-[#F5EFE2]/60 border border-[#B08D3F]/20 backdrop-blur-xs max-w-[320px]">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-[#B08D3F] font-bold mb-1">
            Specially Prepared For
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#241C15] font-bold leading-tight">
            {guest.honorific ? `${guest.honorific} ` : ''}
            {guest.full_name}
          </h2>
        </div>

        {/* Wax Seal Button */}
        <WaxSeal
          onCrack={handleSealTap}
          isCracking={isCracking}
          accentColor={theme.accent}
          monogram={guest.couple_names || 'Z & B'}
        />

        {/* Tap Prompt */}
        <motion.p
          animate={{ opacity: isCracking ? 0 : [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-medium tracking-wider text-[#241C15]/80 uppercase mt-5"
        >
          {isCracking ? 'Opening Invitation...' : 'Tap the seal to open your invitation'}
        </motion.p>
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 pb-2">
        <div className="flex items-center gap-2 justify-center text-[11px] text-[#241C15]/70">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
          <span className="font-medium tracking-wide">
            {guest.event_name} · {guest.side === 'bride' ? "Girl's Side" : "Boy's Side"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
