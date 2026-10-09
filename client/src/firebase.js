import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  // EMULATOR: added for local Firebase Auth testing
  connectAuthEmulator,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// =====================================================
// EMULATOR: Firebase Authentication Emulator
// Localhost → http://127.0.0.1:9099
//
// TO REVERT:
// Remove the following if block.
// =====================================================
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}
// =====================================================

export const googleAuthProvider = new GoogleAuthProvider();
