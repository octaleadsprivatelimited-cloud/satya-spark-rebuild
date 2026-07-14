import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-white text-foreground border-t border-border">
      <div className="container-page py-14 grid gap-10 lg:grid-cols-5">
        {/* Company info */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-block">
            <img
              src="/ref/satya-logo-v1-CTyV3CUl.png"
              alt="Satya Power Technologys"
              className="h-14 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Service first, Sales next. Authorized Distributor for Inno, Grandway, Claron & EXFO
            across Andhra Pradesh & Telangana.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/80">Billing Address</div>
              <div className="mt-1 flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
                <span>2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/80">Head Office Address</div>
              <div className="mt-1 flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
                <span>House No. 49/50, Vayushakthi Nagar Road No.1, Dammaiguda, Hyderabad - 500083, Telangana, India</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/80">Contact Info</div>
              <div className="mt-1 space-y-1">
                <a href="tel:+919542840444" className="flex items-center gap-2 text-muted-foreground hover:text-brand">
                  <Phone className="h-4 w-4 text-brand" /> +91 95428 40444
                </a>
                <a href="tel:+918688151526" className="flex items-center gap-2 text-muted-foreground hover:text-brand">
                  <Phone className="h-4 w-4 text-brand" /> +91 86881 51526
                </a>
              </div>
              <a
                href="mailto:satyapowertechnologys@gmail.com"
                className="mt-2 flex items-center gap-2 text-muted-foreground hover:text-brand border-t border-border pt-2"
              >
                <Mail className="h-4 w-4 text-brand" /> satyapowertechnologys@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest">Explore</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-brand">Products</Link></li>
            <li><Link to="/products" className="hover:text-brand">Brands</Link></li>
            <li><Link to="/services" className="hover:text-brand">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-brand">Gallery</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest">Company</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-brand">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Service Centers</Link></li>
          </ul>
        </div>

        {/* Categories + Follow */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest">Categories</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/products?category=fusion-splicers" className="hover:text-brand">Fusion Splicers</Link></li>
            <li><Link to="/products?category=otdr" className="hover:text-brand">OTDR</Link></li>
            <li><Link to="/products?category=power-meters" className="hover:text-brand">Power Meters</Link></li>
            <li><Link to="/products?category=cleavers" className="hover:text-brand">Cleavers</Link></li>
          </ul>

          <h4 className="mt-8 text-sm font-bold uppercase tracking-widest">Follow</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: "https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn", label: "Instagram", Icon: Instagram },
              { href: "https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg", label: "YouTube", Icon: Youtube },
              { href: "#", label: "Facebook", Icon: Facebook },
              { href: "#", label: "LinkedIn", Icon: Linkedin },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground/70 hover:text-brand hover:border-brand transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SATYA POWER. All rights reserved. | Developed by <span className="text-brand font-medium">Octaleads Pvt. Ltd.</span></p>
          <Link to="/" className="hover:text-brand">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
