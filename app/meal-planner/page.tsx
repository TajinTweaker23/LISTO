'use client';

import React from 'react';
import { EnhancedMealPlanner } from '../../components/meal-planner/EnhancedMealPlanner';
import { motion } from 'framer-motion';
export default function MealPlannerPage() {
  const handleSave = (meals: any[]) => {
    console.log('Saving meals:', meals);
    // Here you would save to your backend/database
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <EnhancedMealPlanner onSave={handleSave} />
    </motion.div>
  );
}
