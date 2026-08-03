import React from 'react';

interface InvitationShellProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  /** teaser = sealed cover (background.png); details = opened invite (secondpage.png) */
  variant?: 'teaser' | 'details';
}

export const InvitationShell: React.FC<InvitationShellProps> = ({
  children,
  className = '',
  as = 'div',
  onClick,
  disabled,
  ariaLabel,
  variant = 'teaser',
}) => {
  const sharedClassName = `relative w-full max-w-[400px] mx-auto overflow-hidden shadow-[0_20px_50px_-20px_rgba(60,40,50,0.45)] ${className}`;
  const imageSrc = variant === 'details' ? '/secondpage.png' : '/background.png';

  // Keep text inside the scalloped panel (inset more so florals don't clip)
  const slotClass =
    variant === 'details'
      ? 'absolute inset-x-[18%] top-[16%] bottom-[16%] z-10 flex flex-col items-center justify-center text-center px-2'
      : 'absolute inset-x-[12%] top-[20%] bottom-[34%] z-10 flex flex-col items-center justify-center text-center px-1';

  const content = (
    <>
      <img
        src={imageSrc}
        alt=""
        className="block w-full h-auto select-none"
        draggable={false}
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
        className={`${sharedClassName} cursor-pointer p-0 border-0 bg-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8B4D5C]/35`}
      >
        {content}
      </button>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
};
