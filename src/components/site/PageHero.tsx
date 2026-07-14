import { ReactNode } from "react";
import heroBg from "@/assets/hero-globe.jpg";

interface PageHeroProps {
  image?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function PageHero({ image, eyebrow, title, subtitle, size = "md" }: PageHeroProps) {
  const pad =
    size === "lg" ? "py-24 md:py-32" : size === "sm" ? "py-14 md:py-16" : "py-20 md:py-24";
  return (
    <section className="relative isolate overflow-hidden text-white bg-[#061128]">
      <img
        src={image ?? heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061128] via-[#061128]/85 to-[#061128]/40" />
      <div className={`relative container-page ${pad}`}>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7fb0ff]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-white/75 text-sm md:text-base">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
