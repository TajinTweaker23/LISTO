import React, { useState, useEffect } from 'react';
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
  Settings
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';
import { useAchievements } from '../../hooks/useAchievements';

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
}

interface GardenWeather {
  type: 'sunny' | 'cloudy' | 'rainy' | 'perfect';
  multiplier: number;
  duration: number; // hours
  description: string;
}

interface DopamineGardenProps {
  onPlantUpdate?: (plant: Plant) => void;
  achievements?: Record<string, any>;
  theme?: 'light' | 'dark';
}

const DopamineGarden: React.FC<DopamineGardenProps> = ({ 
  onPlantUpdate, 
  achievements: externalAchievements,
  theme = 'light' 
}) => {
  const { addToast } = useToast();
  const { achievements, unlockAchievement } = useAchievements();
  
  const [plants, setPlants] = useState<Plant[]>([]);
  const [gardenLevel, setGardenLevel] = useState(1);
  const [totalDopamine, setTotalDopamine] = useState(0);
  const [weather, setWeather] = useState<GardenWeather>({
    type: 'sunny',
    multiplier: 1.2,
    duration: 6,
    description: 'Perfect growing weather'
  });
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [gardenSize, setGardenSize] = useState({ width: 8, height: 6 });
  
  // Plant templates
  const plantTemplates = {
    sprout: {
      name: 'Motivation Sprout',
      color: '#22c55e',
      category: 'focus' as const,
      growth: 25,
      happiness: 80
    },
    flower: {
      name: 'Happiness Bloom',
      color: '#f59e0b',
      category: 'social' as const,
      growth: 60,
      happiness: 90
    },
    tree: {
      name: 'Wisdom Tree',
      color: '#059669',
      category: 'consistency' as const,
      growth: 100,
      happiness: 95
    },
    special: {
      name: 'Mythical Blossom',
      color: '#8b5cf6',
      category: 'challenge' as const,
      growth: 80,
      happiness: 100
    }
  };

  // Initialize garden
  useEffect(() => {
    const savedPlants = localStorage.getItem('dopamine-garden-plants');
    const savedLevel = localStorage.getItem('dopamine-garden-level');
    const savedDopamine = localStorage.getItem('dopamine-garden-total');
    
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    } else {
      // Create initial starter plant
      createPlant('sprout', { x: 4, y: 3 });
    }
    
    if (savedLevel) setGardenLevel(parseInt(savedLevel));
    if (savedDopamine) setTotalDopamine(parseInt(savedDopamine));
    
    // Set up weather rotation
    rotateWeather();
    const weatherInterval = setInterval(rotateWeather, 4 * 60 * 60 * 1000); // 4 hours
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Save to localStorage whenever plants change
  useEffect(() => {
    if (plants.length > 0) {
      localStorage.setItem('dopamine-garden-plants', JSON.stringify(plants));
      localStorage.setItem('dopamine-garden-level', gardenLevel.toString());
      localStorage.setItem('dopamine-garden-total', totalDopamine.toString());
    }
  }, [plants, gardenLevel, totalDopamine]);

  // Monitor achievements and grow plants
  useEffect(() => {
    if (externalAchievements || achievements) {
      const allAchievements = { ...achievements, ...externalAchievements };
      checkForNewGrowth(allAchievements);
    }
  }, [achievements, externalAchievements]);

  const rotateWeather = () => {
    const weatherTypes: GardenWeather[] = [
      { type: 'sunny', multiplier: 1.2, duration: 6, description: 'Perfect growing weather' },
      { type: 'cloudy', multiplier: 0.9, duration: 4, description: 'Calm and peaceful 🌥️' },
      { type: 'rainy', multiplier: 1.5, duration: 2, description: 'Rapid growth time' },
      { type: 'perfect', multiplier: 2.0, duration: 1, description: 'Optimal growth conditions' }
    ];
    
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setWeather(randomWeather);
    addToast(`Weather changed: ${randomWeather.description}`, 'info');
  };

  const createPlant = (type: keyof typeof plantTemplates, position: { x: number; y: number }, fromAchievement?: string) => {
    const template = plantTemplates[type];
    const newPlant: Plant = {
      id: `plant-${Date.now()}-${Math.random()}`,
      type,
      name: template.name,
      growth: 0,
      happiness: 50,
      lastWatered: new Date(),
      achievements: fromAchievement ? [fromAchievement] : [],
      position,
      color: template.color,
      special: type === 'special',
      category: template.category
    };

    setPlants(prev => [...prev, newPlant]);
    onPlantUpdate?.(newPlant);
    return newPlant;
  };

  // Helper functions for plant growth
  const handlePlantGrowth = (plant: Plant, growthIncrease: number, happinessIncrease: number) => {
    const updatedPlant = {
      ...plant,
      growth: Math.min(100, plant.growth + growthIncrease),
      happiness: Math.min(100, plant.happiness + happinessIncrease)
    };

    // Celebrate growth
    if (updatedPlant.growth >= 100 && plant.growth < 100) {
      setTimeout(() => {
        addToast(`${plant.name} is fully grown. Task completed.`, 'success');
        setTotalDopamine(prev => prev + 100);
      }, 500);
    } else if (growthIncrease > 0) {
      setTimeout(() => {
        addToast(`${plant.name} grew ${Math.round(growthIncrease)}%`, 'success');
        setTotalDopamine(prev => prev + Math.round(growthIncrease));
      }, 300);
    }

    return updatedPlant;
  };

  const getRelatedAchievements = (achievementKeys: string[], plant: Plant, currentAchievements: Record<string, any>) => {
    return achievementKeys.filter(key => {
      const achievement = currentAchievements[key];
      return achievement?.unlocked && 
             achievement?.category === plant.category &&
             !plant.achievements.includes(key);
    });
  };

  const checkForNewGrowth = (currentAchievements: Record<string, any>) => {
    const achievementKeys = Object.keys(currentAchievements);
    
    setPlants(prevPlants => {
      return prevPlants.map(plant => {
        const relatedAchievements = getRelatedAchievements(achievementKeys, plant, currentAchievements);

        if (relatedAchievements.length > 0) {
          const growthIncrease = relatedAchievements.length * 15 * weather.multiplier;
          const happinessIncrease = relatedAchievements.length * 10;
          
          const updatedPlant = handlePlantGrowth(plant, growthIncrease, happinessIncrease);
          return {
            ...updatedPlant,
            achievements: [...plant.achievements, ...relatedAchievements]
          };
        }

        return plant;
      });
    });
  };

  // Helper function for watering plants
  const updatePlantHappiness = (plant: Plant, happinessBoost: number) => {
    const updatedPlant = {
      ...plant,
      happiness: Math.min(100, plant.happiness + happinessBoost),
      lastWatered: new Date()
    };

    addToast(`${plant.name} feels refreshed. +${Math.round(happinessBoost)} happiness`, 'success');
    setTotalDopamine(prev => prev + Math.round(happinessBoost / 2));
    
    return updatedPlant;
  };

  const waterPlant = (plantId: string) => {
    setPlants(prev => prev.map(plant => {
      if (plant.id === plantId) {
        const now = new Date();
        const timeSinceWater = now.getTime() - plant.lastWatered.getTime();
        const hoursGap = timeSinceWater / (1000 * 60 * 60);
        
        if (hoursGap < 2) {
          addToast('Plant was recently watered', 'info');
          return plant;
        }

        const happinessBoost = Math.min(20, hoursGap * 5) * weather.multiplier;
        return updatePlantHappiness(plant, happinessBoost);
      }
      return plant;
    }));
  };

  // Helper function for plant evolution
  const handlePlantEvolution = (plant: Plant) => {
    const evolutionMap: Record<Plant['type'], Plant['type']> = {
      sprout: 'flower',
      flower: 'tree',
      tree: 'special',
      special: 'special'
    };
    
    const newType = evolutionMap[plant.type];
    if (newType !== plant.type) {
      const template = plantTemplates[newType];
      const evolvedPlant = {
        ...plant,
        type: newType,
        name: template.name,
        growth: 0,
        happiness: 100,
        color: template.color,
        special: newType === 'special'
      };

      addToast(`${plant.name} evolved into ${template.name}`, 'success');
      setTotalDopamine(prev => prev + 200);
      unlockAchievement('garden-master');
      
      return evolvedPlant;
    }
    return plant;
  };

  const evolvePlant = (plantId: string) => {
    setPlants(prev => prev.map(plant => {
      if (plant.id === plantId && plant.growth >= 100) {
        return handlePlantEvolution(plant);
      }
      return plant;
    }));
  };

  const getPlantIcon = (plant: Plant) => {
    const iconProps = {
      className: "w-full h-full",
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

  const getWeatherIcon = () => {
    switch (weather.type) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'perfect': return <Sparkles className="w-5 h-5 text-purple-500" />;
    }
  };

  const getPlantSize = (plant: Plant): string => {
    if (plant.growth < 25) return plant.special ? 'w-12 h-12' : 'w-6 h-6';
    if (plant.growth < 75) return plant.special ? 'w-12 h-12' : 'w-8 h-8';
    return plant.special ? 'w-12 h-12' : 'w-10 h-10';
  };

  const handleCellClick = (x: number, y: number) => {
    const existingPlant = plants.find(p => p.position.x === x && p.position.y === y);
    
    if (existingPlant) {
      setSelectedPlant(existingPlant);
    } else if (totalDopamine >= 50) {
      // Plant new sprout
      createPlant('sprout', { x, y });
      setTotalDopamine(prev => prev - 50);
      addToast('New sprout planted', 'success');
    } else {
      addToast('Need 50 dopamine points to plant here', 'info');
    }
  };

  const handlePlantAction = (action: 'water' | 'evolve' | 'remove') => {
    if (!selectedPlant) return;

    switch (action) {
      case 'water':
        waterPlant(selectedPlant.id);
        break;
      case 'evolve':
        if (selectedPlant.growth >= 100) {
          evolvePlant(selectedPlant.id);
        } else {
          addToast('Plant needs to be 100% grown to evolve', 'info');
        }
        break;
      case 'remove':
        setPlants(prev => prev.filter(p => p.id !== selectedPlant.id));
        addToast('Plant removed from garden', 'info');
        break;
    }
    
    setSelectedPlant(null);
  };

  const renderGardenGrid = (): React.ReactElement[] => {
    const grid: React.ReactElement[] = [];
    
    for (let y = 0; y < gardenSize.height; y++) {
      for (let x = 0; x < gardenSize.width; x++) {
        const plant = plants.find(p => p.position.x === x && p.position.y === y);
        
        grid.push(
          <motion.div
            key={`${x}-${y}`}
            onClick={() => handleCellClick(x, y)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative aspect-square border-2 border-dashed border-green-200 rounded-lg cursor-pointer
              transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100
              hover:border-green-400 hover:shadow-md flex items-center justify-center
              ${plant ? 'border-solid border-green-400 bg-green-100' : ''}
              ${selectedPlant?.id === plant?.id ? 'ring-2 ring-sage-500 ring-offset-2' : ''}
            `}
          >
            {plant && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`relative ${getPlantSize(plant)}`}
              >
                {getPlantIcon(plant)}
                
                {/* Growth progress ring */}
                <div className="absolute inset-0 -m-1">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={plant.color}
                      strokeWidth="2"
                      strokeDasharray={`${plant.growth}, 100`}
                      className="transition-all duration-1000"
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
            )}

            {/* Empty slot indicator */}
            {!plant && (
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-green-300"
              >
                <Sprout className="w-4 h-4" />
              </motion.div>
            )}
          </motion.div>
        );
      }
    }
    
    return grid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-green-50 to-blue-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
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
            Dopamine Garden
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Watch your achievements bloom into a beautiful garden.
          </p>
        </motion.div>

        {/* Garden Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card variant="glass" size="sm" className="bg-gradient-to-br from-green-100 to-green-200 border-green-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-green-600"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {plants.length}
                </motion.div>
                <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                  <Sprout className="w-3 h-3" />
                  Plants
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card variant="glass" size="sm" className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-purple-600"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {totalDopamine}
                </motion.div>
                <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Dopamine
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card variant="glass" size="sm" className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-yellow-600"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {gardenLevel}
                </motion.div>
                <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                  <Award className="w-3 h-3" />
                  Level
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card variant="glass" size="sm" className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 flex items-center justify-center gap-1">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    {getWeatherIcon()}
                  </motion.div>
                  {weather.multiplier}x
                </div>
                <div className="text-xs text-gray-600">Growth Boost</div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Garden Grid */}
        <div className="lg:col-span-3">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-600" />
                Your Garden
              </h2>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">{weather.description}</div>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Garden settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              className="garden-grid gap-2 bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-200 transition-all duration-500"
              data-garden-width={gardenSize.width}
              data-garden-height={gardenSize.height}
            >
              {renderGardenGrid()}
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Click empty spots to plant (50 dopamine) • Click plants to interact
            </div>
          </Card>
        </div>

        {/* Plant Info & Actions */}
        <div className="space-y-4">
          {selectedPlant ? (
            <Card variant="glass" className="space-y-4">
              <div className="text-center">
                <div className={`mx-auto mb-3 ${getPlantSize(selectedPlant)} flex items-center justify-center`}>
                  {getPlantIcon(selectedPlant)}
                </div>
                <h3 className="font-semibold text-lg">{selectedPlant.name}</h3>
                <div className="text-sm text-gray-600">
                  {selectedPlant.category} • Level {Math.floor(selectedPlant.growth / 25) + 1}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Growth</span>
                    <span>{Math.round(selectedPlant.growth)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedPlant.growth}%` }}
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Happiness</span>
                    <span>{Math.round(selectedPlant.happiness)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedPlant.happiness}%` }}
                      className="bg-pink-500 h-2 rounded-full transition-all duration-1000"
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-600">
                  <div>Achievements: {selectedPlant.achievements.length}</div>
                  <div>Last watered: {selectedPlant.lastWatered.toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handlePlantAction('water')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Droplets className="w-4 h-4" />
                  Water Plant
                </button>
                
                {selectedPlant.growth >= 100 && (
                  <button
                    onClick={() => handlePlantAction('evolve')}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    Evolve
                  </button>
                )}
                
                <button
                  onClick={() => handlePlantAction('remove')}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Remove Plant
                </button>
              </div>
            </Card>
          ) : (
            <Card variant="glass" className="text-center py-8">
              <Flower2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600">Select a plant to interact with it</p>
              <p className="text-sm text-gray-500 mt-2">Or click an empty spot to plant a new sprout.</p>
            </Card>
          )}

          {/* Quick Actions */}
          <Card variant="glass" className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Quick Actions
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={rotateWeather}
                disabled={totalDopamine < 100}
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Shuffle className="w-4 h-4" />
                Change Weather (100)
              </button>
              
              <button
                onClick={() => {
                  setPlants(prev => prev.map(plant => ({
                    ...plant,
                    happiness: Math.min(100, plant.happiness + 20),
                    lastWatered: new Date()
                  })));
                  setTotalDopamine(prev => Math.max(0, prev - 200));
                  addToast('All plants watered', 'success');
                }}
                disabled={totalDopamine < 200}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Droplets className="w-4 h-4" />
                Water All (200)
              </button>
            </div>

            <div className="text-xs text-gray-600 text-center">
              Dopamine earned from completing tasks and achievements.
            </div>
          </Card>
        </div>
      </div>

      {/* Garden Settings Modal */}
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
              <h3 className="text-xl font-semibold">Garden Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="garden-size-settings" className="block text-sm font-medium text-gray-700 mb-2">
                    Garden Size
                  </label>
                  <div id="garden-size-settings" className="grid grid-cols-2 gap-3">
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
                        title={`Garden width: ${gardenSize.width}`}
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
                        title={`Garden height: ${gardenSize.height}`}
                      />
                      <div className="text-center text-xs">{gardenSize.height}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
                  <p>• Plants grow when you complete achievements</p>
                  <p>• Water plants to increase happiness</p>
                  <p>• Fully grown plants can evolve</p>
                  <p>• Weather affects growth rates</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
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
