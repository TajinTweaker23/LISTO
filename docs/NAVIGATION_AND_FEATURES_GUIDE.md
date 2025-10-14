# LISTO Navigation & Feature Guide

## Quick Start - Accessing Features

### Main Navigation Hub
Visit `/clean-nav` to access all features from one centralized location.

Or from the homepage, click **"Browse All Features →"**

---

## Feature Categories

### Main Features
1. **Home** (`/`) - Landing page with overview
2. **Wellness Hub** (`/wellness`) - Mental health and wellness tracking
3. **Medical Hub** (`/medical-hub`) - Health management and medical resources
4. **Vision Board** (`/vision-board`) - Goal setting and visualization

### Tools & Features
1. **Dashboard** (`/dashboard`) - Personal activity dashboard with streaks
2. **Health Tracker** (`/health`) - Detailed health metrics and tracking
3. **Meal Planner** (`/adhd-meal-planner-demo`) - ADHD-friendly meal planning
4. **Growth Pods** (`/growth-pods`) - Collaborative growth tracking
5. **Optimizer** (`/optimizer`) - AI-powered optimization and insights

---

## What's Already Built

### ✅ Fully Functional
- Comprehensive meal planning with ADHD support
- Health and wellness tracking
- Vision board for goal visualization
- Medical education and disease prevention
- Activity dashboard with streak tracking
- Collaborative growth tracking
- AI-powered optimization
- Premium design system with neurodivergent-friendly features

### 🔄 Partially Complete
- Mundane task tracking (component exists, needs enhancement)
- PDF editor (basic editing, needs VSD support)

---

## Recent Improvements (Today)

### Cleanup & Organization
✅ Removed merge conflict backup files
✅ Consolidated duplicate meal planner pages
✅ Enhanced navigation hub with categorized features
✅ Added "Browse All Features" link from homepage
✅ Fixed build issues and JSX structure
✅ Updated .gitignore for better project hygiene

### Navigation Structure
The app now has a clear hierarchy:
```
Homepage (/)
    ├── Browse All Features → Navigation Hub (/clean-nav)
    │   ├── Main Features
    │   │   ├── Wellness Hub
    │   │   ├── Medical Hub
    │   │   └── Vision Board
    │   └── Tools & Features
    │       ├── Dashboard
    │       ├── Health Tracker
    │       ├── Meal Planner
    │       ├── Growth Pods
    │       └── Optimizer
    └── Quick Access Buttons
        ├── Start Wellness Journey
        ├── Medical Hub
        └── Vision Board
```

---

## Feature Requests - Status

See [FEATURE_ASSESSMENT_AND_RECOMMENDATIONS.md](./FEATURE_ASSESSMENT_AND_RECOMMENDATIONS.md) for detailed analysis.

### Priority 1 (Recommended Next)
- 🎯 Recipe meal calendar with visual cards
- 📚 Vocabulary word per day
- 🛡️ Domestic violence & safety resources

### Priority 2 (Requires Backend/AI)
- 🛒 Grocery price comparison AI
- 🦜 Bird/plant identification cards
- 📢 Protest notification system

### Priority 3 (Medium Value)
- 🇪🇸 Spanish language learning
- 🚗 Defensive driving reminders in weather

### Technical Limitations
- ❌ VSD file upload (proprietary format - recommend SVG export instead)

---

## Known Issues

### Build Warnings
⚠️ Pre-existing syntax errors in:
- `hooks/useAchievements.tsx` (return statement issue)
- `hooks/useFocusTimer.tsx` (duplicate identifier)

These are unrelated to today's navigation improvements and require code review.

---

## Design System

### Colors
The app uses a neurodivergent-friendly color palette:
- **Sage Green** - Calming, natural
- **Warm Gray** - Neutral, comfortable
- **Emerald** - Growth, wellness
- **Blue/Purple** - Trust, creativity
- **Soft accent colors** - Reduced visual strain

### Accessibility Features
- High contrast ratios
- Clear typography
- Reduced motion options (in progress)
- Focus indicators
- ADHD-friendly layouts

### Animations
- Smooth transitions with Framer Motion
- Loading states
- Hover effects
- Micro-interactions

---

## For Developers

### Project Structure
```
LISTO/
├── app/                    # Next.js app directory (pages)
├── components/            # React components
│   ├── ui/               # UI components
│   ├── meal-planner/     # Meal planning features
│   ├── health/           # Health tracking
│   └── ...
├── styles/               # CSS files
│   ├── globals.css
│   ├── design-system.css
│   ├── neurodivergent-features.css
│   └── ...
├── hooks/                # Custom React hooks
├── context/              # React context providers
└── docs/                # Documentation

```

### Key Technologies
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Firebase (backend)
- Various specialized libraries (see package.json)

### Running the App
```bash
npm install          # Install dependencies
npm run dev         # Development server
npm run build       # Production build
```

---

## Next Steps

1. **For Users**: Explore all features via `/clean-nav`
2. **For Developers**: Review `FEATURE_ASSESSMENT_AND_RECOMMENDATIONS.md` for implementation guidance
3. **Priority**: Implement P1 features (Recipe Calendar, Vocabulary, Safety Resources)

---

## Questions or Issues?

- Check the detailed feature assessment doc for implementation details
- Review existing components before building new ones
- Consider neurodivergent-friendly design in all new features
- Test navigation flows thoroughly

---

**Last Updated**: October 2025
**Version**: 1.0
