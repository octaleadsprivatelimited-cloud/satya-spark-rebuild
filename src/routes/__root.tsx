import { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, useLocation } from "react-router-dom";

import { Header } from "../components/Header";
const Footer = lazy(() =>
  import("../components/Footer").then((module) => ({ default: module.Footer })),
);
import { Toaster } from "../components/ui/sonner";
import { FloatingActions } from "../components/FloatingActions";

import { SITE } from "../lib/site";

const queryClient = new QueryClient();

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-primary">404</h1>
        <h2 className="mt-4 text-xl font-normal">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-5 py-3 text-sm font-normal text-primary-foreground hover:bg-brand-red-dark transition"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout() {
  const { pathname } = useLocation();
  const [, setSeed] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    import("../lib/admin-data")
      .then(({ getCompanyInfo }) => getCompanyInfo())
      .then((info) => {
        const rawPhone = info.phone.replace(/\D/g, "");
        const rawPhoneAlt = info.phoneAlt.replace(/\D/g, "");

        SITE.name = info.name;
        SITE.tagline = info.tagline;
        SITE.phone = info.phone;
        SITE.phoneRaw = rawPhone;
        SITE.phoneAlt = info.phoneAlt;
        SITE.phoneRawAlt = rawPhoneAlt;
        SITE.email = info.email;
        SITE.address = info.address;
        SITE.gstin = info.gstin;
        SITE.founded = Number(info.founded) || 2013;
        SITE.ceo = info.ceo;
        SITE.website = info.website;

        setSeed((s) => s + 1);
      });
  }, []);

  const isAdmin = pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isAdmin && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isAdmin && (
          <Suspense fallback={<div className="min-h-40" />}>
            <Footer />
          </Suspense>
        )}
        {!isAdmin && <FloatingActions />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
