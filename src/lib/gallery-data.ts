// Gallery data — Firestore-only (images stored as base64 data URLs in Firestore).
import { useEffect, useState, useCallback } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirebase } from "./firebase";
import { isFirebaseConfigured } from "./admin-data";
import { compressImage } from "./image-compress";

export interface GalleryItem {
  id: string;
  title: string;
  category?: string;
  image: string; // base64 data URL stored in Firestore
  createdAt?: unknown;
}

const LOCAL_KEY = "admin-gallery";

function readLocal(): GalleryItem[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(list: GalleryItem[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
    window.dispatchEvent(new StorageEvent("storage", { key: LOCAL_KEY }));
  }
}

export const GALLERY_CATEGORIES = [
  "Service Center",
  "Field Installation",
  "Products",
  "Training",
  "Team",
  "Events",
] as const;

export function useGallery() {
  const [remote, setRemote] = useState<GalleryItem[]>([]);
  const [local, setLocal] = useState<GalleryItem[]>(() => readLocal());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setLocal(readLocal());
    sync();
    if (typeof window !== "undefined") window.addEventListener("storage", sync);

    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      setLoading(true);
      try {
        const q = query(collection(fb.db, "gallery"), orderBy("createdAt", "desc"));
        unsub = onSnapshot(
          q,
          (snap) => {
            const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as GalleryItem[];
            setRemote(list);
            if (list.length) writeLocal(list);
            setLoading(false);
          },
          (e) => {
            console.warn("Gallery read failed:", e);
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

  const remoteKeys = new Set(remote.map((i) => `${i.title}|${i.image}`));
  const items: GalleryItem[] = [
    ...remote,
    ...local.filter((i) => !remoteKeys.has(`${i.title}|${i.image}`)),
  ];

  const add = useCallback(async (data: { title: string; category?: string; file: File }) => {
    // Compress aggressively — Firestore document limit is ~1MB.
    let compressed = await compressImage(data.file, { maxSize: 1280, quality: 0.75 });
    if (compressed.length > 900_000) {
      compressed = await compressImage(data.file, { maxSize: 1024, quality: 0.65 });
    }
    if (compressed.length > 900_000) {
      compressed = await compressImage(data.file, { maxSize: 800, quality: 0.6 });
    }

    const item: GalleryItem = {
      id: `local-${Date.now()}`,
      title: data.title,
      category: data.category,
      image: compressed,
      createdAt: Date.now(),
    };
    writeLocal([item, ...readLocal()]);

    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      return;
    }
    try {
      await addDoc(collection(fb.db, "gallery"), {
        title: data.title,
        category: data.category ?? "",
        image: compressed,
        createdAt: serverTimestamp(),
      });
    } catch (e: unknown) {
      console.warn("Gallery save failed, saving locally:", e);
      // Re-throw so the UI can show a toast (e.g. Firestore permission denied).
      throw new Error(
        e instanceof Error && "code" in e && e.code === "permission-denied"
          ? "Permission denied by Firestore rules. The photo was saved only on this device. Verify your admin UID exists in the /admins collection and that the gallery rules allow admin writes."
          : (e instanceof Error ? e.message : undefined) ||
              "Failed to save gallery item to Firestore. Saved locally only.",
      );
    }
  }, []);

  const update = useCallback(async (id: string, patch: Partial<GalleryItem>) => {
    if (id.startsWith("local-")) {
      const next = readLocal().map((i) => (i.id === id ? { ...i, ...patch } : i));
      writeLocal(next);
      return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      await updateDoc(doc(fb.db, "gallery", id), { ...patch });
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    if (id.startsWith("local-")) {
      writeLocal(readLocal().filter((i) => i.id !== id));
      return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      await deleteDoc(doc(fb.db, "gallery", id));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return { items, loading, add, update, remove };
}
