import { Headphones, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactCtaBar() {
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-stretch overflow-hidden rounded-md shadow-[var(--shadow-elegant)]">
      <Link
        to="/contact"
        className="flex items-center gap-2 bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90"
      >
        <Headphones className="h-4 w-4" />
        Contact Us
      </Link>
      <a
        href="tel:+919542840444"
        aria-label="Call"
        className="grid place-items-center bg-sidebar px-3 text-white hover:opacity-90"
      >
        <Phone className="h-4 w-4" />
      </a>
    </div>
  );
}
