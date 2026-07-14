import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { listServices, submitInquiry } from "@/lib/services/data-service";
import { branches } from "@/lib/mock-data";

const servicesQuery = { queryKey: ["services"], queryFn: listServices };

export default function ServicesPage() {
  const { data } = useSuspenseQuery(servicesQuery);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        name: String(fd.get("name") ?? ""),
        email: "",
        phone: String(fd.get("phone") ?? ""),
        subject: `Service — ${fd.get("equipment") ?? ""}`,
        message: String(fd.get("message") ?? ""),
      });
      toast.success("Request received. We'll be in touch within hours.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <Seo
        title="Services — Fiber & EV Battery | Satya Power Technologys"
        description="Fusion splicer repair, OTDR calibration, on-site support, AMC contracts and EV battery servicing across AP & Telangana."
      />
      <PageHero
        eyebrow="Our comprehensive services"
        title={<>We Don't Just Sell — <span className="text-[#7fb0ff]">We Service.</span></>}
        size="lg"
        subtitle="Competitors stop at the sale. We go further — providing authorized repair, calibration and on-site support for every product we deliver."
      />

      {/* Service tiles */}
      <section className="py-16">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] as Icons.LucideIcon | undefined) ?? Icons.Wrench;
            return (
              <div key={s.id} className="rounded-md border border-border bg-white p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-brand/10 text-brand">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coverage + booking */}
      <section className="py-16 bg-secondary/40 border-y border-border">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Coverage</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              Service across Andhra Pradesh & Telangana
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg">
              Our five self-owned service centers reach every major city in AP & Telangana. Typical
              turnaround: 48 hours for diagnostics, same-week resolution.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {branches.map((b) => (
                <div key={b.city} className="rounded-md border-l-4 border-brand bg-white p-4">
                  <div className="font-semibold">{b.city}</div>
                  <div className="text-xs text-muted-foreground">{b.type}</div>
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="mt-2 inline-block text-xs text-brand hover:underline">
                    → Contact
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-border bg-white p-6 md:p-8">
            <h3 className="text-xl font-bold">Book a Service</h3>
            <p className="mt-1 text-sm text-muted-foreground">Tell us about your requirement — we'll get back within hours.</p>
            <form onSubmit={onSubmit} className="mt-5 grid gap-4">
              <div><Label htmlFor="name" className="text-xs uppercase tracking-wide">Your Name</Label><Input id="name" name="name" required className="mt-1.5" /></div>
              <div><Label htmlFor="phone" className="text-xs uppercase tracking-wide">Phone</Label><Input id="phone" name="phone" required className="mt-1.5" /></div>
              <div>
                <Label htmlFor="equipment" className="text-xs uppercase tracking-wide">Equipment (brand + model)</Label>
                <select id="equipment" name="equipment" className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>Select one…</option>
                  <option>Fusion Splicer</option>
                  <option>OTDR</option>
                  <option>Power Meter / VFL</option>
                  <option>Cleaver</option>
                  <option>EV Battery</option>
                  <option>Other</option>
                </select>
              </div>
              <div><Label htmlFor="message" className="text-xs uppercase tracking-wide">Issue / Message</Label><Textarea id="message" name="message" rows={3} className="mt-1.5" /></div>
              <Button type="submit" variant="brand" size="lg" disabled={loading}>
                {loading ? "Submitting…" : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <QuoteCta />
    </SiteLayout>
  );
}
