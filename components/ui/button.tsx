import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative group overflow-hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none select-none shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
        ghost:
          "bg-transparent text-blue-600 hover:underline focus:ring-blue-200",
        outline:
          "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
        glow: "text-green-400 bg-gray-800 border border-gray-600 rounded-2xl uppercase tracking-wider font-bold hover:shadow-[0_0_10px_#34d399,0_0_25px_#2dd4bf,0_0_50px_#34d399] hover:text-white transition-shadow duration-300 delay-[0.6s]",
        spinner: "", // Add an empty class for spinner
        dots: "", // Add an empty class for dots
        bars: "", // Add an empty class for bars
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
  progress?: number;
  loadingVariant?: "spinner" | "dots" | "bars";
  "data-testid"?: string;
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
      progress,
      loadingVariant,
      "data-testid": dataTestId,
      ...props
    },
    ref
  ) => {
    // Ripple effect
    const rippleRef = React.useRef<HTMLSpanElement>(null);
    const [isMounted, setIsMounted] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (isClicked) return;
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500); // 500ms debounce

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
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          "transition-transform duration-150 hover:scale-[1.03] active:scale-95",
          props.disabled || loading ? "grayscale cursor-not-allowed" : "",
          className
        )}
        disabled={loading || props.disabled}
        onClick={handleClick}
        title={props.disabled && tooltip ? tooltip : undefined}
        data-testid={dataTestId || "button"}
        {...props}
      >
        {variant === "glow" && (
          <>
            <span className="absolute top-0 -left-full w-full h-0.5 bg-gradient-to-r from-transparent to-green-500 transition-all duration-700 group-hover:left-full" />
            <span className="absolute -top-full right-0 w-0.5 h-full bg-gradient-to-b from-transparent to-green-500 transition-all duration-700 delay-150 group-hover:top-full" />
            <span className="absolute bottom-0 -right-full w-full h-0.5 bg-gradient-to-l from-transparent to-teal-500 transition-all duration-700 delay-300 group-hover:right-full" />
            <span className="absolute -bottom-full left-0 w-0.5 h-full bg-gradient-to-t from-transparent to-teal-500 transition-all duration-700 delay-500 group-hover:bottom-full" />
          </>
        )}
        <span
          ref={rippleRef}
          className="absolute inset-0 pointer-events-none"
        ></span>
        {loading && loadingVariant === "spinner" && (
          <span className="mr-2 flex items-center animate-fade-in">
            <span className="animate-spin rounded-full border-2 border-t-transparent border-white border-solid h-4 w-4"></span>
          </span>
        )}
        {loading && loadingVariant === "dots" && (
          <span className="flex space-x-1">
            <span className="animate-pulse bg-white h-1 w-1 rounded-full"></span>
            <span className="animate-pulse bg-white h-1 w-1 rounded-full"></span>
            <span className="animate-pulse bg-white h-1 w-1 rounded-full"></span>
          </span>
        )}
        {loading && loadingVariant === "bars" && (
          <span className="flex space-x-1">
            <span className="animate-pulse bg-white h-2 w-1"></span>
            <span className="animate-pulse bg-white h-2 w-1"></span>
            <span className="animate-pulse bg-white h-2 w-1"></span>
          </span>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center transition-transform duration-200 group-hover:-translate-x-1">
            {leftIcon}
          </span>
        )}
        <span className={loading ? "opacity-70" : ""}>{children}</span>
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center transition-transform duration-200 group-hover:translate-x-1">
            {rightIcon}
          </span>
        )}
        {loading && progress !== undefined && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
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
