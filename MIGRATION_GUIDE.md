# Migration Guide: Firebase to Python Backend

## Overview

This guide helps you migrate from the original Firebase implementation to the new Python/FastAPI backend.

## Key Changes

### Authentication
**Before (Firebase):**
```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';
const userCredential = await signInWithEmailAndPassword(auth, email, password);
```

**After (Python Backend):**
```typescript
import { apiClient } from '@/lib/api-client';
const response = await apiClient.login(username, password);
// Token is automatically stored and managed
```

### Data Fetching
**Before (Firestore):**
```typescript
import { collection, getDocs } from 'firebase/firestore';
const querySnapshot = await getDocs(collection(db, 'cycleData'));
```

**After (Python Backend):**
```typescript
import { apiClient } from '@/lib/api-client';
const cycleData = await apiClient.getCycleEntries(30); // Last 30 days
```

### Data Creation
**Before (Firestore):**
```typescript
import { addDoc, collection } from 'firebase/firestore';
await addDoc(collection(db, 'moodEntries'), moodData);
```

**After (Python Backend):**
```typescript
import { apiClient } from '@/lib/api-client';
await apiClient.createMoodEntry(moodData);
```

## Step-by-Step Migration

### 1. Update Environment Variables

Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 2. Replace Firebase Imports

**Remove:**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
```

**Add:**
```typescript
import { apiClient } from '@/lib/api-client';
```

### 3. Update Authentication Components

**Before:**
```typescript
// Login component with Firebase
const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};
```

**After:**
```typescript
// Login component with API client
const handleLogin = async () => {
  try {
    await apiClient.login(username, password);
    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    console.error(error);
  }
};
```

### 4. Update Data Hooks

**Before (Firebase hooks):**
```typescript
const [cycleData, setCycleData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'cycleData'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCycleData(data);
  };
  fetchData();
}, []);
```

**After (API client with React Query):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

const { data: cycleData, isLoading, error } = useQuery({
  queryKey: ['cycleData'],
  queryFn: () => apiClient.getCycleEntries(30)
});
```

### 5. Update Data Mutations

**Before (Firebase):**
```typescript
const handleSubmit = async (data) => {
  await addDoc(collection(db, 'moodEntries'), {
    ...data,
    userId: user.uid,
    createdAt: new Date()
  });
};
```

**After (API client):**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (data) => apiClient.createMoodEntry(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['moodEntries'] });
  }
});

const handleSubmit = (data) => {
  mutation.mutate(data);
};
```

## Common Patterns

### Protected Routes

**Before (Firebase):**
```typescript
import { onAuthStateChanged } from 'firebase/auth';

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) router.push('/login');
  });
  return unsubscribe;
}, []);
```

**After (API client):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

const { data: user, isLoading } = useQuery({
  queryKey: ['currentUser'],
  queryFn: () => apiClient.getCurrentUser(),
  retry: false,
  onError: () => router.push('/login')
});
```

### Real-time Updates

Firebase's real-time listeners are replaced with polling or WebSockets:

**Option 1: Polling**
```typescript
const { data } = useQuery({
  queryKey: ['moodEntries'],
  queryFn: () => apiClient.getMoodEntries(),
  refetchInterval: 30000, // Refetch every 30 seconds
});
```

**Option 2: WebSocket (Future Enhancement)**
```typescript
// Will be implemented in future updates
import { useWebSocket } from '@/hooks/useWebSocket';
const { data } = useWebSocket('/api/v1/health/mood/stream');
```

## Data Migration

### Export from Firebase

```typescript
// Run this script to export your Firebase data
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

async function exportData(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Save to JSON file
  const json = JSON.stringify(data, null, 2);
  // Download or save json
  console.log(json);
}

// Export all collections
['users', 'cycleData', 'moodEntries', 'recipes'].forEach(exportData);
```

### Import to Python Backend

```python
# backend/scripts/import_firebase_data.py
import json
import sys
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import CycleData, MoodEntry, Recipe

def import_cycle_data(data: list, user_id: int, db: Session):
    for item in data:
        entry = CycleData(
            user_id=user_id,
            date=datetime.fromisoformat(item['date']),
            flow_level=item.get('flowLevel'),
            symptoms=item.get('symptoms', []),
            mood=item.get('mood'),
            energy_level=item.get('energyLevel'),
            notes=item.get('notes')
        )
        db.add(entry)
    db.commit()

# Load and import
with open('firebase_export.json') as f:
    data = json.load(f)
    
db = SessionLocal()
import_cycle_data(data['cycleData'], user_id=1, db=db)
```

## Testing Migration

### 1. Backend Tests
```bash
cd backend
pytest
```

### 2. Frontend Integration Tests
```bash
npm test
```

### 3. End-to-End Tests
```bash
# Start backend
cd backend && ./start_dev.sh

# In another terminal, start frontend
npm run dev

# Test key user flows
```

## Rollback Plan

If you need to rollback to Firebase:

1. Keep Firebase configuration files
2. Don't delete Firebase collections until fully migrated
3. Use feature flags to switch between Firebase and API client

```typescript
const USE_NEW_BACKEND = process.env.NEXT_PUBLIC_USE_NEW_BACKEND === 'true';

const fetchData = USE_NEW_BACKEND 
  ? () => apiClient.getCycleEntries()
  : () => fetchFromFirebase();
```

## Common Issues

### CORS Errors
Make sure backend CORS is configured correctly in `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Authentication Issues
Check that tokens are being stored:
```typescript
// Debug token storage
console.log(localStorage.getItem('listo_access_token'));
```

### API URL Issues
Verify environment variable:
```typescript
console.log(process.env.NEXT_PUBLIC_API_URL);
```

## Performance Considerations

1. **Batching**: Group related API calls
2. **Caching**: Use React Query's built-in caching
3. **Pagination**: Implement for large datasets
4. **Lazy Loading**: Load data as needed

## Next Steps

1. Complete backend implementation
2. Migrate authentication flows
3. Migrate data fetching
4. Test thoroughly
5. Deploy backend
6. Update frontend environment variables
7. Monitor and optimize

## Support

For migration assistance:
- Review API documentation: http://localhost:8000/docs
- Check backend logs for errors
- See DEPLOYMENT_GUIDE.md for infrastructure
