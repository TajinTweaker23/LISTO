import { Recipe, MealSlot } from './types';
import { format, isSameDay } from 'date-fns';

// Recipe filtering utilities
export const filterRecipes = (
  recipes: Recipe[], 
  searchQuery: string, 
  selectedFilter: string
): Recipe[] => {
  return recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || 
                         recipe.tags.includes(selectedFilter) ||
                         recipe.difficulty === selectedFilter;
    return matchesSearch && matchesFilter;
  });
};

// Meal slot utilities
export const findMealSlot = (
  mealSlots: MealSlot[], 
  date: Date, 
  mealType: string
): MealSlot | undefined => {
  return mealSlots.find(slot => 
    isSameDay(slot.date, date) && slot.mealType === mealType
  );
};

export const updateMealSlot = (
  mealSlots: MealSlot[], 
  date: Date, 
  mealType: string, 
  recipe: Recipe
): MealSlot[] => {
  return mealSlots.map(slot => {
    if (isSameDay(slot.date, date) && slot.mealType === mealType) {
      return { ...slot, recipe };
    }
    return slot;
  });
};

// Shopping list generation
export const generateShoppingList = (mealSlots: MealSlot[]): string[] => {
  const allIngredients = mealSlots
    .filter(slot => slot.recipe)
    .flatMap(slot => slot.recipe!.ingredients);
  
  return Array.from(new Set(allIngredients)).sort();
};

// Nutrition calculation
export const calculateWeeklyNutrition = (mealSlots: MealSlot[]) => {
  const totalNutrition = mealSlots
    .filter(slot => slot.recipe)
    .reduce((total, slot) => {
      const nutrition = slot.recipe!.nutrition;
      return {
        calories: total.calories + nutrition.calories,
        protein: total.protein + nutrition.protein,
        carbs: total.carbs + nutrition.carbs,
        fat: total.fat + nutrition.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const dayCount = 7;
  return {
    daily: {
      calories: Math.round(totalNutrition.calories / dayCount),
      protein: Math.round(totalNutrition.protein / dayCount),
      carbs: Math.round(totalNutrition.carbs / dayCount),
      fat: Math.round(totalNutrition.fat / dayCount)
    },
    weekly: totalNutrition
  };
};

// Date utilities
export const formatMealSlotId = (date: Date, mealType: string): string => {
  return `${date.toISOString()}-${mealType}`;
};

export const formatDateDisplay = (date: Date): string => {
  return format(date, 'EEE, MMM d');
};

// Animation helpers
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

// Validation utilities
export const validateRecipe = (recipe: Partial<Recipe>): string[] => {
  const errors: string[] = [];
  
  if (!recipe.title?.trim()) errors.push('Title is required');
  if (!recipe.ingredients?.length) errors.push('At least one ingredient is required');
  if (!recipe.instructions?.length) errors.push('At least one instruction is required');
  if (!recipe.cookTime || recipe.cookTime <= 0) errors.push('Cook time must be positive');
  if (!recipe.servings || recipe.servings <= 0) errors.push('Servings must be positive');
  
  return errors;
};

// Storage utilities (for future localStorage integration)
export const storeMealPlan = (mealSlots: MealSlot[]): void => {
  try {
    localStorage.setItem('mealPlan', JSON.stringify(mealSlots));
  } catch (error) {
    console.warn('Failed to save meal plan to localStorage:', error);
  }
};

export const loadMealPlan = (): MealSlot[] | null => {
  try {
    const stored = localStorage.getItem('mealPlan');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((slot: any) => ({
        ...slot,
        date: new Date(slot.date)
      }));
    }
  } catch (error) {
    console.warn('Failed to load meal plan from localStorage:', error);
  }
  return null;
};

// Export utilities
export const exportMealPlanAsText = (mealSlots: MealSlot[]): string => {
  const groupedByDate = mealSlots.reduce((acc, slot) => {
    const dateKey = format(slot.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = {};
    if (slot.recipe) {
      acc[dateKey][slot.mealType] = slot.recipe;
    }
    return acc;
  }, {} as Record<string, Record<string, Recipe>>);

  let output = 'Weekly Meal Plan\n================\n\n';
  
  Object.entries(groupedByDate).forEach(([date, meals]) => {
    output += `${format(new Date(date), 'EEEE, MMMM d, yyyy')}\n`;
    output += '-------------------\n';
    
    Object.entries(meals).forEach(([mealType, recipe]) => {
      output += `${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: ${recipe.title}\n`;
    });
    
    output += '\n';
  });

  return output;
};
