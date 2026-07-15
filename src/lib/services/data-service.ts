/**
 * Data service — Firestore-backed.
 *
 * All UI reads/writes go through these async functions. Documents are stored
 * one-per-item under a collection matching the entity name. Site settings
 * live in a single document at `settings/site`.
 *
 * Images are stored as Base64 strings on the document itself (compressed
 * client-side to stay under Firestore's 1 MiB per-doc limit).
 */

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "../firebase";
import {
  categories as mockCategories,
  gallery as mockGallery,
  inquiries as mockInquiries,
  products as mockProducts,
  projects as mockProjects,
  services as mockServices,
  siteBrands as mockBrands,
  siteSettings as mockSettings,
  MAIN_BRAND_NAMES,
} from "../mock-data";
import type {
  Brand,
  Category,
  GalleryItem,
  Inquiry,
  Product,
  Project,
  Service,
  SiteSettings,
} from "../types";

const uid = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const COL = {
  products: "products",
  categories: "categories",
  services: "services",
  projects: "projects",
  gallery: "gallery",
  inquiries: "inquiries",
  brands: "brands",
  settings: "settings",
} as const;

function db() {
  return getDb();
}

async function listAll<T>(name: string): Promise<T[]> {
  const snap = await getDocs(collection(db(), name));
  return snap.docs.map((d) => ({ ...(d.data() as T), id: d.id } as T));
}

// ---------- Products ----------
export async function listProducts(): Promise<Product[]> {
  const items = await listAll<Product>(COL.products);
  return items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}
export async function getProduct(slug: string): Promise<Product | null> {
  const q = query(collection(db(), COL.products), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  const d = snap.docs[0];
  return d ? ({ ...(d.data() as Product), id: d.id }) : null;
}
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await listProducts();
  return all.filter((p) => p.featured);
}
export async function createProduct(data: Partial<Product>): Promise<Product> {
  const cats = await listCategories();
  const cat = cats.find((c) => c.id === data.categoryId);
  const id = uid();
  const item: Product = {
    id,
    slug: data.slug || slugify(data.name || "product"),
    name: data.name || "Untitled",
    brand: data.brand || "",
    categoryId: data.categoryId || cat?.id || "",
    categoryName: cat?.name || data.categoryName || "",
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    features: data.features || [],
    specs: data.specs || {},
    image: data.image || "/ref/product-splicer-CaWSWLtE.jpg",
    gallery: data.gallery || [],
    videoUrl: data.videoUrl || "",
    featured: !!data.featured,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  await setDoc(doc(db(), COL.products, id), item);
  return item;
}
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  let patch: Partial<Product> = { ...data };
  if (data.categoryId) {
    const cats = await listCategories();
    const cat = cats.find((c) => c.id === data.categoryId);
    if (cat) patch.categoryName = cat.name;
  }
  await updateDoc(doc(db(), COL.products, id), patch as Record<string, unknown>);
  const s = await getDoc(doc(db(), COL.products, id));
  return s.exists() ? ({ ...(s.data() as Product), id: s.id }) : null;
}
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.products, id));
}

// ---------- Categories ----------
export async function listCategories(): Promise<Category[]> {
  return listAll<Category>(COL.categories);
}
export async function createCategory(data: Partial<Category>): Promise<Category> {
  const id = uid();
  const item: Category = {
    id,
    slug: data.slug || slugify(data.name || "category"),
    name: data.name || "Untitled",
    description: data.description,
    image: data.image,
  };
  await setDoc(doc(db(), COL.categories, id), item);
  return item;
}
export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  await updateDoc(doc(db(), COL.categories, id), data as Record<string, unknown>);
  const s = await getDoc(doc(db(), COL.categories, id));
  return s.exists() ? ({ ...(s.data() as Category), id: s.id }) : null;
}
export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.categories, id));
}

// ---------- Services ----------
export async function listServices(): Promise<Service[]> {
  return listAll<Service>(COL.services);
}
export async function getService(slug: string): Promise<Service | null> {
  const all = await listServices();
  return all.find((s) => s.slug === slug) ?? null;
}
export async function createService(data: Partial<Service>): Promise<Service> {
  const id = uid();
  const item: Service = {
    id,
    slug: data.slug || slugify(data.title || "service"),
    title: data.title || "Untitled",
    summary: data.summary || "",
    description: data.description || "",
    icon: data.icon || "Wrench",
    image: data.image,
  };
  await setDoc(doc(db(), COL.services, id), item);
  return item;
}
export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  await updateDoc(doc(db(), COL.services, id), data as Record<string, unknown>);
  const s = await getDoc(doc(db(), COL.services, id));
  return s.exists() ? ({ ...(s.data() as Service), id: s.id }) : null;
}
export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.services, id));
}

// ---------- Projects ----------
export async function listProjects(): Promise<Project[]> {
  return listAll<Project>(COL.projects);
}
export async function getProject(slug: string): Promise<Project | null> {
  const all = await listProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
export async function createProject(data: Partial<Project>): Promise<Project> {
  const id = uid();
  const item: Project = {
    id,
    slug: data.slug || slugify(data.title || "project"),
    title: data.title || "Untitled",
    client: data.client || "",
    location: data.location || "",
    year: data.year || new Date().getFullYear(),
    summary: data.summary || "",
    image: data.image || "/ref/hyderabad-CC_eXlg0.jpg",
    category: data.category || "General",
  };
  await setDoc(doc(db(), COL.projects, id), item);
  return item;
}
export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  await updateDoc(doc(db(), COL.projects, id), data as Record<string, unknown>);
  const s = await getDoc(doc(db(), COL.projects, id));
  return s.exists() ? ({ ...(s.data() as Project), id: s.id }) : null;
}
export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.projects, id));
}

