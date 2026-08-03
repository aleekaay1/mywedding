import React from 'react';
import { motion } from 'motion/react';
import { InvitationShell } from './InvitationShell';

export const NotFoundCard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <InvitationShell>
        <p className="font-serif-display text-[20px] leading-none text-[#4A2F38] mb-2">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <h2 className="font-script text-4xl text-[#5C2E3E] mb-2">Invitation</h2>
        <p className="text-[12px] text-[#6B4A55] max-w-[220px] leading-relaxed">
          This invitation link is invalid or no longer active. Please use the personal link that was
          shared with you.
        </p>
      </InvitationShell>
    </motion.div>
  );
};
