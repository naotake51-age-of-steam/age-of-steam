// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export let analytics: Analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
auth.languageCode = "ja";

export const db = getFirestore(app);

export const realtimeDb = getDatabase(app);

if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === "true") {
  connectAuthEmulator(
    auth,
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST!
  );
  connectFirestoreEmulator(
    db,
    process.env.NEXT_PUBLIC_FIREBASE_STORE_EMULATOR_HOST!,
    parseInt(process.env.NEXT_PUBLIC_FIREBASE_STORE_EMULATOR_PORT!)
  );
  connectDatabaseEmulator(
    realtimeDb,
    process.env.NEXT_PUBLIC_FIREBASE_REALTIME_EMULATOR_HOST!,
    parseInt(process.env.NEXT_PUBLIC_FIREBASE_REALTIME_EMULATOR_PORT!)
  );
}
