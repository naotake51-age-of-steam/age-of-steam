import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(
          JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
        ),
      })
    : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);
