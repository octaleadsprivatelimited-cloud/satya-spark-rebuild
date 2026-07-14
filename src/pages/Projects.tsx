import { useSuspenseQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Seo } from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listProjects } from "@/lib/services/data-service";

const q = { queryKey: ["projects"], queryFn: listProjects };

export default function ProjectsPage() {
  const { data } = useSuspenseQuery(q);
  return (
    <SiteLayout>
      <Seo title="Projects — Satya Power Technologys"
        description="Fiber optic deployments, backbone testing and EV service projects delivered across South India." />
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        size="lg"
        subtitle="A look at deployments and service programs we've delivered for ISPs, enterprises and government."
      />
      <section className="py-16">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => (
            <Card key={p.id} className="overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 justify-between">
                  <Badge variant="outline">{p.category}</Badge>
                  <span className="text-xs text-muted-foreground">{p.year}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-brand">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <QuoteCta />
    </SiteLayout>
  );
}

