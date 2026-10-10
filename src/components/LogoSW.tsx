import React from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  variant?: 'circle' | 'transparent';
  showText?: boolean;
}

export const LogoSW: React.FC<LogoProps> = ({
  size = 42,
  className = '',
  variant = 'circle',
  showText = false,
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
        aria-label="Soch Wale Logo"
      >
        {variant === 'circle' ? (
          <>
            {/* Outer Deep Black Circle */}
            <circle cx="100" cy="100" r="98" fill="#0A0A0A" />
            {/* Inset crisp white ring */}
            <circle
              cx="100"
              cy="100"
              r="89"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
            />
            {/* Central deep black inner medallion */}
            <circle cx="100" cy="100" r="86" fill="#0A0A0A" />
          </>
        ) : null}

        {/* Official SW Monogram Path */}
        <g id="SW-Monogram">
          {/* Stylized S merging into W */}
          <path
            d="M 68 73 C 65 67 59 64 51 64 C 41 64 33 70 33 80 C 33 90 40 96 52 101 C 69 108 77 117 77 131 C 77 146 64 156 47 156 C 36 156 26 150 20 142 L 27 134 C 32 141 39 145 47 145 C 57 145 64 139 64 130 C 64 120 56 113 43 107 C 28 100 21 91 21 79 C 21 63 35 53 52 53 C 62 53 71 58 77 65 Z"
            fill={variant === 'circle' ? '#FFFFFF' : 'currentColor'}
          />
          {/* Elegant serif W overlapping and intertwining with S */}
          <path
            d="M 66 62 L 78 62 L 95 125 L 115 62 L 128 62 L 148 125 L 165 62 L 177 62 L 155 145 L 141 145 L 122 84 L 102 145 L 89 145 Z"
            fill={variant === 'circle' ? '#FFFFFF' : 'currentColor'}
          />
          {/* Classical serif bracket details */}
          <path
            d="M 62 62 H 78 V 65 H 62 Z M 165 62 H 181 V 65 H 165 Z"
            fill={variant === 'circle' ? '#FFFFFF' : 'currentColor'}
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-extrabold tracking-wider text-base uppercase text-white font-serif">
            SOCH WALE
          </span>
          <span className="text-xs font-urdu text-[#B89A5A] pt-0.5">
            سوچ والے
          </span>
        </div>
      )}
    </div>
  );
};

export default LogoSW;
