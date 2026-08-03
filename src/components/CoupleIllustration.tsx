import React from 'react';
import { GuestSide } from '../types';

interface CoupleIllustrationProps {
  side?: GuestSide;
  className?: string;
}

/** Faceless couple illustration inspired by traditional Muslim wedding invites. */
export const CoupleIllustration: React.FC<CoupleIllustrationProps> = ({
  side = 'bride',
  className = '',
}) => {
  const accent = side === 'bride' ? '#7A2331' : '#1F4B3F';
  const dress = side === 'bride' ? '#F4EEE4' : '#EDE4D4';
  const sherwani = side === 'bride' ? '#F7F1E8' : accent;

  return (
    <svg
      viewBox="0 0 280 160"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft ground shadow */}
      <ellipse cx="140" cy="148" rx="90" ry="8" fill="#3B2A1E" opacity="0.08" />

      {/* Bride */}
      <g transform="translate(48, 18)">
        {/* Hijab / head */}
        <ellipse cx="42" cy="28" rx="28" ry="30" fill={dress} />
        <path
          d="M18 34 C18 10, 66 10, 66 34 L62 78 C55 88, 29 88, 22 78 Z"
          fill={dress}
          stroke="#C9B79A"
          strokeWidth="1"
        />
        {/* Face oval (blank) */}
        <ellipse cx="42" cy="36" rx="14" ry="16" fill="#E8D5C4" />
        {/* Body / gown */}
        <path
          d="M22 78 C10 96, 4 130, 8 148 L76 148 C80 130, 74 96, 62 78 C55 88, 29 88, 22 78 Z"
          fill={dress}
          stroke="#C9B79A"
          strokeWidth="1"
        />
        {/* Gold waist accent */}
        <path d="M24 96 H60" stroke="#C4A35A" strokeWidth="2" strokeLinecap="round" />
        {/* Bouquet */}
        <circle cx="78" cy="108" r="10" fill="#F8F4EE" stroke="#C9B79A" />
        <circle cx="86" cy="102" r="7" fill="#F8F4EE" stroke="#C9B79A" />
        <circle cx="72" cy="100" r="6" fill="#F1E6D4" />
        <path d="M70 112 C66 120, 62 124, 58 126" stroke="#6B8F5A" strokeWidth="1.5" />
      </g>

      {/* Groom */}
      <g transform="translate(148, 16)">
        {/* Head */}
        <ellipse cx="42" cy="30" rx="18" ry="20" fill="#E8D5C4" />
        {/* Hair */}
        <path d="M24 28 C26 10, 58 10, 60 28 C52 18, 32 18, 24 28 Z" fill="#2A2118" />
        {/* Sherwani */}
        <path
          d="M18 52 C14 70, 10 110, 12 148 L72 148 C74 110, 70 70, 66 52 C58 60, 26 60, 18 52 Z"
          fill={sherwani}
          stroke={side === 'bride' ? '#C9B79A' : '#14352C'}
          strokeWidth="1"
        />
        {/* Buttons */}
        <circle cx="42" cy="78" r="2" fill="#C4A35A" />
        <circle cx="42" cy="92" r="2" fill="#C4A35A" />
        <circle cx="42" cy="106" r="2" fill="#C4A35A" />
        {/* Shawl */}
        <path
          d="M18 56 C8 70, 6 100, 10 130 L28 130 C24 100, 26 72, 32 58 Z"
          fill="#D8C3A0"
          opacity="0.9"
        />
      </g>

      {/* Small floral between them */}
      <g transform="translate(126, 118)">
        <circle cx="14" cy="8" r="5" fill="#F8F4EE" stroke="#C9B79A" />
        <circle cx="22" cy="12" r="4" fill="#F1E6D4" />
        <circle cx="8" cy="14" r="3.5" fill="#F8F4EE" />
        <path d="M14 14 V26" stroke="#6B8F5A" strokeWidth="1.5" />
      </g>
    </svg>
  );
};
