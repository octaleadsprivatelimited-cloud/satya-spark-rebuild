import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";
import { submitInquiry } from "@/lib/admin-data";
import { sendToFormspree } from "@/lib/formspree";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";

interface Form {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Form>();
  const onSubmit = async (data: Form) => {
    const results = await Promise.allSettled([
      sendToFormspree({ _subject: `Contact: ${data.subject}`, type: "Contact Form", ...data }),
      submitInquiry(data),
    ]);
    const delivered =
      (results[0].status === "fulfilled" && results[0].value === true) ||
      results[1].status === "fulfilled";
    if (!delivered) {
      toast.error("Message could not be sent. Please try again or contact us on WhatsApp.");
      return;
    }

    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with SATYA POWER TECHNOLOGYS. Contact our Billing Address in Peddapuram or our Head Office in Hyderabad for sales quotes, support inquiries, or repair requests."
        keywords="contact satya power, office address, customer support phone, whatsapp contact"
      />
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let's talk fiber."
        description="Quotes, service requests, partnership enquiries — we typically reply within hours."
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16 grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="space-y-6">
            <AddressBlock
              label="Billing Address"
              name={SITE.name}
              address={SITE.address}
              gstin={SITE.gstin}
              phone={SITE.phone}
              phoneRaw={SITE.phoneRaw}
              email={SITE.email}
              website={SITE.website}
              primary
            />
            <AddressBlock
              label="Head Office"
              name={SITE.name}
              address={SITE.addressAlt}
              phone={SITE.phoneAlt}
              phoneRaw={SITE.phoneRawAlt}
              email={SITE.email}
            />

            <ContactRow
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with us"
              href={whatsappLink()}
              accent
            />

            <div className="aspect-video bg-muted border border-border overflow-hidden">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.2,17.2,78.7,17.6&layer=mapnik"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-card border border-border p-7">
            <h2 className="text-2xl font-light text-foreground">Send a message</h2>
            {sent ? (
              <div className="mt-6 bg-accent border border-primary p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-primary">Message sent</div>
                  <div className="text-sm text-muted-foreground">
                    We'll get back to you shortly.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid sm:grid-cols-2 gap-4">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Required", maxLength: 100 })}
                    className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone", { required: "Required" })}
                    className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email (Optional)" error={errors.email?.message}>
                    <input
                      {...register("email", {
                        validate: (value) =>
                          !value || /^\S+@\S+\.\S+$/.test(value) || "Invalid email",
                      })}
                      className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Subject" error={errors.subject?.message}>
                    <input
                      {...register("subject", { required: "Required", maxLength: 150 })}
                      className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message" error={errors.message?.message}>
                    <textarea
                      rows={5}
                      {...register("message", {
                        required: "Required",
                        maxLength: { value: 1000, message: "Max 1000 chars" },
                      })}
                      className="w-full border border-input px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </Field>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:col-span-2 bg-primary text-primary-foreground font-normal py-3 hover:bg-brand-red-dark transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: import("lucide-react").LucideIcon;
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
}) {
  const inner = (
    <div
      className={`flex items-start gap-4 p-5 border ${accent ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"} transition`}
    >
      <Icon className="h-6 w-6 shrink-0 mt-0.5" />
      <div>
        <div
          className={`text-xs font-normal ${accent ? "text-primary-foreground/80" : "text-primary"}`}
        >
          {label}
        </div>
        <div className="font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

function AddressBlock({
  label,
  name,
  address,
  gstin,
  phone,
  phoneRaw,
  email,
  website,
  primary,
}: {
  label: string;
  name: string;
  address: string;
  gstin?: string;
  phone: string;
  phoneRaw: string;
  email: string;
  website?: string;
  primary?: boolean;
}) {
  return (
    <div className={`border p-5 ${primary ? "bg-card border-primary" : "bg-card border-border"}`}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className={`h-5 w-5 ${primary ? "text-primary" : "text-muted-foreground"}`} />
        <span
          className={`text-xs font-medium uppercase tracking-wider ${primary ? "text-primary" : "text-muted-foreground"}`}
        >
          {label}
        </span>
      </div>
      <div className="font-medium text-foreground">{name}</div>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{address}</p>
      {gstin && (
        <div className="text-xs text-muted-foreground mt-2">
          GSTIN: <span className="font-mono">{gstin}</span>
        </div>
      )}
      <ul className="mt-3 space-y-1.5 text-sm">
        <li className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-primary" />
          <a href={`tel:${phoneRaw}`} className="hover:text-primary">
            {phone}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 text-primary" />
          <a href={`mailto:${email}`} className="hover:text-primary">
            {email}
          </a>
        </li>
        {website && (
          <li className="flex items-center gap-2 text-muted-foreground">
            <span className="h-3.5 w-3.5 inline-block" />
            {website}
          </li>
        )}
      </ul>
    </div>
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

export default ContactPage;
