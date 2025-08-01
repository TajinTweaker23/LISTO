// Core Type Definitions for LISTO App

export interface ToastState {
  message: string;
  show: boolean;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'shapes' | 'tables' | 'focus' | 'customization' | 'social';
}

export interface AppSettings {
  // Appearance
  theme: 'sage' | 'ocean' | 'sunset' | 'forest' | 'royal';
  colorMode: 'light' | 'dark' | 'auto';
  fontFamily: string;
  fontSize: number;
  
  // Accessibility
  textToSpeech: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  deafMode: boolean;
  blindMode: boolean;
  
  // Audio
  soundscape: string;
  soundVolume: number;
  muted: boolean;
  
  // Productivity
  focusMode: boolean;
  pomodoroLength: number; // in minutes
  breakLength: number;
  autoStartBreaks: boolean;
  
  // Interface
  sidebarCollapsed: boolean;
  showGreeting: boolean;
  showMascot: boolean;
  enableParticleEffects: boolean;
  
  // Privacy
  analyticsEnabled: boolean;
  crashReportingEnabled: boolean;
}

export interface Shape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'hexagon' | 'star';
  position: { x: number; y: number };
  size: number;
  color: string;
  rotation: number;
  createdAt: Date;
}

export interface Table {
  id: string;
  rows: number;
  cols: number;
  position: { x: number; y: number };
  data: string[][];
  style: {
    borderColor: string;
    backgroundColor: string;
    textColor: string;
  };
  createdAt: Date;
}

export interface CommandAction {
  id: string;
  name: string;
  description?: string;
  category: 'navigation' | 'creation' | 'settings' | 'accessibility' | 'fun';
  shortcut?: string;
  icon?: string;
  action: () => void | Promise<void>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
  read: boolean;
  persistent?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | 'danger';
  }>;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  preferences: AppSettings;
  achievements: Achievement[];
  stats: {
    shapesCreated: number;
    tablesCreated: number;
    focusSessionsCompleted: number;
    totalFocusTime: number; // in minutes
    daysActive: number;
    joinedAt: Date;
  };
}

export interface AppState {
  user: User | null;
  settings: AppSettings;
  shapes: Shape[];
  tables: Table[];
  achievements: Achievement[];
  notifications: NotificationItem[];
  
  // UI State
  sidebarOpen: boolean;
  currentView: string;
  commandPaletteOpen: boolean;
  settingsPanelOpen: boolean;
  onboardingComplete: boolean;
  
  // Focus State
  focusMode: boolean;
  focusTimer: {
    active: boolean;
    timeRemaining: number;
    type: 'focus' | 'break';
  };
  
  // Effects State
  showConfetti: boolean;
  showEmojiRain: boolean;
  readingRuler: boolean;
  parallaxEnabled: boolean;
}

// Hook Return Types
export interface UseToastReturn {
  toast: ToastState;
  showToast: (message: string, type?: ToastState['type'], duration?: number) => void;
  hideToast: () => void;
}

export interface UseAchievementsReturn {
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  checkAndUnlockAchievements: (context: any) => void;
}

export interface UseSoundscapeReturn {
  currentSoundscape: string;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  setSoundscape: (soundscape: string) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  stop: () => void;
}

export interface UseParallaxReturn {
  parallax: { x: number; y: number };
  isEnabled: boolean;
  toggle: () => void;
}

export interface UseFocusTimerReturn {
  isActive: boolean;
  timeRemaining: number;
  type: 'focus' | 'break';
  progress: number;
  start: (type?: 'focus' | 'break') => void;
  pause: () => void;
  stop: () => void;
  skip: () => void;
}

// Event Types
export interface ShapeCreatedEvent {
  shape: Shape;
  trigger: 'manual' | 'command' | 'shortcut';
}

export interface TableCreatedEvent {
  table: Table;
  trigger: 'manual' | 'command' | 'shortcut';
}

export interface AchievementUnlockedEvent {
  achievement: Achievement;
  context: string;
}

export interface FocusSessionCompletedEvent {
  duration: number;
  type: 'focus' | 'break';
  completedAt: Date;
}
