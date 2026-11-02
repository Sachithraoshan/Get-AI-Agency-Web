import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  invert?: boolean;
}

export const GetPathSymbol: React.FC<{
  size?: number;
  className?: string;
  invert?: boolean;
  color?: string;
}> = ({
  size = 32,
  className = '',
  invert = false,
}) => {
  // Use the exact official transparent PNG provided by the founder
  const imgSrc = invert ? '/logo-white.png' : '/logo-transparent.png';

  return (
    <img
      src={imgSrc}
      alt="GET AI The GET Path Symbol"
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 object-contain ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      loading="eager"
    />
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 28,
  showWordmark = true,
  className = '',
  wordmarkClassName = '',
  invert = false,
}) => {
  const textColor = invert ? 'text-white' : 'text-black';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <GetPathSymbol size={size} invert={invert} />
      {showWordmark && (
        <div className="flex flex-col">
          <span className={`text-base font-bold tracking-tight leading-none uppercase ${textColor} ${wordmarkClassName}`}>
            GET AI
          </span>
          <span className={`text-[9px] font-medium tracking-[0.25em] uppercase opacity-70 mt-0.5 ${textColor}`}>
            AGENCY
          </span>
        </div>
      )}
    </div>
  );
};
