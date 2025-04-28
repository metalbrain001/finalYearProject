// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import config from "./lib/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.env.firebase.apiKey,
  authDomain: config.env.firebase.authDomain,
  projectId: config.env.firebase.projectId,
  storageBucket: config.env.firebase.storageBucket,
  messagingSenderId: config.env.firebase.messagingSenderId,
  appId: config.env.firebase.appId,
  measurementId: config.env.firebase.measurementId,
};

// 🔥 Initialize once
export const firebaseApp: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const getClientMessaging = async () => {
  if (typeof window === "undefined") return null;

  const supported = await isSupported();
  if (!supported) return null;

  return getMessaging(firebaseApp);
};

