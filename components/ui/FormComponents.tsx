import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ChevronDown, AlertCircle, Check } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "floating" | "filled";
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    label, 
    error, 
    success, 
    hint, 
    leftIcon, 
    rightIcon, 
    variant = "default",
    type,
    className = "",
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const hasError = !!error;
    const hasSuccess = !!success;

    const baseClasses = `
      w-full px-4 py-3 border rounded-2xl transition-all duration-200 outline-none
      ${leftIcon ? "pl-12" : ""}
      ${rightIcon || isPassword ? "pr-12" : ""}
      ${hasError ? "border-red-300 bg-red-50" : ""}
      ${hasSuccess ? "border-green-300 bg-green-50" : ""}
      ${!hasError && !hasSuccess ? "border-sage-200 focus:border-sage-400" : ""}
      ${variant === "filled" ? "bg-sage-50" : "bg-white"}
    `;

    const floatingLabelClasses = `
      absolute left-4 transition-all duration-200 pointer-events-none
      ${isFocused || props.value || props.defaultValue 
        ? "text-xs top-2 text-sage-600" 
        : "text-base top-1/2 transform -translate-y-1/2 text-sage-400"
      }
    `;

    const renderStateIcon = () => {
      if (hasError) return <AlertCircle className="w-5 h-5 text-red-500" />;
      if (hasSuccess) return <Check className="w-5 h-5 text-green-500" />;
      return null;
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          {variant === "floating" && label && (
            <label className={floatingLabelClasses}>
              {label}
            </label>
          )}
          
          {variant !== "floating" && label && (
            <label className="block text-sm font-medium text-sage-700 mb-2">
              {label}
            </label>
          )}

          {leftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`${baseClasses} ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {renderStateIcon()}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sage-400 hover:text-sage-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}
            {!isPassword && rightIcon && rightIcon}
          </div>
        </div>

        {(error || success || hint) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm"
          >
            {error && <p className="text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>}
            {success && <p className="text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              {success}
            </p>}
            {hint && !error && !success && <p className="text-sage-500">{hint}</p>}
          </motion.div>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-sage-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3 text-left border rounded-2xl transition-all duration-200 outline-none
            ${error ? "border-red-300 bg-red-50" : "border-sage-200 hover:border-sage-300 focus:border-sage-400"}
            ${selectedOption ? "text-sage-900" : "text-sage-400"}
          `}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            ↓
          </motion.div>
        </button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            y: isOpen ? 0 : -10,
            pointerEvents: isOpen ? "auto" : "none"
          }}
          className="absolute z-10 w-full mt-2 bg-white border border-sage-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-sage-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = "md",
}) => {
  const sizes = {
    sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
  };

  const sizeConfig = sizes[size];

  return (
    <div className="flex items-center justify-between">
      {label && (
        <span className="text-sm font-medium text-sage-700">{label}</span>
      )}
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex ${sizeConfig.track} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2
          ${checked ? "bg-sage-600" : "bg-gray-200"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <motion.span
          layout
          className={`
            ${sizeConfig.thumb} pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 
            transition ease-in-out duration-200
          `}
          animate={{
            x: checked ? sizeConfig.translate.split('-')[1] : "0px"
          }}
        />
      </button>
    </div>
  );
};

export default FormField;
