/**
 * Firebase client initialization for Satya Power Technologys.
 *
 * NOTE on the API key:
 *   Firebase Web `apiKey` is a PUBLIC identifier (not a secret) — it is safe
 *   to ship in the client bundle. Access control is enforced by Firebase
 *   Security Rules and (optionally) API key restrictions in Google Cloud
 *   Console, not by keeping this string hidden.
 *
 *   We still read it from `import.meta.env.VITE_FIREBASE_API_KEY` so it can
 *   be swapped per environment. Add it to your `.env` file:
 *
 *     VITE_FIREBASE_API_KEY=AIza...your-key...
 *
 *   The backend `GOOGLE_API_KEY` secret you saved is for server-side use
 *   (e.g. Google APIs called from server functions) — it is not read here.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: "satyapowertechnologys-293df.firebaseapp.com",
  projectId: "satyapowertechnologys-293df",
  storageBucket: "satyapowertechnologys-293df.firebasestorage.app",
  messagingSenderId: "510357840168",
  appId: "1:510357840168:web:0a155cf7303a69017b701d",
  measurementId: "G-QTKJGLH2EL",
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

/**
 * Lazily initialize the Firebase app. Safe to call from SSR — the SDK is
 * only instantiated once and analytics is loaded browser-side only.
 */
export function getFirebaseApp(): FirebaseApp {
  if (_app) return _app;
  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Missing VITE_FIREBASE_API_KEY. Add it to your .env to enable Firebase.",
    );
  }
  _app = getApps()[0] ?? initializeApp(firebaseConfig);
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseApp());
  return _auth;
}

export function getDb(): Firestore {
  if (!_db) _db = getFirestore(getFirebaseApp());
  return _db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) _storage = getStorage(getFirebaseApp());
  return _storage;
}

/**
 * Browser-only analytics loader. Import and call from a `useEffect` in a
 * client component — never at module scope, since `getAnalytics` touches
 * `window` and will crash during SSR.
 *
 *   useEffect(() => { void initAnalytics(); }, []);
 */
export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (!(await isSupported())) return null;
  return getAnalytics(getFirebaseApp());
}

/**
 * Suggested Firestore collections (mirror src/lib/types.ts):
 *   - products, categories, services, projects, gallery, blog,
 *     inquiries, settings (single doc: `site`), users (uid-keyed)
 */
export const collections = {
  products: "products",
  categories: "categories",
  services: "services",
  projects: "projects",
  gallery: "gallery",
  blog: "blog",
  inquiries: "inquiries",
  settings: "settings",
  users: "users",
} as const;
