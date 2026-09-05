import { ArrowUpRight, Building2, Users, ShieldCheck, Scale, Tag, Globe } from "lucide-react";
import engineer1 from "@/assets/engineer-1.jpg";
import engineer2 from "@/assets/engineer-2.jpg";
import team from "@/assets/team.jpg";
import serviceEngineer from "@/assets/service-engineer.jpg";

const items = [
  {
    icon: Building2,
    t: "Advance Infrastructure",
    d: "Modern facilities and inventory ready for immediate dispatch.",
  },
  {
    icon: Users,
    t: "Experienced Team",
    d: "Decades of combined expertise in fiber optic equipment & service.",
  },
  {
    icon: ShieldCheck,
    t: "Superior Quality",
    d: "Only genuine, authorized products from world-leading brands.",
  },
  {
    icon: Scale,
    t: "Ethical Business",
    d: "Transparent pricing, honest advice, long-term partnerships.",
  },
  {
    icon: Tag,
    t: "Market Leading Prices",
    d: "Distributor-direct pricing on INNO and partner brands.",
  },
  {
    icon: Globe,
    t: "Wide Distribution",
    d: "Pan-India shipping with strong AP & Telangana presence.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-14 md:py-20 bg-muted text-foreground border-y border-border">
      <div className="mx-auto max-w-[1920px] px-6 md:px-16">
        {/* Header */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 md:mb-14 items-end">
          <div className="md:col-span-2">
            <div className="text-sm font-normal text-muted-foreground mb-3">
              Why Satya Power Technologys
            </div>
            <h2 className="text-3xl md:text-5xl font-light leading-[1.15]">
              Built for engineers.
              <br />
              Trusted by professionals.
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Six reasons customers across two states keep coming back for sales, service and support.
          </p>
        </div>

        {/* Main content: images + reasons grid */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Images column */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">
            {/* Large top image */}
            <div className="relative overflow-hidden group">
              <img
                src={engineer1}
                alt="Fiber optic engineer at work"
                loading="lazy"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-6">
                <div className="text-xs font-normal text-white/70 uppercase tracking-wider mb-1">
                  Our Engineers
                </div>
                <div className="text-lg md:text-xl font-light text-white leading-tight">
                  Expert hands. Precision work.
                </div>
              </div>
            </div>

            {/* Two smaller images row */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <div className="relative overflow-hidden group">
                <img
                  src={team}
                  alt="Satya Power Technologies team"
                  loading="lazy"
                  className="w-full h-40 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 md:p-4">
                  <div className="text-xs font-normal text-white/70">Team</div>
                  <div className="text-sm md:text-base font-light text-white">
                    Dedicated professionals
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src={serviceEngineer}
                  alt="Service engineer on site"
                  loading="lazy"
                  className="w-full h-40 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 md:p-4">
                  <div className="text-xs font-normal text-white/70">Service</div>
                  <div className="text-sm md:text-base font-light text-white">On-site support</div>
                </div>
              </div>
            </div>

            {/* Bottom strip image */}
            <div className="relative overflow-hidden group hidden lg:block">
              <img
                src={engineer2}
                alt="Quality inspection technician"
                loading="lazy"
                className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-xs font-normal text-white/70">Quality Control</div>
                <div className="text-sm font-light text-white">Every product tested & verified</div>
              </div>
            </div>
          </div>

          {/* Right: Reasons grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 h-full border border-border bg-card">
              {items.map((it, i) => (
                <div
                  key={it.t}
                  className="group relative p-5 md:p-7 border-b border-r border-border hover:bg-accent transition-colors duration-300 cursor-default"
                >
                  <div className="h-10 w-10 bg-accent text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-normal leading-tight mb-2">{it.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{it.d}</p>
                  <ArrowUpRight className="h-5 w-5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
