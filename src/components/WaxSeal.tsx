import React from 'react';
import { motion } from 'motion/react';

interface WaxSealProps {
  onCrack: () => void;
  isCracking: boolean;
  accentColor?: string; // #7A2331 or #1F4B3F
  monogram?: string;
  size?: number;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  onCrack,
  isCracking,
  accentColor = '#7A2331',
  monogram = 'Z & B',
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer subtle glow/pulse effect before opening */}
      {!isCracking && (
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 110,
            height: 110,
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Main Wax Seal Interactive Button */}
      <motion.button
        type="button"
        onClick={onCrack}
        disabled={isCracking}
        aria-label="Tap to open wedding invitation"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        animate={
          isCracking
            ? {
                scale: [1, 1.15, 0],
                opacity: [1, 0.9, 0],
                rotate: [0, 15, -20],
              }
            : { scale: 1, opacity: 1, rotate: 0 }
        }
        transition={
          isCracking
            ? { duration: 0.65, ease: [0.36, 0, 0.66, -0.56] }
            : { duration: 0.2 }
        }
        className="relative z-20 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#B08D3F]/40 rounded-full select-none"
        style={{ width: 96, height: 96 }}
      >
        {/* Realistic organic wax outer shape with scalloped edge */}
        <div
          className="w-full h-full rounded-full shadow-2xl relative flex items-center justify-center border-2 border-[#D4AF37]/60 overflow-hidden"
          style={{
            backgroundColor: accentColor,
            backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.3) 80%), radial-gradient(circle at 70% 70%, ${accentColor} 0%, #150508 100%)`,
            boxShadow:
              '0 12px 28px -6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)',
          }}
        >
          {/* Gold metallic ring accent */}
          <div className="absolute inset-2.5 rounded-full border border-[#D4AF37]/70 flex items-center justify-center shadow-inner opacity-90">
            <div className="absolute inset-1 rounded-full border border-[#B08D3F]/30" />
            
            {/* Monogram / Calligraphy center */}
            <div className="flex flex-col items-center justify-center text-center text-[#F5EFE2] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span className="font-serif-display text-lg font-bold tracking-wider leading-none text-[#FBF7EE]">
                {monogram}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-0.5">
                SEAL
              </span>
            </div>
          </div>

          {/* Gold foil stamp shimmer line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none transform -rotate-45" />

          {/* Crack lines overlaid when cracking animation triggers */}
          {isCracking && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-30"
              viewBox="0 0 100 100"
            >
              <path
                d="M50,10 L48,35 L55,50 L42,70 L50,90"
                stroke="#F5EFE2"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M55,50 L75,45 L85,60"
                stroke="#F5EFE2"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M48,35 L20,30 L15,45"
                stroke="#F5EFE2"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </motion.button>
    </div>
  );
};
