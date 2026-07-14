import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { whatsappLink } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-white text-foreground border-t border-border">
      {/* Pre-footer social strip */}
      <div className="border-b border-border">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/ref/satya-logo-v1-CTyV3CUl.png"
              alt="Satya Power Technologys"
              className="h-10 w-auto"
            />
            <p className="text-sm text-muted-foreground hidden sm:block">
              Fiber optic tools · Service · EV battery repair
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center gap-2 rounded-md bg-[oklch(0.7_0.17_150)] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium hover:bg-amber hover:text-amber-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href="https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium hover:bg-amber hover:text-amber-foreground transition-colors"
            >
              <Youtube className="h-4 w-4" /> YouTube
            </a>
            <a
              href="tel:+919542840444"
              aria-label="Call"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium hover:bg-amber hover:text-amber-foreground transition-colors"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>
      </div>

      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <img
            src="/ref/satya-logo-v1-CTyV3CUl.png"
            alt="Satya Power Technologys"
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm text-muted-foreground">
            Authorized distributor of fiber optic tools & EV battery service across Andhra Pradesh
            and Telangana. Sales, service and support since 2013.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-brand">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-brand">Products</Link></li>
            <li><Link to="/services" className="hover:text-brand">Services</Link></li>
            <li><Link to="/projects" className="hover:text-brand">Projects</Link></li>
            <li><Link to="/gallery" className="hover:text-brand">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-brand">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-brand">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-brand">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-brand">Reach us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
              <a href="tel:+919542840444" className="hover:text-brand">+91 95428 40444</a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
              <a href="tel:+918688151526" className="hover:text-brand">+91 86881 51526</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
              <a href="mailto:satyapowertechnologys@gmail.com" className="break-all hover:text-brand">
                satyapowertechnologys@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
              Peddapuram · Hyderabad · Vijayawada · Kakinada · Srikakulam · Tirupathi
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SATYA POWER TECHNOLOGYS. All rights reserved. GSTIN: 37BILPL7684K1ZD</p>
          <p>Fiber Optic Tools · Service · EV Battery Repair</p>
        </div>
      </div>
    </footer>
  );
}
