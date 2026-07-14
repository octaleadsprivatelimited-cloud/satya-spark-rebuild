/**
 * Data service layer.
 *
 * All UI components read/write through these async functions. Mock data
 * is mutated in-memory so admin CRUD works without a backend.
 */

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

const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));
const uid = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ---------- Products ----------
export async function listProducts(): Promise<Product[]> {
  await delay();
  return [...mockProducts];
}
export async function getProduct(slug: string): Promise<Product | null> {
  await delay();
  return mockProducts.find((p) => p.slug === slug) ?? null;
}
export async function getFeaturedProducts(): Promise<Product[]> {
  await delay();
  return mockProducts.filter((p) => p.featured);
}
export async function createProduct(data: Partial<Product>): Promise<Product> {
  await delay();
  const cat = mockCategories.find((c) => c.id === data.categoryId);
  const item: Product = {
    id: uid(),
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
    featured: data.featured || false,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  mockProducts.unshift(item);
  return item;
}
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  await delay();
  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const cat = data.categoryId ? mockCategories.find((c) => c.id === data.categoryId) : undefined;
  mockProducts[idx] = {
    ...mockProducts[idx],
    ...data,
    ...(cat ? { categoryName: cat.name } : {}),
  };
  return mockProducts[idx];
}
export async function deleteProduct(id: string): Promise<void> {
  await delay();
  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx !== -1) mockProducts.splice(idx, 1);
}

// ---------- Categories ----------
export async function listCategories(): Promise<Category[]> {
  await delay();
  return [...mockCategories];
}
export async function createCategory(data: Partial<Category>): Promise<Category> {
  await delay();
  const item: Category = {
    id: uid(),
    slug: data.slug || slugify(data.name || "category"),
    name: data.name || "Untitled",
    description: data.description,
    image: data.image,
  };
  mockCategories.unshift(item);
  return item;
}
export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  await delay();
  const idx = mockCategories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  mockCategories[idx] = { ...mockCategories[idx], ...data };
  return mockCategories[idx];
}
export async function deleteCategory(id: string): Promise<void> {
  await delay();
  const idx = mockCategories.findIndex((c) => c.id === id);
  if (idx !== -1) mockCategories.splice(idx, 1);
}

// ---------- Services ----------
export async function listServices(): Promise<Service[]> {
  await delay();
  return [...mockServices];
}
export async function getService(slug: string): Promise<Service | null> {
  await delay();
  return mockServices.find((s) => s.slug === slug) ?? null;
}
export async function createService(data: Partial<Service>): Promise<Service> {
  await delay();
  const item: Service = {
    id: uid(),
    slug: data.slug || slugify(data.title || "service"),
    title: data.title || "Untitled",
    summary: data.summary || "",
    description: data.description || "",
    icon: data.icon || "Wrench",
    image: data.image,
  };
  mockServices.unshift(item);
  return item;
}
export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  await delay();
  const idx = mockServices.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  mockServices[idx] = { ...mockServices[idx], ...data };
  return mockServices[idx];
}
export async function deleteService(id: string): Promise<void> {
  await delay();
  const idx = mockServices.findIndex((s) => s.id === id);
  if (idx !== -1) mockServices.splice(idx, 1);
}

// ---------- Projects ----------
export async function listProjects(): Promise<Project[]> {
  await delay();
  return [...mockProjects];
}
export async function getProject(slug: string): Promise<Project | null> {
  await delay();
  return mockProjects.find((p) => p.slug === slug) ?? null;
}
export async function createProject(data: Partial<Project>): Promise<Project> {
  await delay();
  const item: Project = {
    id: uid(),
    slug: data.slug || slugify(data.title || "project"),
    title: data.title || "Untitled",
    client: data.client || "",
    location: data.location || "",
    year: data.year || new Date().getFullYear(),
    summary: data.summary || "",
    image: data.image || "/ref/hyderabad-CC_eXlg0.jpg",
    category: data.category || "General",
  };
  mockProjects.unshift(item);
  return item;
}
export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  await delay();
  const idx = mockProjects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  mockProjects[idx] = { ...mockProjects[idx], ...data };
  return mockProjects[idx];
}
export async function deleteProject(id: string): Promise<void> {
  await delay();
  const idx = mockProjects.findIndex((p) => p.id === id);
  if (idx !== -1) mockProjects.splice(idx, 1);
}

// ---------- Gallery ----------
export async function listGallery(): Promise<GalleryItem[]> {
  await delay();
  return [...mockGallery];
}
export async function createGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
  await delay();
  const item: GalleryItem = {
    id: uid(),
    title: data.title || "Untitled",
    image: data.image || "/ref/team-CMydRHty.jpg",
    category: data.category || "General",
  };
  mockGallery.unshift(item);
  return item;
}
export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem | null> {
  await delay();
  const idx = mockGallery.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  mockGallery[idx] = { ...mockGallery[idx], ...data };
  return mockGallery[idx];
}
export async function deleteGalleryItem(id: string): Promise<void> {
  await delay();
  const idx = mockGallery.findIndex((g) => g.id === id);
  if (idx !== -1) mockGallery.splice(idx, 1);
}

// ---------- Inquiries ----------
export async function listInquiries(): Promise<Inquiry[]> {
  await delay();
  return [...mockInquiries];
}
export async function submitInquiry(
  data: Omit<Inquiry, "id" | "status" | "createdAt">,
): Promise<Inquiry> {
  await delay();
  const item: Inquiry = {
    id: uid(),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  mockInquiries.unshift(item);
  return item;
}
export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<void> {
  await delay();
  const idx = mockInquiries.findIndex((i) => i.id === id);
  if (idx !== -1) mockInquiries[idx] = { ...mockInquiries[idx], status };
}
export async function deleteInquiry(id: string): Promise<void> {
  await delay();
  const idx = mockInquiries.findIndex((i) => i.id === id);
  if (idx !== -1) mockInquiries.splice(idx, 1);
}

// ---------- Site settings ----------
export async function getSiteSettings(): Promise<SiteSettings> {
  await delay();
  return mockSettings;
}
export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  await delay();
  Object.assign(mockSettings, data);
  return mockSettings;
}
