import { useSuspenseQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { listServices } from "@/lib/services/data-service";

const servicesQuery = { queryKey: ["services"], queryFn: listServices };

export default function ServicesPage() {
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <SiteLayout>
      <Seo title="Services — Fiber & EV Battery | Satya Power Technologys"
        description="Fusion splicer repair, OTDR calibration, on-site support, AMC contracts and EV battery servicing across AP & Telangana." />
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest opacity-80">What we do</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Services</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Repair, calibration, on-site engineering and EV battery servicing — all under one roof.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] as Icons.LucideIcon | undefined) ?? Icons.Wrench;
            return (
              <Card key={s.id} className="p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand text-brand-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <Button asChild variant="link" className="mt-3 px-0 text-brand">
                  <a href={`https://wa.me/919542840444?text=I%20need%20service%3A%20${encodeURIComponent(s.title)}`}>
                    Request service →
                  </a>
                </Button>
              </Card>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
