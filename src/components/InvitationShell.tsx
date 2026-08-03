import React from 'react';

interface InvitationShellProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Exact invitation art from /background.png with a centered text slot.
 * Text lives in the white middle area between florals and the couple.
 */
export const InvitationShell: React.FC<InvitationShellProps> = ({
  children,
  className = '',
  as = 'div',
  onClick,
  disabled,
  ariaLabel,
}) => {
  const sharedClassName = `relative w-full max-w-[400px] mx-auto overflow-hidden shadow-[0_20px_50px_-20px_rgba(60,40,50,0.45)] ${className}`;

  const content = (
    <>
      <img
        src="/background.png"
        alt=""
        className="block w-full h-auto select-none"
        draggable={false}
      />

      {/* Text slot — white middle band of the artwork */}
      <div className="absolute inset-x-[11%] top-[23%] bottom-[30%] z-10 flex flex-col items-center justify-center text-center overflow-hidden px-1">
        {children}
      </div>
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
