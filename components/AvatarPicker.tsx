import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skinTones = ["#f9dcc4", "#e0ac69", "#8d5524", "#c68642", "#b0b0b0"];
const hairColors = ["#222", "#ffe066", "#d2691e", "#b0b0b0", "#8d5524"];
const eyeColors = ["#222", "#1976d2", "#43a047", "#d84315"];
const vibes = [
  { label: "Happy", value: "happy", emoji: "😃" },
  { label: "Cool", value: "cool", emoji: "😎" },
  { label: "Sassy", value: "sassy", emoji: "😏" },
  { label: "Surprised", value: "surprised", emoji: "😮" },
  { label: "Edgy", value: "edgy", emoji: "😈" },
];
const accessories = [
  { label: "None", value: "" },
  { label: "Glasses", value: "glasses", emoji: "🕶️" },
  { label: "Headphones", value: "headphones", emoji: "🎧" },
  { label: "Hat", value: "hat", emoji: "🧢" },
  { label: "Mustache", value: "mustache", emoji: "🦸" },
];

export function getAvatarSVG(avatar: any) {
  const vibe = avatar?.vibe || "happy";
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <defs>
        {/* Face gradients */}
        <radialGradient id="faceGrad" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="55%" stopColor={avatar?.skin || "#f9dcc4"} />
          <stop offset="100%" stopColor="#bfa77a" />
        </radialGradient>
        <radialGradient id="faceShadow" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Hair gradients */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={avatar?.hair || "#222"} />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#222" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="hairHighlight" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Cheek gradients */}
        <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8bbd0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f8bbd0" stopOpacity="0" />
        </radialGradient>
        {/* Eye gloss */}
        <radialGradient id="eyeGloss" cx="60%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Lip gloss */}
        <linearGradient id="lipGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        {/* Shadow under face */}
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Drop shadow */}
      <ellipse cx="55" cy="98" rx="32" ry="10" fill="url(#shadowGrad)" />
      {/* Face */}
      <ellipse cx="55" cy="56" rx="38" ry="40" fill="url(#faceGrad)" />
      {/* Face shadow (bottom) */}
      <ellipse cx="55" cy="72" rx="28" ry="12" fill="url(#faceShadow)" />
      {/* Face highlight */}
      <ellipse cx="45" cy="45" rx="13" ry="8" fill="#fff" opacity="0.13" />
      {/* Hair */}
      {avatar?.hairStyle !== "bald" && (
        <>
          <ellipse
            cx="55"
            cy="32"
            rx="36"
            ry="20"
            fill="url(#hairGrad)"
            style={{ filter: "drop-shadow(0 4px 8px #2223)" }}
          />
          {/* Hair highlight */}
          <ellipse
            cx="45"
            cy="28"
            rx="15"
            ry="7"
            fill="url(#hairHighlight)"
            opacity="0.7"
          />
        </>
      )}
      {/* Cheeks */}
      <ellipse cx="35" cy="75" rx="7" ry="4" fill="url(#cheekGrad)" />
      <ellipse cx="75" cy="75" rx="7" ry="4" fill="url(#cheekGrad)" />
      {/* Nose (subtle 3D) */}
      <ellipse cx="55" cy="62" rx="3.5" ry="6" fill="#e0bfa0" opacity="0.25" />
      {/* Eyes */}
      <AnimatePresence>
        {(() => {
          switch (vibe) {
            case "happy":
              return (
                <>
                  {/* Eye whites */}
                  <ellipse cx="43" cy="60" rx="6" ry="8" fill="#fff" />
                  <ellipse cx="67" cy="60" rx="6" ry="8" fill="#fff" />
                  {/* Iris */}
                  <ellipse cx="43" cy="62" rx="3" ry="4" fill={avatar?.eyeColor || "#222"} />
                  <ellipse cx="67" cy="62" rx="3" ry="4" fill={avatar?.eyeColor || "#222"} />
                  {/* Eye gloss */}
                  <ellipse cx="41" cy="59" rx="1.2" ry="1.5" fill="url(#eyeGloss)" />
                  <ellipse cx="65" cy="59" rx="1.2" ry="1.5" fill="url(#eyeGloss)" />
                </>
              );
            case "cool":
              return (
                <>
                  <rect x="37" y="60" width="12" height="5" rx="2.5" fill="#222" />
                  <rect x="61" y="60" width="12" height="5" rx="2.5" fill="#222" />
                  {/* Sunglass gloss */}
                  <ellipse cx="43" cy="62" rx="4" ry="2" fill="url(#eyeGloss)" opacity="0.5" />
                  <ellipse cx="67" cy="62" rx="4" ry="2" fill="url(#eyeGloss)" opacity="0.5" />
                </>
              );
            case "sassy":
              return (
                <>
                  <ellipse cx="43" cy="60" rx="6" ry="4" fill="#fff" />
                  <ellipse cx="43" cy="60" rx="3" ry="2" fill={avatar?.eyeColor || "#222"} />
                  <ellipse cx="67" cy="60" rx="6" ry="8" fill="#fff" />
                  <ellipse cx="67" cy="60" rx="3" ry="4" fill={avatar?.eyeColor || "#222"} />
                  <ellipse cx="41" cy="59" rx="1.2" ry="1.5" fill="url(#eyeGloss)" />
                  <ellipse cx="65" cy="59" rx="1.2" ry="1.5" fill="url(#eyeGloss)" />
                </>
              );
            case "surprised":
              return (
                <>
                  <ellipse cx="43" cy="60" rx="4" ry="7" fill="#fff" />
                  <ellipse cx="43" cy="60" rx="2" ry="3.5" fill={avatar?.eyeColor || "#222"} />
                  <ellipse cx="67" cy="60" rx="4" ry="7" fill="#fff" />
                  <ellipse cx="67" cy="60" rx="2" ry="3.5" fill={avatar?.eyeColor || "#222"} />
                  <ellipse cx="41" cy="59" rx="1.2" ry="1.5" fill="url(#eyeGloss)" />
                  <ellipse cx="65" cy="59" rx="1.2" ry="1.5" fill="url(#eyeGloss)" />
                </>
              );
            case "edgy":
              return (
                <>
                  <ellipse cx="43" cy="60" rx="6" ry="8" fill="#fff" />
                  <ellipse cx="43" cy="60" rx="2.5" ry="3" fill="#222" />
                  <ellipse cx="67" cy="60" rx="6" ry="8" fill="#fff" />
                  <ellipse cx="67" cy="60" rx="2.5" ry="3" fill="#222" />
                  {/* Edgy eyebrow */}
                  <rect x="36" y="54" width="12" height="2" rx="1" fill="#222" transform="rotate(-15 42 55)" />
                  <rect x="60" y="54" width="12" height="2" rx="1" fill="#222" transform="rotate(15 66 55)" />
                </>
              );
            default:
              return null;
          }
        })()}
      </AnimatePresence>
      {/* Mouth */}
      <AnimatePresence>
        {(() => {
          switch (vibe) {
            case "happy":
              return <path d="M36 62 Q45 70 54 62" stroke="#d84315" strokeWidth="3" fill="none" />;
            case "cool":
              return <rect x="41" y="62" width="8" height="3" rx="1.5" fill="#222" />;
            case "sassy":
              return <path d="M40 62 Q45 66 50 62" stroke="#d84315" strokeWidth="2" fill="none" />;
            case "surprised":
              return <ellipse cx="45" cy="65" rx="4" ry="4" fill="#d84315" />;
            case "edgy":
              return <path d="M38 65 Q45 60 52 65" stroke="#222" strokeWidth="2" fill="none" />;
            default:
              return null;
          }
        })()}
      </AnimatePresence>
      {/* Cheeks with highlight */}
      <ellipse cx="32" cy="60" rx="4" ry="2" fill="#f8bbd0" opacity="0.7" />
      <ellipse cx="58" cy="60" rx="4" ry="2" fill="#f8bbd0" opacity="0.7" />
      <ellipse cx="32" cy="59" rx="1.2" ry="0.7" fill="#fff" opacity="0.7" />
      <ellipse cx="58" cy="59" rx="1.2" ry="0.7" fill="#fff" opacity="0.7" />
      {/* Accessories (animated) */}
      <AnimatePresence>
        {(() => {
          switch (avatar?.accessory) {
            case "glasses":
              return (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1.1 }} transition={{ type: "spring" }}>
                  <ellipse cx="34" cy="50" rx="7" ry="6" fill="none" stroke="#555" strokeWidth="2.5" />
                  <ellipse cx="56" cy="50" rx="7" ry="6" fill="none" stroke="#555" strokeWidth="2.5" />
                  <rect x="41" y="50" width="8" height="2" fill="#555" />
                </motion.g>
              );
            case "headphones":
              return (
                <motion.g initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring" }}>
                  <rect x="18" y="38" width="6" height="22" rx="3" fill="#1976d2" />
                  <rect x="66" y="38" width="6" height="22" rx="3" fill="#1976d2" />
                  <rect x="24" y="32" width="42" height="10" rx="5" fill="#1976d2" />
                </motion.g>
              );
            case "hat":
              return (
                <motion.ellipse
                  cx="55"
                  cy="18"
                  rx="24"
                  ry="8"
                  fill="#43a047"
                  initial={{ rotate: -20, y: -10, scale: 0.7 }}
                  animate={{ rotate: 0, y: 0, scale: 1 }}
                  transition={{ type: "spring" }}
                />
              );
            case "mustache":
              return (
                <motion.path
                  d="M38 70 Q45 74 52 70"
                  stroke="#222"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            default:
              return null;
          }
        })()}
      </AnimatePresence>
    </svg>
  );
}

