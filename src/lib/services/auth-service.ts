/**
 * Auth service — mock implementation designed for Firebase Authentication.
 *
 * Later swap with:
 *   import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
 */

import type { AdminUser } from "../types";

const STORAGE_KEY = "spt_admin_user";

// Demo credentials (replace with Firebase Auth in production)
const DEMO_EMAIL = "admin@satyapowertechnologys.in";
const DEMO_PASSWORD = "admin123";

export async function signIn(email: string, password: string): Promise<AdminUser> {
  await new Promise((r) => setTimeout(r, 400));
  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw new Error("Invalid email or password");
  }
  const user: AdminUser = {
    uid: "demo-admin",
    email,
    displayName: "Admin",
    role: "admin",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  return user;
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getCurrentUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export const DEMO_CREDENTIALS = { email: DEMO_EMAIL, password: DEMO_PASSWORD };
