import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Skin, hair, etc. options
const skinTones = ["#f9dcc4", "#e0ac69", "#8d5524", "#c68642", "#b0b0b0"];
const hairColors = ["#222", "#ffe066", "#d2691e", "#b0b0b0", "#8d5524"];
const eyeColors = ["#222", "#1976d2", "#43a047", "#d84315"];
const vibes = [
  { label: "Happy", value: "happy", emoji: "😃" },
  { label: "Cool", value: "cool", emoji: "😎" },
  { label: "Sassy", value: "sassy", emoji: "😏" },
  { label: "Surprised", value: "surprised", emoji: "😮" },
  { label: "Edgy", value: "edgy", emoji: "😈" },
  { label: "Bad Boy", value: "badboy", emoji: "🦹" },
];
const accessories = [
  { label: "None", value: "" },
  { label: "Glasses", value: "glasses", emoji: "🕶️" },
  { label: "Headphones", value: "headphones", emoji: "🎧" },
  { label: "Hat", value: "hat", emoji: "🧢" },
  { label: "Mustache", value: "mustache", emoji: "🦸" },
];

const READY_PLAYER_ME_URL = "https://listo-app.readyplayer.me/avatar";

// ---- EXPORTS! ----
export const defaultAvatar = {
  vibe: "happy",
  skin: "#f9dcc4",
  hair: "#222",
  hairStyle: "short",
  eyeColor: "#222",
  accessory: "",
};

