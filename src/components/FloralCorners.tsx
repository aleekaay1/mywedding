import React from 'react';

/** Soft watercolor-style floral clusters for invitation corners. */
export const FloralCorners: React.FC<{ variant?: 'top' | 'bottom' | 'all' }> = ({
  variant = 'all',
}) => {
  const showTop = variant === 'top' || variant === 'all';
  const showBottom = variant === 'bottom' || variant === 'all';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {showTop && (
        <>
          <svg className="absolute -left-2 -top-1 w-[150px] opacity-90" viewBox="0 0 160 140" fill="none">
            <FlowerCluster />
          </svg>
          <svg
            className="absolute -right-2 -top-1 w-[150px] opacity-90 scale-x-[-1]"
            viewBox="0 0 160 140"
            fill="none"
          >
            <FlowerCluster />
          </svg>
        </>
      )}
      {showBottom && (
        <>
          <svg
            className="absolute -bottom-1 -left-2 w-[140px] opacity-85 scale-y-[-1]"
            viewBox="0 0 160 140"
            fill="none"
          >
            <FlowerCluster warm />
          </svg>
          <svg
            className="absolute -bottom-1 -right-2 w-[140px] opacity-85 scale-x-[-1] scale-y-[-1]"
            viewBox="0 0 160 140"
            fill="none"
          >
            <FlowerCluster warm />
          </svg>
        </>
      )}
    </div>
  );
};

function FlowerCluster({ warm = false }: { warm?: boolean }) {
  const petal = warm ? '#F3E6D4' : '#FBF8F2';
  const petalDeep = warm ? '#E8D4B8' : '#F0E6D6';
  const leaf = '#6F8F5C';
  const leafDeep = '#557448';
  const rose = warm ? '#C9A38A' : '#D8B4A0';

  return (
    <g>
      <path d="M20 90 C10 60, 30 30, 55 40 C40 55, 35 75, 40 100 Z" fill={leaf} opacity="0.85" />
      <path d="M45 100 C55 70, 85 55, 105 70 C85 75, 70 90, 65 115 Z" fill={leafDeep} opacity="0.75" />
      <path d="M15 55 C5 40, 18 18, 38 22 C28 35, 22 48, 28 62 Z" fill={leaf} opacity="0.7" />

      <circle cx="58" cy="48" r="18" fill={petal} />
      <circle cx="72" cy="38" r="15" fill={petalDeep} />
      <circle cx="48" cy="34" r="14" fill={petal} />
      <circle cx="64" cy="28" r="12" fill={petalDeep} />
      <circle cx="60" cy="40" r="7" fill={rose} opacity="0.55" />

      <circle cx="95" cy="58" r="12" fill={petal} />
      <circle cx="106" cy="50" r="10" fill={petalDeep} />
      <circle cx="90" cy="48" r="9" fill={petal} />
      <circle cx="98" cy="52" r="4" fill={rose} opacity="0.5" />

      <circle cx="30" cy="72" r="9" fill="#B7A0C4" opacity="0.55" />
      <circle cx="40" cy="66" r="7" fill="#C4B0D4" opacity="0.45" />
      <circle cx="112" cy="78" r="6" fill="#B7A0C4" opacity="0.4" />
    </g>
  );
}
