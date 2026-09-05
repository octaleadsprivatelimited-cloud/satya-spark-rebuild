import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useGallery, GALLERY_CATEGORIES, type GalleryItem } from "@/lib/gallery-data";
import { SEO } from "@/components/SEO";

function GalleryPage() {
  const { items, loading } = useGallery();
  const [cat, setCat] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = cat === "All" ? items : items.filter((i) => i.category === cat);

  return (
    <>
      <SEO
        title="Gallery"
        description="Explore photos of our services, customer training sessions, events, state-of-the-art repair facilities, and team field support operations across AP & Telangana."
        keywords="satya power gallery, service photos, customer training, workshop photos"
      />
      <PageHero
        eyebrow="OUR WORK"
        title="Gallery"
        description="Photos from our service center, field installations, training sessions and events across AP & Telangana."
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          {/* Filter pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`text-sm font-normal px-4 py-2 border transition ${
                    cat === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {loading && items.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/40" />
              <p className="mt-4 text-muted-foreground">No photos yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((it, idx) => (
                <motion.button
                  type="button"
                  key={it.id}
                  onClick={() => setLightbox(it)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (idx % 8) * 0.04 }}
                  className="group relative aspect-square overflow-hidden border border-border bg-muted"
                >
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-left opacity-0 group-hover:opacity-100 transition">
                    {it.category && (
                      <div className="text-[11px] font-normal text-primary-foreground/80">
                        {it.category}
                      </div>
                    )}
                    <div className="text-xs font-medium text-primary-foreground line-clamp-2">
                      {it.title}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 grid place-items-center"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded"
              />
              <div className="text-center mt-4 text-white">
                {lightbox.category && (
                  <div className="text-xs font-normal text-primary">{lightbox.category}</div>
                )}
                <div className="font-medium mt-1">{lightbox.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Re-export so gallery-data categories are accessible from a single import too
export { GALLERY_CATEGORIES };

export default GalleryPage;
