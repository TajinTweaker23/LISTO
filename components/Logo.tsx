import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // You can add any custom props here if needed
}

const Logo = (props: LogoProps) => {
  return (
    <svg
      width="124"
      height="36"
      viewBox="0 0 124 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LISTO Logo"
      {...props}
    >
      <path
        d="M18 3C19.4916 3 20.9224 3.43316 22.1433 4.23881C23.3642 5.04446 24.3284 6.18811 24.9388 7.53331L30.5612 19.4667C31.1716 20.8119 31.4333 22.2881 31.3211 23.761C31.2089 25.2339 30.7266 26.6583 29.9217 27.8767C29.1168 29.0951 28.0216 30.0633 26.7456 30.6865C25.4696 31.3097 24.058 31.5667 22.65 31.43L3 29"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="42"
        y="27"
        fontFamily="var(--font-display, 'Syne', sans-serif)"
        fontSize="28"
        fontWeight="800"
        fill="currentColor"
      >
        LISTO
      </text>
    </svg>
  );
};

export default Logo;