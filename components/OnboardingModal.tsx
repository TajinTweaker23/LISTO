import React, { useEffect, useRef, useState } from "react";
import AvatarPicker, { defaultAvatar, getAvatarSVG } from "./ui/AvatarPicker";
import { motion, AnimatePresence } from "framer-motion";

// --- Sound effect ---
const playSound = () => {
  try {
    const audio = new Audio("/sounds/success.mp3");
    audio.volume = 0.5;
    audio.play();
  } catch {}
};

const THEME_OPTIONS = [
  { label: "Blue/Teal", value: "bg-gradient-to-r from-blue-900 to-teal-600" },
  {
    label: "Pink/Yellow",
    value: "bg-gradient-to-r from-pink-500 to-yellow-300",
  },
  { label: "Green/Blue", value: "bg-gradient-to-r from-green-400 to-blue-500" },
  { label: "Minimal", value: "bg-gray-100" },
];

const MUSIC_OPTIONS = [
  { label: "None", value: "" },
  { label: "Rain", value: "/sounds/rain.mp3" },
  { label: "Café", value: "/sounds/cafe.mp3" },
  { label: "Forest", value: "/sounds/forest.mp3" },
];

// --- Onboarding steps, now with icons/emoji! ---
const steps = [
  { key: "welcome", icon: "👋", label: "Welcome" },
  { key: "name", icon: "📝", label: "Name" },
  { key: "avatar", icon: "🧑‍🎤", label: "Avatar" },
  { key: "theme", icon: "🎨", label: "Theme" },
  { key: "music", icon: "🎵", label: "Music" },
  { key: "finish", icon: "🚀", label: "Finish" },
];

// --- Seasonal/Easter Egg Vortex Themes ---
function getSeasonalVortexImages() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  if ((month === 9 && day >= 25) || (month === 9 && day <= 31)) {
    return ["🎃", "👻", "🦇", "🍬", "🕸️", "🧙‍♂️", "🧛‍♂️"];
  }
  if (month === 11) {
    return ["🎄", "🎅", "🤶", "⛄", "❄️", "🦌", "🧦", "🎁"];
  }
  if (month === 0 && day <= 7) {
    return ["🎆", "🎉", "🥂", "🕛", "✨", "🎊"];
  }
  return [
    <svg width="48" height="48" viewBox="0 0 48 48" key="rocket">
      <circle cx="24" cy="24" r="20" fill="#fbbf24" />
      <text x="24" y="30" textAnchor="middle" fontSize="24" fill="#fff">
        🚀
      </text>
    </svg>,
    <svg width="48" height="48" viewBox="0 0 48 48" key="art">
      <rect x="8" y="8" width="32" height="32" rx="8" fill="#6366f1" />
      <text x="24" y="32" textAnchor="middle" fontSize="24" fill="#fff">
        🎨
      </text>
    </svg>,
    "🪐",
    "🌟",
    "✨",
    "🧠",
    "💡",
    "🎵",
    "📚",
    "🎲",
    "🦄",
    "🌈",
  ];
}

