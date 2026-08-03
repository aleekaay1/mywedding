import React from 'react';
import { motion } from 'motion/react';

interface WaxSealProps {
  onCrack: () => void;
  isCracking: boolean;
  accentColor?: string;
}

/** Simple circular monogram seal — initials only, clean and tap-friendly. */
export const WaxSeal: React.FC<WaxSealProps> = ({
  onCrack,
  isCracking,
  accentColor = '#7A2331',
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {!isCracking && (
        <motion.span
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: 112,
            height: 112,
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.button
        type="button"
        onClick={onCrack}
        disabled={isCracking}
        aria-label="Tap to open wedding invitation"
        whileHover={isCracking ? undefined : { scale: 1.05 }}
        whileTap={isCracking ? undefined : { scale: 0.94 }}
        animate={
          isCracking
            ? { scale: [1, 1.12, 0], opacity: [1, 0.9, 0], rotate: [0, -12] }
            : { scale: 1, opacity: 1, rotate: 0 }
        }
        transition={
          isCracking
            ? { duration: 0.5, ease: [0.4, 0, 0.7, 0] }
            : { type: 'spring', stiffness: 400, damping: 24 }
        }
        className="relative z-10 flex h-[96px] w-[96px] cursor-pointer items-center justify-center rounded-full select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B08D3F]/40"
        style={{
          background: `radial-gradient(circle at 35% 28%, ${accentColor} 0%, ${accentColor} 55%, #1a0a0c 100%)`,
          boxShadow: `0 10px 28px -8px ${accentColor}99, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* Gold double ring */}
        <span
          aria-hidden
          className="absolute inset-[6px] rounded-full border-[1.5px]"
          style={{ borderColor: '#D4AF37' }}
        />
        <span
          aria-hidden
          className="absolute inset-[11px] rounded-full border"
          style={{ borderColor: 'rgba(212,175,55,0.45)' }}
        />

        {/* Initials */}
        <span className="relative flex items-baseline gap-1.5 font-serif-display text-[#FAF6EE]">
          <span className="text-[28px] font-semibold leading-none tracking-wide">A</span>
          <span className="text-[14px] font-normal leading-none text-[#E8C96A]">&</span>
          <span className="text-[28px] font-semibold leading-none tracking-wide">A</span>
        </span>
      </motion.button>
    </div>
  );
};
