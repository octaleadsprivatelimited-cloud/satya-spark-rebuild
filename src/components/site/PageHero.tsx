import { ReactNode } from "react";

interface PageHeroProps {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function PageHero({ image, eyebrow, title, subtitle, size = "md" }: PageHeroProps) {
  const pad =
    size === "lg" ? "py-20 md:py-28" : size === "sm" ? "py-14 md:py-16" : "py-16 md:py-20";
  return (
    <section className="relative isolate overflow-hidden text-white">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/90 via-brand/75 to-brand/50" />
      <div className={`relative container-page ${pad}`}>
        {eyebrow ? (
          <p className="text-sm uppercase tracking-widest opacity-80">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-balance">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-white/90 text-base md:text-lg">{subtitle}</p> : null}
      </div>
    </section>
  );
}
