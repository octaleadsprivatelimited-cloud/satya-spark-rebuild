import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { listGallery } from "@/lib/services/data-service";
import { cn } from "@/lib/utils";

const q = { queryKey: ["gallery"], queryFn: listGallery };

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Satya Power Technologys" },
      { name: "description", content: "Photos of our service, field work, products, branches and team." },
      { property: "og:title", content: "Gallery" },
      { property: "og:description", content: "Behind the scenes at Satya Power Technologys." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: GalleryPage,
});

function GalleryPage() {
  const { data } = useSuspenseQuery(q);
  const [filter, setFilter] = useState<string>("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(data.map((g) => g.category)))], [data]);
  const items = filter === "All" ? data : data.filter((g) => g.category === filter);

  return (
    <SiteLayout>
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest opacity-80">Moments</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Gallery</h1>
        </div>
      </section>
      <section className="py-10 border-b border-border">
        <div className="container-page flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm border transition-colors",
                filter === c
                  ? "bg-brand text-brand-foreground border-brand"
                  : "bg-background hover:bg-accent border-border",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="py-12">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <figure key={g.id} className="group relative overflow-hidden rounded-lg bg-secondary aspect-[4/3]">
              <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-sm">
                {g.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
