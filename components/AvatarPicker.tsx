import React, { useState } from "react";

export default function OnboardingModal({
  onComplete,
}: {
  onComplete: (avatar: any | null) => void;
}) {
  const [avatar, setAvatar] = useState<any>(null);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Create Your Avatar (Optional)</h2>
      <p className="mb-4 text-gray-600">
        You can personalize your avatar now or skip and do it later.
      </p>
      <AvatarPicker value={avatar} onChange={setAvatar} />
      <div className="flex gap-4 mt-6 justify-end">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => onComplete(null)}
        >
          Skip for now
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => onComplete(avatar)}
        >
          Continue
        </button>
      </div>
      <div className="mt-4 flex flex-col items-center">
        {!avatar && (
          <div className="text-center text-gray-500 text-sm mt-4">
            <span className="text-3xl block mb-2">🙂</span>
            <span>
              No avatar yet. You can always create one later from your profile
              page!
            </span>
          </div>
        )}
        {avatar && (
          <div className="mt-4">
            <span className="text-3xl block mb-2">
              {getAvatarSVG(avatar)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const skinTones = [
  "#f9dcc4", "#e0ac69", "#8d5524", "#c68642", "#b0b0b0"
];
const hairColors = [
  "#222", "#ffe066", "#d2691e", "#b0b0b0", "#8d5524"
];
const hairStyles = [
  { label: "Short", value: "short" },
  { label: "Long", value: "long" },
  { label: "Curly", value: "curly" },
  { label: "Bald", value: "bald" }
];
const vibes = [
  "optimist", "chill", "bookworm", "artist", "gamer", "preppy"
];

export function AvatarPicker({
  value,
  onChange,
}: {
  value: any;
  onChange: (val: any) => void;
}) {
  const avatar = value || {};

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Live Preview */}
      <div className="mb-2">
        {getAvatarSVG(avatar)}
      </div>
      {/* Skin Tone */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-600">Skin:</span>
        {skinTones.map((color) => (
          <button
            key={color}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${avatar.skin === color ? "border-blue-500 scale-110" : "border-gray-200"}`}
            style={{ background: color }}
            aria-label={`Skin tone ${color}`}
            onClick={() => onChange({ ...avatar, skin: color })}
          />
        ))}
      </div>
      {/* Hair Color */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-600">Hair:</span>
        {hairColors.map((color) => (
          <button
            key={color}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${avatar.hair === color ? "border-blue-500 scale-110" : "border-gray-200"}`}
            style={{ background: color }}
            aria-label={`Hair color ${color}`}
            onClick={() => onChange({ ...avatar, hair: color })}
          />
        ))}
      </div>
      {/* Hair Style */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-600">Style:</span>
        {hairStyles.map((style) => (
          <button
            key={style.value}
            className={`px-2 py-1 rounded transition-all duration-200 text-xs font-semibold ${avatar.hairStyle === style.value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => onChange({ ...avatar, hairStyle: style.value })}
          >
            {style.label}
          </button>
        ))}
      </div>
      {/* Vibe */}
      <div className="flex gap-2 items-center flex-wrap">
        <span className="text-xs text-gray-600">Vibe:</span>
        {vibes.map((vibe) => (
          <button
            key={vibe}
            className={`px-2 py-1 rounded transition-all duration-200 text-xs font-semibold ${avatar.vibe === vibe ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => onChange({ ...avatar, vibe })}
          >
            {vibe.charAt(0).toUpperCase() + vibe.slice(1)}
          </button>
        ))}
      </div>
      {/* Accessories */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-600">Accessory:</span>
        <button
          className={`px-2 py-1 rounded ${avatar.accessory === "glasses" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() =>
            onChange({
              ...avatar,
              accessory: avatar.accessory === "glasses" ? undefined : "glasses",
            })
          }
          title="Toggle Glasses"
        >
          👓
        </button>
        <button
          className={`px-2 py-1 rounded ${avatar.hat === "cap" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() =>
            onChange({
              ...avatar,
              hat: avatar.hat === "cap" ? undefined : "cap",
            })
          }
          title="Toggle Cap"
        >
          🧢
        </button>
      </div>
      {/* Randomize */}
      <button
        className="mt-2 px-3 py-1 bg-pink-500 text-white rounded text-xs"
        onClick={() => {
          const random = {
            skin: skinTones[Math.floor(Math.random() * skinTones.length)],
            hair: hairColors[Math.floor(Math.random() * hairColors.length)],
            hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)].value,
            vibe: vibes[Math.floor(Math.random() * vibes.length)],
            accessory: Math.random() > 0.5 ? "glasses" : undefined,
            hat: Math.random() > 0.5 ? "cap" : undefined,
          };
          onChange(random);
        }}
      >
        🎲 Randomize
      </button>
    </div>
  );
}

// SVG preview function
export function getAvatarSVG(avatar: any) {
  return (
    <svg width="64" height="64" viewBox="0 0 48 48">
      {/* Face */}
      <circle cx="24" cy="24" r="22" fill={avatar?.skin || "#f9dcc4"} stroke="#ccc" strokeWidth="2" />
      {/* Hair */}
      {avatar?.hairStyle !== "bald" && (
        <ellipse
          cx="24"
          cy="16"
          rx="14"
          ry="8"
          fill={avatar?.hair || "#222"}
        />
      )}
      {/* Face oval */}
      <ellipse cx="24" cy="28" rx="10" ry="12" fill={avatar?.skin || "#f9dcc4"} />
      {/* Smile */}
      <path d="M18 32 Q24 38 30 32" stroke="#333" strokeWidth="2" fill="none" />
      {/* Eyes */}
      <circle cx="20" cy="28" r="2" fill="#222" />
      <circle cx="28" cy="28" r="2" fill="#222" />
      {/* Glasses */}
      {avatar?.accessory === "glasses" && (
        <>
          <circle cx="20" cy="28" r="4" fill="none" stroke="#555" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="4" fill="none" stroke="#555" strokeWidth="1.5" />
          <rect x="22" y="27" width="4" height="2" fill="#555" />
        </>
      )}
      {/* Cap */}
      {avatar?.hat === "cap" && (
        <ellipse cx="24" cy="10" rx="13" ry="5" fill="#1976d2" />
      )}
    </svg>
  );
}