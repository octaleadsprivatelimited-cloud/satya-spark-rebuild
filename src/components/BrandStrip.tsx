import { useBrands } from "@/lib/brands-data";
import { getBrandLogo } from "@/lib/brand-logos";

export function BrandStrip() {
  const { items } = useBrands();
  const brands = (items || []).filter((b) => {
    const nameLower = b.name.trim().toLowerCase();
    return (
      nameLower === "inno" ||
      nameLower === "inno instrument" ||
      nameLower === "grandway" ||
      nameLower === "claron" ||
      nameLower === "exfo"
    );
  });
  const loop = [...brands, ...brands];

  return (
    <section className="bg-background py-10 md:py-14 border-y border-border">
      <div className="mx-auto max-w-[1920px] px-6 md:px-16">
        <div className="flex items-center gap-3 mb-6 md:mb-8 justify-center">
          <div className="h-px w-8 md:w-10 bg-border" />
          <span className="text-sm font-normal text-muted-foreground text-center">
            Authorized Brands & Partners
          </span>
          <div className="h-px w-8 md:w-10 bg-border" />
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex gap-3 md:gap-6 animate-marquee w-max">
            {loop.map((b, idx) => {
              const logo = b.logo || getBrandLogo(b.name);
              return (
                <div
                  key={`${b.id ?? b.name}-${idx}`}
                  className="shrink-0 w-32 md:w-48 h-20 md:h-24 flex flex-col items-center justify-center text-center py-2 px-2 md:py-3 md:px-3 border bg-card border-border hover:border-primary transition"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={b.name}
                      loading="lazy"
                      className="max-h-10 md:max-h-14 max-w-full object-contain"
                    />
                  ) : (
                    <div className="font-light text-sm md:text-lg text-foreground/80">{b.name}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
