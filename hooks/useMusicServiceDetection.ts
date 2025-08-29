import { useState, useEffect, useCallback } from 'react';

export interface MusicServiceData {
  service: 'spotify' | 'youtube' | 'apple' | 'generic';
  isPlaying: boolean;
  track?: string;
  artist?: string;
  albumArt?: string;
  url?: string;
}

export const useMusicServiceDetection = () => {
  const [musicData, setMusicData] = useState<MusicServiceData | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const detectMediaSession = useCallback(() => {
    // Try to get data from Media Session API
    if ('mediaSession' in navigator && navigator.mediaSession.metadata) {
      const metadata = navigator.mediaSession.metadata;
      return {
        service: 'generic' as const,
        isPlaying: true,
        track: metadata.title || 'Unknown Track',
        artist: metadata.artist || 'Unknown Artist',
        albumArt: metadata.artwork?.[0]?.src
      };
    }
    return null;
  }, []);

  const detectSpotify = useCallback(() => {
    // Check if we're on Spotify Web Player
    if (window.location.hostname.includes('open.spotify.com')) {
      const playButton = document.querySelector('[data-testid="control-button-playpause"]');
      const isPlaying = playButton?.getAttribute('aria-label')?.includes('Pause');
      
      if (isPlaying) {
        return {
          service: 'spotify' as const,
          isPlaying: true,
          track: document.querySelector('[data-testid="context-item-info-title"]')?.textContent || 'Unknown Track',
          artist: document.querySelector('[data-testid="context-item-info-artist"]')?.textContent || 'Unknown Artist',
          url: window.location.href
        };
      }
    }

    // Check for Spotify in other tabs via document title patterns
    const titles = ['Spotify', '♫', '▶'];
    if (titles.some(title => document.title.includes(title))) {
      return {
        service: 'spotify' as const,
        isPlaying: true,
        track: document.title.split('•')[0]?.trim() || 'Unknown Track',
        artist: document.title.split('•')[1]?.trim() || 'Unknown Artist'
      };
    }

    return null;
  }, []);

  const detectYouTubeMusic = useCallback(() => {
    if (window.location.hostname.includes('music.youtube.com')) {
      const playButton = document.querySelector('.play-pause-button');
      const isPlaying = playButton?.getAttribute('aria-label')?.includes('Pause');
      
      if (isPlaying) {
        return {
          service: 'youtube' as const,
          isPlaying: true,
          track: document.querySelector('.title.style-scope.ytmusic-player-bar')?.textContent || 'Unknown Track',
          artist: document.querySelector('.byline.style-scope.ytmusic-player-bar')?.textContent || 'Unknown Artist',
          url: window.location.href
        };
      }
    }
    return null;
  }, []);

  const detectAppleMusic = useCallback(() => {
    if (window.location.hostname.includes('music.apple.com')) {
      const playButton = document.querySelector('.playback-controls__playback-btn');
      const isPlaying = playButton?.classList.contains('playback-controls__playback-btn--playing');
      
      if (isPlaying) {
        return {
          service: 'apple' as const,
          isPlaying: true,
          track: document.querySelector('.song-name')?.textContent || 'Unknown Track',
          artist: document.querySelector('.by-line__artist-name')?.textContent || 'Unknown Artist',
          url: window.location.href
        };
      }
    }
    return null;
  }, []);

  const detectAudioElements = useCallback(() => {
    // Look for playing HTML5 audio elements
    const audioElements = Array.from(document.querySelectorAll('audio, video'));
    const playingElement = audioElements.find(el => {
      const mediaEl = el as HTMLAudioElement | HTMLVideoElement;
      return !mediaEl.paused && 
        mediaEl.currentTime > 0 && 
        !mediaEl.muted && 
        mediaEl.readyState > 2;
    }) as HTMLAudioElement | HTMLVideoElement;

    if (playingElement) {
      return {
        service: 'generic' as const,
        isPlaying: true,
        track: playingElement.title || 'Playing Audio',
        artist: 'Local Media'
      };
    }
    return null;
  }, []);

  const detectMusicServices = useCallback(() => {
    setIsDetecting(true);
    
    try {
      // Try different detection methods in order of preference
      const detectionMethods = [
        detectSpotify,
        detectYouTubeMusic,
        detectAppleMusic,
        detectMediaSession,
        detectAudioElements
      ];

      for (const method of detectionMethods) {
        const result = method();
        if (result) {
          setMusicData(result);
          setIsDetecting(false);
          return result;
        }
      }

      // No music detected
      setMusicData(null);
    } catch (error) {
      console.warn('Music detection error:', error);
      setMusicData(null);
    } finally {
      setIsDetecting(false);
    }

    return null;
  }, [detectSpotify, detectYouTubeMusic, detectAppleMusic, detectMediaSession, detectAudioElements]);

  // Auto-detect music services
  useEffect(() => {
    const interval = setInterval(() => {
      detectMusicServices();
    }, 2000);

    // Initial detection
    detectMusicServices();

    return () => clearInterval(interval);
  }, [detectMusicServices]);

  // Listen for media session changes
  useEffect(() => {
    const handleMediaSessionChange = () => {
      detectMusicServices();
    };

    // Note: MediaSession API doesn't have addEventListener in all browsers
    // We'll rely on the interval polling for now
    
    return () => {
      // Cleanup if needed
    };
  }, [detectMusicServices]);

  return {
    musicData,
    isDetecting,
    forceDetection: detectMusicServices
  };
};
