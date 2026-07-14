import { Award, HeartHandshake, MapPin, Phone, Target, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/Seo";
import { Card } from "@/components/ui/card";
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
  { value: "6+", label: "Authorized brands" },
];

const milestones = [
  { year: "2013", title: "Manufacturer & Distributor", body: "SATYA POWER TECHNOLOGYS established as a leading manufacturer and distributor of Fusion Splicers, OTDRs, and fiber optic toolkits." },
  { year: "2024", title: "Operations & Quality Upgrades", body: "Upgraded operations to match global standards, equipping facilities with state-of-the-art machinery." },
  { year: "2024", title: "Adhering to Best Practices", body: "Maintained the highest standards of quality through management systems and regular audits." },
  { year: "2025", title: "Notable Market Growth", body: "Expanded market presence under the guidance of our mentor, Mr. V Dorababu (CEO)." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <Seo
        title="About — Satya Power Technologys"
        description="Built on trust. Backed by service. Satya Power Technologys is a manufacturer and distributor of fusion splicers, OTDRs and fiber optic toolkits since 2013."
      />
      <PageHero
        image="/ref/team-CMydRHty.jpg"
        eyebrow="Our story"
        title="Built on trust. Backed by service."
        size="lg"
        subtitle="Service first, sales next. SATYA POWER TECHNOLOGYS is a leading manufacturer and distributor of fusion splicers, OTDRs and fiber optic toolkits since 2013."
      />

      <section className="py-20">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">What drives us</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Service first. Sales next.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} className="p-6">
                <p.icon className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-brand text-brand-foreground">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/15 bg-white/5 p-6 text-center">
              <div className="text-4xl font-bold">{k.value}</div>
              <div className="mt-1 text-sm opacity-80">{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Milestones</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Our Journey</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Card key={i} className="p-6">
                <div className="text-brand font-bold text-xl">{m.year}</div>
                <h3 className="mt-2 font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Reach us</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Our offices</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {offices.map((o) => (
              <Card key={o.id} className="p-6">
                <div className="flex items-center gap-2 text-brand"><HeartHandshake className="h-5 w-5" /><span className="text-xs uppercase tracking-widest font-semibold">{o.label}</span></div>
                <h3 className="mt-2 text-xl font-bold">{o.company}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-brand" />{o.address}</p>
                <a href={`tel:${o.phoneTel}`} className="mt-3 inline-flex items-center gap-2 text-brand font-semibold"><Phone className="h-4 w-4" />{o.phone}</a>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
