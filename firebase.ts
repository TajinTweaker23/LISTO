// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtK9nGuMz3mJkYhuKMCu0pa8LASmo1sFU",
  authDomain: "listo-listo.firebaseapp.com",
  projectId: "listo-listo",
  storageBucket: "listo-listo.appspot.com",
  messagingSenderId: "70588131341",
  appId: "1:70588131341:web:f75739f617781be275cd44",
  measurementId: "G-DBP3FC85KC"
};

// 🔐 Prevent duplicate initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
