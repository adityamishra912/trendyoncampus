import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const provider = new GoogleAuthProvider();

export async function signUpWithEmail(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function signInWithGoogle() {
  if (!auth) {
    throw new Error("Firebase auth is not configured");
  }

  const result = await signInWithPopup(
    auth,
    provider
  );

  // return result.user;
  return result;
}

export async function signOut() {
  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
}

export function getCurrentUser() {
  return auth.currentUser;
}
