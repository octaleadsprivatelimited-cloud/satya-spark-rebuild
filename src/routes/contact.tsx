import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitInquiry } from "@/lib/services/data-service";
import { branches } from "@/lib/mock-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Satya Power Technologys" },
      { name: "description", content: "Contact Satya Power Technologys for sales, service and quotes across Andhra Pradesh & Telangana." },
      { property: "og:title", content: "Contact us" },
      { property: "og:description", content: "Get a quote or on-site service — we respond within hours." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
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
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest opacity-80">Get in touch</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Contact us</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Sales, service and emergency support across Andhra Pradesh & Telangana.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <Phone className="h-6 w-6 text-brand" />
              <h3 className="mt-3 font-semibold">Call</h3>
              <a href="tel:+919542840444" className="text-brand">+91 95428 40444</a>
            </Card>
            <Card className="p-6">
              <Mail className="h-6 w-6 text-brand" />
              <h3 className="mt-3 font-semibold">Email</h3>
              <a href="mailto:info@satyapowertechnologys.in" className="text-brand break-all">
                info@satyapowertechnologys.in
              </a>
            </Card>
            <Card className="p-6">
              <MapPin className="h-6 w-6 text-brand" />
              <h3 className="mt-3 font-semibold">Branches</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {branches.map((b) => (
                  <li key={b.city} className="flex items-center justify-between gap-4">
                    <span>
                      <span className="font-medium">{b.city}</span>
                      <span className="text-muted-foreground"> · {b.type}</span>
                    </span>
                    <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="text-brand text-xs whitespace-nowrap">
                      {b.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold">Request a quote</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the form and our team will respond within hours.
            </p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" required className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required rows={5} className="mt-1.5" />
              </div>
              <Button type="submit" variant="brand" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send inquiry"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
