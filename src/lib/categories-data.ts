import { useEffect, useState, useCallback } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getFirebase } from "./firebase";
import { isFirebaseConfigured } from "./admin-data";
import { CATEGORIES as SEED_CATEGORIES } from "./products";

export interface CategoryItem {
  id: string;
  name: string;
  order?: number;
  createdAt?: unknown;
}

const KEY = "admin-categories-v2";

function readLocal(): CategoryItem[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* Optional cache is unavailable. */
    }
  }
  return SEED_CATEGORIES.map((c, i) => ({
    id: `seed-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: c,
    order: i,
  }));
}

function writeLocal(list: CategoryItem[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
  }
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>(() => readLocal());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setCategories(readLocal());
    if (typeof window !== "undefined") window.addEventListener("storage", sync);

    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      setLoading(true);

      try {
        const q = query(collection(fb.db, "categories"), orderBy("order", "asc"));
        unsub = onSnapshot(
          q,
          (snap) => {
            const list = snap.docs.map((d, i) => ({
              id: d.id,
              order: i,
              ...d.data(),
            })) as CategoryItem[];
            setCategories(list);
            writeLocal(list);
            setLoading(false);
          },
          (e) => {
            console.warn("Categories read failed, using local:", e);
            setCategories(readLocal());
            setLoading(false);
          },
        );
      } catch (e) {
        console.warn(e);
        setLoading(false);
      }
    }
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      unsub?.();
    };
  }, []);

  const add = useCallback(async (name: string) => {
    const id = `local-${Date.now()}`;
    const next = [...readLocal(), { id, name, order: Date.now() }];
    writeLocal(next);
    setCategories(next);

    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      const docId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      await setDoc(doc(fb.db, "categories", docId), {
        name,
        order: Date.now(),
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Category save failed:", e);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    const next = readLocal().filter((c) => c.id !== id);
    writeLocal(next);
    setCategories(next);

    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      await deleteDoc(doc(fb.db, "categories", id));
    } catch (e) {
      console.warn("Category delete failed:", e);
    }
  }, []);

  return { categories, loading, add, remove };
}
