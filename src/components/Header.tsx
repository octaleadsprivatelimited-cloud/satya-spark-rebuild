import { NavLink, Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Headphones, Menu, X, Search, ChevronDown, UserRound, Globe2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/site";
import { PaymentDialog } from "./DeferredPaymentDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "te", label: "తెలుగు", short: "TE" },
  { code: "hi", label: "हिन्दी", short: "HI" },
] as const;
type LangCode = (typeof LANGUAGES)[number]["code"];
const LANG_KEY = "satya:lang";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Sync search input with URL search param when on products page
  useEffect(() => {
    if (location.pathname === "/products") {
      setSearchQuery(searchParams.get("search") || "");
    } else {
      setSearchQuery("");
    }
  }, [location.pathname, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem(LANG_KEY)) as LangCode | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      setLang(stored);
      document.documentElement.lang = stored;

      // Sync cookie if missing
      if (!document.cookie.includes(`googtrans=/en/${stored}`)) {
        const domain = window.location.hostname;
        const cookieValue = `/en/${stored}`;
        document.cookie = `googtrans=${cookieValue}; path=/;`;
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
        window.location.reload();
      }
    } else {
      document.documentElement.lang = "en";
    }
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const changeLang = (code: LangCode) => {
    setLang(code);
    document.documentElement.lang = code;

    const domain = window.location.hostname;
    const cookieValue = `/en/${code}`;

    // Set translation cookies
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
    if (domain.includes(".")) {
      const parts = domain.split(".");
      if (parts.length > 2) {
        const rootDomain = parts.slice(-2).join(".");
        document.cookie = `googtrans=${cookieValue}; path=/; domain=.${rootDomain};`;
      }
    }

    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {
      /* Optional cache is unavailable. */
    }
    window.location.reload();
  };

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  const langSwitcher = (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1.5 hover:text-primary outline-none focus-visible:text-primary">
        <Globe2 className="h-4 w-4" /> IN/{current.short}
        <ChevronDown className="h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] bg-card z-[60]">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => changeLang(l.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{l.label}</span>
            {l.code === lang && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 bg-card text-foreground shadow-[0_1px_0_var(--border)]">
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1920px] px-4 md:px-8 flex h-[52px] items-center gap-6">
          <Link to="/" className="shrink-0 flex items-center">
            <Logo className="h-14 md:h-16" />
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 items-center max-w-xl border border-input h-9 bg-card"
          >
            <input
              aria-label="Search"
              placeholder="Search Satya Power"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-0 flex-1 px-3 text-sm outline-none bg-transparent"
            />
            <button
              type="submit"
              aria-label="Search"
              className="h-full w-10 grid place-items-center hover:bg-muted transition cursor-pointer"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </form>
          <div className="ml-auto flex items-center gap-2.5 sm:gap-4 md:gap-5 text-[11px] sm:text-xs md:text-[13px] text-muted-foreground">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-primary"
            >
              <UserRound className="h-4 w-4" /> Sign In
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-primary"
            >
              <Headphones className="h-4 w-4" /> Contact Us
            </a>
            <PaymentDialog
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center h-8 px-3.5 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] sm:text-xs transition-colors cursor-pointer"
                >
                  Pay Now
                </button>
              }
            />
            {langSwitcher}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 ml-2 sm:ml-3"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden lg:block border-b border-border bg-card">
        <div className="mx-auto max-w-[1920px] px-4 md:px-8 flex h-[52px] items-center justify-between gap-6">
          <nav className="flex items-center gap-8">
            {nav.slice(1).map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 text-[14px] font-normal hover:text-primary transition py-4 border-b-2 ${isActive ? "text-primary border-primary" : "border-transparent"}`
                }
              >
                {n.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center h-9 px-5 bg-primary text-primary-foreground text-[14px] font-normal hover:bg-brand-red-dark transition-colors duration-200"
            >
              Get a Quote
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-l-8 border-primary pl-3 text-sm font-medium hover:text-primary"
            >
              Satya Premier for Business
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 top-[52px] bg-foreground/40 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.div
              className="lg:hidden fixed left-0 right-0 top-[52px] bg-card z-50 overflow-y-auto shadow-2xl border-b border-border"
              initial={{ y: "-100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto max-w-7xl container-px flex flex-col py-2">
                {nav.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="py-4 text-sm font-normal text-foreground border-b border-border last:border-0 flex items-center justify-between"
                    >
                      {n.label}
                      <ChevronDown className="h-4 w-4 -rotate-90 opacity-50" />
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href={`tel:${SITE.phoneRaw}`}
                  className="py-4 text-sm font-normal text-primary"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: nav.length * 0.05, duration: 0.35, ease: "easeOut" }}
                >
                  <Headphones className="inline h-4 w-4 mr-2" />
                  {SITE.phone}
                </motion.a>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: (nav.length + 1) * 0.05, duration: 0.35, ease: "easeOut" }}
                  className="pt-4 border-t border-border mt-2"
                >
                  <PaymentDialog
                    trigger={
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-center text-sm shadow-sm transition-colors cursor-pointer"
                      >
                        Pay Now
                      </button>
                    }
                  />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
