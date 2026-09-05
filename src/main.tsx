import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";
import RootLayout, { NotFoundPage } from "./routes/__root";
const Home = lazy(() => import("./routes/index"));
const About = lazy(() => import("./routes/about"));
const Admin = lazy(() => import("./routes/admin"));
const Brands = lazy(() => import("./routes/brands"));
const Contact = lazy(() => import("./routes/contact"));
const Gallery = lazy(() => import("./routes/gallery"));
const Products = lazy(() => import("./routes/products"));
const Services = lazy(() => import("./routes/services"));

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-[50vh] grid place-items-center" role="status">
            Loading page…
          </div>
        }
      >
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
