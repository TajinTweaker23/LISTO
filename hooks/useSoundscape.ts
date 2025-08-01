import React, { createContext, useContext, ReactNode, useState, useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { UseSoundscapeReturn } from '../types';

/**
 * Custom hook for managing ambient soundscapes with volume control and persistence
 */
export const useSoundscape = (): UseSoundscapeReturn => {
  const [currentSoundscape, setCurrentSoundscape] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('soundscape') || '';
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(() => {
    if (typeof window === 'undefined') return 0.3;
    const stored = localStorage.getItem('soundscape-volume');
    return stored ? parseFloat(stored) : 0.3;
  });
  
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('soundscape-muted') === 'true';
  });
  
  const soundRef = useRef<Howl | null>(null);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  // Handle soundscape changes
  useEffect(() => {
    // Stop current sound
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
      soundRef.current = null;
      setIsPlaying(false);
    }

    // Start new sound if not muted and soundscape is selected
    if (currentSoundscape && !isMuted) {
      try {
        const newSound = new Howl({
          src: [currentSoundscape],
          loop: true,
          volume: volumeLevel,
          onload: () => {
            setIsPlaying(true);
          },
          onloaderror: (id, error) => {
            console.warn('Failed to load soundscape:', error);
            setIsPlaying(false);
          },
          onplay: () => {
            setIsPlaying(true);
          },
          onstop: () => {
            setIsPlaying(false);
          },
          onpause: () => {
            setIsPlaying(false);
          },
        });
        
        soundRef.current = newSound;
        newSound.play();
      } catch (error) {
        console.warn('Error creating soundscape:', error);
        setIsPlaying(false);
      }
    }

    // Persist to localStorage
    localStorage.setItem('soundscape', currentSoundscape);
  }, [currentSoundscape, isMuted, volumeLevel]);

  const setSoundscape = useCallback((soundscape: string) => {
    setCurrentSoundscape(soundscape);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeLevel(clampedVolume);
    
    if (soundRef.current) {
      soundRef.current.volume(clampedVolume);
    }
    
    localStorage.setItem('soundscape-volume', clampedVolume.toString());
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('soundscape-muted', newMuted.toString());
    
    if (soundRef.current) {
      if (newMuted) {
        soundRef.current.pause();
        setIsPlaying(false);
      } else {
        soundRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [isMuted]);

  return { currentSoundscape, setSoundscape, isPlaying, volumeLevel, setVolume, isMuted, toggleMute };
};

export const SoundscapeContext = createContext<UseSoundscapeReturn | undefined>(undefined);

export const SoundscapeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const soundscape = useSoundscape();
  return (
    <SoundscapeContext.Provider value={soundscape}>
      {children}
    </SoundscapeContext.Provider>
  );
};
