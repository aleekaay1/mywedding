import React from 'react';

/** Thin line with a center diamond — separates guest name from couple names. */
export const OrnamentDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`flex w-full max-w-[160px] items-center gap-2 ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#6B3A4A]/45" />
      <span className="inline-block h-1.5 w-1.5 rotate-45 border border-[#6B3A4A]/70 bg-[#6B3A4A]/25" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#6B3A4A]/45" />
    </div>
  );
};
