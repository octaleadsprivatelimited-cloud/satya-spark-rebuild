import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { submitInquiry } from "@/lib/admin-data";
import { useServicesStore, ICONS } from "@/lib/services-data";
import { BRANCHES } from "@/lib/branches";
import { MapPin, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/site";

interface Form {
  name: string;
  phone: string;
  equipment: string;
  issue: string;
}

function ServicesPage() {
  const [sent, setSent] = useState(false);
  const { items } = useServicesStore();
  const services = items.map((s) => ({
    icon: ICONS[s.iconName] ?? ICONS.Wrench,
    t: s.title,
    d: s.description,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Form>();
  const onSubmit = async (data: Form) => {
    try {
      await submitInquiry({
        name: data.name,
        phone: data.phone,
        subject: `Service: ${data.equipment}`,
        message: data.issue,
      });
    } catch (e) {
      console.error(e);
      toast.error("Service request could not be sent. Please try again or call us.");
      return;
    }
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <SEO
        title="Our Services"
        description="Professional repair, calibration, preventive maintenance, EV battery cell replacement, and on-site support for fiber optic splicers and OTDRs. We service AP & Telangana."
        keywords="splicer repair, otdr calibration, battery cell replacement, service centers ap, service support"
      />
      <PageHero
        eyebrow="OUR DIFFERENTIATOR"
        title={
          <>
            We Don't Just Sell — <span className="text-primary">We Service.</span>
          </>
        }
        description="Competitors stop at the sale. We go further — providing authorized repair, calibration and on-site support for every product we deliver."
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border p-7 hover:border-primary transition group"
              >
                <div className="h-12 w-12 bg-accent text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-normal text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted border-y border-border">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-sm font-normal text-muted-foreground mb-3">Coverage</div>
            <h2 className="text-3xl md:text-5xl font-light text-foreground">
              Service across Andhra Pradesh & Telangana
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our five authorized service centers reach every major city in AP & Telangana. Typical
              turnaround: 48 hours for diagnosis, same-week resolution.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {BRANCHES.map((b) => (
                <div key={b.city} className="bg-card border-l-4 border-primary px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {b.city}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{b.role}</div>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <Phone className="h-3 w-3" /> Contact Us
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-7 border border-border">
            <h3 className="text-2xl font-light text-foreground">Book a Service</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tell us about your equipment — we'll get back within hours.
            </p>
            {sent ? (
              <div className="mt-6 bg-accent border border-primary p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-primary">Request received</div>
                  <div className="text-sm text-muted-foreground">
                    Our team will contact you shortly.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                <Field label="Your name" error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Required" })}
                    className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone", {
                      required: "Required",
                      pattern: { value: /^[0-9+\s-]{8,}$/, message: "Invalid phone" },
                    })}
                    className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </Field>
                <Field label="Equipment (brand + model)" error={errors.equipment?.message}>
                  <input
                    {...register("equipment", { required: "Required" })}
                    placeholder="e.g. INNO View 7"
                    className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </Field>
                <Field label="Issue / service required" error={errors.issue?.message}>
                  <textarea
                    rows={3}
                    {...register("issue", {
                      required: "Required",
                      maxLength: { value: 1000, message: "Max 1000 chars" },
                    })}
                    className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-normal py-3 hover:bg-brand-red-dark transition"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}

export default ServicesPage;
