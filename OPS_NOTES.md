# LISTO Operational Notes

## 🎯 Purpose
This document contains operational configuration details, environment-specific settings, and known issues for the LISTO application.

---

## 📋 Table of Contents
1. [Environment Matrix](#environment-matrix)
2. [Feature Flags](#feature-flags)
3. [Configuration Details](#configuration-details)
4. [Known Issues](#known-issues)
5. [Deployment History](#deployment-history)
6. [Dependencies Matrix](#dependencies-matrix)

---

## 🌍 Environment Matrix

### Development
- **URL**: http://localhost:3000
- **Node Environment**: `development`
- **Database**: Firebase Emulator (localhost:8080)
- **Features**: All experimental features enabled
- **Analytics**: Disabled
- **Debug Mode**: Enabled

**Environment Variables:**
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=LISTO (Dev)
NEXT_TELEMETRY_DISABLED=1
FIRESTORE_EMULATOR_HOST=localhost:8080
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Staging (Preview)
- **URL**: https://listo-*.vercel.app (dynamic)
- **Node Environment**: `production`
- **Database**: Firebase Staging Project
- **Features**: New features tested here
- **Analytics**: Limited
- **Debug Mode**: Enabled

**Environment Variables:**
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=LISTO (Staging)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=listo-staging
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES=true
```

### Production
- **URL**: https://listo.vercel.app (or custom domain)
- **Node Environment**: `production`
- **Database**: Firebase Production Project
- **Features**: Stable features only
- **Analytics**: Full tracking
- **Debug Mode**: Disabled

**Environment Variables:**
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=LISTO
NEXT_PUBLIC_FIREBASE_PROJECT_ID=listo-prod
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES=false
```

---

## 🚩 Feature Flags

### Active Feature Flags

| Flag | Dev | Staging | Production | Description |
|------|-----|---------|------------|-------------|
| `ENABLE_DEBUG_MODE` | ✅ | ✅ | ❌ | Console logging and debug tools |
| `ENABLE_ANALYTICS` | ❌ | ✅ | ✅ | Google Analytics tracking |
| `ENABLE_EXPERIMENTAL_FEATURES` | ✅ | ✅ | ❌ | Unreleased features |
| `ENABLE_AI_FEATURES` | ✅ | ⚠️ | ❌ | Genkit AI integration |
| `ENABLE_COPILOTKIT` | ✅ | ❌ | ❌ | CopilotKit features |
| `ENABLE_PWA` | ✅ | ✅ | ✅ | Progressive Web App |

**Legend:**
- ✅ Enabled
- ❌ Disabled
- ⚠️ Limited/Testing

### How to Toggle Features

**Client-side flags** (in `.env.local` or hosting platform):
```bash
NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES=true
```

**Server-side flags** (in `.env` or hosting platform):
```bash
ENABLE_AI_FEATURES=true
```

**Code usage:**
```typescript
// Check feature flag
if (process.env.NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES === 'true') {
  // Show experimental feature
}
```

---

## ⚙️ Configuration Details

### Next.js Configuration
**File**: `next.config.js`

```javascript
module.exports = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // PWA Configuration
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  
  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
};
```

### Firebase Configuration

#### Firestore Collections
```
/users/{userId}
  - profile
  - settings
  - wellness
  - travelPlans
  - bucketList

/posts/{postId}
  - Talavera social posts

/health/{userId}/records/{recordId}
  - Health tracking data

/mealPlans/{userId}/plans/{planId}
  - Meal planning data
```

#### Firestore Indexes
**File**: `firestore.indexes.json`

Key indexes:
- Users by email (ascending)
- Posts by timestamp (descending)
- Health records by userId + date (ascending)

#### Firestore Rules
**File**: `firestore.rules`

Security model:
- Users can read/write own data
- Public posts readable by all
- Anonymous social features protected

### Tailwind Configuration
**File**: `tailwind.config.js`

Custom theme:
```javascript
theme: {
  extend: {
    colors: {
      'sage': { /* custom palette */ },
      'warm-gray': { /* custom palette */ },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
}
```

---

## ⚠️ Known Issues

### Current Issues (v1.0.0)

#### Build Errors
**Status**: 🔴 Blocking

1. **Syntax Error in `hooks/useAchievements.tsx`**
   - **Error**: Return statement not allowed
   - **Impact**: Build fails
   - **Workaround**: None
   - **Fix ETA**: Before production deployment
   - **Ticket**: #TBD

2. **Duplicate Identifier in `hooks/useFocusTimer.tsx`**
   - **Error**: Identifier 'reset' declared twice
   - **Impact**: Build fails
   - **Workaround**: None
   - **Fix ETA**: Before production deployment
   - **Ticket**: #TBD

3. **Missing Components**
   - **Missing**: VideoUploadStudio, OnboardingModal
   - **Impact**: Build fails, features unavailable
   - **Workaround**: Comment out imports temporarily
   - **Fix ETA**: Before production deployment
   - **Ticket**: #TBD

#### Security Vulnerabilities
**Status**: 🟡 Moderate

1. **4 Moderate Severity NPM Vulnerabilities**
   - **Source**: `npm audit`
   - **Impact**: Potential security risks
   - **Workaround**: None critical for functionality
   - **Fix**: Run `npm audit fix`
   - **ETA**: Before production deployment

#### Performance Issues
**Status**: 🟢 No known issues

#### Browser Compatibility
**Status**: 🟢 Good

Tested browsers:
- ✅ Chrome 120+
- ✅ Safari 17+
- ✅ Firefox 121+
- ✅ Edge 120+
- ⚠️ IE11 (not supported)

### Resolved Issues (Historical)

| Version | Issue | Resolution | Date |
|---------|-------|------------|------|
| - | - | - | - |

---

## 📅 Deployment History

### Production Deployments

| Version | Date | Deployed By | Commit | Notes |
|---------|------|-------------|--------|-------|
| 1.0.0 (pending) | TBD | TajinTweaker23 | TBD | Initial production release |

### Staging Deployments

| Version | Date | Deployed By | Commit | Notes |
|---------|------|-------------|--------|-------|
| - | - | - | - | - |

### Rollbacks

| Date | From Version | To Version | Reason | Duration |
|------|--------------|------------|--------|----------|
| - | - | - | - | - |

---

## 📦 Dependencies Matrix

### Production Dependencies (Critical)

| Package | Version | Purpose | Update Frequency |
|---------|---------|---------|------------------|
| next | 15.5.6 | React framework | Monthly |
| react | 18.3.1 | UI library | Quarterly |
| firebase | 11.10.0 | Backend services | Monthly |
| tailwindcss | 4.1.7 | Styling | Quarterly |
| typescript | 5.3.3 | Type safety | Quarterly |

### Development Dependencies

| Package | Version | Purpose | Update Frequency |
|---------|---------|---------|------------------|
| jest | 30.0.4 | Testing | Monthly |
| @testing-library/react | 16.3.0 | Component testing | Monthly |
| eslint | Latest | Linting | Monthly |

### Security-Critical Dependencies
Monitor these closely for vulnerabilities:
- firebase
- next
- react
- axios

**Update Policy:**
- Security patches: Immediately
- Minor updates: Weekly review
- Major updates: Quarterly with testing

---

## 🔐 Secrets Management

### Production Secrets
**Stored in**: Vercel Environment Variables

Required secrets:
1. `NEXT_PUBLIC_FIREBASE_API_KEY`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. `FIREBASE_ADMIN_SDK_KEY`
5. `JWT_SECRET`
6. `SESSION_SECRET`

**Rotation Policy:**
- Firebase keys: Every 90 days
- JWT/Session secrets: Every 90 days
- API keys: Every 90 days or on compromise

**Last Rotation**: TBD

---

## 📊 Performance Benchmarks

### Target Metrics (Production)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Time to First Byte | < 200ms | TBD | ⏳ |
| First Contentful Paint | < 1.5s | TBD | ⏳ |
| Largest Contentful Paint | < 2.5s | TBD | ⏳ |
| Time to Interactive | < 3.5s | TBD | ⏳ |
| Cumulative Layout Shift | < 0.1 | TBD | ⏳ |

**Lighthouse Score Targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

---

## 🗺️ API Endpoints

### Public Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/health` | GET, HEAD | Health check | No |
| `/api/posts` | GET | Get social posts | No |

### Protected Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| TBD | TBD | TBD | Yes |

---

## 🔍 Monitoring Queries

### Useful Vercel Log Queries
```bash
# Find 5xx errors
vercel logs --filter="status:5*"

# Find slow requests (> 2s)
vercel logs --filter="duration:>2000"

# Find errors in last hour
vercel logs --since=1h --filter="level:error"
```

### Firestore Monitoring
```javascript
// Monitor slow queries (Firebase Console > Performance)
// Alert if P95 > 1s

// Monitor read/write usage
// Alert if approaching quota (1M reads/day free tier)
```

---

## 📚 Additional Resources

### Internal Docs
- [DEPLOYMENT_READINESS_CHECKLIST.md](./DEPLOYMENT_READINESS_CHECKLIST.md)
- [RUNBOOK.md](./RUNBOOK.md)
- [CHANGELOG.md](./CHANGELOG.md)

### External Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: 2025-01-14  
**Version**: 1.0.0  
**Maintained By**: TajinTweaker23
