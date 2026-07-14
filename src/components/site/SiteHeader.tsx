import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Headphones, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PayNowDialog } from "./PayNowDialog";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = { to: string; label: string; children?: { to: string; label: string }[] };

const nav: NavItem[] = [
  {
    to: "/products",
    label: "Products",
    children: [
      { to: "/products?category=fusion-splicers", label: "Fusion Splicers" },
      { to: "/products?category=otdr", label: "OTDR" },
      { to: "/products?category=power-meters", label: "Power Meters" },
      { to: "/products?category=cleavers", label: "Cleavers" },
    ],
  },
  {
    to: "/products",
    label: "Brands",
    children: [
      { to: "/products?brand=Inno", label: "Inno Instrument" },
      { to: "/products?brand=Grandway", label: "Grandway" },
      { to: "/products?brand=Claron", label: "Claron" },
      { to: "/products?brand=EXFO", label: "EXFO" },
    ],
  },
  {
    to: "/services",
    label: "Services",
    children: [
      { to: "/services", label: "Splicer Service" },
      { to: "/services", label: "OTDR Calibration" },
      { to: "/services", label: "EV Battery Repair" },
    ],
  },
  {
    to: "/gallery",
    label: "Gallery",
    children: [
      { to: "/gallery", label: "Photos" },
      { to: "/projects", label: "Projects" },
    ],
  },
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about", label: "About Us" },
      { to: "/about", label: "Our Team" },
    ],
  },
  {
    to: "/contact",
    label: "Contact",
    children: [
      { to: "/contact", label: "Contact Us" },
      { to: "/contact", label: "Service Centers" },
    ],
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      {/* Top row */}
      <div className="border-b border-border/70">
        <div className="container-page flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center shrink-0" aria-label="Satya Power Technologys home">
            <img
              src="/ref/satya-logo-v1-CTyV3CUl.png"
              alt="Satya Power Technologys"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Satya Power"
                className="w-full h-11 rounded-md border border-border bg-white pl-4 pr-11 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1 grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:text-brand"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-5">
            <Link to="/admin/login" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-brand">
              <User className="h-4 w-4" /> Sign In
            </Link>
            <Link to="/contact" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-brand">
              <Headphones className="h-4 w-4" /> Contact Us
            </Link>
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center rounded-md bg-[oklch(0.65_0.17_150)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Pay Now
            </Link>
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-foreground/80">
              <span className="grid h-5 w-5 place-items-center rounded-sm bg-brand text-[10px] font-bold text-white">IN</span>
              IN/EN <ChevronDown className="h-3.5 w-3.5" />
            </div>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row - nav */}
      <div className="hidden lg:block">
        <div className="container-page flex h-12 items-center justify-between">
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                    pathname === item.to ? "text-brand" : "text-foreground/80 hover:text-brand",
                  )}
                >
                  {item.label}
                  {item.children ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded-md border border-border bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        className="block rounded px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-brand"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="brand" size="sm">
              <Link to="/contact">Get a Quote</Link>
            </Button>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="h-4 w-1 rounded-sm bg-brand" />
              <Link to="/contact" className="text-foreground/80 hover:text-brand">
                Satya Premier for Business
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-page py-3">
            <form onSubmit={submitSearch} className="mb-3 md:hidden">
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Satya Power"
                  className="w-full h-10 rounded-md border border-border pl-4 pr-10 text-sm outline-none"
                />
                <button type="submit" aria-label="Search" className="absolute right-2 top-2 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-2 py-2.5 border-b border-border/60 text-sm font-medium text-foreground/80 hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex gap-2">
              <Button asChild variant="brand" size="sm" className="flex-1">
                <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-[oklch(0.65_0.17_150)] text-white hover:opacity-90">
                <Link to="/contact" onClick={() => setOpen(false)}>Pay Now</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
