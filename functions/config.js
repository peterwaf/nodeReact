import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
// Load environment variables from .env file or replace with your own values
dotenv.config(); //remove if using your api keys 
const firebaseConfig = {
  apiKey:process.env.MY_APP_API_KEY,
  authDomain:process.env.MY_APP_AUTH_DOMAIN,
  projectId:process.env.MY_APP_PROJECT_ID,
  storageBucket:process.env.MY_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.MY_APP_MESSAGING_SENDER_ID,
  appId:process.env.MY_APP_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const bucket = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, bucket,auth }