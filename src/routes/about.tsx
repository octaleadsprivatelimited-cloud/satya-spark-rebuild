import { createFileRoute } from "@tanstack/react-router";
import { Award, Building2, HeartHandshake, MapPin, Phone, Target, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { offices } from "@/lib/mock-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Satya Power Technologys" },
      { name: "description", content: "Built on trust. Backed by service. Satya Power Technologys is a manufacturer and distributor of fusion splicers, OTDRs and fiber optic toolkits since 2013." },
      { property: "og:title", content: "About Satya Power Technologys" },
      { property: "og:description", content: "Service first, sales next — trusted fiber optic partner in South India since 2013." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

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
  { year: "2024", title: "Operations & Quality Upgrades", body: "Upgraded operations to match global standards, equipping facilities with state-of-the-art machinery and automated systems." },
  { year: "2024", title: "Adhering to Best Practices", body: "Maintained the highest standards of quality through management systems and regular audits by leading certification bodies." },
  { year: "2025", title: "Notable Market Growth", body: "Expanded market presence under the guidance of our mentor, Mr. V Dorababu (CEO), leveraging rich industrial experience." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-20 md:py-28">
          <p className="text-sm uppercase tracking-widest opacity-80">Our story</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance">
            Built on trust. Backed by service.
          </h1>
          <p className="mt-5 max-w-3xl text-white/85 text-lg">
            Service first, sales next. SATYA POWER TECHNOLOGYS is a leading manufacturer and distributor
            of fusion splicers, OTDRs and fiber optic toolkits — trusted by ISPs, enterprises and
            government bodies across India since 2013.
          </p>
        </div>
      </section>

      {/* Pillars */}
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

      {/* KPIs */}
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

      {/* Milestones */}
      <section className="py-20 bg-secondary/40">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Milestones</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Our Journey</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Card key={i} className="p-6">
                <div className="text-brand text-3xl font-bold">{m.year}</div>
                <h3 className="mt-2 font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {offices.map((o) => (
            <Card key={o.id} className="p-6 md:p-8">
              <p className="text-sm uppercase tracking-widest text-brand font-semibold">{o.label}</p>
              <h3 className="mt-2 text-xl font-bold">{o.city}</h3>
              <p className="mt-1 font-medium">{o.company}</p>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
                {o.address}
              </p>
              {o.gstin ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  GSTIN: <span className="font-medium">{o.gstin}</span>
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <a href={`tel:${o.phoneTel}`} className="inline-flex items-center gap-2 text-brand font-semibold hover:underline">
                  <Phone className="h-4 w-4" /> {o.phone}
                </a>
                <a href={`mailto:${o.email}`} className="text-brand hover:underline break-all">
                  {o.email}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <HeartHandshake className="h-8 w-8 text-brand" />
            <h3 className="mt-4 text-xl font-semibold">Partnerships</h3>
            <p className="mt-2 text-muted-foreground">
              Authorized distributor for INNO, Grandway, Claron & EXFO — genuine products only.
            </p>
          </Card>
          <Card className="p-6">
            <Building2 className="h-8 w-8 text-brand" />
            <h3 className="mt-4 text-xl font-semibold">Infrastructure</h3>
            <p className="mt-2 text-muted-foreground">
              Modern service labs, calibrated instruments and a ready inventory for immediate dispatch.
            </p>
          </Card>
          <Card className="p-6">
            <Users className="h-8 w-8 text-brand" />
            <h3 className="mt-4 text-xl font-semibold">Team</h3>
            <p className="mt-2 text-muted-foreground">
              Factory-trained engineers, application specialists and support staff dedicated to keeping your network up.
            </p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
