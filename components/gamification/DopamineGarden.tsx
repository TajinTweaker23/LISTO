import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flower2,
  Sprout,
  TreePine,
  Sun,
  Cloud,
  Droplets,
  Sparkles,
  Award,
  Zap,
  Heart,
  Star,
  Shuffle,
  Settings,
  Plus,
  X,
  AlertTriangle,
  Target,
  Save
} from 'lucide-react';

// Enhanced interfaces with better typing
interface Plant {
  id: string;
  type: 'sprout' | 'flower' | 'tree' | 'special';
  name: string;
  growth: number; // 0-100
  happiness: number; // 0-100
  lastWatered: Date;
  achievements: string[];
  position: { x: number; y: number };
  color: string;
  special: boolean;
  unlockCondition?: string;
  category: 'focus' | 'social' | 'health' | 'creativity' | 'consistency' | 'challenge';
  plantedAt: Date;
  evolutionCount: number;
}

interface GardenWeather {
  type: 'sunny' | 'cloudy' | 'rainy' | 'perfect';
  multiplier: number;
  duration: number; // hours
  description: string;
  icon: React.ReactNode;
  endTime: Date;
}

interface PlantTemplate {
  type: Plant['type'];
  name: string;
  color: string;
  category: Plant['category'];
  baseGrowth: number;
  baseHappiness: number;
  requiredAchievements?: string[];
}

interface GardenStats {
  totalPlants: number;
  totalDopamine: number;
  gardenLevel: number;
  activePlants: number;
  fullyGrownPlants: number;
  happyPlants: number;
}

interface ComponentProps {
  onPlantUpdate?: (plant: Plant) => void;
  achievements?: Record<string, any>;
  theme?: 'light' | 'dark';
  maxGardenSize?: { width: number; height: number };
  initialDopamine?: number;
}

// Plant templates with better organization
const PLANT_TEMPLATES: Record<Plant['type'], PlantTemplate> = {
  sprout: {
    type: 'sprout',
    name: 'Motivation Sprout',
    color: '#22c55e',
    category: 'focus',
    baseGrowth: 25,
    baseHappiness: 80
  },
  flower: {
    type: 'flower',
    name: 'Happiness Bloom',
    color: '#f59e0b',
    category: 'social',
    baseGrowth: 60,
    baseHappiness: 90
  },
  tree: {
    type: 'tree',
    name: 'Wisdom Tree',
    color: '#059669',
    category: 'consistency',
    baseGrowth: 100,
    baseHappiness: 95
  },
  special: {
    type: 'special',
    name: 'Mythical Blossom',
    color: '#8b5cf6',
    category: 'challenge',
    baseGrowth: 80,
    baseHappiness: 100,
    requiredAchievements: ['garden-master', 'consistency-champion']
  }
};

// Weather patterns
const WEATHER_PATTERNS: Omit<GardenWeather, 'endTime'>[] = [
  { 
    type: 'sunny', 
    multiplier: 1.2, 
    duration: 6, 
    description: 'Perfect growing weather',
    icon: <Sun className="w-5 h-5 text-yellow-500" />
  },
  { 
    type: 'cloudy', 
    multiplier: 0.9, 
    duration: 4, 
    description: 'Calm and peaceful',
    icon: <Cloud className="w-5 h-5 text-gray-500" />
  },
  { 
    type: 'rainy', 
    multiplier: 1.5, 
    duration: 2, 
    description: 'Rapid growth time',
    icon: <Droplets className="w-5 h-5 text-blue-500" />
  },
  { 
    type: 'perfect', 
    multiplier: 2.0, 
    duration: 1, 
    description: 'Optimal growth conditions',
    icon: <Sparkles className="w-5 h-5 text-purple-500" />
  }
];

// Utility functions
const calculatePlantSize = (plant: Plant): string => {
  const baseSize = plant.special ? 'w-10 h-10' : 'w-8 h-8';
  if (plant.growth < 25) return plant.special ? 'w-8 h-8' : 'w-6 h-6';
  if (plant.growth < 75) return baseSize;
  return plant.special ? 'w-12 h-12' : 'w-10 h-10';
};

