import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { 
  Calendar,
  ChevronLeft, 
  ChevronRight,
  Plus,
  Filter,
  Search,
  Zap,
  Grid,
  List,
  Eye,
  RotateCcw,
  Settings,
  Brain,
  Sparkles
} from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { RecipeCard } from './RecipeCard';
import { ADHDActionPanel } from './ADHDActionPanel';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
  url?: string;
}

interface MealSlot {
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
}

interface EnhancedMealPlannerProps {
  initialRecipes?: Recipe[];
  onSave?: (meals: MealSlot[]) => void;
}

export const EnhancedMealPlanner: React.FC<EnhancedMealPlannerProps> = ({
  initialRecipes = [],
  onSave
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [mealSlots, setMealSlots] = useState<MealSlot[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [focusMode, setFocusMode] = useState(false);
  const [draggedRecipe, setDraggedRecipe] = useState<Recipe | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  // Initialize meal slots for the week
  useEffect(() => {
    const slots: MealSlot[] = [];
    weekDays.forEach(date => {
      mealTypes.forEach(mealType => {
        slots.push({ date, mealType });
      });
    });
    setMealSlots(slots);
  }, [currentWeek]);

  // Sample recipes for demo
  useEffect(() => {
    if (recipes.length === 0) {
      setRecipes([
        {
          id: '1',
          title: 'Mediterranean Quinoa Bowl',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
          cookTime: 25,
          servings: 2,
          difficulty: 'easy',
          ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olive oil', 'Lemon'],
          instructions: ['Cook quinoa', 'Mix vegetables', 'Add dressing', 'Serve'],
          nutrition: { calories: 420, protein: 15, carbs: 60, fat: 12 },
          tags: ['healthy', 'vegetarian', 'mediterranean']
        },
        {
          id: '2',
          title: 'Salmon Teriyaki',
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
          cookTime: 20,
          servings: 2,
          difficulty: 'medium',
          ingredients: ['Salmon fillet', 'Teriyaki sauce', 'Rice', 'Broccoli', 'Sesame seeds'],
          instructions: ['Cook salmon', 'Steam broccoli', 'Prepare rice', 'Serve with sauce'],
          nutrition: { calories: 520, protein: 35, carbs: 45, fat: 18 },
          tags: ['protein', 'fish', 'asian']
        },
        {
          id: '3',
          title: 'Avocado Toast Supreme',
          image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
          cookTime: 10,
          servings: 1,
          difficulty: 'easy',
          ingredients: ['Sourdough bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Everything bagel seasoning'],
          instructions: ['Toast bread', 'Mash avocado', 'Cook egg', 'Assemble'],
          nutrition: { calories: 350, protein: 12, carbs: 25, fat: 22 },
          tags: ['breakfast', 'quick', 'healthy']
        }
      ]);
    }
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || 
                         recipe.tags.includes(selectedFilter) ||
                         recipe.difficulty === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCardFlip = useCallback((recipeId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const recipe = recipes.find(r => r.id === event.active.id);
    setDraggedRecipe(recipe || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedRecipe(null);
    
    if (event.over && event.active.id !== event.over.id) {
      const recipeId = event.active.id as string;
      const slotId = event.over.id as string;
      
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe) {
        const [dateStr, mealType] = slotId.split('-');
        const date = new Date(dateStr);
        
        setMealSlots(prev => prev.map(slot => {
          if (isSameDay(slot.date, date) && slot.mealType === mealType) {
            return { ...slot, recipe };
          }
          return slot;
        }));

        // Celebration animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        toast.success('Meal scheduled! 🎉', {
          description: `${recipe.title} added to ${mealType}`
        });
      }
    }
  };

  const handleQuickAdd = () => {
    toast.info('Quick Add', {
      description: 'Opening quick meal entry...'
    });
  };

  const handleAutoSchedule = async () => {
    setIsLoading(true);
    toast.info('AI is planning your week...', {
      description: 'This might take a few seconds'
    });

    // Simulate AI scheduling
    await new Promise(resolve => setTimeout(resolve, 2000));

    const shuffledRecipes = [...recipes].sort(() => Math.random() - 0.5);
    const newSlots = mealSlots.map((slot, index) => {
      if (slot.mealType !== 'snack' && Math.random() > 0.3) {
        return {
          ...slot,
          recipe: shuffledRecipes[index % shuffledRecipes.length]
        };
      }
      return slot;
    });

    setMealSlots(newSlots);
    setIsLoading(false);

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 }
    });

    toast.success('Week planned! 🤖✨', {
      description: 'Your meals have been intelligently scheduled'
    });
  };

  const handleShoppingList = () => {
    const allIngredients = mealSlots
      .filter(slot => slot.recipe)
      .flatMap(slot => slot.recipe!.ingredients);
    
    const uniqueIngredients = [...new Set(allIngredients)];
    
    toast.success('Shopping list generated! 🛒', {
      description: `${uniqueIngredients.length} ingredients added`
    });
  };

  const handleSetReminders = () => {
    toast.success('Reminders set! ⏰', {
      description: 'You\'ll get notifications for meal prep'
    });
  };

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'from-yellow-400 to-orange-500';
      case 'lunch': return 'from-green-400 to-blue-500';
      case 'dinner': return 'from-purple-400 to-pink-500';
      case 'snack': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-300 to-gray-500';
    }
  };

  const getMealSlot = (date: Date, mealType: string) => {
    return mealSlots.find(slot => 
      isSameDay(slot.date, date) && slot.mealType === mealType
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${focusMode ? 'bg-gray-50' : ''}`}>
      {/* ADHD Action Panel */}
      <ADHDActionPanel
        onQuickAdd={handleQuickAdd}
        onAutoSchedule={handleAutoSchedule}
        onShoppingList={handleShoppingList}
        onSetReminders={handleSetReminders}
        focusMode={focusMode}
        onToggleFocus={() => setFocusMode(!focusMode)}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-purple-500 animate-spin" />
                <div>
                  <div className="font-semibold text-lg">AI Planning in Progress</div>
                  <div className="text-sm text-gray-600">Creating your perfect meal week...</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="container mx-auto p-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Smart Meal Planner
                </h1>
                <p className="text-gray-600 mt-2">
                  Drag recipes to plan your week • AI-powered suggestions • ADHD-friendly design
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(new Date())}
                >
                  <RotateCcw className="w-4 h-4" />
                  Today
                </Button>
              </div>
            </div>

            {/* Week Navigation */}
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-lg">
              <Button
                variant="outline"
                onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-600">Week View</div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Recipe Library */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Recipe Library</h2>
                
                {/* Search & Filter */}
                <div className="space-y-3 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Recipes</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="healthy">Healthy</option>
                    <option value="quick">Quick</option>
                  </select>
                </div>

                {/* Recipe Cards */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <RecipeCard
                        recipe={recipe}
                        size="small"
                        isFlipped={flippedCards.has(recipe.id)}
                        onFlip={() => handleCardFlip(recipe.id)}
                        onAddToCart={handleShoppingList}
                        className="cursor-grab active:cursor-grabbing"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Calendar Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => (
                      <div key={day.toISOString()} className="text-center text-white">
                        <div className="font-semibold">{format(day, 'EEE')}</div>
                        <div className="text-sm opacity-90">{format(day, 'd')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meal Slots */}
                <div className="p-4">
                  {mealTypes.map((mealType) => (
                    <div key={mealType} className="mb-6">
                      <div className={`text-sm font-semibold mb-2 p-2 rounded-lg bg-gradient-to-r ${getMealTypeColor(mealType)} text-white`}>
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {weekDays.map((day) => {
                          const slot = getMealSlot(day, mealType);
                          const slotId = `${day.toISOString()}-${mealType}`;
                          
                          return (
                            <motion.div
                              key={slotId}
                              className={`h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors flex items-center justify-center relative ${
                                slot?.recipe ? 'bg-gradient-to-br from-green-50 to-blue-50 border-solid border-green-300' : 'bg-gray-50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                            >
                              {slot?.recipe ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-full h-full p-1"
                                >
                                  <div className="w-full h-full bg-white rounded border shadow-sm overflow-hidden">
                                    <div className="h-12 bg-cover bg-center relative" style={{ backgroundImage: `url(${slot.recipe.image})` }}>
                                      <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                    <div className="p-1">
                                      <div className="text-xs font-medium truncate">{slot.recipe.title}</div>
                                      <div className="text-xs text-gray-500">{slot.recipe.cookTime}m</div>
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  className="text-gray-400 text-center"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Plus className="w-6 h-6 mx-auto mb-1" />
                                  <div className="text-xs">Drop recipe</div>
                                </motion.div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {draggedRecipe && (
            <RecipeCard
              recipe={draggedRecipe}
              size="small"
              className="rotate-6 shadow-2xl"
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
