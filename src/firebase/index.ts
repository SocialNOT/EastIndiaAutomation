'use client';
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

let firebaseServices: FirebaseServices | null = null;

export function initializeFirebase(): FirebaseServices {
  if (firebaseServices) {
    return firebaseServices;
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  firebaseServices = { app, auth, firestore };
  return firebaseServices;
}
