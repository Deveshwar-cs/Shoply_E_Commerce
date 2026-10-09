import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  if (process.env.NODE_ENV === 'production') {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountJson) {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT is missing from environment variables',
      );
    }

    initializeApp({
      credential: cert(JSON.parse(serviceAccountJson)),
    });
  } else {
    const { default: serviceAccount } = await import(
      '../config/fbServiceAccountKey.json',
      { with: { type: 'json' } }
    );

    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

export const auth = getAuth();
