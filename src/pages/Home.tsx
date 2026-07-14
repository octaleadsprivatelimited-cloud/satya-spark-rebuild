import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight, Award, BatteryCharging, Factory, MapPin, Phone,
  ShieldCheck, Sparkles, Truck, Users, Wrench, Zap,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts, listBrands, listServices } from "@/lib/services/data-service";
import { branches, testimonials, whatsappLink } from "@/lib/mock-data";

const featuredProductsQuery = { queryKey: ["products", "featured"], queryFn: getFeaturedProducts };
const servicesQuery = { queryKey: ["services"], queryFn: listServices };
const brandsQuery = { queryKey: ["brands"], queryFn: listBrands };

const stats = [
  { n: "01", value: "13+", label: "Years experience", sub: "Industry expertise" },
  { n: "02", value: "5000+", label: "Happy Customers", sub: "Across sectors" },
  { n: "03", value: "Pan-India", label: "Sales & service", sub: "Nationwide reach" },
  { n: "04", value: "24/7", label: "Support", sub: "Always available" },
];

const reasons = [
  { icon: Factory, title: "Advance Infrastructure", body: "Modern facilities and inventory ready for immediate dispatch." },
  { icon: Users, title: "Experienced Team", body: "Decades of combined expertise in fiber optic equipment & service." },
  { icon: Award, title: "Superior Quality", body: "Only genuine, authorized products from world-leading brands." },
  { icon: ShieldCheck, title: "Ethical Business", body: "Transparent pricing, honest advice, long-term partnerships." },
  { icon: Sparkles, title: "Market Leading Prices", body: "Distributor-direct pricing on INNO and partner brands." },
  { icon: Truck, title: "Wide Distribution", body: "Pan-India shipping with strong AP & Telangana presence." },
];

const engineerCards = [
  { title: "Our Engineers", sub: "Expert hands. Precision work.", img: "/ref/engineer-1-bcsnKP6b.jpg" },
  { title: "Team", sub: "Dedicated professionals", img: "/ref/team-CMydRHty.jpg" },
  { title: "Service", sub: "On-site support", img: "/ref/service-engineer-4bWYO3Iz.jpg" },
  { title: "Quality Control", sub: "Every product tested & verified", img: "/ref/engineer-2-CV9e-2Ti.jpg" },
];

export default function HomePage() {
  const { data: products } = useSuspenseQuery(featuredProductsQuery);
  const { data: services } = useSuspenseQuery(servicesQuery);

  return (
    <SiteLayout>
      <Seo
        title="Satya Power Technologys — Fiber Optic Tools for AP & Telangana"
        description="Authorized distributor for Inno, Grandway, Claron & EXFO fiber optic tools. Sales and service across Andhra Pradesh and Telangana with EV battery repair services."
      />
      <HeroSlider />

      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-14">
          <p className="text-sm uppercase tracking-widest opacity-80">Trusted across India</p>
          <div className="mt-3 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Credibility you can verify.</h2>
            <p className="max-w-md text-white/80">
              Numbers built over a decade of trusted partnerships with businesses, institutions and homes nationwide.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.n} className="rounded-xl border border-white/15 bg-white/5 p-6">
                <div className="text-xs opacity-60">{s.n}</div>
                <div className="mt-2 text-3xl md:text-4xl font-bold">{s.value}</div>
                <div className="mt-1 font-medium">{s.label}</div>
                <div className="text-sm opacity-70">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/60 border-y border-border">
        <div className="container-page">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Authorized Brands & Partners
          </p>
          <div className="flex flex-wrap gap-x-16 gap-y-6 justify-center items-center">
            {[...brandLogos, ...brandLogos].map((b, idx) => (
              <img key={`${b.name}-${idx}`} src={b.src} alt={b.name}
                className="h-10 md:h-12 w-auto object-contain opacity-90 grayscale hover:grayscale-0 transition"
                loading="lazy" />
            ))}
            {["EXFO", "VIAVI", "SKL", "Fujikura", "Sumitomo"].map((b) => (
              <div key={b} className="text-xl md:text-2xl font-bold text-muted-foreground/70 tracking-widest">{b}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-brand font-semibold">Our top products</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Top picks from our catalogue</h2>
              <p className="mt-2 text-sm text-muted-foreground">500+ products across splicers, OTDRs, meters, cleavers & spares.</p>
            </div>
            <Button asChild variant="brandOutline">
              <Link to="/products">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <Card key={p.id} className="group overflow-hidden h-full transition-shadow hover:shadow-[var(--shadow-elegant)]">
                <div className="aspect-[4/3] relative overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.name} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className="absolute top-3 left-3 bg-amber text-amber-foreground border-0">Featured</Badge>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                  <h3 className="mt-1 font-semibold leading-tight">
                    <Link to={`/products/${p.slug}`} className="hover:text-brand">{p.name}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground">{p.categoryName}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <a href={whatsappLink(`Hello, I'd like a quote for ${p.name}.`)}
                      target="_blank" rel="noreferrer"
                      className="text-brand font-semibold hover:underline">Get a quote</a>
                    <Link to={`/products/${p.slug}`} className="text-muted-foreground hover:text-brand">View details →</Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Our presence</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Our Service Branches</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Five service centers across Andhra Pradesh & Telangana for fast on-site support.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {branches.map((b) => (
              <Card key={b.city} className="overflow-hidden">
                <div className="aspect-[4/3] bg-brand">
                  <img src={b.image} alt={b.city} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-brand font-semibold">
                    <MapPin className="h-4 w-4" /> {b.city}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{b.type}</p>
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                    <Phone className="h-3.5 w-3.5" /> Contact
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand font-semibold">New Service Frontier</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">
              Powering the Future: EV Battery Repair Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              We have recently expanded our service portfolio to support the transition to electric vehicles.
              For EV batteries, we specifically provide only repair, service, and cell replacement.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <BatteryCharging className="h-6 w-6 text-brand" />
                <h3 className="mt-2 font-semibold">EV Battery Repair & Service</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive health diagnostics, safety testing, capacity validation and servicing.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <Zap className="h-6 w-6 text-brand" />
                <h3 className="mt-2 font-semibold">Battery Cells Replacement</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Cost-effective replacement of individual degraded or faulty cell modules.
                </p>
              </div>
            </div>
            <Button asChild variant="brand" size="lg" className="mt-6">
              <a href={whatsappLink("Hello, I am interested in your EV battery repair services.")}
                target="_blank" rel="noreferrer">
                Inquire on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src="/ref/ev-service-B4BVgvt-.png" alt="EV Battery Repair Service" loading="lazy"
              className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Why Satya Power Technologys</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">
            Built for engineers. Trusted by professionals.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineerCards.map((c) => (
              <div key={c.title} className="group relative overflow-hidden rounded-xl aspect-[3/4]">
                <img src={c.img} alt={c.title} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-xs opacity-90">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <Card key={r.title} className="p-6">
                <r.icon className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-brand font-semibold">Services</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">What we offer</h2>
            </div>
            <Button asChild variant="brandOutline">
              <Link to="/services">All services <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <Card key={s.id} className="p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand text-brand-foreground">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Customer Stories</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Trusted by industry partners</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <p className="text-foreground/80">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand text-brand-foreground grid place-items-center text-sm font-semibold">
                    {t.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="rounded-2xl bg-brand text-brand-foreground p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-widest opacity-80">Get in touch</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">Need a quote or on-site service?</h2>
              <p className="mt-3 text-white/85 max-w-2xl">
                Our team responds within hours across Andhra Pradesh & Telangana.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp us</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white hover:text-brand">
                <Link to="/contact">Request a quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
