import type { ReactNode } from "react";
import heroBg from "@/assets/hero-bg-blue-v1.jpg";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  bgImage?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, bgImage, children }: Props) {
  const bg = bgImage ?? heroBg;
  return (
    <section className="relative bg-brand-black text-primary-foreground overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-[1920px] px-6 md:px-16 py-14 md:py-20 lg:py-24 pr-14 md:pr-8">
        {eyebrow && (
          <div className="text-sm font-normal text-primary-foreground/75 mb-3">{eyebrow}</div>
        )}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light max-w-4xl leading-[1.15] tracking-normal">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-primary-foreground/80 max-w-2xl text-base md:text-lg font-normal leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
