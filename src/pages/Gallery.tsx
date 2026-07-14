import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/Seo";
import { QuoteCta } from "@/components/site/QuoteCta";
import { listGallery } from "@/lib/services/data-service";
import { getYouTubeEmbed } from "@/lib/media";
import { cn } from "@/lib/utils";

const q = { queryKey: ["gallery"], queryFn: listGallery };

export default function GalleryPage() {
  const { data } = useSuspenseQuery(q);
  const [filter, setFilter] = useState<string>("All");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const cats = useMemo(() => ["All", ...Array.from(new Set(data.map((g) => g.category)))], [data]);
  const items = filter === "All" ? data : data.filter((g) => g.category === filter);
  const embed = videoUrl ? getYouTubeEmbed(videoUrl) : null;

  return (
    <SiteLayout>
      <Seo title="Gallery — Satya Power Technologys" description="Photos and videos of our service, field work, products, branches and team." />
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        size="lg"
        subtitle="Photos and videos from our service, field work, products and team."
      />
      <section className="py-10 border-b border-border">
        <div className="container-page flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={cn("px-4 py-1.5 rounded-full text-sm border transition-colors",
                filter === c ? "bg-brand text-brand-foreground border-brand" : "bg-background hover:bg-accent border-border")}>
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="py-12">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => {
            const isVideo = !!g.videoUrl;
            return (
              <figure key={g.id}
                onClick={() => isVideo && setVideoUrl(g.videoUrl!)}
                className={cn("group relative overflow-hidden rounded-lg bg-secondary aspect-[4/3]", isVideo && "cursor-pointer")}>
                <img src={g.image} alt={g.title} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {isVideo ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="rounded-full bg-white/90 p-4 shadow-lg">
                      <Play className="h-6 w-6 text-brand" fill="currentColor" />
                    </div>
                  </div>
                ) : null}
                <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-sm">
                  {g.title}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>
      <QuoteCta />

      {embed ? (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setVideoUrl(null)}>
          <button className="absolute top-4 right-4 text-white p-2" onClick={() => setVideoUrl(null)} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe src={embed} title="Video" className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </div>
      ) : null}
    </SiteLayout>
  );
}
