import { MessageCircle, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/mock-data";

export function QuoteCta() {
  return (
    <section className="py-14 border-t border-border bg-secondary/40">
      <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Get in touch</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">
            Need a quote or on-site service?
          </h2>
        </div>
        <div className="rounded-md border border-border bg-white p-5">
          <p className="text-sm text-muted-foreground">
            Our team responds within hours across Andhra Pradesh & Telangana — sales, repair and
            emergency support.
          </p>
          <div className="mt-4 space-y-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-md bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground hover:opacity-95"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </span>
              <span>→</span>
            </a>
            <a
              href="/contact"
              className="flex items-center justify-between rounded-md border border-brand px-4 py-3 text-sm font-semibold text-brand hover:bg-brand/5"
            >
              <span>Request a quote</span>
              <span>→</span>
            </a>
          </div>
          <a
            href="tel:+919542840444"
            className="mt-3 flex items-center gap-2 text-sm font-medium text-brand"
          >
            <Phone className="h-4 w-4" /> or call +91 95428 40444
          </a>
        </div>
      </div>
    </section>
  );
}
