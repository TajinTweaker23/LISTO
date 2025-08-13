import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MASCOT_EMOJIS = ["🎉", "✨", "😺", "👾", "😎", "💡", "🦄", "👏", "🔥", "🤖", "🤩", "🥳", "🎊"];

function getAutoEmoji(value: string): string {
  if (!value) return "🙂";
  const v = value.toLowerCase();
  if (v.match(/lol|haha|lmao|rofl|😂|🤣/)) return "😂";
  if (v.match(/sad|depressed|☹️|😢|😭/)) return "😢";
  if (v.match(/doctor|nurse|md|medic|physician|🩺/)) return "🩺";
  if (v.match(/love|sweet|cutie|💖|💕|❤️/)) return "😍";
  if (v.match(/fire|hot|🔥/)) return "🔥";
  if (v.match(/ok|yes|yup|sure|👌/)) return "👌";
  if (v.match(/bye|goodbye|cya|👋/)) return "👋";
  if (v.match(/boss|ceo|founder|chief/)) return "🧑‍💼";
  if (v.match(/win|victory|champ|🥇/)) return "🏆";
  if (v.match(/birthday|bday|🎂|party/)) return "🎂";
  if (v.match(/cat|meow|🐱|😺/)) return "🐱";
  if (v.match(/dog|woof|🐶|pup/)) return "🐶";
  if (v.match(/music|song|🎶/)) return "🎵";
  if (v.match(/money|cash|💰|dollar/)) return "💸";
  if (v.match(/alex|sam|michael|john|sarah|maria|emma|liam|oliver|ava|will/)) return "😃";
  if (v.length <= 2) return "🟢";
  if (v.match(/fuck|shit|damn|bitch/)) return "🙊";
  if (v.match(/🦄|magical/)) return "🦄";
  return "🙂";
}

function playSound(src: string) {
  try {
    const a = new Audio(src);
    a.volume = 0.25;
    a.play();
  } catch {}
}

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix">;

