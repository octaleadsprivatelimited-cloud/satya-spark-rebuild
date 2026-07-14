import { Award, Calendar, MapPin, Target, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Seo } from "@/components/Seo";
import { offices } from "@/lib/mock-data";

const pillars = [
  { icon: Target, title: "Our Mission", body: "Deliver world-class fiber optic equipment with unmatched after-sales service." },
  { icon: Award, title: "Our Vision", body: "Be the most trusted fiber optic partner in South India by combining sales with real service." },
  { icon: Users, title: "Our People", body: "An experienced team of engineers and field technicians committed to your uptime." },
];

const kpis = [
  { value: "13+", label: "Years in business" },
  { value: "5000+", label: "Happy Customers" },
  { value: "2", label: "States covered" },
  { value: "7+", label: "Authorized brands" },
];

const milestones = [
  { year: "2013", title: "Manufacturer & Distributor", body: "SATYA POWER TECHNOLOGYS established as a leading manufacturer and distributor of Fusion Splicers, OTDRs, and fiber optic toolkits." },
  { year: "2018", title: "Operations & Quality Upgrades", body: "Upgraded operations to match global standards, equipping facilities with state-of-the-art machinery and quality systems." },
  { year: "2022", title: "Adhering to Best Practices", body: "Maintained the highest standards of quality through management systems and regular audits by leading certification bodies." },
  { year: "2025", title: "Notable Market Growth", body: "Expanded market presence under the guidance of our mentor, Mr. V. Dorababu (CEO), leveraging his industrial experience." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <Seo
        title="About — Satya Power Technologys"
        description="Built on trust. Backed by service. Satya Power Technologys is a manufacturer and distributor of fusion splicers, OTDRs and fiber optic toolkits since 2013."
      />
      <PageHero
        eyebrow="Our story"
        title="Built on trust. Backed by service."
        size="lg"
        subtitle="Service first, Sales next."
      />

      {/* Pillars + KPIs */}
      <section className="py-16 bg-secondary/40">
        <div className="container-page">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">What drives us</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Service first. Sales next.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-md border border-border bg-white p-6">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-brand/10 text-brand">
                  <p.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-md border border-border bg-white p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand">{k.value}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wide">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-16">
        <div className="container-page">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Milestones</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Our Journey</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.year} className="rounded-md border border-border bg-white p-6">
                <div className="flex items-center gap-2 text-brand">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-bold">{m.year}</span>
                </div>
                <h3 className="mt-3 font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address strip */}
      <section className="pb-16">
        <div className="container-page">
          <div className="rounded-md bg-brand text-brand-foreground p-6 md:p-8 grid gap-8 md:grid-cols-2">
            {offices.map((o) => (
              <div key={o.id}>
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest">
                  <MapPin className="h-3.5 w-3.5" /> {o.label}
                </div>
                <div className="mt-2 font-bold">{o.city}</div>
                <p className="mt-1 text-sm text-white/85">{o.address}</p>
                <div className="mt-2 text-xs text-white/75">
                  {o.gstin ? <>GSTIN: {o.gstin} · </> : null}
                  <a href={`tel:${o.phoneTel}`} className="hover:underline">{o.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </SiteLayout>
  );
}
