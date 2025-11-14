'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Video, 
  Mic, 
  MicOff, 
  FlipHorizontal,
  Square,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Music,
  Sparkles,
  Timer,
  Palette,
  Type,
  Sticker,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Zap,
  Heart,
  Star,
  Smile,
  Filter as FilterIcon
} from 'lucide-react';

interface VideoUploadStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (videoData: VideoData) => void;
}

interface VideoData {
  file: File;
  caption: string;
  tags: string[];
  effects: VideoEffect[];
  audio?: {
    trackName: string;
    startTime: number;
    volume: number;
  };
  challengeId?: string;
  privacy: 'public' | 'friends' | 'private';
}

interface VideoEffect {
  id: string;
  type: 'filter' | 'text' | 'sticker' | 'transition';
  data: any;
  timestamp?: number;
  duration?: number;
}

const VideoUploadStudio: React.FC<VideoUploadStudioProps> = ({ isOpen, onClose, onPublish }) => {
  const [currentStep, setCurrentStep] = useState<'record' | 'edit' | 'publish'>('record');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [effects, setEffects] = useState<VideoEffect[]>([]);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filters for video effects
  const filters = [
    { id: 'none', name: 'Original', css: 'none', emoji: '📹' },
    { id: 'vintage', name: 'Vintage', css: 'sepia(80%) contrast(120%)', emoji: '📸' },
    { id: 'dramatic', name: 'Dramatic', css: 'contrast(150%) brightness(90%)', emoji: '🎭' },
    { id: 'warm', name: 'Warm', css: 'sepia(30%) saturate(120%)', emoji: '🌅' },
    { id: 'cool', name: 'Cool', css: 'hue-rotate(180deg) saturate(110%)', emoji: '❄️' },
    { id: 'monochrome', name: 'B&W', css: 'grayscale(100%) contrast(120%)', emoji: '⚫' },
    { id: 'vibrant', name: 'Vibrant', css: 'saturate(180%) contrast(110%)', emoji: '🌈' },
    { id: 'dreamy', name: 'Dreamy', css: 'blur(0.5px) brightness(110%)', emoji: '✨' }
  ];

  // Popular audio tracks for videos
  const audioTracks = [
    { id: 'upbeat1', name: 'Cleaning Anthem', artist: 'House Beats', duration: 30 },
    { id: 'focus1', name: 'Productivity Flow', artist: 'Lo-Fi Collective', duration: 45 },
    { id: 'morning1', name: 'Morning Energy', artist: 'Sunrise Vibes', duration: 60 },
    { id: 'comedy1', name: 'Silly Moments', artist: 'Comedy Central', duration: 25 }
  ];

  // Trending challenges
  const challenges = [
    { id: 'bed-speedrun', name: '60-Second Bed Making', emoji: '🛏️' },
    { id: 'dish-dance', name: 'Dish Washing Dance', emoji: '🍽️' },
    { id: 'laundry-fold', name: 'Perfect Fold Challenge', emoji: '👕' },
    { id: 'desk-organize', name: 'Desk Organization', emoji: '💻' }
  ];

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1080 },
          height: { ideal: 1920 },
          facingMode: 'user'
        },
        audio: true
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const file = new File([blob], `video-${Date.now()}.webm`, { type: 'video/webm' });
      setRecordedVideo(file);
      setVideoUrl(URL.createObjectURL(blob));
      setCurrentStep('edit');
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingDuration(0);

    // Start duration counter
    intervalRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRecording]);

  const retakeVideo = useCallback(() => {
    setRecordedVideo(null);
    setVideoUrl('');
    setCurrentStep('record');
    setRecordingDuration(0);
    startCamera();
  }, [startCamera]);

  const addTextEffect = (text: string, style: any) => {
    const newEffect: VideoEffect = {
      id: Date.now().toString(),
      type: 'text',
      data: { text, style },
      timestamp: 0,
      duration: 5
    };
    setEffects(prev => [...prev, newEffect]);
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim().toLowerCase())) {
      setTags(prev => [...prev, tag.trim().toLowerCase()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handlePublish = () => {
    if (!recordedVideo) return;

    const videoData: VideoData = {
      file: recordedVideo,
      caption,
      tags,
      effects,
      challengeId: selectedChallenge || undefined,
      privacy
    };

    onPublish(videoData);
    onClose();
  };

  // Initialize camera when component opens
  React.useEffect(() => {
    if (isOpen && currentStep === 'record') {
      startCamera();
    }

    return () => {
      // Cleanup camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, currentStep, startCamera]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        <button onClick={onClose} className="text-white p-2">
          <X className="w-6 h-6" />
        </button>
        <div className="text-white font-medium">
          {currentStep === 'record' && 'Record Video'}
          {currentStep === 'edit' && 'Edit Video'}
          {currentStep === 'publish' && 'Publish Video'}
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {currentStep === 'record' && (
        <div className="flex-1 relative">
          {/* Camera Preview */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ 
              filter: selectedFilter !== 'none' 
                ? filters.find(f => f.id === selectedFilter)?.css 
                : 'none' 
            }}
          />

          {/* Recording Timer */}
          {isRecording && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
            </div>
          )}

          {/* Filter Selection */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-black/50 text-white p-2 rounded-lg text-sm backdrop-blur-sm"
            >
              {filters.map(filter => (
                <option key={filter.id} value={filter.id}>
                  {filter.emoji} {filter.name}
                </option>
              ))}
            </select>
          </div>

          {/* Recording Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
            <motion.button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${
                isRecording ? 'bg-red-500' : 'bg-transparent'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Video className="w-8 h-8 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      )}

      {currentStep === 'edit' && videoUrl && (
        <div className="flex-1 flex flex-col">
          {/* Video Preview */}
          <div className="flex-1 relative bg-black">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-contain"
              style={{ 
                filter: selectedFilter !== 'none' 
                  ? filters.find(f => f.id === selectedFilter)?.css 
                  : 'none' 
              }}
            />
          </div>

          {/* Edit Tools */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setCurrentStep('publish')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Next
              </button>
              <button
                onClick={retakeVideo}
                className="border border-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Retake
              </button>
            </div>

            {/* Filter Selection */}
            <div className="mb-4">
              <h3 className="text-white font-medium mb-2">Filters</h3>
              <div className="flex gap-2 overflow-x-auto">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm ${
                      selectedFilter === filter.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {filter.emoji} {filter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Tracks */}
            <div>
              <h3 className="text-white font-medium mb-2">Add Music</h3>
              <div className="flex gap-2 overflow-x-auto">
                {audioTracks.map(track => (
                  <button
                    key={track.id}
                    className="flex-shrink-0 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600"
                  >
                    <Music className="w-4 h-4 inline mr-1" />
                    {track.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'publish' && (
        <div className="flex-1 p-4 bg-white overflow-y-auto">
          {/* Video Preview */}
          <div className="mb-6">
            <video
              src={videoUrl}
              className="w-full max-w-sm mx-auto rounded-2xl"
              style={{ 
                filter: selectedFilter !== 'none' 
                  ? filters.find(f => f.id === selectedFilter)?.css 
                  : 'none' 
              }}
              controls
            />
          </div>

          {/* Caption */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's happening in your video?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add tags..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTag(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>

          {/* Challenge Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Join a Challenge
            </label>
            <select
              value={selectedChallenge}
              onChange={(e) => setSelectedChallenge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">No challenge</option>
              {challenges.map(challenge => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.emoji} {challenge.name}
                </option>
              ))}
            </select>
          </div>

          {/* Privacy Settings */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Who can see this?
            </label>
            <div className="space-y-2">
              {[
                { value: 'public', label: 'Everyone', desc: 'Anyone can see your video' },
                { value: 'friends', label: 'Friends', desc: 'Only people you follow' },
                { value: 'private', label: 'Only me', desc: 'Only you can see this video' }
              ].map(option => (
                <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="privacy"
                    value={option.value}
                    checked={privacy === option.value}
                    onChange={(e) => setPrivacy(e.target.value as any)}
                    className="text-purple-600"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Publish Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep('edit')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
            >
              Back to Edit
            </button>
            <motion.button
              onClick={handlePublish}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Publish Video
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoUploadStudio;
