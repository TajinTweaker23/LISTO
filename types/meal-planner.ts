export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  dietaryRestrictions: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  date: Date;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  };
  totalCalories: number;
  totalMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  calorieGoal: number;
  macroGoals: {
    protein: number;
    carbs: number;
    fat: number;
  };
  allergies: string[];
  preferredCuisines: string[];
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  isPurchased: boolean;
}

export interface GroceryList {
  id: string;
  mealPlanId: string;
  items: GroceryItem[];
  createdAt: Date;
  updatedAt: Date;
}