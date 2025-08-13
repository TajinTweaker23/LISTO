import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomizationPanel from './CustomizationPanel';

type SettingsPanelProps = {
  show: boolean;
  onClose: () => void;
  settings: any;
  setSettings: (settings: any) => void;
  soundscape: string;
  setSoundscape: (soundscape: string) => void;
  soundscapes: { label: string; file: string }[];
  muted: boolean;
  setMuted: (muted: boolean) => void;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  show,
  onClose,
  settings,
  setSettings,
  soundscape,
  setSoundscape,
  soundscapes,
  muted,
  setMuted,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={handleKeyDown}
        >
          <dialog
            open={show}
            onClose={onClose}
            aria-modal="true"
            className="bg-white dark:bg-[#232946] rounded-2xl shadow-2xl p-8 border border-blue-400/20"
          >
            <CustomizationPanel settings={settings} onChange={setSettings} />
            <div className="mt-6">
              <label htmlFor="soundscape-select" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Ambient Soundscape
              </label>
              <select
                id="soundscape-select"
                value={soundscape}
                onChange={(e) => setSoundscape(e.target.value)}
                className="w-full rounded border px-2 py-1 focus:ring-2 focus:ring-blue-400 transition"
              >
                {soundscapes.map((s) => (
                  <option key={s.file} value={s.file}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                className="mt-2 px-3 py-1 rounded bg-pink-500 text-white"
                onClick={() => setMuted(!muted)}
                aria-label={muted ? 'Unmute Soundscape' : 'Mute Soundscape'}
              >
                {muted ? 'Unmute' : 'Mute'}
              </button>
            </div>
            <div className="mt-4">
              <label htmlFor="theme-scheduler-label" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Theme Scheduler
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="theme-scheduler"
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    const dayStart = parseInt(
                      prompt('Day mode starts at hour (0-23)?', '7') || '7',
                      10
                    );
                    const nightStart = parseInt(
                      prompt('Night mode starts at hour (0-23)?', '19') || '19',
                      10
                    );
                    localStorage.setItem(
                      'themeSchedule',
                      JSON.stringify({ enabled, dayStart, nightStart })
                    );
                  }}
                />
                <label htmlFor="theme-scheduler" className="text-xs">
                  Enable automatic theme switching
                </label>
              </div>
            </div>
          </dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
