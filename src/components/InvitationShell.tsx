import React from 'react';

interface InvitationShellProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  /** Opened card needs more bottom clearance so content clears the couple. */
  variant?: 'teaser' | 'details';
}

/**
 * Exact invitation art from /background.png with a text slot in the white band.
 */
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

  // Details: start higher, end well above the couple heads (~38–40% from bottom)
  const slotClass =
    variant === 'details'
      ? 'absolute inset-x-[12%] top-[18%] bottom-[38%] z-10 flex flex-col items-center justify-start text-center px-1 pt-1'
      : 'absolute inset-x-[12%] top-[20%] bottom-[34%] z-10 flex flex-col items-center justify-center text-center px-1';

  const content = (
    <>
      <img
        src="/background.png"
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
