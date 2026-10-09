import dotenv from 'dotenv';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

dotenv.config();

async function initializeFirebase() {
  if (getApps().length) {
    return getAuth();
  }

  let serviceAccount;

  if (process.env.NODE_ENV === 'production') {
    // Production: Build the service account from environment variables.
    const requiredVariables = [
      'FIREBASE_PROJECT_ID',
      'FIREBASE_PRIVATE_KEY',
      'FIREBASE_CLIENT_EMAIL',
    ];

    for (const variable of requiredVariables) {
      if (!process.env[variable]) {
        throw new Error(`${variable} is missing from environment variables`);
      }
    }

    serviceAccount = {
      type: process.env.FIREBASE_TYPE || 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri:
        process.env.FIREBASE_AUTH_URI ||
        'https://accounts.google.com/o/oauth2/auth',
      token_uri:
        process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || 'googleapis.com',
    };
  } else {
    // Development: Load your local service-account JSON file.
    const { default: localServiceAccount } = await import(
      '../config/fbServiceAccountKey.json',
      { with: { type: 'json' } }
    );

    serviceAccount = localServiceAccount;
  }

  initializeApp({
    credential: cert(serviceAccount),
  });

  return getAuth();
}

export const auth = await initializeFirebase();
