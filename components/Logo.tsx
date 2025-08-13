import React from "react";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = "full", 
  size = "md", 
  className = "" 
}) => {
  const sizeMap = {
    sm: { width: 80, height: 28, fontSize: 12 },
    md: { width: 120, height: 40, fontSize: 18 },
    lg: { width: 160, height: 54, fontSize: 24 },
    xl: { width: 200, height: 68, fontSize: 30 }
  };

  const { width, height, fontSize } = sizeMap[size];

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <svg 
          width={height * 0.8} 
          height={height * 0.8} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="logo-icon"
        >
          <defs>
            <linearGradient id="logo-gradient-icon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          
          {/* L Shape with modern twist */}
          <rect x="4" y="4" width="4" height="20" fill="url(#logo-gradient-icon)" rx="2" />
          <rect x="4" y="20" width="16" height="4" fill="url(#logo-gradient-icon)" rx="2" />
          <rect x="16" y="12" width="4" height="12" fill="url(#logo-gradient-icon)" rx="2" />
          
          {/* Connecting dots - life connections */}
          <circle cx="24" cy="8" r="2" fill="#a78bfa" opacity="0.8" />
          <circle cx="28" cy="14" r="1.5" fill="#10b981" opacity="0.9" />
          <circle cx="26" cy="20" r="1.5" fill="#0ea5e9" opacity="0.7" />
        </svg>
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <span 
          className="font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-400 to-emerald-500"
          style={{ fontSize: `${fontSize}px` }}
        >
          LISTO
        </span>
      </div>
    );
  }

  // Full logo
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 120 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        
        {/* L - Life Intelligence */}
        <rect x="4" y="8" width="3" height="20" fill="url(#logo-gradient)" rx="1.5" />
        <rect x="4" y="25" width="12" height="3" fill="url(#logo-gradient)" rx="1.5" />
        
        {/* I - Integration */}
        <rect x="20" y="12" width="3" height="16" fill="url(#logo-gradient)" rx="1.5" />
        <rect x="20" y="8" width="3" height="2" fill="url(#logo-gradient)" rx="1" />
        
        {/* S - Support */}
        <path 
          d="M28 16C28 14 29.5 12 32 12C34.5 12 36 14 36 16C36 18 34.5 18 32 18C29.5 18 28 20 28 22C28 24 29.5 26 32 26C34.5 26 36 24 36 22"
          stroke="url(#logo-gradient)" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* T - Through */}
        <rect x="40" y="12" width="8" height="3" fill="url(#logo-gradient)" rx="1.5" />
        <rect x="42" y="15" width="3" height="13" fill="url(#logo-gradient)" rx="1.5" />
        
        {/* O - Optimization */}
        <circle cx="56" cy="20" r="8" stroke="url(#logo-gradient)" strokeWidth="3" fill="none" />
        
        {/* Connecting elements - representing neural pathways and connections */}
        <circle cx="68" cy="14" r="1.5" fill="#a78bfa" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="74" cy="18" r="1" fill="#10b981" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="24" r="1.2" fill="#0ea5e9" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Subtle connecting lines */}
        <line x1="68" y1="15" x2="70" y2="23" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.4" />
        <line x1="70" y1="17" x2="74" y2="19" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
  );
};

export default Logo;