export default function AvatarPicker({
  value,
  onChange,
}: {
  value: any;
  onChange: (val: any) => void;
}) {
  const avatar = value || {};
  const [animVibe, setAnimVibe] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 items-center w-full">
      <div className="mb-2">
        {getAvatarSVG(avatar)}
      </div>
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
              onChange({ ...avatar, vibe: v.value });
              setTimeout(() => setAnimVibe(null), 400);
            }}
            aria-label={v.label}
            tabIndex={0}
            whileTap={{ scale: 1.2, rotate: v.value === "edgy" ? 10 : 0 }}
            animate={animVibe === v.value ? { scale: 1.3, rotate: v.value === "edgy" ? 10 : 0 } : {}}
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
            className={`w-6 h-6 rounded-full border-2 ${avatar.skin === color ? "border-blue-500 scale-110" : "border-gray-200"}`}
            style={{ background: color }}
            aria-label={`Skin tone ${color}`}
            onClick={() => onChange({ ...avatar, skin: color })}
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
            className={`w-6 h-6 rounded-full border-2 ${avatar.hair === color ? "border-blue-500 scale-110" : "border-gray-200"}`}
            style={{ background: color }}
            aria-label={`Hair color ${color}`}
            onClick={() => onChange({ ...avatar, hair: color })}
            tabIndex={0}
          />
        ))}
        <button
          className={`px-2 py-1 rounded text-xs font-semibold ${avatar.hairStyle === "bald" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => onChange({ ...avatar, hairStyle: "bald" })}
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
            className={`w-5 h-5 rounded-full border-2 ${avatar.eyeColor === color ? "border-blue-500 scale-110" : "border-gray-200"}`}
            style={{ background: color }}
            aria-label={`Eye color ${color}`}
            onClick={() => onChange({ ...avatar, eyeColor: color })}
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
            onClick={() => onChange({ ...avatar, accessory: a.value })}
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
            eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
            vibe: vibes[Math.floor(Math.random() * vibes.length)].value,
            accessory: accessories[Math.floor(Math.random() * accessories.length)].value,
          };
          onChange(random);
        }}
        aria-label="Randomize avatar"
        tabIndex={0}
      >
        🎲 Randomize All
      </button>
    </div>
  );
}