<<<<<<< HEAD
// components/ui/button.tsx
import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none select-none shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
        ghost: "bg-transparent text-blue-600 hover:underline focus:ring-blue-200",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-10 px-4",
        lg: "h-12 px-6",
      },
      loading: {
        true: "cursor-wait opacity-70 pointer-events-none",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  tooltip?: string;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      tooltip,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    // Ripple effect
    const rippleRef = React.useRef<HTMLSpanElement>(null);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (rippleRef.current && !props.disabled && !loading) {
        const ripple = document.createElement("span");
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.className = `button-ripple ripple-${variant || "default"}`;
        rippleRef.current.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
      if (props.onClick) props.onClick(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, loading, fullWidth }),
          "transition-transform duration-150 hover:scale-[1.03] active:scale-95",
          props.disabled || loading ? "grayscale cursor-not-allowed" : "",
          className
        )}
        disabled={loading || props.disabled}
        onClick={handleClick}
        title={tooltip}
        {...props}
      >
        <span ref={rippleRef} className="absolute inset-0 pointer-events-none"></span>
        {loading ? (
          <span className="mr-2 flex items-center animate-fade-in">
            <span className="animate-spin rounded-full border-2 border-t-transparent border-white border-solid h-4 w-4"></span>
          </span>
        ) : leftIcon ? (
          <span className="mr-2 flex items-center transition-transform duration-200 group-hover:-translate-x-1">{leftIcon}</span>
        ) : null}
        <span className={loading ? "opacity-70" : ""}>{children}</span>
        {rightIcon && !loading && (
          <span className="ml-2 flex items-center transition-transform duration-200 group-hover:translate-x-1">{rightIcon}</span>
        )}
        {/* Tooltip */}
        {tooltip && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded shadow z-20">
            {tooltip}
          </span>
        )}
        <style>{`
          .button-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
          }
          .ripple-default { background: rgba(255,255,255,0.3);}
          .ripple-outline { background: rgba(59,130,246,0.15);}
          .ripple-ghost { background: rgba(59,130,246,0.10);}
          .ripple-danger { background: rgba(255,0,0,0.15);}
          @keyframes ripple {
            to {
              transform: scale(2.5);
              opacity: 0;
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = "Button";
=======
// components/ui/button.tsx
import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // assumes you have a utils.ts with a `cn` function

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        ghost: "bg-transparent text-blue-600 hover:underline",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
>>>>>>> 8df89d2bc80e9e2044fd245a0f679c0376fadb67
