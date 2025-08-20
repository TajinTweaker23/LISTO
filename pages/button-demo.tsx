import React, { useState } from 'react';
import Button from '../components/Button';

const ButtonDemo: React.FC = () => {
  const [customAccent, setCustomAccent] = useState('#ae00ff');
  const [customSecondary, setCustomSecondary] = useState('#001eff');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Animated Button Components
        </h1>

        {/* Theme Presets */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Theme Presets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button theme="purple">Purple Theme</Button>
            <Button theme="green">Green Theme</Button>
            <Button theme="red">Red Theme</Button>
            <Button theme="blue">Blue Theme</Button>
            <Button theme="orange">Orange Theme</Button>
            <Button theme="pink">Pink Theme</Button>
            <Button theme="cyan">Cyan Theme</Button>
            <Button theme="gold">Gold Theme</Button>
          </div>
        </section>

        {/* Custom Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Custom Colors</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Accent Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(e) => setCustomAccent(e.target.value)}
                    className="w-16 h-10 rounded border-2 border-gray-600 cursor-pointer"
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
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customSecondary}
                    onChange={(e) => setCustomSecondary(e.target.value)}
                    className="w-16 h-10 rounded border-2 border-gray-600 cursor-pointer"
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
            <div className="text-center">
              <Button 
                accentColor={customAccent} 
                secondaryColor={customSecondary}
              >
                Custom Colored Button
              </Button>
            </div>
          </div>
        </section>

        {/* Button States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Button States & Sizes</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Button theme="blue">Normal Button</Button>
              <Button theme="blue" disabled>Disabled Button</Button>
              <Button theme="red" style={{ fontSize: '12px', padding: '0.5em 1em' }}>Small Button</Button>
              <Button theme="green" style={{ fontSize: '18px', padding: '1.2em 2em' }}>Large Button</Button>
            </div>
          </div>
        </section>

        {/* Variant Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Variant Comparison</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="animated" theme="purple">Animated Button</Button>
            <Button variant="default">Default Button</Button>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Code Examples:</h3>
            <div className="space-y-4 text-sm">
              <div className="bg-gray-900 rounded p-4">
                <div className="text-green-400">// Theme preset</div>
                <code className="text-white">&lt;Button theme="purple"&gt;Purple Button&lt;/Button&gt;</code>
              </div>
              <div className="bg-gray-900 rounded p-4">
                <div className="text-green-400">// Custom colors</div>
                <code className="text-white">&lt;Button accentColor="#ff0055" secondaryColor="#00aaff"&gt;Custom Button&lt;/Button&gt;</code>
              </div>
              <div className="bg-gray-900 rounded p-4">
                <div className="text-green-400">// Default variant (fallback to old styling)</div>
                <code className="text-white">&lt;Button variant="default"&gt;Default Button&lt;/Button&gt;</code>
              </div>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Animation Effects</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Animated border sweep on hover</li>
                <li>• Glowing box shadow effects</li>
                <li>• Gradient background on active state</li>
                <li>• Customizable transition timing</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Customization</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 8 built-in color themes</li>
                <li>• Custom accent & secondary colors</li>
                <li>• CSS variable support</li>
                <li>• Backwards compatibility</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonDemo;