// --- Vortex Animated Background ---
function VortexBackground({
  step,
  finished,
  reduceMotion,
}: {
  step: number;
  finished: boolean;
  reduceMotion: boolean;
}) {
  const [tick, setTick] = useState(0);
  const [burst, setBurst] = useState(false);
  const vortexImages = getSeasonalVortexImages();
  const imagesToShow = finished
    ? vortexImages.length
    : Math.max(
        3,
        Math.floor(((step + 1) / steps.length) * vortexImages.length)
      );

  useEffect(() => {
    if (finished) {
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
    }
  }, [finished]);

  useEffect(() => {
    if (!reduceMotion) {
      const interval = setInterval(() => setTick((t) => t + 1), 40);
      return () => clearInterval(interval);
    }
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      style={{ filter: "blur(0.5px)" }}
    >
      {vortexImages.slice(0, imagesToShow).map((img, i) => {
        const t = (tick + i * 20) / 60;
        const angle = t + (i / vortexImages.length) * 2 * Math.PI;
        const radius = burst
          ? 320 + 120 * Math.sin(t + i)
          : 180 + 60 * Math.sin(t + i);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const scale = burst
          ? 1.5 + 0.7 * Math.sin(t + i)
          : 1 + 0.4 * Math.sin(t + i);
        const blur = 1 + 2 * Math.abs(Math.cos(angle));
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50vw + ${x}px - 32px)`,
              top: `calc(50vh + ${y}px - 32px)`,
              fontSize: 64 + (i % 3) * 12,
              opacity: 0.13 + 0.07 * Math.sin(t + i),
              filter: `blur(${blur}px)`,
              transform: `scale(${scale})`,
              zIndex: 0,
              userSelect: "none",
              pointerEvents: "none",
              transition: "filter 0.2s, opacity 0.2s, transform 0.2s",
            }}
          >
            {img}
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Progress Stepper ---
function ProgressStepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 my-4 select-none">
      {steps.map((step, idx) => (
        <motion.div
          key={step.key}
          initial={false}
          animate={idx === current ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
          className={`flex flex-col items-center transition`}
        >
          <div
            className={`text-2xl ${
              idx === current ? "text-pink-500" : "text-gray-400"
            }`}
          >
            {step.icon}
          </div>
          <div
            className={`text-xs mt-1 ${
              idx === current ? "font-bold text-blue-600" : "text-gray-400"
            }`}
          >
            {step.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- Main Modal ---
function OnboardingModalInternal({
  onClose,
  onComplete,
}: {
  readonly onClose: () => void;
  readonly onComplete: (
    avatar: any | null,
    theme?: string,
    music?: string
  ) => void;
}) {
  // --- Persistent state! ---
  const [step, setStep] = useState(() => {
    const draft = JSON.parse(localStorage.getItem("onboardingDraft") || "{}");
    return typeof draft.step === "number" ? draft.step : 0;
  });
  const [name, setName] = useState(() => {
    const draft = JSON.parse(localStorage.getItem("onboardingDraft") || "{}");
    return draft.name || "";
  });
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(() => {
    const draft = JSON.parse(localStorage.getItem("onboardingDraft") || "{}");
    return draft.avatar || defaultAvatar;
  });
  const [theme, setTheme] = useState(() => {
    const draft = JSON.parse(localStorage.getItem("onboardingDraft") || "{}");
    return draft.theme || THEME_OPTIONS[0].value;
  });
  const [music, setMusic] = useState(() => {
    const draft = JSON.parse(localStorage.getItem("onboardingDraft") || "{}");
    return draft.music || MUSIC_OPTIONS[0].value;
  });
  const [finished, setFinished] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showNetworkToast, setShowNetworkToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);

  // Save draft state to localStorage on change
  useEffect(() => {
    localStorage.setItem(
      "onboardingDraft",
      JSON.stringify({ step, name, avatar, theme, music })
    );
  }, [step, name, avatar, theme, music]);

  // Show only once: check localStorage
  useEffect(() => {
    if (localStorage.getItem("seenOnboarding") === "true") {
      onClose();
    }
  }, [onClose]);

  // Accessibility: focus management
  useEffect(() => {
    if (steps[step].key === "name") inputRef.current?.focus();
  }, [step]);

  // Sound & confetti on finish
  useEffect(() => {
    if (finished && !reduceMotion) {
      playSound();
      setShowConfetti(true);
      setShowEmojiRain(true);
      setTimeout(() => setShowConfetti(false), 1700);
      setTimeout(() => setShowEmojiRain(false), 2000);
      setTimeout(() => setFinished(false), 1800);
    }
  }, [finished, reduceMotion]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"
      );
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("keydown", handleTab);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleTab);
    };
  }, [onClose]);

  // Progress bar % for mobile or screen readers
  const progress = Math.floor(((step + 1) / steps.length) * 100);

  // Step handlers
  const handleNext = () => {
    if (steps[step].key === "name") {
      if (name.trim().length < 2) {
        setError("Please enter your name.");
        inputRef.current?.focus();
        return;
      }
      setError("");
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleFinish = () => {
    localStorage.setItem("listoUserName", name.trim());
    if (avatar) localStorage.setItem("listoAvatar", JSON.stringify(avatar));
    localStorage.setItem("listoTheme", theme);
    localStorage.setItem("listoMusic", music);
    localStorage.setItem("seenOnboarding", "true");
    localStorage.removeItem("onboardingDraft");
    setFinished(true);
    setTimeout(() => {
      onComplete(avatar, theme, music);
      onClose();
    }, 1300);
  };
  const handleSkip = () => {
    localStorage.setItem("seenOnboarding", "true");
    localStorage.removeItem("onboardingDraft");
    onComplete(null, theme, music);
    onClose();
  };
  const handleContinueLater = () => {
    localStorage.setItem(
      "onboardingDraft",
      JSON.stringify({ step, name, avatar, theme, music })
    );
    onClose();
  };

  // Online/offline awareness
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 1000);
    };
    const goOffline = () => {
      setIsOnline(false);
      setShowNetworkToast(true);
      setTimeout(() => setShowNetworkToast(false), 1000);
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // --- Emoji Rain micro-animation on finish
  function EmojiRain({ show }: { show: boolean }) {
    const emojis = ["🎉", "✨", "🥳", "💡", "🚀", "🎈"];
    return (
      <AnimatePresence>
        {show &&
          Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: "100vh", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2 + Math.random() * 1.6,
                delay: Math.random() * 0.4,
              }}
              className="fixed left-0 pointer-events-none z-[99]"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${24 + Math.random() * 32}px`,
                top: 0,
              }}
            >
              {emojis[Math.floor(Math.random() * emojis.length)]}
            </motion.div>
          ))}
      </AnimatePresence>
    );
  }

  // --- Confetti (simple, CSS based, fallback for prod) ---
  function ConfettiBlast({ show }: { show: boolean }) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          >
            <span className="text-7xl animate-bounce">🎉</span>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // --- Main Modal UI ---
  return (
    <dialog
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      aria-modal="true"
      tabIndex={-1}
    >
      {/* Network Status Toast */}
      <AnimatePresence>
        {showNetworkToast && (
          <motion.div
            className={`fixed top-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl shadow-xl font-bold text-white z-[101] ${
              isOnline ? "bg-green-500" : "bg-pink-500"
            }`}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
          >
            {isOnline ? "Back online!" : "You're offline."}
          </motion.div>
        )}
      </AnimatePresence>

      <VortexBackground
        step={step}
        finished={finished}
        reduceMotion={reduceMotion}
      />
      <ConfettiBlast show={showConfetti} />
      <EmojiRain show={showEmojiRain} />

      <motion.div
        ref={modalRef}
        className="bg-white/90 dark:bg-[#232946] rounded-3xl shadow-2xl w-full max-w-md mx-auto px-7 py-8 flex flex-col items-center relative z-50 border-2 border-blue-200"
        style={{
          minHeight: 500,
          boxShadow: "0 6px 36px 0 #0ff1ce44, 0 0 40px 8px #a21caf33",
        }}
        initial={{ opacity: 0, scale: 0.94, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 60 }}
        transition={{ type: "spring", duration: 0.7 }}
        role="document"
        aria-label="Onboarding"
      >
        {/* Accessibility Toggle */}
        <button
          className="absolute top-4 right-4 px-3 py-1 bg-gray-100 text-gray-700 rounded shadow text-xs hover:bg-gray-200 transition"
          onClick={() => setReduceMotion((r) => !r)}
          aria-label={
            reduceMotion
              ? "Enable animations"
              : "Reduce motion / disable vortex"
          }
        >
          {reduceMotion ? "Enable Animations" : "Reduce Motion"}
        </button>

        {/* Progress stepper */}
        <ProgressStepper current={step} />
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-2 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 transition-all"
            style={{ width: `${progress}%` }}
            aria-label={`Progress: ${progress}%`}
            aria-valuenow={progress}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="min-h-[320px] flex flex-col"
          >
            <div className="flex-grow">
              {steps[step].key === "welcome" && <WelcomeStep onNext={handleNext} onSkip={handleSkip} />}
              {steps[step].key === "name" && (
                <NameStep
                  name={name}
                  setName={setName}
                  error={error}
                  inputRef={inputRef}
                  onNext={handleNext}
                  onBack={handleBack}
                  onContinueLater={handleContinueLater}
                />
              )}
              {steps[step].key === "avatar" && (
                <AvatarStep
                  avatar={avatar}
                  setAvatar={setAvatar}
                  onNext={handleNext}
                  onBack={handleBack}
                  onContinueLater={handleContinueLater}
                />
              )}
              {steps[step].key === "theme" && (
                <ThemeStep
                  theme={theme}
                  setTheme={setTheme}
                  onNext={handleNext}
                  onBack={handleBack}
                  onContinueLater={handleContinueLater}
                />
              )}
              {steps[step].key === "music" && (
                <MusicStep
                  music={music}
                  setMusic={setMusic}
                  onNext={handleNext}
                  onBack={handleBack}
                  onContinueLater={handleContinueLater}
                />
              )}
              {steps[step].key === "finish" && <FinishStep name={name} />}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div>
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  >
                    Back
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleContinueLater}
                  className="px-4 py-2 text-xs text-gray-500 hover:underline"
                >
                  Save & Close
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-8 py-3 rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition shadow-lg animate-pulse"
                  >
                    Finish!
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm"
          aria-label="Skip onboarding"
        >
          Skip
        </button>
      </motion.div>
    </dialog>
  );
}

