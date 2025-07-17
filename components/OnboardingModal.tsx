import React, { useEffect, useRef, useState } from "react";
import AvatarPicker, { defaultAvatar, getAvatarSVG } from "../components/AvatarPicker";
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
  { label: "Pink/Yellow", value: "bg-gradient-to-r from-pink-500 to-yellow-300" },
  { label: "Green/Blue", value: "bg-gradient-to-r from-green-400 to-blue-500" },
  { label: "Minimal", value: "bg-gray-100" }
];

const MUSIC_OPTIONS = [
  { label: "None", value: "" },
  { label: "Rain", value: "/sounds/rain.mp3" },
  { label: "Café", value: "/sounds/cafe.mp3" },
  { label: "Forest", value: "/sounds/forest.mp3" }
];

// --- Onboarding steps, now with icons/emoji! ---
const steps = [
  { key: "welcome", icon: "👋", label: "Welcome" },
  { key: "name", icon: "📝", label: "Name" },
  { key: "avatar", icon: "🧑‍🎤", label: "Avatar" },
  { key: "theme", icon: "🎨", label: "Theme" },
  { key: "music", icon: "🎵", label: "Music" },
  { key: "finish", icon: "🚀", label: "Finish" }
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
      <text x="24" y="30" textAnchor="middle" fontSize="24" fill="#fff">🚀</text>
    </svg>,
    <svg width="48" height="48" viewBox="0 0 48 48" key="art">
      <rect x="8" y="8" width="32" height="32" rx="8" fill="#6366f1" />
      <text x="24" y="32" textAnchor="middle" fontSize="24" fill="#fff">🎨</text>
    </svg>,
    "🪐", "🌟", "✨", "🧠", "💡", "🎵", "📚", "🎲", "🦄", "🌈"
  ];
}

