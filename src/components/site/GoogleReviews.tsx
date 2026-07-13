import { Star } from "lucide-react";

export function GoogleReviews({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="https://www.google.com/search?q=Satya+Power+Technologys+reviews"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm hover:shadow-[var(--shadow-elegant)] transition-shadow"
    >
      <img
        src="/ref/google-reviews-Cnfe1N-x.png"
        alt="Google Reviews"
        className="h-8 w-auto"
        loading="lazy"
      />
      {compact ? null : (
        <div className="leading-tight">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-amber text-amber" />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            Rated 5.0 by our customers
          </div>
        </div>
      )}
    </a>
  );
}
