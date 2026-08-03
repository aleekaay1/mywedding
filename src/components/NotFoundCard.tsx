import React from 'react';
import { motion } from 'motion/react';
import { JaaliBackground } from './JaaliBackground';
import { HelpCircle } from 'lucide-react';

export const NotFoundCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-[420px] mx-auto rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col justify-between items-center text-center overflow-hidden border border-[#B08D3F]/40"
      style={{
        backgroundColor: '#F5EFE2',
        backgroundImage: 'radial-gradient(ellipse at top, #FAF6EE 0%, #F0E8D7 100%)',
      }}
    >
      <JaaliBackground opacity={0.06} color="#B08D3F" />

      <div className="absolute inset-3.5 rounded-xl border border-[#B08D3F]/30 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center py-6">
        <div className="w-12 h-12 rounded-full bg-[#7A2331]/10 text-[#7A2331] border border-[#7A2331]/30 flex items-center justify-center mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>

        <h2 className="font-serif-display text-2xl font-bold text-[#241C15] mb-2">
          Invitation Not Found
        </h2>

        <p className="text-sm text-[#241C15]/80 max-w-[300px] leading-relaxed">
          This invitation link is invalid or no longer active. Please use the personal link that was shared with you.
        </p>
      </div>
    </motion.div>
  );
};
