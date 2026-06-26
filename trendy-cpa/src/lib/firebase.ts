import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for required config values
const requiredKeys = Object.keys(firebaseConfig) as (keyof typeof firebaseConfig)[];
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

const isConfigured = missingKeys.length === 0;

let app: FirebaseApp | null = null;
if (isConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} else if (typeof window !== "undefined") {
  console.warn(
    `Firebase config is incomplete. Missing: ${missingKeys.join(", ")}. Please configure Firebase credentials in .env.local`
  );
}

export const auth = getAuth(app as FirebaseApp);
export const db = getFirestore(app as FirebaseApp);
export const storage = getStorage(app as FirebaseApp);

export default app;