// --- Vortex Animated Background ---
function VortexBackground({ step, finished, reduceMotion }: { step: number; finished: boolean; reduceMotion: boolean; }) {
  const [tick, setTick] = useState(0);
  const [burst, setBurst] = useState(false);
  const vortexImages = getSeasonalVortexImages();
  const imagesToShow = finished ? vortexImages.length : Math.max(3, Math.floor(((step + 1) / steps.length) * vortexImages.length));

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
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden" style={{ filter: "blur(0.5px)" }}>
      {vortexImages.slice(0, imagesToShow).map((img, i) => {
        const t = (tick + i * 20) / 60;
        const angle = t + (i / vortexImages.length) * 2 * Math.PI;
        const radius = burst ? 320 + 120 * Math.sin(t + i) : 180 + 60 * Math.sin(t + i);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const scale = burst ? 1.5 + 0.7 * Math.sin(t + i) : 1 + 0.4 * Math.sin(t + i);
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
          <div className={`text-2xl ${idx === current ? "text-pink-500" : "text-gray-400"}`}>
            {step.icon}
          </div>
          <div className={`text-xs mt-1 ${idx === current ? "font-bold text-blue-600" : "text-gray-400"}`}>
            {step.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- Main Modal ---
export default function OnboardingModal({
  onClose,
  onComplete
}: {
  onClose: () => void;
  onComplete: (avatar: any | null, theme?: string, music?: string) => void;
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
    localStorage.setItem("onboardingDraft", JSON.stringify({ step, name, avatar, theme, music }));
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
    localStorage.setItem("onboardingDraft", JSON.stringify({ step, name, avatar, theme, music }));
    onClose();
  };

  // Online/offline awareness
  useEffect(() => {
    const goOnline = () => { setIsOnline(true); setShowNetworkToast(true); setTimeout(() => setShowNetworkToast(false), 1000);}
    const goOffline = () => { setIsOnline(false); setShowNetworkToast(true); setTimeout(() => setShowNetworkToast(false), 1000);}
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    }
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      aria-modal="true"
      role="dialog"
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

      <VortexBackground step={step} finished={finished} reduceMotion={reduceMotion} />
      <ConfettiBlast show={showConfetti} />
      <EmojiRain show={showEmojiRain} />

      <motion.div
        ref={modalRef}
        className="bg-white/90 dark:bg-[#232946] rounded-3xl shadow-2xl w-full max-w-md mx-auto px-7 py-8 flex flex-col items-center relative z-50 border-2 border-blue-200"
        style={{
          minHeight: 500,
          boxShadow: "0 6px 36px 0 #0ff1ce44, 0 0 40px 8px #a21caf33"
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
          onClick={() => setReduceMotion(r => !r)}
          aria-label={reduceMotion ? "Enable animations" : "Reduce motion / disable vortex"}
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
          {/* Welcome Step */}
          {steps[step].key === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-8 text-center w-full"
            >
              <h2 className="text-4xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                Welcome to LISTO!
              </h2>
              <p className="mb-8 text-lg text-gray-700 dark:text-gray-200 font-medium tracking-wide">
                Set up your space, your way. <span className="font-bold text-blue-700">Let's go!</span>
              </p>
              <div className="flex gap-4 w-full justify-center mb-4">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-lg"
                  onClick={handleNext}
                  aria-label="Start onboarding"
                  autoFocus
                >
                  Get Started
                </button>
                <button
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition font-semibold text-lg"
                  onClick={handleSkip}
                  aria-label="Skip onboarding"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}

          {/* Name Step */}
          {steps[step].key === "name" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-8 w-full"
            >
              <label
                htmlFor="onboard-name"
                className="block text-2xl font-bold mb-2 text-center text-blue-700 tracking-tight"
              >
                What should we call you?
              </label>
              <input
                ref={inputRef}
                id="onboard-name"
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center font-medium tracking-wide"
                placeholder="Type your name…"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setError("");
                }}
                aria-label="Your name"
                maxLength={32}
                onKeyDown={e => {
                  if (e.key === "Enter") handleNext();
                }}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1 text-center">
                  {error}
                </div>
              )}
              <div className="flex gap-4 justify-center mt-8">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                  disabled={step === 0}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleContinueLater}
                  aria-label="Continue later"
                >
                  Continue Later
                </button>
              </div>
            </motion.div>
          )}

          {/* Avatar Step */}
          {steps[step].key === "avatar" && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="w-full"
            >
              <div className="mb-6">
                <div className="flex flex-col items-center">
                  <p className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    Choose your avatar <span className="text-gray-500 font-normal">(or create a 3D one!)</span>
                  </p>
                  <div className="w-full flex flex-col items-center">
                    {/* AvatarPicker does both Cartoon & ReadyPlayerMe */}
                    <AvatarPicker value={avatar} onChange={setAvatar} />
                  </div>
                  <span className="text-xs mt-2 text-gray-400 text-center">
                    Want to stand out? Choose a cartoon or a 3D avatar!<br />
                    You can always change this later from your profile.
                  </span>
                </div>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleContinueLater}
                  aria-label="Continue later"
                >
                  Continue Later
                </button>
              </div>
            </motion.div>
          )}

          {/* Theme Step */}
          {steps[step].key === "theme" && (
            <motion.div
              key="theme"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-6 w-full"
            >
              <h3 className="text-xl font-semibold mb-2 text-center">
                Pick a Profile Theme
              </h3>
              <div className="flex gap-2 flex-wrap justify-center mb-4">
                {THEME_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`px-3 py-1 rounded transition border ${theme === opt.value ? "bg-blue-600 text-white border-blue-800" : "bg-white text-blue-600 border-blue-200"}`}
                    onClick={() => setTheme(opt.value)}
                    aria-label={opt.label}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="w-full mb-2">
                <div className="rounded-xl p-2 font-semibold text-center text-sm text-gray-600 dark:text-gray-100"
                  style={{ background: "linear-gradient(90deg, #e0eafc, #cfdef3 80%)", ...(theme.startsWith("bg-") ? {} : { background: theme }) }}>
                  Live Preview!
                </div>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleContinueLater}
                  aria-label="Continue later"
                >
                  Continue Later
                </button>
              </div>
            </motion.div>
          )}

          {/* Music Step */}
          {steps[step].key === "music" && (
            <motion.div
              key="music"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-6 w-full"
            >
              <h3 className="text-xl font-semibold mb-2 text-center">
                Theme Music (Optional)
              </h3>
              <div className="flex gap-2 flex-wrap justify-center mb-4">
                {MUSIC_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`px-3 py-1 rounded transition border ${music === opt.value ? "bg-pink-500 text-white border-pink-800" : "bg-white text-pink-500 border-pink-200"}`}
                    onClick={() => setMusic(opt.value)}
                    aria-label={opt.label}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  Next
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg"
                  onClick={handleContinueLater}
                  aria-label="Continue later"
                >
                  Continue Later
                </button>
              </div>
            </motion.div>
          )}

          {/* Finish Step */}
          {steps[step].key === "finish" && (
            <motion.div
              key="finish"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 text-center w-full"
            >
              <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                You're all set!
              </h2>
              <p className="mb-4 text-lg text-gray-700 dark:text-gray-100 font-medium">
                Welcome aboard, <span className="font-bold text-blue-700">{name || "friend"}</span>!
              </p>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="flex justify-center mb-4"
              >
                {getAvatarSVG(avatar)}
              </motion.div>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold"
                onClick={handleFinish}
                aria-label="Finish onboarding"
              >
                Go to Dashboard
              </button>
              <div className="mt-4 text-xs text-gray-400">
                🎊 You can always update your profile & preferences later from Settings!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Mobile gesture close (swipe down) could go here in future */}
      <style>{`
        @media (max-width: 640px) {
          .max-w-md { max-width: 98vw !important; }
        }
      `}</style>
    </div>
  );
}
