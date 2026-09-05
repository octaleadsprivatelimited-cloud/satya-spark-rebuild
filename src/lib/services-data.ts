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
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getFirebase } from "./firebase";
import { isFirebaseConfigured } from "./admin-data";
import {
  Wrench,
  Gauge,
  ClipboardCheck,
  MapPin,
  Package,
  Headphones,
  Settings,
  Cpu,
  Zap,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { SERVICES as SEED } from "./services";

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  order?: number;
  createdAt?: unknown;
}

export const ICONS: Record<string, LucideIcon> = {
  Wrench,
  Gauge,
  ClipboardCheck,
  MapPin,
  Package,
  Headphones,
  Settings,
  Cpu,
  Zap,
  ShieldCheck,
  Truck,
};

export const ICON_NAMES = Object.keys(ICONS);

const KEY = "admin-services-v2";

const SEED_ITEMS: ServiceItem[] = SEED.map((s) => {
  const entry = Object.entries(ICONS).find(([, comp]) => comp === s.icon);
  return {
    id: s.id,
    iconName: entry?.[0] ?? "Wrench",
    title: s.title,
    description: s.description,
  };
});

export function loadServices(): ServiceItem[] {
  if (typeof localStorage === "undefined") return SEED_ITEMS;
  const raw = localStorage.getItem(KEY);
  if (!raw) return SEED_ITEMS;
  try {
    const parsed = JSON.parse(raw) as ServiceItem[];
    return Array.isArray(parsed) ? parsed : SEED_ITEMS;
  } catch {
    return SEED_ITEMS;
  }
}

function writeLocal(list: ServiceItem[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
  }
}

export function useServicesStore() {
  const [items, setItems] = useState<ServiceItem[]>(() => loadServices());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setItems(loadServices());
    if (typeof window !== "undefined") window.addEventListener("storage", sync);

    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      setLoading(true);

      try {
        const q = query(collection(fb.db, "services"), orderBy("order", "asc"));
        unsub = onSnapshot(
          q,
          (snap) => {
            const list = snap.docs.map((d, i) => ({
              id: d.id,
              order: i,
              ...d.data(),
            })) as ServiceItem[];
            setItems(list);
            writeLocal(list);
            setLoading(false);
          },
          (e) => {
            console.warn("Services read failed, using local:", e);
            setItems(loadServices());
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

  const upsert = useCallback(async (item: ServiceItem) => {
    const list = loadServices();
    const exists = list.some((x) => x.id === item.id);
    const id = item.id || `local-${Date.now()}`;
    const nextItem = { ...item, id };

    const next = exists ? list.map((x) => (x.id === item.id ? nextItem : x)) : [...list, nextItem];
    writeLocal(next);

    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;

    try {
      if (item.id && !item.id.startsWith("local-") && !item.id.startsWith("seed-")) {
        const { id: itemId, ...rest } = item;
        await setDoc(doc(fb.db, "services", itemId), rest);
      } else {
        const { id: _, ...rest } = item;
        await addDoc(collection(fb.db, "services"), {
          ...rest,
          order: Date.now(),
          createdAt: serverTimestamp(),
        });
      }
    } catch (e: unknown) {
      console.warn("Service save failed:", e);
      throw new Error(
        (e instanceof Error ? e.message : undefined) || "Failed to save service to Firestore.",
      );
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    writeLocal(loadServices().filter((x) => x.id !== id));
    if (!id || id.startsWith("local-") || id.startsWith("seed-")) return;

    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      await deleteDoc(doc(fb.db, "services", id));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return { items, loading, upsert, remove };
}
