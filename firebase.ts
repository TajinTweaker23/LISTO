// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtK9nGuMz3mJkYhuKMCu0pa8LASmo1sFU",
  authDomain: "listo-listo.firebaseapp.com",
  projectId: "listo-listo",
  storageBucket: "listo-listo.appspot.com",
  messagingSenderId: "70588131341",
  appId: "1:70588131341:web:f75739f617781be275cd44",
  measurementId: "G-DBP3FC85KC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
