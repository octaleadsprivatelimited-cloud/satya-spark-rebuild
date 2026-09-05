import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { useBrands } from "@/lib/brands-data";
import { getBrandLogo } from "@/lib/brand-logos";

const brands = [
  {
    name: "Fujikura",
    tag: "Japan",
    desc: "Premium fusion splicers (90S+, 41S+) trusted globally for active fusion control and ruggedness.",
  },
  {
    name: "Sumitomo",
    tag: "Japan",
    desc: "T-72C+ and Z2C splicers — engineered for reliability and field-proven precision.",
  },
  {
    name: "Grandway",
    tag: "China",
    desc: "Cost-effective OTDRs and optical power meters for FTTH and maintenance crews.",
  },
  {
    name: "EXFO",
    tag: "Canada",
    desc: "MaxTester series OTDRs with iOLM intelligent analysis — industry benchmark.",
  },
  {
    name: "VIAVI",
    tag: "USA",
    desc: "MTS-2000 modular platform OTDRs for metro, long-haul and FTTx testing.",
  },
  {
    name: "Fiberfox",
    tag: "Korea",
    desc: "Mini fusion splicers ideal for FTTH and access network installations.",
  },
];

const innoHighlights = [
  "View 7 / View 5 / View 3 fusion splicers",
  "Genuine spares & electrodes",
  "In-region calibration & repair",
  "Warranty backed by manufacturer",
];

