import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { useCategories } from "@/lib/categories-data";

export function Footer() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { categories } = useCategories();

  const dynamicCategoryLinks = categories.slice(0, 4).map((c) => ({
    to: `/products?category=${encodeURIComponent(c.name)}`,
    label: c.name,
  }));

  const columns = [
    {
      title: "Explore",
      links: [
        { to: "/products", label: "Products" },
        { to: "/brands", label: "Brands" },
        { to: "/services", label: "Services" },
        { to: "/gallery", label: "Gallery" },
      ],
    },
    {
      title: "Company",
      links: [
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
        { to: "/services", label: "Service Centers" },
      ],
    },
    {
      title: "Categories",
      links:
        dynamicCategoryLinks.length > 0
          ? dynamicCategoryLinks
          : [
              { to: "/products?category=Fusion%20Splicers", label: "Fusion Splicers" },
              { to: "/products?category=OTDR", label: "OTDR & Power Meters" },
              { to: "/products?category=Cleavers", label: "Cleavers & VFL" },
              { to: "/services", label: "Spare Parts & Service" },
            ],
    },
  ];

  return (
    <footer className="bg-muted text-foreground border-t border-border">
      <div className="mx-auto max-w-[1920px] px-5 md:px-16 pt-8 md:pt-14 pb-4 md:pb-6">
        <div className="grid gap-4 md:gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-20 md:h-28 -my-2.5 md:-my-4 -ml-1 md:-ml-2" />
            <p className="mt-1 md:mt-1.5 text-[12px] md:text-[13px] text-muted-foreground max-w-xs leading-relaxed">
              {SITE.tagline}. Authorized Distributor for Inno, Grandway, Claron & EXFO across Andhra
              Pradesh & Telangana.
            </p>
            <div className="mt-3 md:mt-4 space-y-4 text-[12px] md:text-[13px] text-muted-foreground">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-foreground mb-1.5">
                  Billing Address
                </div>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    {SITE.address}
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-foreground mb-1.5">
                  Head Office Address
                </div>
                <ul className="space-y-1.5">
                  <li className="flex gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    {SITE.addressAlt}
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-foreground mb-1.5">
                  Contact Info
                </div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="hover:text-primary font-medium transition-colors"
                    >
                      {SITE.phone}
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <a
                      href={`tel:${SITE.phoneRawAlt}`}
                      className="hover:text-primary font-medium transition-colors"
                    >
                      {SITE.phoneAlt}
                    </a>
                  </li>
                  <li className="flex gap-2 pt-2 border-t border-border/60">
                    <Mail className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${SITE.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {SITE.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="md:col-span-2 border-b border-border md:border-0">
              <button
                type="button"
                onClick={() => setOpenMenu((current) => (current === c.title ? null : c.title))}
                className="md:mb-4 flex w-full items-center justify-between gap-3 text-left text-[12px] md:text-[13px] font-medium text-foreground hover:text-primary transition py-2.5 md:py-0"
                aria-expanded={openMenu === c.title}
              >
                {c.title}
                <ChevronDown
                  className={`h-4 w-4 transition md:hidden ${openMenu === c.title ? "rotate-180" : ""}`}
                />
              </button>
              <ul
                className={`${openMenu === c.title ? "flex" : "hidden"} md:flex flex-col gap-2 md:gap-2.5 text-[12px] md:text-[13px] text-muted-foreground pb-3 md:pb-0`}
              >
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpenMenu(null)}
                      className="hover:text-primary hover:underline transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 pt-3 md:pt-0">
            <h4 className="text-[12px] md:text-[13px] font-medium text-foreground mb-3 md:mb-4">
              Follow
            </h4>
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-8 w-8 md:h-9 md:w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
              >
                <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
              <a
                href="https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="h-8 w-8 md:h-9 md:w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
              >
                <Youtube className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-8 w-8 md:h-9 md:w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
              >
                <Facebook className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-8 w-8 md:h-9 md:w-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
              >
                <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-12 pt-4 md:pt-5 border-t border-border flex flex-wrap justify-between gap-2 md:gap-3 text-[11px] md:text-[12px] text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. | Developed by{" "}
            <a
              href="https://octaleads.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f97316] hover:text-[#ea580c] hover:underline transition-colors font-medium"
            >
              Octaleads Pvt. Ltd.
            </a>
          </span>
          <div className="flex gap-4">
            <a href="/sitemap.xml" className="hover:text-primary hover:underline transition">
              Sitemap
            </a>
            <span>{SITE.website}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