// ---------- Gallery ----------
export async function listGallery(): Promise<GalleryItem[]> {
  return listAll<GalleryItem>(COL.gallery);
}
export async function createGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
  const id = uid();
  const item: GalleryItem = {
    id,
    title: data.title || "Untitled",
    image: data.image || "/ref/team-CMydRHty.jpg",
    videoUrl: data.videoUrl,
    category: data.category || "General",
  };
  await setDoc(doc(db(), COL.gallery, id), item);
  return item;
}
export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem | null> {
  await updateDoc(doc(db(), COL.gallery, id), data as Record<string, unknown>);
  const s = await getDoc(doc(db(), COL.gallery, id));
  return s.exists() ? ({ ...(s.data() as GalleryItem), id: s.id }) : null;
}
export async function deleteGalleryItem(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.gallery, id));
}

// ---------- Inquiries ----------
export async function listInquiries(): Promise<Inquiry[]> {
  const items = await listAll<Inquiry>(COL.inquiries);
  return items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}
export async function submitInquiry(
  data: Omit<Inquiry, "id" | "status" | "createdAt">,
): Promise<Inquiry> {
  const id = uid();
  const item: Inquiry = {
    id,
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db(), COL.inquiries, id), item);
  return item;
}
export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<void> {
  await updateDoc(doc(db(), COL.inquiries, id), { status });
}
export async function deleteInquiry(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.inquiries, id));
}

// ---------- Site settings ----------
const SETTINGS_DOC = "site";
export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await getDoc(doc(db(), COL.settings, SETTINGS_DOC));
  if (s.exists()) return s.data() as SiteSettings;
  // Fallback to bundled defaults so public pages never render blank.
  return mockSettings;
}
export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const next = { ...current, ...data } as SiteSettings;
  await setDoc(doc(db(), COL.settings, SETTINGS_DOC), next);
  return next;
}

// ---------- Brands ----------
const isMainName = (n: string) =>
  (MAIN_BRAND_NAMES as readonly string[]).some((m) => m.toLowerCase() === n.trim().toLowerCase());

export async function listBrands(): Promise<Brand[]> {
  const items = await listAll<Brand>(COL.brands);
  return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
export async function createBrand(data: Partial<Brand>): Promise<Brand> {
  const id = uid();
  const name = (data.name || "Untitled").trim();
  const tier: Brand["tier"] = isMainName(name) ? (data.tier ?? "main") : "additional";
  const existing = await listBrands();
  const item: Brand = {
    id,
    name,
    logo: data.logo,
    note: data.note || "",
    tier,
    showOnHome: data.showOnHome ?? false,
    order: data.order ?? existing.length + 1,
  };
  await setDoc(doc(db(), COL.brands, id), item);
  return item;
}
export async function updateBrand(id: string, data: Partial<Brand>): Promise<Brand | null> {
  const s0 = await getDoc(doc(db(), COL.brands, id));
  if (!s0.exists()) return null;
  const next = { ...(s0.data() as Brand), ...data };
  if (!isMainName(next.name)) next.tier = "additional";
  await setDoc(doc(db(), COL.brands, id), next);
  return next;
}
export async function deleteBrand(id: string): Promise<void> {
  await deleteDoc(doc(db(), COL.brands, id));
}

// ---------- One-time seeding (admin only) ----------
/**
 * Populate empty Firestore collections from the bundled mock data. Safe to
 * call multiple times: only writes to collections that are currently empty.
 * Requires an authenticated admin user (writes are blocked by rules otherwise).
 */
export async function seedFirestoreFromMock(): Promise<{
  seeded: string[];
  skipped: string[];
}> {
  const seeded: string[] = [];
  const skipped: string[] = [];

  async function seedCollection<T extends { id: string }>(
    name: string,
    items: readonly T[],
  ) {
    const existing = await getDocs(collection(db(), name));
    if (!existing.empty) {
      skipped.push(name);
      return;
    }
    const batch = writeBatch(db());
    for (const it of items) {
      batch.set(doc(db(), name, it.id), it as unknown as Record<string, unknown>);
    }
    await batch.commit();
    seeded.push(name);
  }

  await seedCollection(COL.categories, mockCategories);
  await seedCollection(COL.products, mockProducts);
  await seedCollection(COL.services, mockServices);
  await seedCollection(COL.projects, mockProjects);
  await seedCollection(COL.gallery, mockGallery);
  await seedCollection(COL.inquiries, mockInquiries);
  await seedCollection(COL.brands, mockBrands);

  // Settings is a single doc — write only if absent.
  const s = await getDoc(doc(db(), COL.settings, SETTINGS_DOC));
  if (!s.exists()) {
    await setDoc(doc(db(), COL.settings, SETTINGS_DOC), mockSettings);
    seeded.push("settings");
  } else {
    skipped.push("settings");
  }

  return { seeded, skipped };
}
