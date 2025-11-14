# 🚀 LISTO - Life Intelligence & Support Through Optimization

> A comprehensive neurodivergent-friendly wellness and productivity platform built with Next.js, Firebase, and love.

![LISTO Logo](./public/listo-logo.svg)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

LISTO is a holistic wellness and productivity platform designed specifically with neurodivergent users in mind. It combines travel planning, health tracking, goal management, and anonymous social features into one beautiful, accessible application.

### Core Principles
- **🧠 Neurodivergent-First Design**: Built-in focus mode, reduced motion support, and accessibility features
- **🔒 Privacy by Design**: Anonymous social features with energy-based matching
- **🎨 Beautiful & Intuitive**: Glassmorphism UI with brand-aligned Mexican cultural influences
- **📱 Mobile-First**: Fully responsive design for iPhone, iPad, and desktop

---

## ✨ Features

### 🧳 Travel Planning
- **Itinerary Builder**: Day-by-day trip planning with activities and locations
- **Packing Lists**: Categorized checklists with completion tracking
- **Expense Tracker**: Budget management with category breakdowns
- **Travel Photos**: Photo gallery with location tagging

### 🎯 Bucket List & Vision Board
- Create and track life goals with priorities
- Embed images, screenshots, and articles for inspiration
- Category filtering (Travel, Education, Fitness, Career, etc.)
- Progress tracking with completion statistics

### 💚 Health & Wellness
- **Wellness Dashboard**: Comprehensive health overview
- **Energy Meter**: Interactive energy level tracking with AI recommendations
- **Mood Tracker**: Emoji-based mood logging with insights
- **Medical Hub**: Appointment and medication management
- **Meal Planner**: ADHD-friendly meal planning with recipes

### 🌐 Anonymous Social Features (Talavera)
- Energy-based resonance matching
- Privacy-first anonymous connections
- Interest-based discovery
- Community support without identity exposure

### 🎨 Interface & UX
- **Focus Mode**: Reduces motion and adjusts contrast for better concentration
- **Dark Mode**: Complete theme switching with persistence
- **Interface Preview**: See how the app looks on iPhone, iPad, and Desktop
- **Responsive Design**: Seamless experience across all devices

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.6 (React 18.3.1)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 4.1.7
- **Animations**: Framer Motion 12.23.12
- **Icons**: Lucide React 0.263.1
- **State Management**: React Query (TanStack)

### Backend
- **Database**: Firebase Firestore 11.10.0
- **Authentication**: Firebase Auth
- **Functions**: Firebase Cloud Functions
- **Storage**: Firebase Storage

### Development
- **Testing**: Jest 30.0.4, React Testing Library 16.3.0
- **Linting**: ESLint
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (primary), Firebase Hosting (backup)

### AI & Integrations
- **AI**: Genkit 1.15.0, Vertex AI 1.14.1
- **Maps**: Google Maps API (React Google Maps)
- **Analytics**: Vercel Analytics, Google Analytics

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TajinTweaker23/LISTO.git
   cd LISTO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Configuration

#### Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore, Authentication, and Storage
3. Copy your Firebase config to `.env.local`
4. Deploy Firestore rules and indexes:
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   ```

#### Environment Variables
See `.env.example` for all required environment variables. Key variables:
- `NEXT_PUBLIC_FIREBASE_*`: Firebase client configuration
- `FIREBASE_ADMIN_SDK_KEY`: Server-side Firebase admin credentials
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps integration
- `GENKIT_*`: AI feature configuration

---

## 📦 Deployment

### Quick Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to production**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel Dashboard**
   - Go to: https://vercel.com/your-org/listo/settings/environment-variables
   - Add all variables from `.env.example`

### Deployment Readiness

Before deploying to production, review the comprehensive deployment checklist:

📖 **[DEPLOYMENT_READINESS_CHECKLIST.md](./DEPLOYMENT_READINESS_CHECKLIST.md)**

This 1100+ line document covers:
- ✅ Source control and versioning
- ✅ Build integrity and SBOM
- ✅ Testing and quality gates
- ✅ Security scanning
- ✅ Configuration management
- ✅ Infrastructure validation
- ✅ Database and migrations
- ✅ Deployment strategy
- ✅ Observability and monitoring
- ✅ Performance and capacity
- ✅ Security and compliance
- ✅ Post-deploy verification
- ✅ Documentation and runbooks

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

---

## 📚 Documentation

### Core Documentation
- **[DEPLOYMENT_READINESS_CHECKLIST.md](./DEPLOYMENT_READINESS_CHECKLIST.md)** - Comprehensive deployment guide (1100+ lines)
- **[RUNBOOK.md](./RUNBOOK.md)** - Deployment procedures and incident response
- **[OPS_NOTES.md](./OPS_NOTES.md)** - Operational configurations and known issues
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[BRAND_STRATEGY.md](./BRAND_STRATEGY.md)** - Brand identity and strategy

### Design Documentation
- **[DESIGN_TRANSFORMATION_REPORT.md](./DESIGN_TRANSFORMATION_REPORT.md)** - Design system details
- **[RESPONSIVE_DESIGN_SUMMARY.md](./RESPONSIVE_DESIGN_SUMMARY.md)** - Responsive design approach
- **[MOBILE_COMPATIBILITY_PROGRESS.md](./MOBILE_COMPATIBILITY_PROGRESS.md)** - Mobile optimization

### Feature Documentation
- **[HEALTH_README.md](./HEALTH_README.md)** - Health tracking features
- **[ADHD_MEAL_PLANNER_README.md](./ADHD_MEAL_PLANNER_README.md)** - Meal planning for ADHD

---

## 🏗️ Project Structure

```
LISTO/
├── app/                      # Next.js 13+ App Router
│   ├── api/                  # API routes
│   │   ├── health/          # Health check endpoint
│   │   └── posts/           # Social posts API
│   ├── bucket-list/         # Bucket list feature
│   ├── travel/              # Travel planning
│   ├── health/              # Health tracking
│   ├── wellness/            # Wellness dashboard
│   ├── interface-preview/   # Device preview tool
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI components
│   ├── talavera/           # Social features
│   ├── meal-planner/       # Meal planning
│   └── ...                 # Other features
├── public/                  # Static assets
│   ├── listo-logo.svg      # Mexican-inspired logo
│   └── icons/              # PWA icons
├── styles/                  # Global styles
├── types/                   # TypeScript types
├── hooks/                   # Custom React hooks
├── context/                # React context providers
├── lib/                    # Utility functions
├── firebase.json           # Firebase configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

---

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage Goals
- Unit tests: ≥ 80% coverage
- Integration tests: Critical user paths
- E2E tests: Key workflows (smoke tests)

---

## 🔒 Security

### Security Features
- ✅ Security headers configured in `next.config.js`
- ✅ Firebase security rules for Firestore
- ✅ Environment-based configuration (no hardcoded secrets)
- ✅ Health check endpoint for monitoring
- ✅ HTTPS enforced (via Vercel/Firebase)

### Security Best Practices
1. Never commit `.env` or `.env.local` files
2. Rotate secrets every 90 days
3. Run `npm audit` regularly
4. Keep dependencies up to date
5. Review Firestore rules before deployment

### Reporting Security Issues
If you discover a security vulnerability, please email [security contact TBD] instead of using the issue tracker.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and atomic
- Write clear commit messages

---

## 📊 Monitoring & Health

### Health Check Endpoint
```bash
curl https://your-app.vercel.app/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-14T12:00:00.000Z",
  "version": "1.0.0",
  "uptime": 3600,
  "environment": "production",
  "checks": {
    "database": "ok",
    "memory": "ok"
  }
}
```

### Monitoring Tools
- **Vercel Analytics**: Real-time performance metrics
- **Firebase Console**: Database and function monitoring
- **GitHub Actions**: CI/CD pipeline status

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ by TajinTweaker23
- Inspired by neurodivergent community needs
- Mexican cultural design influences from Talavera pottery
- Open source community for amazing tools and libraries

---

## 📞 Support & Contact

- **GitHub Issues**: https://github.com/TajinTweaker23/LISTO/issues
- **Documentation**: See `/docs` directory
- **Email**: [Contact TBD]

---

## 🗺️ Roadmap

### Version 1.1 (Q2 2025)
- [ ] Enhanced AI recommendations
- [ ] Wearable device integration
- [ ] Therapist/coach collaboration features
- [ ] Advanced analytics dashboard

### Version 2.0 (Q3 2025)
- [ ] Mobile apps (iOS/Android)
- [ ] Offline mode support
- [ ] Smart home integration
- [ ] Multi-language support

---

**Made with 💚 for the neurodivergent community**

[⬆ Back to top](#-listo---life-intelligence--support-through-optimization)
