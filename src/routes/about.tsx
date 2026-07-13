import { createFileRoute } from "@tanstack/react-router";
import { Award, Building2, HeartHandshake, Rocket, Target, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Satya Power Technologys" },
      { name: "description", content: "Learn about Satya Power Technologys — authorized distributor of fiber optic tools with 13+ years of expertise." },
      { property: "og:title", content: "About Satya Power Technologys" },
      { property: "og:description", content: "13+ years serving fiber optic and EV service customers across AP & Telangana." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Precision", body: "Factory-grade tools, factory-grade service — nothing less." },
  { icon: HeartHandshake, title: "Trust", body: "Transparent pricing and honest advice on every engagement." },
  { icon: Rocket, title: "Progress", body: "From fiber optics to EV battery service — always evolving." },
];

const milestones = [
  { year: "2011", title: "Founded in Andhra Pradesh", body: "Started as a specialized fiber optic tools supplier." },
  { year: "2015", title: "Authorized Distributor", body: "Became authorized distributor for INNO and partner brands." },
  { year: "2019", title: "Service network", body: "Expanded to 5 service branches across AP & Telangana." },
  { year: "2024", title: "EV Battery Services", body: "Launched EV battery repair and cell replacement services." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-20 md:py-28">
          <p className="text-sm uppercase tracking-widest opacity-80">Our story</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance">
            Engineering the network India runs on.
          </h1>
          <p className="mt-5 max-w-3xl text-white/85 text-lg">
            Satya Power Technologys is a fiber optic tools distributor and service specialist based in
            Andhra Pradesh with pan-India reach. We serve ISPs, enterprises, government bodies and
            technicians with genuine equipment and factory-trained service.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-6">
              <v.icon className="h-8 w-8 text-brand" />
              <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-bold">Milestones</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <Card key={m.year} className="p-6">
                <div className="text-brand text-3xl font-bold">{m.year}</div>
                <h3 className="mt-2 font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <Card className="p-6">
            <Users className="h-8 w-8 text-brand" />
            <h3 className="mt-4 text-xl font-semibold">Our team</h3>
            <p className="mt-2 text-muted-foreground">
              Factory-trained engineers, application specialists and support staff dedicated to keeping your network up.
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
            <Award className="h-8 w-8 text-brand" />
            <h3 className="mt-4 text-xl font-semibold">Partnerships</h3>
            <p className="mt-2 text-muted-foreground">
              Authorized distributor for INNO, Grandway, Claron and EXFO — with genuine products only.
            </p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
