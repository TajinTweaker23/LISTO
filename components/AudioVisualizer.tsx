import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/AudioVisualizer.css';

const AudioVisualizer = ({ src }) => {
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [isWindowVisible, setWindowVisible] = useState(false);
  const audioRef = useRef(null);

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
    <div className={styles.audioPlayerContainer}>
      <audio ref={audioRef} src={src} controls />
      <button onClick={toggleVisualizer} className={styles.audioPlayerToggle}>
        {showVisualizer ? 'Hide Visualizer' : 'Show Visualizer'}
      </button>
      {showVisualizer && (
        <div className={`${styles.audioVisualizerWindow} ${isWindowVisible ? styles.visible : ''}`}>
          <div className={styles.swipeHandle} onMouseDown={handleSwipe}></div>
          <div className={styles.audioVisualizerContent}>
            {/* Your audio visualizer component goes here */}
            <p>Audio Visualizer</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
