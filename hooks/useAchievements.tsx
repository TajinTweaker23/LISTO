import * as React from 'react';
import { Achievement, UseAchievementsReturn } from '../types';

const ACHIEVEMENTS_STORAGE_KEY = 'listo-achievements';

// Predefined achievements
const defaultAchievements: Achievement[] = [
  {
    id: 'first-shape',
    name: 'Shape Creator',
    description: 'Created your first shape',
    icon: '🎨',
    unlocked: false,
    category: 'shapes',
  },
  {
    id: 'shape-enthusiast',
    name: 'Shape Enthusiast',
    description: 'Created 5 shapes',
    icon: '🌟',
    unlocked: false,
    category: 'shapes',
  },
  {
    id: 'shape-master',
    name: 'Shape Master',
    description: 'Created 25 shapes',
    icon: '👑',
    unlocked: false,
    category: 'shapes',
  },
  {
    id: 'first-table',
    name: 'Table Builder',
    description: 'Created your first table',
    icon: '📊',
    unlocked: false,
    category: 'tables',
  },
  {
    id: 'table-master',
    name: 'Table Master',
    description: 'Created 3 tables',
    icon: '📈',
    unlocked: false,
    category: 'tables',
  },
  {
    id: 'organization-guru',
    name: 'Organization Guru',
    description: 'Created 10 tables',
    icon: '🗂️',
    unlocked: false,
    category: 'tables',
  },
  {
    id: 'first-focus',
    name: 'Focus Beginner',
    description: 'Completed your first focus session',
    icon: '🧘',
    unlocked: false,
    category: 'focus',
  },
  {
    id: 'focus-warrior',
    name: 'Focus Warrior',
    description: 'Completed 10 focus sessions',
    icon: '⚡',
    unlocked: false,
    category: 'focus',
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Completed 50 focus sessions',
    icon: '🕉️',
    unlocked: false,
    category: 'focus',
  },
  {
    id: 'customizer',
    name: 'Customizer',
    description: 'Changed the app theme',
    icon: '🎨',
    unlocked: false,
    category: 'customization',
  },
  {
    id: 'aesthetic-master',
    name: 'Aesthetic Master',
    description: 'Tried all available themes',
    icon: '✨',
    unlocked: false,
    category: 'customization',
  },
  {
    id: 'party-mode',
    name: 'Party Animal',
    description: 'Activated party mode 🎉',
    icon: '🎊',
    unlocked: false,
    category: 'social',
  },
];

/**
 * Custom hook for managing achievements with persistence and unlocking logic
 */
export const useAchievements = (): UseAchievementsReturn => {
  const [achievements, setAchievements] = React.useState<Achievement[]>(() => {
    if (typeof window === 'undefined') return defaultAchievements;
    
    const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with default achievements to handle new achievements
        return defaultAchievements.map(defaultAch => {
          const storedAch = parsed.find((a: Achievement) => a.id === defaultAch.id);
          return storedAch || defaultAch;
        });
      } catch {
        return defaultAchievements;
      }
    }
    return defaultAchievements;
  });

  // Persist achievements to localStorage
  React.useEffect(() => {
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const unlockAchievement = React.useCallback((achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId && !achievement.unlocked
          ? { 
              ...achievement, 
              unlocked: true, 
              unlockedAt: new Date() 
            }
          : achievement
      )
    );
  }, []);

  const checkAndUnlockAchievements = React.useCallback((context: {
    shapesCount?: number;
    tablesCount?: number;
    focusSessionsCompleted?: number;
    themeChanged?: boolean;
    themesTriedCount?: number;
    partyModeActivated?: boolean;
  }) => {
    const { 
      shapesCount = 0, 
      tablesCount = 0, 
      focusSessionsCompleted = 0,
      themeChanged = false,
      themesTriedCount = 0,
      partyModeActivated = false,
    } = context;

    // Shape achievements
    if (shapesCount >= 1) unlockAchievement('first-shape');
    if (shapesCount >= 5) unlockAchievement('shape-enthusiast');
    if (shapesCount >= 25) unlockAchievement('shape-master');

    // Table achievements
    if (tablesCount >= 1) unlockAchievement('first-table');
    if (tablesCount >= 3) unlockAchievement('table-master');
    if (tablesCount >= 10) unlockAchievement('organization-guru');

    // Focus achievements
    if (focusSessionsCompleted >= 1) unlockAchievement('first-focus');
    if (focusSessionsCompleted >= 10) unlockAchievement('focus-warrior');
    if (focusSessionsCompleted >= 50) unlockAchievement('zen-master');

    // Customization achievements
    if (themeChanged) unlockAchievement('customizer');
    if (themesTriedCount >= 5) unlockAchievement('aesthetic-master');

    // Social achievements
    if (partyModeActivated) unlockAchievement('party-mode');
  }, [unlockAchievement]);

  return {
    achievements,
    unlockedAchievements,
    unlockAchievement,
    checkAndUnlockAchievements,
  };
};

export const AchievementsContext = React.createContext<UseAchievementsReturn | undefined>(undefined);

export const AchievementsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const achievements = useAchievements();
  return (
    <AchievementsContext.Provider value={achievements}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievementsContext = () => {
  const context = React.useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error('useAchievementsContext must be used within a AchievementsProvider');
  }
  return context;
};