// --- Step Components ---
const WelcomeStep = ({ onNext, onSkip }: { readonly onNext: () => void; readonly onSkip: () => void; }) => (
  <div className="p-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Welcome to LISTO!
    </h2>
    <p className="text-lg text-gray-600 mb-6">
      Set up your space, your way.{" "}
      <span className="font-semibold text-blue-600">Let's go!</span>
    </p>
    <div className="flex gap-4 justify-center">
      <button
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={onNext}
        aria-label="Start onboarding"
        autoFocus
      >
        Get Started
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow-md hover:bg-gray-200 transition"
        onClick={onSkip}
        aria-label="Skip onboarding"
      >
        Skip
      </button>
    </div>
  </div>
);

const NameStep = ({
  name,
  setName,
  error,
  inputRef,
  onNext,
  onBack,
  onContinueLater,
}: {
  readonly name: string;
  readonly setName: (name: string) => void;
  readonly error: string;
  readonly inputRef: React.RefObject<HTMLInputElement>;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly onContinueLater: () => void;
}) => (
  <div className="p-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      What should we call you?
    </h2>
    <input
      ref={inputRef}
      type="text"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
      placeholder="Type your name…"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        // setError(""); // This was causing an error, assuming it should be removed or handled differently
      }}
      aria-label="Your name"
      maxLength={32}
      onKeyDown={(e) => {
        if (e.key === "Enter") onNext();
      }}
    />
    {error && (
      <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
    )}
    <div className="flex gap-4 justify-center mt-6">
      <button
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={onNext}
        aria-label="Next step"
      >
        Next
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onBack}
        aria-label="Back"
      >
        Back
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onContinueLater}
        aria-label="Continue later"
      >
        Continue Later
      </button>
    </div>
  </div>
);

