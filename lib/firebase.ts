// lib/firebase.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type User, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// 1. Firebase configuration (from environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// 2. Initialize Firebase only once (client-side)
const firebaseApp: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const auth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore(firebaseApp);

// 3. Export Firebase auth and Firestore database
export { auth, db };
