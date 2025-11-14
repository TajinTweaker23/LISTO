# LISTO Deployment Runbook

## 🎯 Purpose
This runbook provides step-by-step procedures for deploying, monitoring, and maintaining the LISTO application in production.

---

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deployment Procedure](#deployment-procedure)
3. [Post-Deployment Verification](#post-deployment-verification)
4. [Rollback Procedure](#rollback-procedure)
5. [Monitoring & Alerts](#monitoring--alerts)
6. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
7. [Incident Response](#incident-response)
8. [Maintenance Procedures](#maintenance-procedures)

---

## 🔍 Pre-Deployment Checklist

### Critical Prerequisites
- [ ] All tests pass locally: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] Dependencies updated and audited: `npm audit`
- [ ] Environment variables configured in hosting platform
- [ ] Database backup created (Firestore export)
- [ ] Release notes prepared in CHANGELOG.md
- [ ] Git tag created for release version
- [ ] Deployment approval obtained (if required)
- [ ] Rollback plan confirmed

### Pre-Deployment Commands
```bash
# 1. Ensure you're on the correct branch
git checkout main
git pull origin main

# 2. Verify build
npm ci
npm run build

# 3. Run tests
npm test

# 4. Check for security vulnerabilities
npm audit --audit-level=moderate

# 5. Create backup (Firebase)
firebase firestore:export gs://your-bucket/backups/$(date +%Y%m%d-%H%M%S)

# 6. Create git tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 🚀 Deployment Procedure

### Option 1: Vercel Deployment (Recommended)

#### A. Deploy to Staging (Preview)
```bash
# 1. Deploy to staging
vercel --prod=false

# 2. Note the preview URL
# Example: https://listo-xyz123.vercel.app

# 3. Run smoke tests on preview URL
curl -I https://listo-xyz123.vercel.app/api/health

# 4. Manual verification
# - Test critical user flows
# - Verify feature toggles
# - Check mobile responsiveness
```

**Pass Criteria:**
- ✅ Preview deployment successful
- ✅ Health endpoint returns 200 OK
- ✅ All critical pages load
- ✅ No JavaScript console errors

#### B. Deploy to Production
```bash
# 1. Deploy to production
vercel --prod

# 2. Note the production URL
# Example: https://listo.vercel.app

# 3. Verify deployment
vercel inspect <deployment-id>

# 4. Monitor deployment
vercel logs --follow
```

**Expected Output:**
```
✔ Production: https://listo.vercel.app [copied to clipboard] [1s]
📝 Inspect: https://vercel.com/your-org/listo/deployment-id
```

#### C. Gradual Rollout (Blue-Green)
```bash
# Vercel automatically handles traffic shifting
# Monitor metrics in Vercel Dashboard:
# 1. Error rate < 1%
# 2. P95 latency < 2s
# 3. No spike in 5xx errors

# If issues detected, rollback immediately
```

### Option 2: Firebase Hosting (Alternative)
```bash
# 1. Build application
npm run build

# 2. Deploy to Firebase
firebase deploy --only hosting

# 3. Verify deployment
firebase hosting:sites:list

# 4. Test production URL
curl -I https://your-app.web.app/api/health
```

---

## ✅ Post-Deployment Verification

### Immediate Checks (0-5 minutes)
```bash
# 1. Health endpoint check
curl https://listo.vercel.app/api/health | jq

# Expected response:
{
  "status": "ok",
  "timestamp": "2025-01-14T12:00:00.000Z",
  "version": "1.0.0",
  "uptime": 123,
  "environment": "production"
}

# 2. Check all critical pages
curl -I https://listo.vercel.app/
curl -I https://listo.vercel.app/dashboard
curl -I https://listo.vercel.app/travel
curl -I https://listo.vercel.app/bucket-list
curl -I https://listo.vercel.app/health

# All should return 200 OK

# 3. Check for JavaScript errors
# Open browser console on each page
# Should see: 0 errors

# 4. Verify mobile responsiveness
# Use browser dev tools to test iPhone/iPad viewports
```

### Short-Term Monitoring (5-30 minutes)
```bash
# Monitor Vercel logs
vercel logs --follow

# Watch for:
# - No increase in error rate
# - No 5xx server errors
# - Response times < 2s
# - No deployment-related warnings
```

### Medium-Term Monitoring (30 minutes - 2 hours)
- Monitor error rate in Vercel Analytics
- Check user-reported issues (if any)
- Verify database connectivity (Firestore)
- Monitor memory usage and performance

---

## 🔄 Rollback Procedure

### When to Rollback
Rollback immediately if:
- Error rate > 5% for 5+ minutes
- Critical functionality broken
- Database connectivity issues
- P95 latency > 5s for 5+ minutes
- Security vulnerability discovered

### Rollback Steps

#### Vercel Rollback
```bash
# Option 1: Use Vercel CLI
vercel rollback

# Option 2: Use Vercel Dashboard
# 1. Go to: https://vercel.com/your-org/listo
# 2. Click "Deployments"
# 3. Find last known good deployment
# 4. Click "..." > "Promote to Production"

# Option 3: Redeploy previous commit
git checkout <previous-good-commit-sha>
vercel --prod
```

**Rollback Verification:**
```bash
# 1. Verify health endpoint
curl https://listo.vercel.app/api/health

# 2. Check error rate
# Should drop back to normal levels

# 3. Monitor for 10 minutes
vercel logs --follow
```

#### Firebase Rollback
```bash
# Firebase keeps last 10 deployments
# View deployment history
firebase hosting:sites:releases

# Rollback to previous deployment
firebase hosting:rollback
```

### Post-Rollback Actions
1. Communicate rollback to team
2. Document the issue in incident log
3. Create post-mortem document
4. Fix root cause before next deployment
5. Update runbook with lessons learned

---

## 📊 Monitoring & Alerts

### Key Metrics to Monitor

#### Golden Signals
1. **Latency** (Response Time)
   - Target: P95 < 2s, P99 < 5s
   - Alert: P95 > 5s for 5 minutes

2. **Traffic** (Request Rate)
   - Monitor: Requests per minute
   - Alert: Sudden 50% drop (possible outage)

3. **Errors** (Error Rate)
   - Target: < 1%
   - Alert: > 5% for 5 minutes

4. **Saturation** (Resource Usage)
   - Monitor: Memory usage, CPU
   - Alert: > 80% for 10 minutes

#### Application-Specific Metrics
- User authentication success rate
- Database query latency
- API endpoint response times
- Feature usage metrics

### Monitoring Tools
- **Vercel Dashboard**: https://vercel.com/your-org/listo
  - Real-time logs
  - Error tracking
  - Performance metrics
- **Firebase Console**: https://console.firebase.google.com
  - Firestore usage
  - Authentication metrics
  - Function invocations

### Setting Up Alerts
```javascript
// Example: Vercel Integration with Slack/Email
// Configure in Vercel Dashboard > Integrations
// Set up alerts for:
// - Deployment failures
// - High error rates (> 5%)
// - Performance degradation (P95 > 5s)
```

---

## 🔧 Common Issues & Troubleshooting

### Issue 1: Build Failure

**Symptoms:**
- `npm run build` fails
- Deployment fails with build errors

**Diagnosis:**
```bash
# Check build logs
npm run build 2>&1 | tee build.log

# Common causes:
# - TypeScript errors
# - Missing dependencies
# - Syntax errors
```

**Fix:**
```bash
# 1. Clear cache and reinstall
rm -rf .next node_modules
npm ci
npm run build

# 2. Check TypeScript
npx tsc --noEmit

# 3. Fix errors and retry
```

### Issue 2: 5xx Server Errors

**Symptoms:**
- Users see "500 Internal Server Error"
- Health endpoint returns 500

**Diagnosis:**
```bash
# Check logs
vercel logs --follow

# Look for:
# - Unhandled exceptions
# - Database connection errors
# - Missing environment variables
```

**Fix:**
```bash
# 1. Verify environment variables
vercel env pull

# 2. Check Firebase connectivity
# Verify FIREBASE_* env vars are set

# 3. If critical, rollback
vercel rollback
```

### Issue 3: Slow Performance

**Symptoms:**
- Pages load slowly (> 5s)
- API calls timeout

**Diagnosis:**
```bash
# Check performance metrics in Vercel
# Look for:
# - Large bundle sizes
# - Slow database queries
# - Memory leaks
```

**Fix:**
```bash
# 1. Analyze bundle size
npm run build
# Check output: .next/

# 2. Optimize images
# Ensure using Next.js Image component

# 3. Enable caching
# Check next.config.js for cache headers

# 4. Consider code splitting
# Use dynamic imports for heavy components
```

### Issue 4: Database Connection Errors

**Symptoms:**
- Firestore errors in logs
- "Unable to connect to database"

**Diagnosis:**
```bash
# Check Firebase status
# https://status.firebase.google.com

# Verify credentials
# Check FIREBASE_* environment variables

# Test connection
firebase firestore:indexes
```

**Fix:**
```bash
# 1. Verify Firebase config
cat .env.production | grep FIREBASE

# 2. Check Firestore rules
firebase deploy --only firestore:rules

# 3. Verify indexes
firebase deploy --only firestore:indexes

# 4. Check quotas
# Visit Firebase Console > Usage
```

---

## 🚨 Incident Response

### Severity Levels

#### SEV-1: Critical (P1)
- **Definition**: Complete outage, data loss, security breach
- **Response Time**: Immediate
- **Escalation**: Page on-call engineer immediately

**Examples:**
- Application completely down
- Data breach or security vulnerability
- Database corruption

**Actions:**
1. Page on-call engineer
2. Create incident channel (#incident-YYYYMMDD-brief-description)
3. Assess impact and start mitigation
4. Update status page
5. Rollback if necessary
6. Communicate to stakeholders

#### SEV-2: High (P2)
- **Definition**: Major feature broken, performance degradation
- **Response Time**: < 1 hour
- **Escalation**: Notify team, assign owner

**Examples:**
- Key feature not working
- Severe performance degradation
- High error rate (> 10%)

**Actions:**
1. Notify team in Slack
2. Assign incident owner
3. Investigate root cause
4. Apply fix or rollback
5. Monitor for 30 minutes

#### SEV-3: Medium (P3)
- **Definition**: Minor feature broken, affects some users
- **Response Time**: < 4 hours
- **Escalation**: Create ticket, assign to team

**Examples:**
- Non-critical feature broken
- Minor UI issues
- Localized errors

**Actions:**
1. Create ticket
2. Assign to responsible team
3. Fix in next deployment cycle

### Incident Communication Template
```
**Incident**: [Brief Description]
**Severity**: SEV-1 / SEV-2 / SEV-3
**Start Time**: YYYY-MM-DD HH:MM UTC
**Status**: Investigating / Identified / Monitoring / Resolved

**Impact**:
- [Description of user impact]
- [Affected features/users]

**Current Actions**:
- [What's being done]

**Next Update**: [Time]
```

### Post-Incident Review
After incident is resolved:
1. Schedule post-mortem meeting (within 48 hours)
2. Document timeline of events
3. Identify root cause
4. Create action items to prevent recurrence
5. Update runbooks with lessons learned

---

## 🛠️ Maintenance Procedures

### Weekly Tasks
```bash
# 1. Check for dependency updates
npm outdated

# 2. Review security alerts
npm audit

# 3. Monitor error logs
vercel logs

# 4. Check performance metrics
# Visit Vercel Dashboard
```

### Monthly Tasks
```bash
# 1. Update dependencies
npm update
npm audit fix

# 2. Review and rotate secrets
# Update Firebase keys if needed

# 3. Clean up old deployments
# Vercel keeps last 100 by default

# 4. Review and optimize costs
# Check Vercel and Firebase usage

# 5. Database maintenance
# Review Firestore indexes
firebase firestore:indexes
```

### Quarterly Tasks
1. Load testing
2. Security audit
3. Dependency major version updates
4. Review and update documentation
5. Disaster recovery drill

---

## 📞 Contacts & Escalation

### On-Call Engineer
- **Primary**: TajinTweaker23
- **GitHub**: @TajinTweaker23
- **Email**: [Set in team settings]

### Escalation Path
1. **On-Call Engineer** (SEV-1, SEV-2)
2. **Tech Lead** (If on-call unavailable)
3. **Engineering Manager** (After hours)

### External Support
- **Vercel Support**: https://vercel.com/support
- **Firebase Support**: https://firebase.google.com/support
- **GitHub Support**: https://support.github.com

---

## 📚 Additional Resources
- [DEPLOYMENT_READINESS_CHECKLIST.md](./DEPLOYMENT_READINESS_CHECKLIST.md) - Comprehensive deployment checklist
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes
- [OPS_NOTES.md](./OPS_NOTES.md) - Operational notes and configurations
- [Firebase Console](https://console.firebase.google.com)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

**Last Updated**: 2025-01-14  
**Version**: 1.0.0  
**Owner**: TajinTweaker23
