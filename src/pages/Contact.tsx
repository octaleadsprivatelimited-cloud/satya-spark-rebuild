import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/Seo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitInquiry } from "@/lib/services/data-service";
import { branches, offices, whatsappLink } from "@/lib/mock-data";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        subject: String(fd.get("subject") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
      toast.success("Thanks! We'll get back to you within hours.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <Seo title="Contact — Satya Power Technologys"
        description="Quotes, service requests, partnership enquiries — we typically reply within hours. Reach us via phone, email or WhatsApp." />
      <PageHero
        image="/ref/hyderabad-CC_eXlg0.jpg"
        eyebrow="Get in touch"
        title="Let's talk fiber."
        size="lg"
        subtitle="Quotes, service requests, partnership enquiries — we typically reply within hours."
      />

      <section className="py-16">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {offices.map((o) => (
            <Card key={o.id} className="p-6 md:p-8">
              <p className="text-sm uppercase tracking-widest text-brand font-semibold">{o.label}</p>
              <h3 className="mt-2 text-xl font-bold">{o.company}</h3>
              <p className="mt-1 font-medium">{o.city}</p>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand" />{o.address}
              </p>
              {o.gstin ? <p className="mt-2 text-xs text-muted-foreground">GSTIN: <span className="font-medium">{o.gstin}</span></p> : null}
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" />
                  <a href={`tel:${o.phoneTel}`} className="text-brand font-semibold hover:underline">{o.phone}</a></li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" />
                  <a href={`mailto:${o.email}`} className="text-brand hover:underline break-all">{o.email}</a></li>
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page grid gap-6 lg:grid-cols-[1.4fr_1fr] items-stretch">
          <a href={whatsappLink()} target="_blank" rel="noreferrer"
            className="group rounded-2xl bg-[oklch(0.7_0.17_150)] text-white p-8 md:p-10 flex items-center justify-between gap-6 shadow-[var(--shadow-elegant)]">
            <div>
              <p className="text-sm uppercase tracking-widest opacity-90">WhatsApp</p>
              <h3 className="mt-1 text-2xl md:text-3xl font-bold">Chat with us</h3>
              <p className="mt-2 text-white/85 max-w-md">
                Fastest way to reach us — send product photos, share requirements, or get a quote in minutes.
              </p>
            </div>
            <div className="grid h-16 w-16 md:h-20 md:w-20 shrink-0 place-items-center rounded-full bg-white/20 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 md:h-10 md:w-10" />
            </div>
          </a>
          <Card className="p-6 flex flex-col justify-center items-start gap-4">
            <p className="text-sm uppercase tracking-widest text-brand font-semibold">Our reviews</p>
            <GoogleReviews />
            <p className="text-sm text-muted-foreground">
              Read what our customers across AP & Telangana say about our sales and service.
            </p>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <p className="text-sm uppercase tracking-widest text-brand font-semibold">Service branches</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold">Reach the closest team</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {branches.map((b) => (
              <Card key={b.city} className="p-4">
                <div className="font-semibold text-brand">{b.city}</div>
                <div className="text-xs text-muted-foreground">{b.type}</div>
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="mt-2 inline-flex items-center gap-1 text-sm text-brand hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {b.phone}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <Card className="p-6 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the form and our team will respond within hours.
            </p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required className="mt-1.5" /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" required className="mt-1.5" /></div>
              </div>
              <div><Label htmlFor="email">Email (Optional)</Label><Input id="email" name="email" type="email" className="mt-1.5" /></div>
              <div><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" required className="mt-1.5" /></div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required rows={5} className="mt-1.5" /></div>
              <Button type="submit" variant="brand" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
