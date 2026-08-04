import React from 'react';

interface InvitationShellProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  variant?: 'teaser' | 'details';
  /** Tighter slot + no scroll — used for dual-event cards that must stay in frame */
  compact?: boolean;
}

export const InvitationShell: React.FC<InvitationShellProps> = ({
  children,
  className = '',
  as = 'div',
  onClick,
  disabled,
  ariaLabel,
  variant = 'teaser',
  compact = false,
}) => {
  const imageSrc = variant === 'details' ? '/secondpage.png' : '/background.png';

  const sharedClassName = [
    'relative w-full overflow-hidden bg-[#F6EEE8]',
    // Mobile: true full-screen
    'h-[100dvh] max-h-[100dvh]',
    // Desktop: natural invitation card
    'sm:h-auto sm:max-h-none sm:max-w-[420px] sm:mx-auto',
    'sm:shadow-[0_20px_50px_-20px_rgba(60,40,50,0.45)]',
    className,
  ].join(' ');

  const slotClass =
    variant === 'details'
      ? compact
        ? 'absolute z-10 inset-x-[11%] top-[10%] bottom-[9%] flex flex-col items-center justify-center text-center overflow-hidden px-0.5 py-0.5 sm:inset-x-[14%] sm:top-[12%] sm:bottom-[11%]'
        : 'absolute z-10 inset-x-[14%] top-[12%] bottom-[11%] flex flex-col items-center justify-center text-center overflow-hidden px-1 py-1 sm:inset-x-[18%] sm:top-[15%] sm:bottom-[14%]'
      : 'absolute z-10 inset-x-[12%] top-[18%] bottom-[30%] flex flex-col items-center justify-center text-center overflow-y-auto overscroll-contain px-1 py-1 sm:top-[20%] sm:bottom-[32%]';

  const content = (
    <>
      <img
        src={imageSrc}
        alt=""
        draggable={false}
        className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover object-center sm:static sm:h-auto sm:w-full sm:object-contain"
      />
      <div className={slotClass}>{children}</div>
    </>
  );

  if (as === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`${sharedClassName} cursor-pointer border-0 p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8B4D5C]/35`}
      >
        {content}
      </button>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
};
