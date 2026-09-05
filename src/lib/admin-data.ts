// Firebase-backed data hooks for the admin panel.
// Falls back to in-memory state when Firebase config is still the placeholder,
// so the UI is fully usable for design/testing before real keys are added.
import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { getFirebase } from "./firebase";
import { PRODUCTS as SEED_PRODUCTS, type Product } from "./products";

import { toast } from "sonner";
import { useCatalog, refreshCatalog } from "./product-catalog";
import { prepareProductUpdate } from "./product-update";

export function isFirebaseConfigured() {
  const fb = getFirebase();
  if (!fb) return false;
  const key = (fb.app.options as { apiKey?: string }).apiKey ?? "";
  return !!key && !key.startsWith("REPLACE");
}

/* ------------- Auth ------------- */
export const DEMO_CREDENTIALS = {
  email: "admin@satyapowertechnologys.in",
  password: "satya@2013",
};
const DEMO_SESSION_KEY = "spt_demo_admin";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      // demo mode: restore session from localStorage
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem(DEMO_SESSION_KEY);
        if (saved) setUser({ email: saved } as User);
      }
      setLoading(false);
      return;
    }
    return onAuthStateChanged(fb.auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      // Demo mode authentication
      if (
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        if (typeof window !== "undefined") window.localStorage.setItem(DEMO_SESSION_KEY, email);
        setUser({ email } as User);
        return;
      }
      throw new Error("Invalid demo credentials. Use the credentials shown below.");
    }
    await signInWithEmailAndPassword(fb.auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    const fb = getFirebase();
    if (fb && isFirebaseConfigured()) {
      await signOut(fb.auth);
      return;
    }
    if (typeof window !== "undefined") window.localStorage.removeItem(DEMO_SESSION_KEY);
    setUser(null);
  }, []);

  return { user, loading, login, logout };
}

/* ------------- Products ------------- */
function resolveLegacyImage(imagePath: string): string {
  if (!imagePath) return "";
  const match = imagePath.match(/(product-[a-z]+)/i);
  if (match) {
    const filename = match[1];
    const seed = SEED_PRODUCTS.find((s) => s.image && s.image.includes(filename));
    if (seed) return seed.image;
  }
  return SEED_PRODUCTS[0]?.image || "";
}

export function normalizeProduct(id: string, raw: Omit<Product, "id">): Product {
  const data = { ...raw };

  // Only fall back to seed images for truly legacy paths (old /src/assets/ references).
  // If Firestore has a valid image (data: URL, https:, etc.), trust it completely.
  const isLegacyPath =
    data.image &&
    (data.image.startsWith("/src/assets/") ||
      data.image.startsWith("/assets/") ||
      (!/^(https?:|data:)/.test(data.image) && data.image.includes("product-")));

  if (!data.image || isLegacyPath) {
    const seed = SEED_PRODUCTS.find((s) => s.id === id);
    if (seed) {
      data.image = seed.image;
    } else if (data.image) {
      data.image = resolveLegacyImage(data.image);
    }
  }

  // Keep the gallery available to product details and the admin editor.
  data.images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];

  return { ...data, id };
}

export function useProducts() {
  const { products, loading, error } = useCatalog();

  const save = async (p: Product) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured())
      throw new Error("Database unavailable. Product was not saved.");

    // Clean undefined fields so Firestore doesn't throw "Unsupported field value: undefined"
    const cleaned = prepareProductUpdate(p);
    if (new Blob([JSON.stringify(cleaned)]).size > 900 * 1024) {
      toast.error(
        "Product images and brochure are too large. Use smaller images or a hosted brochure link.",
      );
      throw new Error("Product exceeds the safe database size limit.");
    }

    try {
      if (cleaned.id && (await getDoc(doc(fb.db, "products", cleaned.id))).exists()) {
        const { id, ...rest } = cleaned;
        await updateDoc(doc(fb.db, "products", id), rest);
      } else if (cleaned.id) {
        const { id, ...rest } = cleaned;
        await setDoc(doc(fb.db, "products", id), rest);
      } else {
        await addDoc(collection(fb.db, "products"), cleaned);
      }
      await refreshCatalog(true);
      toast.success("Product saved successfully!");
    } catch (e: unknown) {
      console.warn("Firestore save failed:", e);
      toast.error(
        (e instanceof Error ? e.message : undefined) || "Failed to save product in database!",
      );
      throw e;
    }
  };

  const remove = async (id: string) => {
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) {
      toast.error("Database unavailable. Product was not deleted.");
      return;
    }
    try {
      await deleteDoc(doc(fb.db, "products", id));
      await refreshCatalog(true);
    } catch (e) {
      console.warn("Firestore delete failed:", e);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Compress aggressively so it fits under Firestore's 1MB document limit.
    const { compressImage } = await import("./image-compress");
    const compressed = await compressImage(file, {
      maxSize: 1000,
      quality: 0.75,
      mimeType: "image/webp",
      maxBytes: 80 * 1024,
      strict: true,
    });
    return compressed;
  };

  return { products, loading, error, save, remove, uploadImage };
}

/* ------------- Inquiries ------------- */
export interface Inquiry {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
  status?: "new" | "read" | "resolved";
  createdAt?: unknown;
}

const INQUIRY_LOCAL_KEY = "admin-inquiries";

