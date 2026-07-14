import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      {heroSlides.map((s, idx) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden={idx !== i}
          loading={idx === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            idx === i ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 hero-overlay" />
      <div className="container-page relative py-24 md:py-36 lg:py-44 max-w-3xl text-brand-foreground">
        {heroSlides.map((s, idx) => (
          <div
            key={s.title}
            className={cn(
              "transition-all duration-700",
              idx === i ? "opacity-100 translate-y-0" : "absolute inset-x-0 top-24 md:top-36 lg:top-44 opacity-0 translate-y-4 pointer-events-none",
            )}
            aria-hidden={idx !== i}
          >
            <Badge className="mb-5 bg-amber text-amber-foreground border-0 gap-2">
              <Award className="h-3.5 w-3.5" />
              {s.kicker}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              {s.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl">
              {s.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link to={s.primary.to}>
                  {s.primary.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white/40 hover:bg-white hover:text-brand"
              >
                <Link to={s.secondary.to}>
                  {s.secondary.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}

        <div className="mt-10 flex items-center gap-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-10 bg-amber" : "w-6 bg-white/40 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
