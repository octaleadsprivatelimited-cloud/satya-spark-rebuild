import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  inMemoryPersistence,
  type Auth,
} from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXdC1bcD66N9PkpJHG3YOQm0udfUg5SiY",
  authDomain: "satyapowertechnologys-293df.firebaseapp.com",
  projectId: "satyapowertechnologys-293df",
  storageBucket: "satyapowertechnologys-293df.firebasestorage.app",
  messagingSenderId: "510357840168",
  appId: "1:510357840168:web:0a155cf7303a69017b701d",
  measurementId: "G-QTKJGLH2EL",
};

let app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;
let _storage: FirebaseStorage | null = null;
let _analytics: Analytics | null = null;

function isStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined" || !window.document) return false;
    // Check cookie write permission
    document.cookie = "spt_test=1; SameSite=Lax";
    const cookiesOk = document.cookie.indexOf("spt_test=") !== -1;
    document.cookie = "spt_test=1; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

    // Check localStorage permission
    localStorage.setItem("spt_test", "1");
    localStorage.removeItem("spt_test");

    return cookiesOk;
  } catch {
    return false;
  }
}

export function getFirebase() {
  if (typeof window === "undefined") return null;
  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
      _db = getFirestore(app);

      // Initialize Auth based on storage availability
      if (isStorageAvailable()) {
        try {
          _auth = getAuth(app);
        } catch (e) {
          console.warn("Failed standard getAuth, fallback to initializeAuth:", e);
          _auth = initializeAuth(app, { persistence: browserLocalPersistence });
        }
      } else {
        console.warn(
          "Storage/cookies blocked (sandboxed). Initializing Auth with inMemoryPersistence.",
        );
        _auth = initializeAuth(app, { persistence: inMemoryPersistence });
      }

      _storage = getStorage(app);

      // Initialize Analytics if supported
      if (import.meta.env.PROD)
        isSupported()
          .then((supported) => {
            if (supported && app) {
              _analytics = getAnalytics(app);
            }
          })
          .catch((e) => {
            console.warn("Analytics is not supported in this environment:", e);
          });
    } catch (e) {
      console.warn("Firebase init failed:", e);
      // Clean up partial initializations to avoid half-broken state
      app = null;
      _db = null;
      _auth = null;
      _storage = null;
      _analytics = null;
    }
  }
  return app ? { app, db: _db!, auth: _auth!, storage: _storage!, analytics: _analytics } : null;
}
