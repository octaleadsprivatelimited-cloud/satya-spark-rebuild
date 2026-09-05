import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/lib/branches";

export function ServiceBranches() {
  return (
    <section className="py-12 md:py-20 bg-card">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-6 md:gap-10 mb-8 md:mb-12 items-end">
          <div className="md:col-span-2">
            <div className="text-xs sm:text-sm font-normal text-muted-foreground mb-2 md:mb-3">
              Our presence
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground leading-[1.15]">
              Our Service Branches
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            Five service centers across Andhra Pradesh & Telangana for fast on-site support.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {BRANCHES.map((b) => (
            <div
              key={b.city}
              className="group cursor-default bg-card border border-border overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                <img
                  src={b.image}
                  alt={`${b.city} branch`}
                  loading="lazy"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-white">
                    <MapPin className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs sm:text-sm font-medium">{b.city}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-5">
                <div className="text-base sm:text-lg font-light text-foreground leading-tight">
                  {b.city}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{b.role}</div>
                <Button asChild size="sm" className="mt-2.5 sm:mt-3 w-full h-8 text-xs gap-1.5">
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, "")}`}
                    aria-label={`Contact ${b.city} branch`}
                  >
                    <Phone className="h-3 w-3" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
