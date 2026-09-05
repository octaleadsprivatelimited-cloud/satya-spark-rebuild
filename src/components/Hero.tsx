import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Award, MapPin, Battery } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import evService from "@/assets/ev-service.png";

const slides = [
  {
    eyebrow: { icon: Award, text: "AUTHORIZED DISTRIBUTOR" },
    title: "Fiber Optic Tools for AP & Telangana",
    body: "Authorized Distributor for Inno, Grandway, Claron & EXFO — sales and service across both states.",
    image: hero1,
  },
  {
    eyebrow: { icon: Battery, text: "EV BATTERY REPAIR" },
    title: "EV Battery Repair & Cell Replacement",
    body: "Providing expert EV battery diagnostics, repairs, and individual cell replacements to restore performance.",
    image: evService,
  },
  {
    eyebrow: { icon: Wrench, text: "SALES + SERVICE" },
    title: "We Don't Just Sell — We Service",
    body: "In-house repair, calibration & on-site support. Competitors only sell. We do both.",
    image: hero2,
  },
  {
    eyebrow: { icon: MapPin, text: "PREMIUM EQUIPMENT" },
    title: "Built for the Field, Trusted by Pros",
    body: "Inno, Grandway, Claron, EXFO, Fujikura, Sumitomo, VIAVI — all under one trusted roof.",
    image: hero3,
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  const Eyebrow = s.eyebrow.icon;

  return (
    <section className="relative bg-brand-black text-primary-foreground overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={idx === 0 || idx === i ? slide.image : undefined}
            fetchPriority={idx === 0 ? "high" : "low"}
            decoding="async"
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === i ? "opacity-70" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/55 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1920px] px-6 md:px-16 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:col-start-2">
            <div className="inline-flex items-center gap-2 mb-5">
              <Eyebrow className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-normal text-primary-foreground/80">
                {s.eyebrow.text}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.16] text-primary-foreground">
              {s.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-primary-foreground/80 max-w-xl font-normal leading-relaxed">
              {s.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 h-10 px-8 bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-400 transition-colors min-w-36"
              >
                Shop products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 h-10 px-8 text-sm font-normal text-primary-foreground border border-primary-foreground/70 hover:bg-primary-foreground hover:text-foreground transition-colors min-w-36"
              >
                Our services
                <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-4" />
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 transition-all ${idx === i ? "w-4 bg-primary-foreground" : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
