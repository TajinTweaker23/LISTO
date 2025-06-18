import React from "react";

const fonts = [
  { label: "Default", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "monospace" },
  { label: "Comic Sans", value: "'Comic Sans MS', cursive, sans-serif" },
];

export default function CustomizationPanel({ settings, onChange }: {
  settings: any;
  onChange: (opts: any) => void;
}) {
  return (
    <aside className="p-4 bg-gray-100 rounded shadow space-y-4">
      <div>
        <label>Font Family</label>
        <select
          value={settings.fontFamily}
          onChange={e => onChange({ ...settings, fontFamily: e.target.value })}
        >
          {fonts.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Font Color</label>
        <input
          type="color"
          value={settings.fontColor}
          onChange={e => onChange({ ...settings, fontColor: e.target.value })}
        />
      </div>
      <div>
        <label>Background Color</label>
        <input
          type="color"
          value={settings.bgColor}
          onChange={e => onChange({ ...settings, bgColor: e.target.value })}
        />
      </div>
      <div>
        <label>Font Size</label>
        <input
          type="range"
          min={12}
          max={48}
          value={settings.fontSize}
          onChange={e => onChange({ ...settings, fontSize: e.target.value })}
        />
        <span>{settings.fontSize}px</span>
      </div>
      <div>
        <label>Theme Music (YouTube URL)</label>
        <input
          type="text"
          value={settings.musicUrl}
          onChange={e => onChange({ ...settings, musicUrl: e.target.value })}
          placeholder="Paste YouTube link"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.textToSpeech}
            onChange={e => onChange({ ...settings, textToSpeech: e.target.checked })}
          />
          Text to Speech
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={e => onChange({ ...settings, highContrast: e.target.checked })}
          />
          High Contrast
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.deafMode}
            onChange={e => onChange({ ...settings, deafMode: e.target.checked })}
          />
          Deaf Mode (Captions)
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.blindMode}
            onChange={e => onChange({ ...settings, blindMode: e.target.checked })}
          />
          Blind Mode (Screen Reader)
        </label>
      </div>
    </aside>
  );
}