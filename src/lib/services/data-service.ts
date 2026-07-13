/**
 * Data service layer.
 *
 * All UI components read/write through these async functions. Swap the
 * implementation to Firebase Firestore later without touching UI code:
 *
 *   import { collection, getDocs } from "firebase/firestore";
 *   export async function listProducts() {
 *     const snap = await getDocs(collection(db, "products"));
 *     return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
 *   }
 */

import {
  blogPosts as mockBlog,
  categories as mockCategories,
  gallery as mockGallery,
  inquiries as mockInquiries,
  products as mockProducts,
  projects as mockProjects,
  services as mockServices,
  siteSettings as mockSettings,
} from "../mock-data";
import type {
  BlogPost,
  Category,
  GalleryItem,
  Inquiry,
  Product,
  Project,
  Service,
  SiteSettings,
} from "../types";

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

// ---------- Products ----------
export async function listProducts(): Promise<Product[]> {
  await delay();
  return mockProducts;
}
export async function getProduct(slug: string): Promise<Product | null> {
  await delay();
  return mockProducts.find((p) => p.slug === slug) ?? null;
}
export async function getFeaturedProducts(): Promise<Product[]> {
  await delay();
  return mockProducts.filter((p) => p.featured);
}

// ---------- Categories ----------
export async function listCategories(): Promise<Category[]> {
  await delay();
  return mockCategories;
}

// ---------- Services ----------
export async function listServices(): Promise<Service[]> {
  await delay();
  return mockServices;
}
export async function getService(slug: string): Promise<Service | null> {
  await delay();
  return mockServices.find((s) => s.slug === slug) ?? null;
}

// ---------- Projects ----------
export async function listProjects(): Promise<Project[]> {
  await delay();
  return mockProjects;
}
export async function getProject(slug: string): Promise<Project | null> {
  await delay();
  return mockProjects.find((p) => p.slug === slug) ?? null;
}

// ---------- Gallery ----------
export async function listGallery(): Promise<GalleryItem[]> {
  await delay();
  return mockGallery;
}

// ---------- Blog ----------
export async function listBlog(): Promise<BlogPost[]> {
  await delay();
  return mockBlog;
}
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await delay();
  return mockBlog.find((b) => b.slug === slug) ?? null;
}

// ---------- Inquiries ----------
export async function listInquiries(): Promise<Inquiry[]> {
  await delay();
  return mockInquiries;
}
export async function submitInquiry(
  data: Omit<Inquiry, "id" | "status" | "createdAt">,
): Promise<Inquiry> {
  await delay();
  // In Firestore: addDoc(collection(db, "inquiries"), { ...data, status: "new", createdAt: serverTimestamp() })
  return {
    id: crypto.randomUUID(),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
}

// ---------- Site settings ----------
export async function getSiteSettings(): Promise<SiteSettings> {
  await delay();
  return mockSettings;
}
