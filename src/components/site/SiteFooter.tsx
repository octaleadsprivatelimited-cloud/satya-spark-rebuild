import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-sidebar text-sidebar-foreground">
      <div className="container-page py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-amber text-amber-foreground font-bold">
              SP
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold">SATYA POWER</div>
              <div className="text-[10px] uppercase tracking-widest opacity-70">Technologys</div>
            </div>
          </div>
          <p className="text-sm opacity-80">
            Authorized distributor of fiber optic tools & EV battery service across Andhra Pradesh
            and Telangana.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/products" className="hover:text-amber">Products</Link></li>
            <li><Link to="/services" className="hover:text-amber">Services</Link></li>
            <li><Link to="/projects" className="hover:text-amber">Projects</Link></li>
            <li><Link to="/gallery" className="hover:text-amber">Gallery</Link></li>
            <li><Link to="/blog" className="hover:text-amber">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/about" className="hover:text-amber">About</Link></li>
            <li><Link to="/contact" className="hover:text-amber">Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-amber">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Reach us</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="tel:+919542840444">+91 95428 40444</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="mailto:info@satyapowertechnologys.in">info@satyapowertechnologys.in</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              Hyderabad · Vijayawada · Kakinada · Srikakulam · Tirupathi
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="https://www.instagram.com/satya_power_technologys" aria-label="Instagram"
               className="p-2 rounded-md bg-sidebar-accent hover:bg-amber hover:text-amber-foreground transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://youtube.com/@satyapowertechnologys" aria-label="YouTube"
               className="p-2 rounded-md bg-sidebar-accent hover:bg-amber hover:text-amber-foreground transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-sidebar-border">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Satya Power Technologys. All rights reserved.</p>
          <p>Fiber Optic Tools · Service · EV Battery Repair</p>
        </div>
      </div>
    </footer>
  );
}
