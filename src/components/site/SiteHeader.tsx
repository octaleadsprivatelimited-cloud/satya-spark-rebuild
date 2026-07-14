import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Satya Power Technologys home">
          <img
            src="/ref/satya-logo-v1-CTyV3CUl.png"
            alt="Satya Power Technologys"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.to
                  ? "text-brand bg-accent"
                  : "text-foreground/70 hover:text-brand hover:bg-accent/60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919542840444"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-brand"
          >
            <Phone className="h-4 w-4" />
            +91 95428 40444
          </a>
          <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Get a Quote</Link>
          </Button>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page py-3 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === item.to
                    ? "text-brand bg-accent"
                    : "text-foreground/80 hover:bg-accent",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="brand" size="sm" className="mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
