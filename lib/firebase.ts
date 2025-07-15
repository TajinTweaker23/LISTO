import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Adjust the environment variable name below to match your actual Vercel env var name:
const firebaseConfig = {
  apiKey: "AIzaSyCRleusZM0M2tpA8JoS8NyEElntli8aadw",
  authDomain: "listo-listo.firebaseapp.com",
  projectId: "listo-listo",
  storageBucket: "listo-listo.firebasestorage.app", // <--- THIS IS CORRECT!
  messagingSenderId: "70588131341",
  appId: "1:70588131341:web:f75739f617781be275cd44",
  measurementId: "G-DBP3FC85KC"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