// SVG generator: update as needed for your style!
export const getAvatarSVG = (avatar: any) => {
  const v = avatar || defaultAvatar;
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <ellipse cx="55" cy="56" rx="38" ry="40" fill={v.skin || "#f9dcc4"} />
      {/* Add more SVG features here if you want */}
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
      {/* Vibe expression as mouth */}
      {v.vibe === "happy" ? (
        <path
          d="M44 74 Q55 84 66 74"
          stroke="#d84315"
          strokeWidth="3"
          fill="none"
        />
      ) : v.vibe === "cool" ? (
        <rect x="40" y="68" width="30" height="6" rx="3" fill="#222" />
      ) : v.vibe === "sassy" ? (
        <path
          d="M44 74 Q55 70 66 74"
          stroke="#d84315"
          strokeWidth="3"
          fill="none"
        />
      ) : v.vibe === "surprised" ? (
        <ellipse
          cx="55"
          cy="77"
          rx="6"
          ry="7"
          fill="#fff"
          stroke="#d84315"
          strokeWidth="2"
        />
      ) : v.vibe === "edgy" ? (
        <path
          d="M44 78 Q55 70 66 78"
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
      {/* Accessory overlay (simplified emoji as example) */}
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

function AvatarPicker({
  value,
  onChange,
}: {
  value: any;
  onChange: (val: any) => void;
}) {
  const [animVibe, setAnimVibe] = useState<string | null>(null);
  const [showReadyPlayer, setShowReadyPlayer] = useState(false);
  const avatar = value && Object.keys(value).length > 0 ? value : defaultAvatar;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for Ready Player Me avatar export
  useEffect(() => {
    const handleMessage = (event: any) => {
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
    <div className="flex flex-col gap-3 items-center w-full">
      {/* Avatar Preview */}
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

      {/* Toggle between 3D Human Avatar and Cartoon Avatar */}
      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 rounded ${
            showReadyPlayer
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setShowReadyPlayer(true)}
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
        >
          Cartoon Avatar
        </button>
      </div>

      {/* Ready Player Me iFrame */}
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
              src={READY_PLAYER_ME_URL + "?frameApi"}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "18px",
                boxShadow: "0 6px 24px #2222",
                background: "#fff",
              }}
              allow="camera *; microphone *"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cartoon Avatar Picker */}
      {!showReadyPlayer && (
        <div className="flex flex-col gap-3 items-center w-full">
          {/* Vibe/Expression Picker */}
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-600">Vibe:</span>
            {vibes.map((v) => (
              <motion.button
                key={v.value}
                className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                  avatar.vibe === v.value
                    ? "bg-pink-500 text-white scale-110 shadow"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setAnimVibe(v.value);
                  onChange({
                    ...avatar,
                    vibe: v.value,
                  });
                  setTimeout(() => setAnimVibe(null), 400);
                }}
                aria-label={v.label}
                tabIndex={0}
                whileTap={{ scale: 1.2, rotate: v.value === "edgy" ? 10 : 0 }}
                animate={
                  animVibe === v.value
                    ? { scale: 1.3, rotate: v.value === "edgy" ? 10 : 0 }
                    : {}
                }
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>{v.emoji}</span>
                {v.label}
              </motion.button>
            ))}
          </div>
          {/* Skin Tone */}
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-600">Skin:</span>
            {skinTones.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  avatar.skin === color
                    ? "border-blue-500 scale-110"
                    : "border-gray-200"
                }`}
                style={{ background: color }}
                aria-label={`Skin tone ${color}`}
                onClick={() =>
                  onChange({
                    ...avatar,
                    skin: color,
                  })
                }
                tabIndex={0}
              />
            ))}
          </div>
          {/* Hair Color */}
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-600">Hair:</span>
            {hairColors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  avatar.hair === color
                    ? "border-blue-500 scale-110"
                    : "border-gray-200"
                }`}
                style={{ background: color }}
                aria-label={`Hair color ${color}`}
                onClick={() =>
                  onChange({
                    ...avatar,
                    hair: color,
                  })
                }
                tabIndex={0}
              />
            ))}
            <button
              className={`px-2 py-1 rounded text-xs font-semibold ${
                avatar.hairStyle === "bald"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() =>
                onChange({
                  ...avatar,
                  hairStyle: "bald",
                })
              }
              aria-label="Bald"
              tabIndex={0}
            >
              Bald
            </button>
          </div>
          {/* Eye Color */}
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-600">Eyes:</span>
            {eyeColors.map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full border-2 ${
                  avatar.eyeColor === color
                    ? "border-blue-500 scale-110"
                    : "border-gray-200"
                }`}
                style={{ background: color }}
                aria-label={`Eye color ${color}`}
                onClick={() =>
                  onChange({
                    ...avatar,
                    eyeColor: color,
                  })
                }
                tabIndex={0}
              />
            ))}
          </div>
          {/* Accessories */}
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-600">Accessory:</span>
            {accessories.map((a) => (
              <motion.button
                key={a.value}
                className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                  avatar.accessory === a.value
                    ? "bg-blue-500 text-white scale-110 shadow"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() =>
                  onChange({
                    ...avatar,
                    accessory: a.value,
                  })
                }
                aria-label={a.label}
                tabIndex={0}
                whileTap={{ scale: 1.2, rotate: a.value === "hat" ? -10 : 0 }}
                animate={avatar.accessory === a.value ? { scale: 1.2 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>{a.emoji}</span>
                {a.label}
              </motion.button>
            ))}
          </div>
          {/* Randomize */}
          <button
            className="mt-2 px-3 py-1 bg-pink-500 text-white rounded text-xs"
            onClick={() => {
              const random = {
                skin: skinTones[Math.floor(Math.random() * skinTones.length)],
                hair: hairColors[Math.floor(Math.random() * hairColors.length)],
                hairStyle: Math.random() > 0.2 ? "short" : "bald",
                eyeColor:
                  eyeColors[Math.floor(Math.random() * eyeColors.length)],
                vibe: vibes[Math.floor(Math.random() * vibes.length)].value,
                accessory:
                  accessories[Math.floor(Math.random() * accessories.length)]
                    .value,
              };
              onChange(random);
            }}
            aria-label="Randomize avatar"
            tabIndex={0}
          >
            🎲 Randomize All
          </button>
        </div>
      )}
    </div>
  );
}

// --- DEFAULT EXPORT ---
export default AvatarPicker;
