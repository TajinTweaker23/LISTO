# LISTO Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-14

### Added - Initial Release
- **Core Application Features**
  - Next.js 15.5.6 application with TypeScript
  - Firebase integration (Firestore, Functions, Admin)
  - Responsive design with Tailwind CSS
  
- **Travel Planning Features**
  - Itinerary builder with day-by-day planning
  - Packing lists with category organization
  - Expense tracker with budget management
  - Travel photos gallery with location tagging
  
- **Bucket List & Vision Board**
  - Create and track life goals
  - Priority levels (high, medium, low)
  - Image embedding and galleries
  - Link/article embedding for inspiration
  - Category filtering (Travel, Education, Fitness, Career, Personal, Adventure, Culture)
  - Progress tracking with completion statistics
  
- **Health & Wellness Features**
  - Wellness dashboard with mood tracking
  - Energy meter with recommendations
  - Health tracking integration
  - Medical hub for appointments and medications
  - Meal planner with ADHD-friendly features
  - Focus mode for neurodivergent users
  
- **Social Features (Talavera)**
  - Anonymous social networking based on energy resonance
  - Resonance circles for privacy-first connections
  - Interest-based matching
  - Community support features
  
- **Interface & UX**
  - Mobile-first responsive design
  - Dark mode toggle
  - Glassmorphism UI design
  - Neurodivergent-friendly features (focus mode, reduced motion, high contrast)
  - Interface preview tool for iPhone, iPad, and Desktop
  
- **Developer Experience**
  - TypeScript for type safety
  - Jest testing setup
  - ESLint configuration
  - GitHub Actions CI/CD pipeline
  - Firebase deployment configuration
  
### Technical Details
- **Dependencies**: React 18.3.1, Next.js 15.5.6, Firebase 11.10.0, Tailwind CSS 4.1.7
- **Node Version**: 18.x
- **Package Manager**: npm
- **Hosting**: Vercel (primary), Firebase (backend)

### Known Issues
- Build currently failing due to syntax errors in hooks (useAchievements, useFocusTimer)
- Missing components: VideoUploadStudio, OnboardingModal
- 4 moderate security vulnerabilities in dependencies

### Security
- Firebase security rules configured
- Environment-based configuration
- No hardcoded secrets in source code

### Migration Notes
- First production release - no migration needed
- Set up environment variables (see .env.example)
- Configure Firebase project credentials
- Deploy Firestore rules and indexes

---

## [Unreleased]

### Planned Features
- Enhanced AI integration with Genkit
- Advanced analytics and insights
- Load testing and performance optimization
- E2E test coverage
- SBOM generation
- Security scanning integration
- Automated backup system

---

**Note**: This is the initial release of LISTO. For deployment instructions, see `DEPLOYMENT_READINESS_CHECKLIST.md`.
