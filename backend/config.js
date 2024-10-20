import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
// Load environment variables from .env file or replace with your own values
dotenv.config(); //remove if using your api keys 
const firebaseConfig = {
  apiKey: process.env.FIREBSE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const bucket = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, bucket,auth }