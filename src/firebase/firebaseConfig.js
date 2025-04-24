// src/firebaseConfig.js

// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Firestore is initialized
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjOaih6eaelJBd3g6tL7ryE0NrctNgUL8",
  authDomain: "veshbhusha-7828a.firebaseapp.com",
  projectId: "veshbhusha-7828a",
  storageBucket: "veshbhusha-7828a.appspot.com",  // Fix the incorrect storage bucket URL
  messagingSenderId: "781501409666",
  appId: "1:781501409666:web:57e9cf1f73b55c4b82879b",
  measurementId: "G-6FG4JEX90N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore initialized here
const storage = getStorage(app);

// Export services for use in other components
export { app, auth, db, storage, analytics };
