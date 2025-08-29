import React from 'react';
import '../styles/design-system.css';
import styles from '../styles/AnimatedButton.module.css';
import { useTheme } from '../context/ThemeContext';
import { EnhancedButton } from './ui/EnhancedButton';

type ColorTheme = 'purple' | 'green' | 'red' | 'blue' | 'orange' | 'pink' | 'cyan' | 'gold';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  accentColor?: string;
  secondaryColor?: string;
  variant?: 'default' | 'animated' | 'enhanced';
  theme?: ColorTheme;
  useGlobalTheme?: boolean;
  // Enhanced button props
  loading?: boolean;
  href?: string;
  external?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  buttonVariant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  accentColor, 
  secondaryColor,
  variant = 'animated',
  theme,
  useGlobalTheme = true,
  style,
  className,
  loading,
  href,
  external,
  size = 'md',
  buttonVariant = 'primary',
  ...props 
}) => {
  // Use enhanced button for better responsiveness
  if (variant === 'enhanced') {
    return (
      <EnhancedButton
        variant={buttonVariant}
        size={size}
        loading={loading}
        href={href}
        external={external}
        className={className}
        {...props}
      >
        {children}
      </EnhancedButton>
    );
  }

  // Use global theme if available and no specific theme is provided
  let globalTheme = null;
  let globalColors = null;
  
  try {
    const themeContext = useTheme();
    if (useGlobalTheme && !theme && !accentColor && !secondaryColor) {
      globalTheme = themeContext.preferences.theme !== 'custom' ? themeContext.preferences.theme : null;
      globalColors = themeContext.getCurrentColors();
    }
  } catch {
    // Theme context not available, continue without it
  }

  if (variant === 'default') {
    return (
      <button className={`button animate-entrance ${className || ''}`} {...props} style={style}>
        {children}
      </button>
    );
  }

  // Build custom styles object
  const customStyles: React.CSSProperties = {
    ...style
  };

  // Priority: direct props > global theme > defaults
  const finalAccentColor = accentColor || globalColors?.accentColor;
  const finalSecondaryColor = secondaryColor || globalColors?.secondaryColor;
  const finalTheme = theme || globalTheme;

  // If custom colors are provided, use them
  if (finalAccentColor) {
    customStyles['--accent-color' as any] = finalAccentColor;
  }
  if (finalSecondaryColor) {
    customStyles['--secondary-color' as any] = finalSecondaryColor;
  }

  // Build className with theme
  const buttonClassName = [
    styles.animatedButton,
    finalTheme ? styles[`theme-${finalTheme}`] : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClassName}
      style={customStyles}
      {...props}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </button>
  );
};

export default Button;
