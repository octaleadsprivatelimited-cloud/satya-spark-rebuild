/**
 * Auth service — Firebase Authentication.
 *
 * Uses email/password sign-in. Admin permissions are enforced by a
 * corresponding document in the `users/{uid}` collection with `role: "admin"`
 * (see Firestore rules). The client just needs a valid signed-in user.
 */

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getDb } from "../firebase";
import type { AdminUser } from "../types";

function toAdmin(u: User, role: AdminUser["role"] = "admin"): AdminUser {
  return {
    uid: u.uid,
    email: u.email ?? "",
    displayName: u.displayName || (u.email ? u.email.split("@")[0] : "Admin"),
    role,
  };
}

export async function signIn(email: string, password: string): Promise<AdminUser> {
  const cred = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  // Best-effort role lookup — falls back to "admin" so the UI keeps working
  // even before a users/{uid} doc has been created. Firestore rules are the
  // real access gate.
  let role: AdminUser["role"] = "admin";
  try {
    const s = await getDoc(doc(getDb(), "users", cred.user.uid));
    if (s.exists()) {
      const data = s.data() as { role?: AdminUser["role"] };
      if (data.role) role = data.role;
    } else {
      // Bootstrap: create a users doc for this uid so admins can be managed
      // via Firestore later.
      await setDoc(doc(getDb(), "users", cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email ?? "",
        displayName: cred.user.displayName ?? "",
        role: "admin",
      });
    }
  } catch {
    // Reading /users may fail before rules are set — ignore, keep default role.
  }
  return toAdmin(cred.user, role);
}

export async function signOut(): Promise<void> {
  await fbSignOut(getFirebaseAuth());
}

/** Synchronous snapshot — null until Firebase has restored the session. */
export function getCurrentUser(): AdminUser | null {
  const u = getFirebaseAuth().currentUser;
  return u ? toAdmin(u) : null;
}

/** Subscribe to auth state; returns unsubscribe. */
export function subscribeAuth(cb: (user: AdminUser | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), (u) => cb(u ? toAdmin(u) : null));
}

export const DEMO_CREDENTIALS = {
  email: "admin@satyapowertechnologys.in",
  password: "",
};