function BrandsPage() {
  const { items: adminBrands } = useBrands();
  const filteredBrands = (adminBrands || []).filter(
    (b) => !b.name.toLowerCase().includes("satya power") && b.name.toUpperCase() !== "SKL",
  );

  // 1. Authorized Brands Logo Grid: only INNO, Grandway, Claron, EXFO
  const logoGridBrands = filteredBrands.filter((b) => {
    const nameLower = b.name.trim().toLowerCase();
    return (
      nameLower === "inno" ||
      nameLower === "inno instrument" ||
      nameLower === "grandway" ||
      nameLower === "claron" ||
      nameLower === "exfo"
    );
  });

  const logoByName = new Map(
    filteredBrands
      .filter((b) => b.logo)
      .map((b) => [b.name.trim().toLowerCase(), b.logo as string]),
  );

  // 2. Base Portfolio Brands (Fujikura, Sumitomo, VIAVI, Fiberfox - excluding Grandway & EXFO)
  const basePortfolio = brands.filter((b) => {
    const nameLower = b.name.toLowerCase();
    return nameLower !== "grandway" && nameLower !== "exfo";
  });

  // 3. Admin-added custom brands that are not core brands
  const customAdditional = filteredBrands
    .filter((b) => {
      const nameLower = b.name.trim().toLowerCase();
      // Exclude core brands
      if (
        nameLower === "inno" ||
        nameLower === "inno instrument" ||
        nameLower === "grandway" ||
        nameLower === "claron" ||
        nameLower === "exfo"
      ) {
        return false;
      }
      // Exclude hardcoded portfolio brands to avoid duplicates
      const isHardcoded = basePortfolio.some((hp) => hp.name.toLowerCase() === nameLower);
      return !isHardcoded;
    })
    .map((b) => ({
      name: b.name,
      logo: b.logo || getBrandLogo(b.name),
      desc: b.description || "Authorized partner providing premium equipment and warranty support.",
      tag: "Partner",
    }));

  // 4. Combined Additional Brands
  const portfolioBrands = [
    ...basePortfolio.map((b) => ({
      ...b,
      logo: logoByName.get(b.name.trim().toLowerCase()) || getBrandLogo(b.name),
    })),
    ...customAdditional,
  ];

  const defaultAuthorizedBrands = [
    { id: "seed-inno", name: "INNO Instrument", logo: getBrandLogo("inno") },
    { id: "seed-grandway", name: "Grandway", logo: getBrandLogo("grandway") },
    { id: "seed-claron", name: "Claron", logo: getBrandLogo("claron") },
    { id: "seed-exfo", name: "EXFO", logo: getBrandLogo("exfo") },
  ];
  const displayBrands = logoGridBrands.length > 0 ? logoGridBrands : defaultAuthorizedBrands;

  return (
    <>
      <SEO
        title="Authorized Brands"
        description="We represent world-leading fiber optic brands. Explore our partnerships with INNO Instrument, Grandway, Claron, EXFO, Fujikura, Sumitomo, and VIAVI."
        keywords="inno instrument, grandway, exfo, fujikura, sumitomo, claron, fiber brands"
      />
      <PageHero
        eyebrow="OUR PARTNERS"
        title="Brands We Represent"
        description="Genuine equipment from the world's most trusted fiber optic manufacturers."
      />

      {/* Authorized Distributor Section */}
      <section className="py-12 md:py-20 relative overflow-hidden bg-background border-b border-border">
        <div className="relative mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Content Column */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 mb-5 text-sm font-normal">
                <Award className="h-3.5 w-3.5" /> AUTHORIZED DISTRIBUTOR
              </div>
              <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground">
                Official Sales & Service Partner
                <span className="block text-primary text-base md:text-lg font-normal mt-3">
                  FOR ANDHRA PRADESH & TELANGANA
                </span>
              </h2>
              <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-xl">
                SATYA POWER TECHNOLOGYS is the Authorized Distributor for **INNO Instrument**,
                **Grandway**, **Claron**, and **EXFO** across both states. We provide genuine
                equipment, full manufacturer warranty support, certified calibration, and in-region
                spare parts.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md border-t border-border pt-6">
                <StatLight label="Authorized Brands" value="04" />
                <StatLight label="Years Partnered" value="13+" />
                <StatLight label="Service Branches" value="05" />
                <StatLight label="Genuine Spares" value="100%" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-normal hover:bg-brand-red-dark transition text-sm"
                >
                  Shop Authorized Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 font-normal hover:bg-accent hover:border-primary transition text-foreground text-sm"
                >
                  Service & Repair
                </Link>
              </div>
            </div>

            {/* Logos Grid Column */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {displayBrands.map((b) => {
                  const logo = b.logo || getBrandLogo(b.name);
                  return (
                    <div
                      key={b.id}
                      className="bg-card border border-border p-5 flex flex-col items-center justify-center gap-4 hover:border-primary transition rounded-xl aspect-[4/3] bg-white"
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt={`${b.name} logo`}
                          loading="lazy"
                          className="h-14 md:h-16 w-full object-contain"
                        />
                      ) : (
                        <div className="h-14 md:h-16 w-full grid place-items-center text-xl font-light text-primary bg-muted rounded">
                          {b.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="text-xs font-semibold text-foreground text-center tracking-wide uppercase">
                        {b.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional brands */}
      <section className="py-12 md:py-16 bg-muted border-y border-border">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="flex items-end justify-between mb-8 md:mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-sm font-normal text-muted-foreground mb-2">Portfolio</div>
              <h2 className="text-2xl md:text-4xl font-light text-foreground">
                Our Additional Brands
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Premium fusion splicers, OTDRs and field tools — all backed by our in-region service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {portfolioBrands.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-card border border-border p-5 md:p-7 hover:border-primary transition overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                <div className="flex items-center justify-between mb-4 gap-3">
                  <div className="h-14 w-20 shrink-0 border border-border bg-muted/70 grid place-items-center overflow-hidden p-2">
                    {b.logo ? (
                      <img
                        src={b.logo}
                        alt={`${b.name} logo`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-lg font-light text-primary">
                        {b.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="min-w-0 flex-1 text-xl md:text-2xl font-light text-foreground group-hover:text-primary transition break-words">
                    {b.name}
                  </h3>
                  <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 shrink-0">
                    {b.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function StatLight({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted border border-border p-3">
      <div className="text-xl font-light text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default BrandsPage;
