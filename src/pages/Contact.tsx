import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitInquiry } from "@/lib/services/data-service";
import { offices, whatsappLink } from "@/lib/mock-data";

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
      <Seo
        title="Contact — Satya Power Technologys"
        description="Quotes, service requests, partnership enquiries — we typically reply within hours."
      />
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk fiber."
        size="lg"
        subtitle="Quotes, service requests, partnership enquiries — we typically reply within hours."
      />

      <section className="py-14">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          {/* Left column: offices + whatsapp + map */}
          <div className="space-y-5">
            {offices.map((o, i) => (
              <div
                key={o.id}
                className={`rounded-md border bg-white p-5 ${i === 0 ? "border-brand" : "border-border"}`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  <MapPin className="h-3.5 w-3.5" /> {o.label}
                </div>
                <p className="mt-3 text-sm text-foreground/80">{o.address}</p>
                <div className="mt-3 border-t border-border pt-3 space-y-1.5 text-sm">
                  <a href={`tel:${o.phoneTel}`} className="flex items-center gap-2 text-foreground/80 hover:text-brand">
                    <Phone className="h-3.5 w-3.5 text-brand" /> {o.phone}
                  </a>
                  <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-foreground/80 hover:text-brand">
                    <Mail className="h-3.5 w-3.5 text-brand" /> {o.email}
                  </a>
                </div>
              </div>
            ))}

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md overflow-hidden shadow-sm"
            >
              <div className="bg-brand text-brand-foreground px-5 py-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-semibold">Whatsapp</span>
                <span className="ml-auto text-sm opacity-90">Chat with us</span>
              </div>
              <div className="h-56 md:h-64 bg-secondary">
                <iframe
                  title="Location map"
                  src="https://www.google.com/maps?q=Peddapuram,+Andhra+Pradesh&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </a>
          </div>

          {/* Right column: form */}
          <div className="rounded-md border border-border bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold">Send a message</h2>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="name" className="text-xs uppercase tracking-wide">Name</Label><Input id="name" name="name" required className="mt-1.5" /></div>
                <div><Label htmlFor="phone" className="text-xs uppercase tracking-wide">Phone</Label><Input id="phone" name="phone" required className="mt-1.5" /></div>
              </div>
              <div><Label htmlFor="email" className="text-xs uppercase tracking-wide">Email (Optional)</Label><Input id="email" name="email" type="email" className="mt-1.5" /></div>
              <div><Label htmlFor="subject" className="text-xs uppercase tracking-wide">Subject</Label><Input id="subject" name="subject" required className="mt-1.5" /></div>
              <div><Label htmlFor="message" className="text-xs uppercase tracking-wide">Message</Label><Textarea id="message" name="message" required rows={5} className="mt-1.5" /></div>
              <Button type="submit" variant="brand" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <QuoteCta />
    </SiteLayout>
  );
}
