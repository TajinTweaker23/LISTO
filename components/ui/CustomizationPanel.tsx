import React, { useCallback } from "react";
import { Button } from "./button";

const fonts = [
  { label: "Default", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "monospace" },
  { label: "Comic Sans", value: "'Comic Sans MS', cursive, sans-serif" },
];

const defaultSettings = {
  fontFamily: "sans-serif",
  fontColor: "#222222",
  bgColor: "#ffffff",
  fontSize: 16,
  musicUrl: "",
  textToSpeech: false,
  highContrast: false,
  deafMode: false,
  blindMode: false,
};

export default function CustomizationPanel({
  settings,
  onChange,
}: {
  settings: typeof defaultSettings;
  onChange: (opts: typeof defaultSettings) => void;
}) {
  // Reset handler with memoization for better performance
  const handleReset = useCallback(
    () => onChange({ ...defaultSettings }),
    [onChange]
  );

  return (
    <aside
      className="p-5 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl space-y-6 w-full max-w-xs transition-all duration-300"
      aria-labelledby="customization-panel"
    >
      <div className="flex items-center justify-between">
        <h2
          id="customization-panel"
          className="font-bold text-lg text-gray-700 dark:text-gray-100"
        >
          Customize
        </h2>
        <Button
          variant="ghost"
          size="sm"
          tooltip="Reset to defaults"
          onClick={handleReset}
          leftIcon={
            <span role="img" aria-label="reset" className="animate-spin-slow">
              🔄
            </span>
          }
        >
          Reset
        </Button>
      </div>

      {/* Font Family Selector */}
      <div className="space-y-2">
        <label
          htmlFor="font-family"
          className="block text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Font Family
        </label>
        <select
          id="font-family"
          value={settings.fontFamily}
          onChange={(e) =>
            onChange({ ...settings, fontFamily: e.target.value })
          }
          className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 transition"
          style={{ fontFamily: settings.fontFamily }}
        >
          {fonts.map((f) => (
            <option
              key={f.value}
              value={f.value}
              style={{ fontFamily: f.value }}
            >
              {f.label}
            </option>
          ))}
        </select>
        <div
          className="mt-1 text-xs text-gray-500"
          style={{ fontFamily: settings.fontFamily }}
        >
          Live preview: The quick brown fox jumps over the lazy dog.
        </div>
      </div>

      {/* Font Color Picker */}
      <div className="flex gap-2 items-center">
        <label
          htmlFor="font-color"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Font Color
        </label>
        <input
          id="font-color"
          type="color"
          value={settings.fontColor}
          onChange={(e) => onChange({ ...settings, fontColor: e.target.value })}
          className="w-8 h-8 rounded-full border-2 border-gray-300 shadow transition-transform duration-200 hover:scale-110"
        />
        <span className="text-xs">{settings.fontColor}</span>
      </div>

      {/* Background Color Picker */}
      <div className="flex gap-2 items-center">
        <label
          htmlFor="bg-color"
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Background
        </label>
        <input
          id="bg-color"
          type="color"
          value={settings.bgColor}
          onChange={(e) => onChange({ ...settings, bgColor: e.target.value })}
          className="w-8 h-8 rounded-full border-2 border-gray-300 shadow transition-transform duration-200 hover:scale-110"
        />
        <span className="text-xs">{settings.bgColor}</span>
      </div>

      {/* Font Size Slider */}
      <div>
        <label
          htmlFor="font-size"
          className="block text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Font Size
        </label>
        <input
          id="font-size"
          type="range"
          min={12}
          max={48}
          value={settings.fontSize}
          onChange={(e) =>
            onChange({ ...settings, fontSize: parseInt(e.target.value) })
          }
          className="w-full accent-blue-500"
        />
        <span className="ml-2 text-xs">{settings.fontSize}px</span>
      </div>

      {/* Theme Music */}
      <div>
        <label
          htmlFor="music-url"
          className="block text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Theme Music (YouTube URL)
        </label>
        <input
          id="music-url"
          type="text"
          value={settings.musicUrl}
          onChange={(e) => onChange({ ...settings, musicUrl: e.target.value })}
          placeholder="Paste YouTube link"
          className="w-full rounded border px-2 py-1 mt-1 focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Toggles for Accessibility Settings */}
      <div className="space-y-2">
        <Toggle
          label="Text to Speech"
          checked={settings.textToSpeech}
          onChange={(v) => onChange({ ...settings, textToSpeech: v })}
          tooltip="Reads text aloud"
        />
        <Toggle
          label="High Contrast"
          checked={settings.highContrast}
          onChange={(v) => onChange({ ...settings, highContrast: v })}
          tooltip="Improves visibility"
        />
        <Toggle
          label="Deaf Mode (Captions)"
          checked={settings.deafMode}
          onChange={(v) => onChange({ ...settings, deafMode: v })}
          tooltip="Enables captions"
        />
        <Toggle
          label="Blind Mode (Screen Reader)"
          checked={settings.blindMode}
          onChange={(v) => onChange({ ...settings, blindMode: v })}
          tooltip="Optimizes for screen readers"
        />
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </aside>
  );
}

// Toggle Switch Component
function Toggle({
  label,
  checked,
  onChange,
  tooltip,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  tooltip?: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group relative">
      <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
      <span className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`block w-10 h-6 rounded-full transition-colors duration-300 ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? "translate-x-4" : ""
          }`}
        ></span>
      </span>
      {tooltip && (
        <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow transition pointer-events-none z-10">
          {tooltip}
        </span>
      )}
    </label>
  );
}
