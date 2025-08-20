import { Recipe } from './types';

// Sample recipes for demo/testing
export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    cookTime: 25,
    servings: 2,
    difficulty: 'easy',
    ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olive oil', 'Lemon'],
    instructions: ['Cook quinoa according to package directions', 'Mix vegetables in a large bowl', 'Add dressing and toss', 'Serve immediately'],
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
    instructions: ['Cook salmon in skillet', 'Steam broccoli until tender', 'Prepare rice according to package', 'Serve with sauce and garnish'],
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
    instructions: ['Toast bread until golden', 'Mash avocado with salt and pepper', 'Cook egg to preference', 'Assemble and enjoy'],
    nutrition: { calories: 350, protein: 12, carbs: 25, fat: 22 },
    tags: ['breakfast', 'quick', 'healthy']
  },
  {
    id: '4',
    title: 'Thai Green Curry',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
    cookTime: 30,
    servings: 4,
    difficulty: 'medium',
    ingredients: ['Green curry paste', 'Coconut milk', 'Chicken breast', 'Thai basil', 'Bell peppers', 'Jasmine rice'],
    instructions: ['Heat curry paste in pan', 'Add coconut milk and simmer', 'Add chicken and vegetables', 'Serve over rice with basil'],
    nutrition: { calories: 480, protein: 28, carbs: 35, fat: 24 },
    tags: ['spicy', 'thai', 'protein', 'comfort']
  },
  {
    id: '5',
    title: 'Greek Yogurt Parfait',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    cookTime: 5,
    servings: 1,
    difficulty: 'easy',
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Chia seeds'],
    instructions: ['Layer yogurt in glass', 'Add berries and granola', 'Drizzle with honey', 'Top with chia seeds'],
    nutrition: { calories: 280, protein: 18, carbs: 35, fat: 8 },
    tags: ['breakfast', 'healthy', 'quick', 'vegetarian']
  },
  {
    id: '6',
    title: 'Beef Stir Fry',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
    cookTime: 15,
    servings: 3,
    difficulty: 'easy',
    ingredients: ['Beef strips', 'Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Brown rice'],
    instructions: ['Heat oil in wok', 'Cook beef until browned', 'Add vegetables and seasonings', 'Serve over rice'],
    nutrition: { calories: 390, protein: 25, carbs: 28, fat: 15 },
    tags: ['protein', 'quick', 'asian']
  }
];

// Meal type configurations
export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

export const MEAL_TYPE_COLORS = {
  breakfast: 'from-yellow-400 to-orange-500',
  lunch: 'from-green-400 to-blue-500',
  dinner: 'from-purple-400 to-pink-500',
  snack: 'from-gray-400 to-gray-600'
} as const;

export const DIFFICULTY_COLORS = {
  easy: 'from-green-400 to-green-600',
  medium: 'from-yellow-400 to-orange-500',
  hard: 'from-red-400 to-red-600'
} as const;

// Filter options
export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Recipes' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'quick', label: 'Quick' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'protein', label: 'High Protein' }
];

// Animation variants
export const ANIMATION_VARIANTS = {
  cardEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideIn: {
    initial: { x: -300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 300 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  }
};
