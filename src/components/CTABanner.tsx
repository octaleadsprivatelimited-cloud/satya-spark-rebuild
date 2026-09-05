import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-muted text-foreground border-y border-border">
      <div className="relative mx-auto max-w-[1920px] px-6 md:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <div className="text-sm font-normal text-muted-foreground mb-3">Get in touch</div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.15] tracking-normal">
              Need a quote or on-site service?
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 md:border-l md:border-border md:pl-10">
            <p className="text-muted-foreground text-base font-normal">
              Our team responds within hours across Andhra Pradesh & Telangana — sales, repair and
              emergency support.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-between gap-3 px-5 py-3 text-sm font-normal bg-primary text-primary-foreground hover:bg-brand-red-dark transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-between gap-3 px-5 py-3 text-sm font-normal border border-primary text-primary hover:bg-accent transition-colors"
              >
                <span>Request a quote</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="text-sm text-muted-foreground hover:text-primary pt-1"
              >
                or call <span className="font-medium text-foreground">{SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
