import React, { useState, useRef, useEffect } from 'react';
import '../styles/AudioVisualizer.css';

const AudioVisualizer = ({ src }: { src: string }) => {
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [isWindowVisible, setWindowVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleVisualizer = () => {
    setShowVisualizer(!showVisualizer);
  };

  const handlePlay = () => {
    if (showVisualizer) {
      setWindowVisible(true);
    }
  };

  const handleSwipe = () => {
    setWindowVisible(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', handlePlay);
      return () => {
        audio.removeEventListener('play', handlePlay);
      };
    }
  }, [showVisualizer]);

  return (
    <div className={"audio-player-container"}>
      <audio ref={audioRef} src={src} controls />
      <button onClick={toggleVisualizer} className={"audio-player-toggle"}>
        {showVisualizer ? 'Hide Visualizer' : 'Show Visualizer'}
      </button>
      {showVisualizer && (
        <div className={`${"audioVisualizerWindow"} ${isWindowVisible ? "visible" : ''}`}>
          <div className={"swipeHandle"} onMouseDown={handleSwipe}></div>
          <div className={"audioVisualizerContent"}>
            {/* Your audio visualizer component goes here */}
            <p>Audio Visualizer</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
