import React from 'react';
import AudioVisualizer from '../components/AudioVisualizer';

const AudioVisualizerDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Audio Visualizer Demo
        </h1>
        
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Music Service Integration
          </h2>
          
          <div className="text-white/80 space-y-4 mb-8">
            <p>
              This enhanced AudioVisualizer component automatically detects when music is playing from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Spotify Web Player</strong> - Detects tracks and shows visualizer</li>
              <li><strong>YouTube Music</strong> - Monitors playback state</li>
              <li><strong>Apple Music</strong> - Integrates with web player</li>
              <li><strong>Local Audio</strong> - Works with HTML5 audio elements</li>
            </ul>
            
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mt-6">
              <h3 className="text-yellow-200 font-semibold mb-2">Features:</h3>
              <ul className="text-yellow-100 text-sm space-y-1">
                <li>• Particle-based visualization with audio reactivity</li>
                <li>• Swipe down gesture to minimize visualizer</li>
                <li>• "Keep music playing" option to maintain visualizer</li>
                <li>• Service-specific color themes</li>
                <li>• Responsive design for mobile and desktop</li>
              </ul>
            </div>
            
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h3 className="text-blue-200 font-semibold mb-2">How to Test:</h3>
              <ol className="text-blue-100 text-sm space-y-1 list-decimal list-inside">
                <li>Open Spotify, YouTube Music, or Apple Music in another tab</li>
                <li>Start playing a song</li>
                <li>The visualizer will automatically appear at the bottom</li>
                <li>Use the swipe handle to minimize or toggle the "Keep playing" option</li>
              </ol>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white/5 rounded-xl p-6 max-w-md text-center">
              <h3 className="text-white font-semibold mb-4">Test with Local Audio</h3>
              <AudioVisualizer src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" />
              <p className="text-white/60 text-sm mt-4">
                Click the audio controls above and then toggle the visualizer to see the particle effects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizerDemo;
