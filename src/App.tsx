import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ProductsPage from "@/pages/Products";
import ProductDetailPage from "@/pages/ProductDetail";
import ServicesPage from "@/pages/Services";
import ProjectsPage from "@/pages/Projects";
import GalleryPage from "@/pages/Gallery";
import BlogPage from "@/pages/Blog";
import ContactPage from "@/pages/Contact";
import NotFoundPage from "@/pages/NotFound";

import AdminLogin from "@/pages/admin/Login";
import AdminGuard from "@/pages/admin/AdminGuard";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import AdminCategories from "@/pages/admin/Categories";
import AdminServices from "@/pages/admin/Services";
import AdminProjects from "@/pages/admin/Projects";
import AdminGallery from "@/pages/admin/Gallery";
import AdminBlog from "@/pages/admin/Blog";
import AdminInquiries from "@/pages/admin/Inquiries";
import AdminSettings from "@/pages/admin/Settings";
import AdminProfile from "@/pages/admin/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminGuard />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
