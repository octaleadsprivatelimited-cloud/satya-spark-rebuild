/**
 * Firebase integration stub — designed for later wiring.
 *
 * When ready to enable Firebase:
 *  1. `bun add firebase`
 *  2. Fill in the config below from Firebase console.
 *  3. Uncomment the block that initializes app, auth, and db.
 *  4. Replace calls in src/lib/services/*.ts with Firestore/Auth SDK calls.
 */

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

/**
 * Suggested Firestore collections (mirror src/lib/types.ts):
 *   - products      → Product
 *   - categories    → Category
 *   - services      → Service
 *   - projects      → Project
 *   - gallery       → GalleryItem
 *   - blog          → BlogPost
 *   - inquiries     → Inquiry
 *   - settings/site → SiteSettings (single doc)
 *   - users         → AdminUser (uid-keyed)
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
