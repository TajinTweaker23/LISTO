import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

type ColorTheme = 'purple' | 'green' | 'red' | 'blue' | 'orange' | 'pink' | 'cyan' | 'gold';

const ThemeSettings: React.FC = () => {
  const { preferences, updateTheme, updateCustomColors, resetToDefault, getThemeColors } = useTheme();
  const [customAccent, setCustomAccent] = useState(preferences.customAccentColor);
  const [customSecondary, setCustomSecondary] = useState(preferences.customSecondaryColor);

  const themes: { name: ColorTheme; label: string; colors: { accent: string; secondary: string } }[] = [
    { name: 'purple', label: 'Purple', colors: getThemeColors('purple') },
    { name: 'green', label: 'Green', colors: getThemeColors('green') },
    { name: 'red', label: 'Red', colors: getThemeColors('red') },
    { name: 'blue', label: 'Blue', colors: getThemeColors('blue') },
    { name: 'orange', label: 'Orange', colors: getThemeColors('orange') },
    { name: 'pink', label: 'Pink', colors: getThemeColors('pink') },
    { name: 'cyan', label: 'Cyan', colors: getThemeColors('cyan') },
    { name: 'gold', label: 'Gold', colors: getThemeColors('gold') },
  ];

  const handleCustomColorUpdate = () => {
    updateCustomColors(customAccent, customSecondary);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Button Theme Settings</h3>
      
      {/* Theme Presets */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-white mb-4">Choose a Theme</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {themes.map((themeOption) => (
            <button
              key={themeOption.name}
              onClick={() => updateTheme(themeOption.name)}
              className={`p-3 rounded-lg border-2 transition-all ${
                preferences.theme === themeOption.name
                  ? 'border-white bg-white/20'
                  : 'border-gray-500 bg-gray-800/50 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div 
                  className="w-4 h-4 rounded-full mr-1" 
                  style={{ backgroundColor: themeOption.colors.accent }}
                />
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: themeOption.colors.secondary }}
                />
              </div>
              <div className="text-white text-sm font-medium">{themeOption.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-white mb-4">Custom Colors</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Accent Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-12 h-10 rounded border-2 border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="#ae00ff"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={customSecondary}
                onChange={(e) => setCustomSecondary(e.target.value)}
                className="w-12 h-10 rounded border-2 border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={customSecondary}
                onChange={(e) => setCustomSecondary(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="#001eff"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCustomColorUpdate}
            accentColor={customAccent}
            secondaryColor={customSecondary}
            useGlobalTheme={false}
          >
            Apply Custom Colors
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-4">Preview</h4>
        <div className="flex flex-wrap gap-3">
          <Button>Primary Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button style={{ fontSize: '12px', padding: '0.7em 1.2em' }}>Small Button</Button>
        </div>
      </div>

      {/* Reset */}
      <div className="pt-4 border-t border-gray-600">
        <Button
          onClick={resetToDefault}
          theme="red"
          useGlobalTheme={false}
          style={{ fontSize: '14px', padding: '0.8em 1.5em' }}
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default ThemeSettings;
