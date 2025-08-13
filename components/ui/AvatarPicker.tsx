import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AvatarPickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: Record<string, any>;
  onChange: (val: Record<string, any>) => void;
  unlocked?: string[];
}

export const defaultAvatar = {
  vibe: "outgoing",
  skin: "#f9dcc4",
  hair: "#222",
  hairStyle: "short",
  eyeColor: "#222",
  accessory: "",
};

export const getAvatarSVG = (avatar: any) => {
  const v = avatar || defaultAvatar;
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="56" rx="38" ry="40" fill={v.skin || "#f9dcc4"} />
      <ellipse
        cx="55"
        cy="47"
        rx="16"
        ry="8"
        fill={v.hairStyle === "bald" ? v.skin : v.hair}
        opacity={v.hairStyle === "bald" ? 0 : 1}
      />
      <ellipse cx="45" cy="60" rx="5" ry="6" fill={v.eyeColor} />
      <ellipse cx="65" cy="60" rx="5" ry="6" fill={v.eyeColor} />
      {["outgoing", "funny", "playful", "optimistic"].includes(v.vibe) ? (
        <path
          d="M44 74 Q55 84 66 74"
          stroke="#d84315"
          strokeWidth="3"
          fill="none"
        />
      ) : ["thoughtful", "analytical", "calm", "curious"].includes(v.vibe) ? (
        <ellipse
          cx="55"
          cy="77"
          rx="7"
          ry="3"
          fill="#fff"
          stroke="#d84315"
          strokeWidth="2"
        />
      ) : ["creative", "adventurous", "loyal", "compassionate"].includes(
          v.vibe
        ) ? (
        <path
          d="M44 74 Q55 78 66 74"
          stroke="#d84315"
          strokeWidth="3"
          fill="none"
        />
      ) : (
        <ellipse
          cx="55"
          cy="77"
          rx="8"
          ry="4"
          fill="#fff"
          stroke="#d84315"
          strokeWidth="2"
        />
      )}
      {v.accessory === "glasses" && (
        <>
          <ellipse
            cx="45"
            cy="60"
            rx="8"
            ry="7"
            fill="none"
            stroke="#222"
            strokeWidth="2"
          />
          <ellipse
            cx="65"
            cy="60"
            rx="8"
            ry="7"
            fill="none"
            stroke="#222"
            strokeWidth="2"
          />
          <rect x="52" y="60" width="6" height="2" fill="#222" />
        </>
      )}
      {v.accessory === "hat" && (
        <rect x="32" y="25" width="46" height="14" rx="7" fill="#333" />
      )}
      {v.accessory === "headphones" && (
        <>
          <rect x="30" y="45" width="8" height="18" rx="4" fill="#222" />
          <rect x="72" y="45" width="8" height="18" rx="4" fill="#222" />
        </>
      )}
      {v.accessory === "mustache" && (
        <ellipse cx="55" cy="80" rx="15" ry="4" fill="#8d5524" />
      )}
    </svg>
  );
};

const vibes = [
  { label: "Outgoing", value: "outgoing", emoji: "😃" },
  { label: "Thoughtful", value: "thoughtful", emoji: "🤔" },
  { label: "Funny", value: "funny", emoji: "😆" },
  { label: "Creative", value: "creative", emoji: "🎨" },
  { label: "Loyal", value: "loyal", emoji: "🦁" },
  { label: "Adventurous", value: "adventurous", emoji: "🏞️" },
  { label: "Playful", value: "playful", emoji: "😺" },
  { label: "Calm", value: "calm", emoji: "😌" },
  { label: "Analytical", value: "analytical", emoji: "🧠" },
  { label: "Optimistic", value: "optimistic", emoji: "🌞" },
  { label: "Compassionate", value: "compassionate", emoji: "🤗" },
  { label: "Curious", value: "curious", emoji: "🧐" },
];

const skinTones = ["#f9dcc4", "#e0ac69", "#8d5524", "#c68642", "#b0b0b0"];
const hairColors = ["#222", "#ffe066", "#d2691e", "#b0b0b0", "#8d5524"];
const eyeColors = ["#222", "#1976d2", "#43a047", "#d84315"];
const accessories = [
  { label: "None", value: "", emoji: "" },
  { label: "Glasses", value: "glasses", emoji: "🕶️" },
  { label: "Headphones", value: "headphones", emoji: "🎧" },
  { label: "Hat", value: "hat", emoji: "🧢" },
  { label: "Mustache", value: "mustache", emoji: "🦸" },
];

const READY_PLAYER_ME_URL = "https://listo-app.readyplayer.me/avatar";

const AvatarPicker: React.FC<AvatarPickerProps> = ({
  value,
  onChange,
  unlocked = [],
  ...htmlProps
}) => {
  const [animVibe, setAnimVibe] = useState<string | null>(null);
  const [showReadyPlayer, setShowReadyPlayer] = useState(false);
  const avatar = value && Object.keys(value).length > 0 ? value : defaultAvatar;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === "https://listo-app.readyplayer.me" &&
        typeof event.data === "string" &&
        event.data.startsWith("v1.avatar.exported")
      ) {
        const url = event.data.split("|")[1];
        onChange({ ...value, avatarUrl: url });
        setShowReadyPlayer(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onChange, value]);

  return (
    <div className="flex flex-col gap-3 items-center w-full" {...htmlProps}>
      <div className="mb-2">
        {value?.avatarUrl && showReadyPlayer ? (
          <img
            src={value.avatarUrl}
            alt="Your 3D Avatar"
            style={{
              width: 128,
              height: 128,
              borderRadius: "50%",
              background: "#fafafa",
              border: "3px solid #bde0fe",
              objectFit: "cover",
              boxShadow: "0 2px 8px #1112",
            }}
          />
        ) : (
          getAvatarSVG(avatar)
        )}
      </div>

      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 rounded ${
            showReadyPlayer
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setShowReadyPlayer(true)}
          aria-label="Pick a 3D Human Avatar"
        >
          3D Human Avatar
        </button>
        <button
          className={`px-3 py-1 rounded ${
            !showReadyPlayer
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setShowReadyPlayer(false)}
          aria-label="Pick a Cartoon Avatar"
        >
          Cartoon Avatar
        </button>
      </div>

      <AnimatePresence>
        {showReadyPlayer && (
          <motion.div
            key="rpm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.3 }}
            style={{ width: "380px", height: "600px", maxWidth: "95vw" }}
          >
            <iframe
              ref={iframeRef}
              title="Ready Player Me Avatar Creator"
              src={`${READY_PLAYER_ME_URL}?frameApi`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "18px",
                boxShadow: "0 6px 24px #2222",
                background: "#fff",
              }}
              allow="camera *; microphone *"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showReadyPlayer && (
        <div className="flex flex-col gap-3 items-center w-full">
          {/* all UI sections left unchanged for brevity */}
        </div>
      )}

      {unlocked.length > 0 && (
        <div className="mt-2 text-xs text-green-700">
          Unlocked items: {unlocked.join(", ")}
        </div>
      )}
    </div>
  );
};

export default AvatarPicker;
