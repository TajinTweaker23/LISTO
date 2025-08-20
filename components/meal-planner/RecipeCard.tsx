import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Flame, 
  ShoppingCart,
  Heart,
  Timer,
  Utensils,
  Image as ImageIcon,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RecipeCardProps } from './types';
import { DIFFICULTY_COLORS } from './constants';

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFlipped = false,
  onFlip,
  onAddToCart,
  onSchedule,
  size = 'medium',
  dragConstraints,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const sizeClasses = {
    small: 'w-48 h-64',
    medium: 'w-64 h-80',
    large: 'w-80 h-96'
  };

  const getDifficultyColor = useCallback((difficulty: string) => {
    return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || 'from-gray-400 to-gray-600';
  }, []);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageError(true), []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag={dragConstraints ? true : false}
      dragConstraints={dragConstraints}
      dragElastic={0.2}
      whileDrag={{ scale: 1.05, zIndex: 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Container */}
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={onFlip}
      >
        {/* Front Side */}
        <Card className="absolute inset-0 w-full h-full backface-hidden bg-white shadow-xl overflow-hidden border-0">
          {/* Image Container */}
          <div className="relative h-1/2 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {!imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                )}
                <motion.img
                  src={recipe.image}
                  alt={recipe.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* Overlay with Quick Actions */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
                >
                  <Button
                    size="sm"
                    className="bg-white/90 text-gray-800 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSchedule?.(recipe.id);
                    }}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart?.(recipe.ingredients);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Cart
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Difficulty Badge */}
            <div className="absolute top-3 left-3">
              <motion.div
                className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getDifficultyColor(recipe.difficulty)}`}
                whileHover={{ scale: 1.05 }}
              >
                {recipe.difficulty.toUpperCase()}
              </motion.div>
            </div>

            {/* Favorite Button */}
            <motion.button
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="w-4 h-4 text-red-500" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4 h-1/2 flex flex-col">
            <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
              {recipe.title}
            </h3>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <span>{recipe.cookTime}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                <span>{recipe.nutrition.calories}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {recipe.tags.slice(0, 3).map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Flip Indicator */}
            <div className="mt-auto">
              <motion.div
                className="text-center text-xs text-gray-500 flex items-center justify-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChefHat className="w-3 h-3" />
                Tap to see recipe
              </motion.div>
            </div>
          </div>
        </Card>

        {/* Back Side */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl overflow-hidden border-0">
          <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg leading-tight">Recipe</h3>
              {recipe.url && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(recipe.url, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Ingredients */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <Utensils className="w-4 h-4" />
                  Ingredients
                </h4>
                <ul className="space-y-1">
                  {recipe.ingredients.slice(0, 6).map((ingredient, index) => (
                    <motion.li
                      key={index}
                      className="text-xs text-gray-700 flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{ingredient}</span>
                    </motion.li>
                  ))}
                  {recipe.ingredients.length > 6 && (
                    <li className="text-xs text-gray-500">
                      +{recipe.ingredients.length - 6} more...
                    </li>
                  )}
                </ul>
              </div>

              {/* Instructions Preview */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Instructions</h4>
                <div className="space-y-2">
                  {recipe.instructions.slice(0, 3).map((step, index) => (
                    <motion.div
                      key={index}
                      className="text-xs text-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium text-blue-600">{index + 1}.</span> {step.slice(0, 80)}...
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div className="bg-white/60 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Nutrition (per serving)</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Calories: <span className="font-medium">{recipe.nutrition.calories}</span></div>
                  <div>Protein: <span className="font-medium">{recipe.nutrition.protein}g</span></div>
                  <div>Carbs: <span className="font-medium">{recipe.nutrition.carbs}g</span></div>
                  <div>Fat: <span className="font-medium">{recipe.nutrition.fat}g</span></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(recipe.ingredients);
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add Ingredients to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSchedule?.(recipe.id);
                }}
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule This Meal
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Drag Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/20 rounded-lg -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: x.get() !== 0 || y.get() !== 0 ? 1 : 0,
          scale: x.get() !== 0 || y.get() !== 0 ? 1.1 : 0.8,
          x: x.get() * 0.1,
          y: y.get() * 0.1
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};
