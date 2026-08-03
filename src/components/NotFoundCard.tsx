import React from 'react';
import { motion } from 'motion/react';
import { InvitationShell } from './InvitationShell';

export const NotFoundCard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
      <InvitationShell variant="teaser">
        <p className="font-serif-display text-[16px] leading-none text-[#4A2F38]">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <h2
          className="font-script mt-3 text-4xl text-[#5C2E3E]"
          style={{ fontFamily: '"Alex Brush", cursive' }}
        >
          Invitation
        </h2>
        <p className="font-serif-display mt-3 max-w-[200px] text-[13px] italic leading-relaxed text-[#6B4A55]">
          This invitation link is invalid or no longer active. Please use the personal link that was
          shared with you.
        </p>
      </InvitationShell>
    </motion.div>
  );
};