export interface InputProps extends NativeInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  maxLength?: number;
  onClear?: () => void;
  variant?: "default" | "pill" | "glass";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: string;
  autoResize?: boolean;
  passwordToggle?: boolean;
  disco?: boolean;
  onEnter?: (val: string) => void; // <-- Fix: Use onEnter instead of onSubmit
  mascotPop?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      prefix,
      suffix,
      loading,
      maxLength,
      onClear,
      variant = "glass",
      iconLeft,
      iconRight,
      type = "text",
      passwordToggle = false,
      disco = false,
      onEnter, // <-- Fix: Accept onEnter
      mascotPop = true,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [mascot, setMascot] = React.useState<string | null>(null);
    const [pulse, setPulse] = React.useState(false);
    const [discoSpark, setDiscoSpark] = React.useState(0);

    const computedType =
      passwordToggle && type === "password" ? (showPassword ? "text" : "password") : type;

    const shouldFloat =
      !!props.value ||
      focused ||
      (typeof props.value === "number" && props.value !== undefined);

    React.useEffect(() => {
      if (!disco) return;
      const t = setInterval(() => setDiscoSpark((v) => v + 1), 800);
      return () => clearInterval(t);
    }, [disco]);

    React.useEffect(() => {
      if (props.value && !error && focused) {
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      }
    }, [props.value, error, focused]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && onEnter && typeof props.value === "string" && props.value) {
        if (mascotPop) {
          const idx = Math.floor(Math.random() * MASCOT_EMOJIS.length);
          setMascot(MASCOT_EMOJIS[idx]);
          setTimeout(() => setMascot(null), 1300);
        }
        playSound(error ? "/sounds/error.mp3" : "/sounds/success.mp3");
        onEnter(props.value as string); // <-- Fix: Call onEnter with value
      }
      if (e.key === "Escape" && onClear) {
        onClear();
      }
    };

    const borderClass =
      error
        ? "border-pink-500 ring-2 ring-pink-300 animate-input-error"
        : pulse
        ? "border-blue-500 ring-2 ring-blue-400 animate-input-pulse"
        : focused
        ? "border-blue-400 ring-2 ring-blue-200"
        : disco
        ? "border-2 border-transparent disco-border"
        : "border-blue-200";

    return (
      <div className={`w-full my-2 relative font-sans`}>
        {/* Mascot/Emoji Pop */}
        <AnimatePresence>
          {mascot && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -top-12 text-4xl z-30 pointer-events-none"
              initial={{ y: 40, scale: 0, opacity: 0 }}
              animate={{ y: 0, scale: 1.2, opacity: 1 }}
              exit={{ y: -20, scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 16 }}
            >
              {mascot}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`
            flex items-center transition-all bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl
            ${variant === "pill" ? "rounded-full px-5 py-3" : "rounded-xl px-3 py-2"}
            border-2 shadow-md focus-within:shadow-lg
            ${borderClass}
            ${className}
            relative
            ${disco ? "disco-animate" : ""}
          `}
        >
          {iconLeft && <div className="mr-2">{iconLeft}</div>}
          {prefix && <div className="mr-2">{prefix}</div>}
          {label && (
            <motion.label
              htmlFor={label.replace(/\s/g, "-").toLowerCase()}
              className="absolute left-4 top-2 pointer-events-none text-gray-600 dark:text-gray-400 origin-left transition-all select-none"
              animate={
                shouldFloat
                  ? { y: -22, x: 2, scale: 0.81, color: "#3b82f6" }
                  : { y: 0, x: 0, scale: 1, color: "#7b8794" }
              }
              style={{
                fontWeight: 600,
                padding: "0 4px",
                background: "linear-gradient(90deg,#fff8,#e0eaff77)",
                borderRadius: 4,
                zIndex: 1,
              }}
              transition={{ type: "spring", stiffness: 320 }}
            >
              {label}
              {props.required && <span className="text-pink-500">*</span>}
            </motion.label>
          )}
          <input
            ref={ref}
            type={computedType}
            className={`
              w-full bg-transparent outline-none text-lg py-2 px-2
              placeholder:opacity-0 focus:placeholder:opacity-100
              transition-all
              ${variant === "pill" ? "rounded-full" : "rounded-xl"}
              ${error ? "text-pink-600" : ""}
              ${focused ? "ring-0" : ""}
              ${disco ? "font-black" : ""}
            `}
            {...props}
            maxLength={maxLength}
            aria-invalid={!!error}
            onFocus={e => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            id={label ? label.replace(/\s/g, "-").toLowerCase() : undefined}
            autoComplete={props.autoComplete || "off"}
            onKeyDown={handleKeyDown}
          />
          {/* Auto-emoji personality */}
          {type === "text" || type === "search" ? (
            <motion.span
              key={props.value as string}
              className="ml-2 text-2xl select-none"
              initial={{ scale: 0.7, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260 }}
            >
              {getAutoEmoji(String(props.value || ""))}
            </motion.span>
          ) : null}
          {/* Password toggle */}
          {passwordToggle && type === "password" && (
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-blue-500 transition"
              onClick={() => setShowPassword(p => !p)}
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}
          <AnimatePresence>
            {onClear && props.value && (
              <motion.button
                className="ml-1 px-1 rounded bg-gray-200 hover:bg-pink-200 text-pink-600 transition shadow"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={onClear}
                tabIndex={0}
                aria-label="Clear"
                type="button"
              >
                ×
              </motion.button>
            )}
          </AnimatePresence>
          {iconRight && <div className="ml-2">{iconRight}</div>}
          {suffix && <div className="ml-2">{suffix}</div>}
          {loading && (
            <span className="ml-2 animate-spin h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full"></span>
          )}
          {disco && (
            <motion.span
              className="absolute right-0 top-0"
              animate={{ rotate: discoSpark * 36 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-2xl">✨</span>
            </motion.span>
          )}
        </div>
        <motion.div
          initial={false}
          animate={error ? { y: [0, -2, 0], color: "#f43f5e" } : {}}
          transition={error ? { type: "spring", damping: 8, stiffness: 400 } : {}}
          className={`flex justify-between px-1 mt-1 text-xs min-h-[1.2em]`}
          aria-live="polite"
        >
          <span className={error ? "text-pink-500" : "text-gray-500"}>
            {error || helperText}
          </span>
          {maxLength ? (
            <span className="text-gray-400">
              {typeof props.value === "string" ? props.value.length : 0}/{maxLength}
            </span>
          ) : null}
        </motion.div>
        <style>{`
          .animate-input-pulse {
            animation: inputPulse 0.7s;
          }
          @keyframes inputPulse {
            0% { box-shadow: 0 0 0 0 #3b82f666; }
            60% { box-shadow: 0 0 8px 5px #3b82f655; }
            100% { box-shadow: 0 0 0 0 transparent; }
          }
          .animate-input-error {
            animation: inputError 0.45s;
          }
          @keyframes inputError {
            0% { box-shadow: 0 0 0 0 #f43f5e66; }
            40% { box-shadow: 0 0 6px 3px #f43f5e55; }
            100% { box-shadow: 0 0 0 0 transparent; }
          }
          .disco-animate {
            animation: discoGlow 2.2s linear infinite alternate;
          }
          @keyframes discoGlow {
            0% { border-color: #a21caf; box-shadow: 0 0 0 0 #a21caf99; }
            25% { border-color: #eab308; box-shadow: 0 0 12px 4px #f472b666; }
            50% { border-color: #22d3ee; box-shadow: 0 0 14px 5px #22d3ee77; }
            75% { border-color: #34d399; box-shadow: 0 0 16px 8px #f43f5e55; }
            100% { border-color: #a21caf; box-shadow: 0 0 0 0 #a21caf99; }
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