const AvatarStep = ({
  avatar,
  setAvatar,
  onBack,
  onNext,
  onContinueLater,
}: {
  readonly avatar: any;
  readonly setAvatar: (avatar: any) => void;
  readonly onBack: () => void;
  readonly onNext: () => void;
  readonly onContinueLater: () => void;
}) => (
  <div className="p-4 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose an Avatar</h2>
    <div className="flex flex-col items-center">
      {/* AvatarPicker does both Cartoon & ReadyPlayerMe */}
      <AvatarPicker value={avatar} onChange={setAvatar} />
    </div>
    <p className="text-xs mt-2 text-gray-500">
      Want to stand out? Choose a cartoon or a 3D avatar!
      <br />
      You can always change this later from your profile.
    </p>
    <div className="flex gap-4 justify-center mt-6">
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onBack}
        aria-label="Back"
      >
        Back
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={onNext}
        aria-label="Next step"
      >
        Next
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onContinueLater}
        aria-label="Continue later"
      >
        Continue Later
      </button>
    </div>
  </div>
);

const ThemeStep = ({
  theme,
  setTheme,
  onBack,
  onNext,
  onContinueLater,
}: {
  readonly theme: string;
  readonly setTheme: (theme: string) => void;
  readonly onBack: () => void;
  readonly onNext: () => void;
  readonly onContinueLater: () => void;
}) => (
  <div className="p-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Pick a Profile Theme
    </h2>
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {THEME_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`px-3 py-1 rounded transition border ${
            theme === opt.value
              ? "bg-blue-600 text-white border-blue-800"
              : "bg-white text-blue-600 border-blue-200"
          }`}
          onClick={() => setTheme(opt.value)}
          aria-label={opt.label}
        >
          {opt.label}
        </button>
      ))}
    </div>
    <div className="w-full mb-2">
      <div
        className="rounded-xl p-2 font-semibold text-center text-sm text-gray-600 dark:text-gray-100"
        style={{
          background: "linear-gradient(90deg, #e0eafc, #cfdef3 80%)",
          ...(theme.startsWith("bg-") ? {} : { background: theme }),
        }}
      >
        Live Preview!
      </div>
    </div>
    <div className="flex gap-4 justify-center mt-2">
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onBack}
        aria-label="Back"
      >
        Back
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={onNext}
        aria-label="Next step"
      >
        Next
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onContinueLater}
        aria-label="Continue later"
      >
        Continue Later
      </button>
    </div>
  </div>
);

