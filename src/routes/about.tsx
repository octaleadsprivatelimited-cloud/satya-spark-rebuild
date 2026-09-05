import { motion } from "framer-motion";
import { Award, Target, Users, Quote, MapPin, Calendar } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { CountUp } from "@/components/CountUp";
import { SITE } from "@/lib/site";

const timeline = [
  {
    year: "2013",
    title: "Manufacturer & Distributor",
    body: "SATYA POWER TECHNOLOGYS established as a leading manufacturer and distributor of Fusion Splicers, OTDRs, and fiber optic toolkits.",
  },
  {
    year: "2024",
    title: "Operations & Quality Upgrades",
    body: "Upgraded operations to match global standards, equipping facilities with state-of-the-art machinery and automated systems.",
  },
  {
    year: "2024",
    title: "Adhering to Best Practices",
    body: "Maintained the highest standards of quality through management systems and regular audits by leading certification bodies.",
  },
  {
    year: "2025",
    title: "Notable Market Growth",
    body: "Expanded market presence under the guidance of our mentor, Mr. V Dorababu (CEO), leveraging rich industrial experience.",
  },
];

const pillars = [
  {
    icon: Award,
    t: "Our Mission",
    d: "Deliver world-class fiber optic equipment with unmatched after-sales service.",
  },
  {
    icon: Target,
    t: "Our Vision",
    d: "Be the most trusted fiber optic partner in South India by combining sales with real service.",
  },
  {
    icon: Users,
    t: "Our People",
    d: "An experienced team of engineers and field technicians committed to your uptime.",
  },
];

import { SEO } from "@/components/SEO";

function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about SATYA POWER TECHNOLOGYS, founded in 2013 under the leadership of Mr. V Dorababu. Discover our mission, values, and our journey as a leading provider of fiber optic and industrial technology services."
        keywords="about satya power, mr v dorababu, fiber optic solutions company, company profile"
      />
      <PageHero
        eyebrow="OUR STORY"
        title="Built on trust. Backed by service."
        description={SITE.tagline}
      />

      {/* Mission / Vision / People */}
      <section className="py-12 md:py-16 bg-muted border-b border-border">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-sm font-normal text-muted-foreground mb-2">What drives us</div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Service first. Sales next.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-card border border-border p-7 hover:border-primary transition"
              >
                <div className="h-12 w-12 bg-accent text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-normal text-foreground">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "13+", l: "Years in business" },
              { v: "5000+", l: "Happy Customers" },
              { v: "2", l: "States covered" },
              { v: "7+", l: "Authorized brands" },
            ].map((s) => (
              <div key={s.l} className="bg-card border border-border p-5 text-center">
                <div className="text-3xl md:text-4xl font-light text-primary">
                  <CountUp value={s.v} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-sm font-normal text-muted-foreground mb-2">Milestones</div>
            <h2 className="text-3xl md:text-5xl font-light text-foreground">Our Journey</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border p-6 hover:border-primary transition"
              >
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <Calendar className="h-4 w-4" /> {t.year}
                </div>
                <div className="text-xl font-normal text-foreground mt-3">{t.title}</div>
                <p className="text-muted-foreground text-sm mt-2">{t.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Location card */}
          <div className="mt-12 bg-primary text-primary-foreground p-8 md:p-10 grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-8 w-8 text-primary-foreground shrink-0" />
              <div>
                <div className="text-sm font-normal text-primary-foreground/75 mb-1">
                  Billing Address
                </div>
                <div className="text-lg font-medium">Peddapuram, Andhra Pradesh</div>
                <p className="text-sm text-primary-foreground/85 mt-1 max-w-xl">{SITE.address}</p>
                <p className="text-xs text-primary-foreground/70 mt-2">
                  GSTIN: {SITE.gstin} · {SITE.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-8 w-8 text-primary-foreground shrink-0" />
              <div>
                <div className="text-sm font-normal text-primary-foreground/75 mb-1">
                  Head Office
                </div>
                <div className="text-lg font-medium">Hyderabad, Telangana</div>
                <p className="text-sm text-primary-foreground/85 mt-1 max-w-xl">
                  {SITE.addressAlt}
                </p>
                <p className="text-xs text-primary-foreground/70 mt-2">{SITE.phoneAlt}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

export default AboutPage;
