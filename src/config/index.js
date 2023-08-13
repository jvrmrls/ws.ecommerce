import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const COMPANY_ID = process.env.COMPANY_ID;
export const PORT = process.env.PORT;
export const PREFIX = process.env.PREFIX;
export const MONGO_URI = process.env.MONGO_URI;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID;
export const FIREBASE_PRIVATE_KEY =
  process.env.FIREBASE_PRIVATE_KEY &&
  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
export const FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID;
export const FIREBASE_AUTH_URI = process.env.FIREBASE_AUTH_URI;
export const FIREBASE_TOKEN_URI = process.env.FIREBASE_TOKEN_URI;
export const FIREBASE_AUTH_CERT_URL = process.env.FIREBASE_AUTH_CERT_URL;
export const FIREBASE_CLIENT_CERT_URL = process.env.FIREBASE_CLIENT_CERT_URL;
