// Shared types for meal planner components
export interface Recipe {
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

export interface MealSlot {
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
}

export interface EnhancedMealPlannerProps {
  initialRecipes?: Recipe[];
  onSave?: (meals: MealSlot[]) => void;
}

export interface RecipeCardProps {
  recipe: Recipe;
  isFlipped?: boolean;
  onFlip?: () => void;
  onAddToCart?: (ingredients: string[]) => void;
  onSchedule?: (recipeId: string) => void;
  size?: 'small' | 'medium' | 'large';
  dragConstraints?: any;
  className?: string;
}

export interface ADHDActionPanelProps {
  onQuickAdd: () => void;
  onAutoSchedule: () => void;
  onShoppingList: () => void;
  onSetReminders: () => void;
  focusMode: boolean;
  onToggleFocus: () => void;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ViewMode = 'grid' | 'list';
export type CardSize = 'small' | 'medium' | 'large';
