import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listBlog } from "@/lib/services/data-service";

const q = { queryKey: ["blog"], queryFn: listBlog };

export default function BlogPage() {
  const { data } = useSuspenseQuery(q);
  return (
    <SiteLayout>
      <Seo title="Blog & News — Satya Power Technologys"
        description="Guides, product updates and industry news on fiber optics and EV battery service." />
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest opacity-80">Insights</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Blog & News</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((post) => (
            <Card key={post.id} className="overflow-hidden group">
              <div className="aspect-[16/9] overflow-hidden bg-secondary">
                <img src={post.cover} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 justify-between text-xs text-muted-foreground">
                  <Badge variant="outline">{post.tags[0] ?? "News"}</Badge>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{post.publishedAt}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-tight">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
