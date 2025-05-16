import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtK9nGuMz3mJkYhuKMCu0pa8LASmo1sFU",
  authDomain: "listo-listo.firebaseapp.com",
  projectId: "listo-listo",
  storageBucket: "listo-listo.firebasestorage.app",
  messagingSenderId: "70588131341",
  appId: "1:70588131341:web:f75739f617781be275cd44"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
