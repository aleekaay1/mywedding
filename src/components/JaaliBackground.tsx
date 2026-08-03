import React from 'react';

interface JaaliBackgroundProps {
  opacity?: number;
  color?: string;
  className?: string;
}

export const JaaliBackground: React.FC<JaaliBackgroundProps> = ({
  opacity = 0.08,
  color = '#B08D3F',
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="jaali-lattice"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Islamic 8-point geometric star & square lattice motif */}
            <g stroke={color} strokeWidth="1" fill="none" opacity="0.9">
              {/* Central 8-pointed star */}
              <polygon points="30,10 35,22 47,22 38,30 42,42 30,34 18,42 22,30 13,22 25,22" />
              <polygon points="30,12 33,20 42,20 35,26 38,36 30,30 22,36 25,26 18,20 27,20" />
              
              {/* Border square grid */}
              <rect x="0" y="0" width="60" height="60" strokeDasharray="2,2" />
              
              {/* Diagonal connecting lines forming secondary rosettes */}
              <path d="M0,0 L15,15 M60,0 L45,15 M0,60 L15,45 M60,60 L45,45" />
              <path d="M30,0 L30,10 M30,50 L30,60 M0,30 L10,30 M50,30 L60,30" />
              
              {/* Corner mini geometric octagons */}
              <polygon points="0,5 5,0 10,0 15,5 15,10 10,15 5,15 0,10" />
              <polygon points="45,5 50,0 55,0 60,5 60,10 55,15 50,15 45,10" />
              <polygon points="0,50 5,45 10,45 15,50 15,55 10,60 5,60 0,55" />
              <polygon points="45,50 50,45 55,45 60,50 60,55 55,60 50,60 45,55" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jaali-lattice)" />
      </svg>
    </div>
  );
};