const getPlantIcon = (plant: Plant): React.ReactNode => {
  const iconProps = {
    className: "w-full h-full transition-colors duration-300",
    style: { color: plant.color }
  };

  if (plant.growth < 25) {
    return <Sprout {...iconProps} />;
  } else if (plant.growth < 75) {
    switch (plant.type) {
      case 'flower':
      case 'special':
        return <Flower2 {...iconProps} />;
      default:
        return <Sprout {...iconProps} />;
    }
  } else {
    switch (plant.type) {
      case 'tree':
      case 'special':
        return <TreePine {...iconProps} />;
      case 'flower':
        return <Flower2 {...iconProps} />;
      default:
        return <Sprout {...iconProps} />;
    }
  }
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

// Custom hooks for better state management
const useGardenData = (initialDopamine = 100) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [totalDopamine, setTotalDopamine] = useState(initialDopamine);
  const [gardenLevel, setGardenLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGardenData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load from localStorage or initialize with starter plant
      const savedPlants = localStorage.getItem('dopamine-garden-plants');
      const savedLevel = localStorage.getItem('dopamine-garden-level');
      const savedDopamine = localStorage.getItem('dopamine-garden-total');
      
      if (savedPlants) {
        const parsedPlants = JSON.parse(savedPlants).map((p: any) => ({
          ...p,
          lastWatered: new Date(p.lastWatered),
          plantedAt: new Date(p.plantedAt || Date.now())
        }));
        setPlants(parsedPlants);
      } else {
        // Create starter plant
        const starterPlant = createPlantFromTemplate('sprout', { x: 4, y: 3 });
        setPlants([starterPlant]);
      }
      
      if (savedLevel) setGardenLevel(parseInt(savedLevel));
      if (savedDopamine) setTotalDopamine(parseInt(savedDopamine));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load garden data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveGardenData = useCallback(() => {
    try {
      localStorage.setItem('dopamine-garden-plants', JSON.stringify(plants));
      localStorage.setItem('dopamine-garden-level', gardenLevel.toString());
      localStorage.setItem('dopamine-garden-total', totalDopamine.toString());
    } catch (err) {
      console.error('Failed to save garden data:', err);
    }
  }, [plants, gardenLevel, totalDopamine]);

  useEffect(() => {
    loadGardenData();
  }, [loadGardenData]);

  useEffect(() => {
    if (!isLoading) {
      saveGardenData();
    }
  }, [plants, gardenLevel, totalDopamine, isLoading, saveGardenData]);

  return {
    plants,
    setPlants,
    totalDopamine,
    setTotalDopamine,
    gardenLevel,
    setGardenLevel,
    isLoading,
    error,
    refetch: loadGardenData
  };
};

const useWeatherSystem = () => {
  const [weather, setWeather] = useState<GardenWeather>(() => {
    const pattern = WEATHER_PATTERNS[0];
    return {
      ...pattern,
      endTime: new Date(Date.now() + pattern.duration * 60 * 60 * 1000)
    };
  });

  const rotateWeather = useCallback(() => {
    const randomPattern = WEATHER_PATTERNS[Math.floor(Math.random() * WEATHER_PATTERNS.length)];
    setWeather({
      ...randomPattern,
      endTime: new Date(Date.now() + randomPattern.duration * 60 * 60 * 1000)
    });
  }, []);

  // Auto-rotate weather
  useEffect(() => {
    const checkWeather = () => {
      if (new Date() >= weather.endTime) {
        rotateWeather();
      }
    };

    const interval = setInterval(checkWeather, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [weather.endTime, rotateWeather]);

  return { weather, rotateWeather };
};

// Helper functions
const createPlantFromTemplate = (type: Plant['type'], position: { x: number; y: number }, fromAchievement?: string): Plant => {
  const template = PLANT_TEMPLATES[type];
  return {
    id: `plant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    name: template.name,
    growth: 0,
    happiness: 50,
    lastWatered: new Date(),
    achievements: fromAchievement ? [fromAchievement] : [],
    position,
    color: template.color,
    special: type === 'special',
    category: template.category,
    plantedAt: new Date(),
    evolutionCount: 0
  };
};

// Components
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full"
    />
    <span className="ml-3 text-gray-600">Growing your garden...</span>
  </div>
);

const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">Garden Error</h3>
    <p className="text-gray-600 mb-6">{error}</p>
    <button
      onClick={onRetry}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const GardenStats: React.FC<{ stats: GardenStats; weather: GardenWeather }> = ({ stats, weather }) => (
  <motion.div 
    className="grid grid-cols-2 md:grid-cols-4 gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <StatsCard
      icon={<Target className="w-5 h-5 text-green-600" />}
      label="Plants"
      value={stats.totalPlants}
      color="green"
    />
    <StatsCard
      icon={<Sparkles className="w-5 h-5 text-purple-600" />}
      label="Dopamine"
      value={stats.totalDopamine}
      color="purple"
    />
    <StatsCard
      icon={<Award className="w-5 h-5 text-yellow-600" />}
      label="Level"
      value={stats.gardenLevel}
      color="yellow"
    />
    <StatsCard
      icon={weather.icon}
      label="Growth Boost"
      value={`${weather.multiplier}x`}
      color="blue"
      subtitle={weather.description}
    />
  </motion.div>
);

const StatsCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'green' | 'purple' | 'yellow' | 'blue';
  subtitle?: string;
}> = ({ icon, label, value, color, subtitle }) => {
  const colorClasses = {
    green: 'from-green-100 to-green-200 border-green-300',
    purple: 'from-purple-100 to-purple-200 border-purple-300',
    yellow: 'from-yellow-100 to-yellow-200 border-yellow-300',
    blue: 'from-blue-100 to-blue-200 border-blue-300'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-4`}
    >
      <div className="text-center">
        <div className="flex items-center gap-2 mb-2 justify-center">
          {icon}
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <motion.div 
          className={`text-2xl font-bold text-${color}-700`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {value}
        </motion.div>
        {subtitle && (
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
        )}
      </div>
    </motion.div>
  );
};

const PlantCell: React.FC<{
  plant: Plant | null;
  position: { x: number; y: number };
  isSelected: boolean;
  onClick: () => void;
}> = ({ plant, position, isSelected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative aspect-square border-2 border-dashed rounded-lg cursor-pointer
        transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100
        hover:border-green-400 hover:shadow-md flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        ${plant ? 'border-solid border-green-400 bg-green-100' : 'border-green-200'}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      aria-label={
        plant 
          ? `${plant.name} at position ${position.x}, ${position.y}. Growth: ${plant.growth}%, Happiness: ${plant.happiness}%`
          : `Empty garden cell at position ${position.x}, ${position.y}. Click to plant.`
      }
    >
      {plant ? (
        <PlantSprite plant={plant} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="text-green-300"
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      )}
    </motion.button>
  );
};

const PlantSprite: React.FC<{ plant: Plant }> = ({ plant }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={`relative ${calculatePlantSize(plant)}`}
  >
    {getPlantIcon(plant)}
    
    {/* Growth progress ring */}
    <div className="absolute inset-0 -m-1">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke={plant.color}
          strokeWidth="2"
          strokeDasharray="100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 100 - plant.growth }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
    </div>

    {/* Special effects */}
    {plant.special && (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1 -right-1"
      >
        <Sparkles className="w-3 h-3 text-purple-500" />
      </motion.div>
    )}

    {/* Happiness indicator */}
    {plant.happiness >= 80 && (
      <motion.div
        animate={{ y: [-2, -6, -2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-2 -left-1"
      >
        <Heart className="w-3 h-3 text-pink-500" fill="currentColor" />
      </motion.div>
    )}
  </motion.div>
);

const PlantDetailsPanel: React.FC<{
  plant: Plant | null;
  onWater: (plantId: string) => void;
  onEvolve: (plantId: string) => void;
  onRemove: (plantId: string) => void;
}> = ({ plant, onWater, onEvolve, onRemove }) => {
  if (!plant) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <Flower2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600">Select a plant to view details</p>
        <p className="text-sm text-gray-500 mt-2">Or click an empty spot to plant a new sprout</p>
      </div>
    );
  }

  const timeSinceWatering = formatTimeAgo(plant.lastWatered);
  const canEvolve = plant.growth >= 100 && plant.type !== 'special';
  const needsWater = plant.happiness < 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 space-y-4"
    >
      {/* Plant Display */}
      <div className="text-center">
        <div className={`mx-auto mb-3 ${calculatePlantSize(plant)} flex items-center justify-center`}>
          {getPlantIcon(plant)}
        </div>
        <h3 className="font-semibold text-lg">{plant.name}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="capitalize">{plant.category} • Level {Math.floor(plant.growth / 25) + 1}</div>
          <div>Planted {formatTimeAgo(plant.plantedAt)}</div>
          {plant.evolutionCount > 0 && (
            <div className="text-purple-600">Evolved {plant.evolutionCount}x</div>
          )}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        <ProgressBar
          label="Growth"
          value={plant.growth}
          color="green"
          showPercentage
        />
        <ProgressBar
          label="Happiness"
          value={plant.happiness}
          color="pink"
          showPercentage
        />
      </div>

      {/* Plant Info */}
      <div className="text-xs text-gray-600 space-y-1 bg-gray-50 rounded-lg p-3">
        <div>Achievements: {plant.achievements.length}</div>
        <div>Last watered: {timeSinceWatering}</div>
        {needsWater && (
          <div className="text-orange-600 font-medium">💧 Needs water</div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onWater(plant.id)}
          className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            needsWater 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <Droplets className="w-4 h-4" />
          Water Plant
        </motion.button>
        
        {canEvolve && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEvolve(plant.id)}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4" />
            Evolve Plant
          </motion.button>
        )}
        
        <button
          onClick={() => onRemove(plant.id)}
          className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm"
        >
          Remove Plant
        </button>
      </div>
    </motion.div>
  );
};

const ProgressBar: React.FC<{
  label: string;
  value: number;
  color: 'green' | 'pink' | 'blue' | 'purple';
  showPercentage?: boolean;
}> = ({ label, value, color, showPercentage = false }) => {
  const colorClasses = {
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        {showPercentage && (
          <span className="font-semibold text-gray-800">{Math.round(value)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// Main Component
const DopamineGarden: React.FC<ComponentProps> = ({ 
  onPlantUpdate,
  achievements: externalAchievements,
  theme = 'light',
  maxGardenSize = { width: 8, height: 6 },
  initialDopamine = 100
}) => {
  const {
    plants,
    setPlants,
    totalDopamine,
    setTotalDopamine,
    gardenLevel,
    setGardenLevel,
    isLoading,
    error,
    refetch
  } = useGardenData(initialDopamine);

  const { weather, rotateWeather } = useWeatherSystem();
  
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [gardenSize, setGardenSize] = useState(maxGardenSize);

  // Memoized calculations
  const stats = useMemo((): GardenStats => ({
    totalPlants: plants.length,
    totalDopamine,
    gardenLevel,
    activePlants: plants.filter(p => p.growth < 100).length,
    fullyGrownPlants: plants.filter(p => p.growth >= 100).length,
    happyPlants: plants.filter(p => p.happiness >= 80).length
  }), [plants, totalDopamine, gardenLevel]);

  // Event handlers
  const handleCellClick = useCallback((x: number, y: number) => {
    const existingPlant = plants.find(p => p.position.x === x && p.position.y === y);
    
    if (existingPlant) {
      setSelectedPlant(existingPlant);
    } else if (totalDopamine >= 50) {
      const newPlant = createPlantFromTemplate('sprout', { x, y });
      setPlants(prev => [...prev, newPlant]);
      setTotalDopamine(prev => prev - 50);
      onPlantUpdate?.(newPlant);
      
      // Show success feedback
      console.log('New plant created!');
    } else {
      alert('Need 50 dopamine points to plant here');
    }
  }, [plants, totalDopamine, setPlants, setTotalDopamine, onPlantUpdate]);

  const handleWaterPlant = useCallback((plantId: string) => {
    setPlants(prev => prev.map(plant => {
      if (plant.id === plantId) {
        const now = new Date();
        const timeSinceWater = now.getTime() - plant.lastWatered.getTime();
        const hoursGap = timeSinceWater / (1000 * 60 * 60);
        
        if (hoursGap < 2) {
          alert('Plant was recently watered');
          return plant;
        }

        const happinessBoost = Math.min(20, hoursGap * 5) * weather.multiplier;
        const updatedPlant = {
          ...plant,
          happiness: Math.min(100, plant.happiness + happinessBoost),
          lastWatered: now
        };

        console.log(`${plant.name} feels refreshed! +${Math.round(happinessBoost)} happiness`);
        setTotalDopamine(prev => prev + Math.round(happinessBoost / 2));
        onPlantUpdate?.(updatedPlant);
        
        return updatedPlant;
      }
      return plant;
    }));
  }, [setPlants, weather.multiplier, setTotalDopamine, onPlantUpdate]);

  const handleEvolvePlant = useCallback((plantId: string) => {
    setPlants(prev => prev.map(plant => {
      if (plant.id === plantId && plant.growth >= 100) {
        const evolutionMap: Record<Plant['type'], Plant['type']> = {
          sprout: 'flower',
          flower: 'tree',
          tree: 'special',
          special: 'special'
        };
        
        const newType = evolutionMap[plant.type];
        if (newType !== plant.type) {
          const template = PLANT_TEMPLATES[newType];
          const evolvedPlant = {
            ...plant,
            type: newType,
            name: template.name,
            growth: 0,
            happiness: 100,
            color: template.color,
            special: newType === 'special',
            evolutionCount: plant.evolutionCount + 1
          };

          console.log(`${plant.name} evolved into ${template.name}!`);
          setTotalDopamine(prev => prev + 200);
          onPlantUpdate?.(evolvedPlant);
          
          return evolvedPlant;
        }
      }
      return plant;
    }));
  }, [setPlants, setTotalDopamine, onPlantUpdate]);

  const handleRemovePlant = useCallback((plantId: string) => {
    setPlants(prev => prev.filter(p => p.id !== plantId));
    setSelectedPlant(null);
    console.log('Plant removed from garden');
  }, [setPlants]);

  // Garden grid generation
  const renderGardenGrid = useCallback((): React.ReactElement[] => {
    const grid: React.ReactElement[] = [];
    
    for (let y = 0; y < gardenSize.height; y++) {
      for (let x = 0; x < gardenSize.width; x++) {
        const plant = plants.find(p => p.position.x === x && p.position.y === y);
        
        grid.push(
          <PlantCell
            key={`${x}-${y}`}
            plant={plant || null}
            position={{ x, y }}
            isSelected={selectedPlant?.id === plant?.id}
            onClick={() => handleCellClick(x, y)}
          />
        );
      }
    }
    
    return grid;
  }, [gardenSize, plants, selectedPlant, handleCellClick]);

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-green-300/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Achievement Garden
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Watch your progress bloom into something beautiful
          </p>
        </motion.div>

        {/* Garden Stats */}
        <GardenStats stats={stats} weather={weather} />

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Garden Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-green-600" />
                  Your Garden
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    {weather.icon}
                    {weather.description}
                  </div>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Garden settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div 
                className="grid gap-2 bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-200"
                style={{
                  gridTemplateColumns: `repeat(${gardenSize.width}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${gardenSize.height}, minmax(0, 1fr))`
                }}
              >
                {renderGardenGrid()}
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Click empty spots to plant (50 dopamine) • Click plants to interact
              </div>
            </div>
          </div>

          {/* Plant Details Panel */}
          <div>
            <PlantDetailsPanel
              plant={selectedPlant}
              onWater={handleWaterPlant}
              onEvolve={handleEvolvePlant}
              onRemove={handleRemovePlant}
            />
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Garden Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Close settings"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Garden Size
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="garden-width" className="text-xs text-gray-600">Width</label>
                        <input
                          id="garden-width"
                          type="range"
                          min="6"
                          max="12"
                          value={gardenSize.width}
                          onChange={(e) => setGardenSize(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="text-center text-xs">{gardenSize.width}</div>
                      </div>
                      <div>
                        <label htmlFor="garden-height" className="text-xs text-gray-600">Height</label>
                        <input
                          id="garden-height"
                          type="range"
                          min="4"
                          max="8"
                          value={gardenSize.height}
                          onChange={(e) => setGardenSize(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="text-center text-xs">{gardenSize.height}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
                    <h4 className="font-medium mb-2">How it works:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Plants grow when you complete achievements</li>
                      <li>• Water plants to increase happiness</li>
                      <li>• Fully grown plants can evolve</li>
                      <li>• Weather affects growth rates</li>
                      <li>• Special plants unlock with major achievements</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (totalDopamine >= 100) {
                          rotateWeather();
                          setTotalDopamine(prev => prev - 100);
                          console.log('Weather changed!');
                        } else {
                          alert('Need 100 dopamine to change weather');
                        }
                      }}
                      disabled={totalDopamine < 100}
                      className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Shuffle className="w-4 h-4" />
                      Change Weather (100)
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DopamineGarden;