function readLocalInquiries(): Inquiry[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(INQUIRY_LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return [];
  }
}
function writeLocalInquiries(list: Inquiry[]) {
  if (typeof localStorage !== "undefined")
    localStorage.setItem(INQUIRY_LOCAL_KEY, JSON.stringify(list));
}

export async function submitInquiry(data: Omit<Inquiry, "id" | "status" | "createdAt">) {
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) {
    throw new Error("Unable to send your inquiry. Please contact us by phone or WhatsApp.");
  }
  // Only report delivery after the shared database acknowledges the write.
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      addDoc(collection(fb.db, "inquiries"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      }),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () =>
            reject(
              new Error("Inquiry delivery could not be confirmed. Please contact us directly."),
            ),
          12000,
        );
      }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

export function useInquiries() {
  const [remote, setRemote] = useState<Inquiry[]>([]);
  const [local, setLocal] = useState<Inquiry[]>(() => readLocalInquiries());

  useEffect(() => {
    const sync = () => setLocal(readLocalInquiries());
    sync();
    if (typeof window !== "undefined") {
      window.addEventListener("storage", sync);
    }
    const fb = getFirebase();
    let unsub: (() => void) | undefined;
    if (fb && isFirebaseConfigured()) {
      try {
        const q = query(collection(fb.db, "inquiries"), orderBy("createdAt", "desc"));
        unsub = onSnapshot(
          q,
          (snap) => setRemote(snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Inquiry)),
          (e) => console.warn("Firestore inquiry read failed:", e),
        );
      } catch (e) {
        console.warn(e);
      }
    }
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("storage", sync);
      unsub?.();
    };
  }, []);

  const inquiries = [...local, ...remote];

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    if (id.startsWith("local-")) {
      const next = readLocalInquiries().map((i) => (i.id === id ? { ...i, status } : i));
      writeLocalInquiries(next);
      setLocal(next);
      return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      await updateDoc(doc(fb.db, "inquiries", id), { status });
    } catch (e) {
      console.warn(e);
    }
  };
  const remove = async (id: string) => {
    if (id.startsWith("local-")) {
      const next = readLocalInquiries().filter((i) => i.id !== id);
      writeLocalInquiries(next);
      setLocal(next);
      return;
    }
    const fb = getFirebase();
    if (!fb || !isFirebaseConfigured()) return;
    try {
      await deleteDoc(doc(fb.db, "inquiries", id));
    } catch (e) {
      console.warn(e);
    }
  };
  return { inquiries, updateStatus, remove };
}

/* ------------- Settings ------------- */
export interface AdminSettings {
  watermarkEnabled: boolean;
}
export async function getSettings(): Promise<AdminSettings> {
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem("admin-settings") : null;
    return raw ? JSON.parse(raw) : { watermarkEnabled: true };
  }
  const snap = await getDoc(doc(fb.db, "settings", "global"));
  return (snap.exists() ? snap.data() : { watermarkEnabled: true }) as AdminSettings;
}
export async function saveSettings(s: AdminSettings) {
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) {
    localStorage.setItem("admin-settings", JSON.stringify(s));
    return;
  }
  await setDoc(doc(fb.db, "settings", "global"), s);
}

import logoUrl from "../assets/satya-logo-v1.png";

/* ------------- Company Information ------------- */
export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneAlt: string;
  email: string;
  address: string;
  gstin: string;
  founded: string;
  ceo: string;
  website: string;
  logo: string;
}

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: "SATYA POWER TECHNOLOGYS",
  tagline: "Service first, Sales next",
  phone: "+91 95428 40444",
  phoneAlt: "+91 86881 51526",
  email: "satyapowertechnologys@gmail.com",
  address: "2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437",
  gstin: "37BILPL7684K1ZD",
  founded: "2013",
  ceo: "Mr. V Dorababu",
  website: "www.satyapowertechnologys.in",
  logo: logoUrl,
};

function normalizeCompanyInfo(data: Record<string, unknown>): CompanyInfo {
  const result = { ...DEFAULT_COMPANY_INFO };
  for (const key of Object.keys(result) as (keyof CompanyInfo)[]) {
    if (typeof data[key] === "string") result[key] = data[key];
  }
  result.logo ||= logoUrl;
  return result;
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  let fallback = { ...DEFAULT_COMPANY_INFO };
  try {
    const raw = localStorage.getItem("admin-company-info");
    if (raw) fallback = normalizeCompanyInfo(JSON.parse(raw));
  } catch {
    /* Invalid or unavailable browser storage must not break rendering. */
  }
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) return fallback;
  try {
    const snap = await getDoc(doc(fb.db, "settings", "company"));
    if (!snap.exists()) return fallback;
    const data = normalizeCompanyInfo(snap.data());
    try {
      localStorage.setItem("admin-company-info", JSON.stringify(data));
    } catch {
      /* optional cache */
    }
    return data;
  } catch (error) {
    console.warn("Failed to fetch company info from Firestore:", error);
    return fallback;
  }
}

export async function saveCompanyInfo(c: CompanyInfo) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("admin-company-info", JSON.stringify(c));
  }
  const fb = getFirebase();
  if (!fb || !isFirebaseConfigured()) return;
  await setDoc(doc(fb.db, "settings", "company"), c);
}
