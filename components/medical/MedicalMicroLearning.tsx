'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, Clock, Zap, Heart, Activity } from 'lucide-react';

const MEDICAL_FACTS = [
  {
    id: 1,
    fact: "Your heart beats 100,000 times per day - that's 35 million times a year! 💓",
    category: "Cardiovascular",
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀",
    funFact: "Your heart is roughly the size of your fist and pumps 2,000 gallons of blood daily!"
  },
  {
    id: 2,
    fact: "You lose about 8 pounds of skin cells every year - that's a whole newborn baby's worth! 😱",
    category: "Dermatology", 
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀💀",
    funFact: "Your skin completely replaces itself every 28 days - you're literally a new person monthly!"
  },
  {
    id: 3,
    fact: "Your brain uses 20% of your body's total energy despite being only 2% of your weight 🤯",
    category: "Neurology",
    accuracy: "MA Verified", 
    brainRotLevel: "🧠💀💀💀",
    funFact: "That's like a smartphone using 1/5th of your entire house's electricity!"
  },
  {
    id: 4,
    fact: "You have the same number of neck vertebrae as a giraffe - exactly 7! 🦒",
    category: "Anatomy",
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀",
    funFact: "Giraffes' vertebrae are just way longer - each one can be 10 inches tall!"
  },
  {
    id: 5,
    fact: "Your stomach gets an entirely new lining every 3-4 days because stomach acid would digest it! 🔥",
    category: "Gastroenterology",
    accuracy: "MA Verified",
    brainRotLevel: "🧠💀💀",
    funFact: "Stomach acid is so strong it can dissolve metal - pH of 1.5 to 2!"
  }
];

const MEDICAL_ADMIN_TIPS = [
  {
    id: 1,
    title: "Electronic Health Records",
    description: "Understanding EHR systems and documentation best practices for healthcare providers.",
    difficulty: "beginner",
    category: "administration",
    brainRotLevel: 2,
    medicalAccuracy: 9,
    emoji: '📋',
    timeToRead: 15
  },
  {
    id: 2,
    title: "Medical Billing Basics",
    description: "Introduction to medical coding, insurance claims, and healthcare reimbursement processes.",
    difficulty: "intermediate",
    category: "administration",
    brainRotLevel: 3,
    medicalAccuracy: 8,
    emoji: '💰',
    timeToRead: 20
  },
  {
    id: 3,
    title: "Patient Privacy (HIPAA)",
    description: "Essential guidelines for protecting patient information and maintaining healthcare privacy compliance.",
    difficulty: "beginner",
    category: "administration",
    brainRotLevel: 1,
    medicalAccuracy: 10,
    emoji: '🔒',
    timeToRead: 12
  }
];