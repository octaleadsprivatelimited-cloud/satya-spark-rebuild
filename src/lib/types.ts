// Domain types — used across services & UI. Designed for Firestore mapping.

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  featured?: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string; // lucide icon name
  image?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  year: number;
  summary: string;
  image: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  videoUrl?: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "resolved";
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  social: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "editor";
}