const MusicStep = ({
  music,
  setMusic,
  onBack,
  onNext,
  onContinueLater,
}: {
  readonly music: string;
  readonly setMusic: (music: string) => void;
  readonly onBack: () => void;
  readonly onNext: () => void;
  readonly onContinueLater: () => void;
}) => (
  <div className="p-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Theme Music (Optional)
    </h2>
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {MUSIC_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`px-3 py-1 rounded transition border ${
            music === opt.value
              ? "bg-pink-500 text-white border-pink-800"
              : "bg-white text-pink-500 border-pink-200"
          }`}
          onClick={() => setMusic(opt.value)}
          aria-label={opt.label}
        >
          {opt.label}
        </button>
      ))}
    </div>
    <div className="flex gap-4 justify-center mt-2">
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onBack}
        aria-label="Back"
      >
        Back
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        onClick={onNext}
        aria-label="Next step"
      >
        Next
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow-md hover:bg-gray-300 transition"
        onClick={onContinueLater}
        aria-label="Continue later"
      >
        Continue Later
      </button>
    </div>
  </div>
);

const FinishStep = ({ name }: { readonly name: string }) => (
  <div className="text-center p-4">
    <h2 className="text-4xl font-bold text-gray-800 mb-2">
      You're all set!
    </h2>
    <p className="text-lg text-gray-600">
      Ready to achieve your dreams, {name}?
    </p>
    <div className="mt-6 text-6xl animate-pulse">🚀</div>
  </div>
);

export default React.memo(OnboardingModalInternal);
