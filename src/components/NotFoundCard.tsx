import React from 'react';
import { motion } from 'motion/react';
import { FloralCorners } from './FloralCorners';

export const NotFoundCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-[400px] overflow-hidden rounded-[28px] px-6 py-12 text-center shadow-[0_22px_50px_-18px_rgba(59,42,30,0.35)]"
      style={{
        background: 'linear-gradient(180deg, #FBF7F0 0%, #EADDC8 100%)',
      }}
    >
      <FloralCorners />
      <div className="relative z-10">
        <p className="font-serif-display text-xl text-[#3B2A1E] mb-3">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <h2 className="font-script text-4xl text-[#3B2A1E] mb-3">Invitation</h2>
        <p className="text-sm text-[#5C4634] max-w-[280px] mx-auto leading-relaxed">
          This invitation link is invalid or no longer active. Please use the personal link that was
          shared with you.
        </p>
      </div>
    </motion.div>
  );
};
