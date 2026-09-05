import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappLink } from "@/lib/site";
import { z } from "zod";
import { toast } from "sonner";
import { sendToFormspree } from "@/lib/formspree";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{7,20}$/, "Invalid mobile number"),
  requirement: z.string().trim().min(1, "Requirement required").max(500),
  address: z.string().trim().min(1, "Address required").max(300),
});

export function QuoteDialog({
  trigger,
  productName,
}: {
  trigger: React.ReactNode;
  productName?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    requirement: productName ?? "",
    address: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    const data = r.data;
    // Open during the user gesture so browsers do not block the WhatsApp tab.
    window.open(
      whatsappLink(
        `*Quote Request*\n\n*Name:* ${data.name}\n*Mobile:* ${data.mobile}\n*Requirement:* ${data.requirement}\n*Address:* ${data.address}`,
      ),
      "_blank",
      "noopener,noreferrer",
    );
    const results = await Promise.allSettled([
      sendToFormspree({
        _subject: `Quote Request: ${productName ?? data.requirement}`,
        type: "Product Quote",
        ...data,
      }),
      import("@/lib/admin-data").then(({ submitInquiry }) =>
        submitInquiry({
          name: data.name,
          phone: data.mobile,
          subject: `Quote: ${productName ?? data.requirement}`,
          message: `Requirement: ${data.requirement}\nAddress: ${data.address}`,
        }),
      ),
    ]);
    setSubmitting(false);
    const delivered =
      (results[0].status === "fulfilled" && results[0].value === true) ||
      results[1].status === "fulfilled";
    if (!delivered) {
      toast.error(
        "Please finish sending in WhatsApp, or retry. We could not deliver the quote online.",
      );
      return;
    }
    toast.success("Quote request received. We'll reach out shortly.");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="q-name">Name</Label>
            <Input
              id="q-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={80}
              required
            />
          </div>
          <div>
            <Label htmlFor="q-mobile">Mobile Number</Label>
            <Input
              id="q-mobile"
              type="tel"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              maxLength={20}
              required
            />
          </div>
          <div>
            <Label htmlFor="q-req">Requirement</Label>
            <Textarea
              id="q-req"
              value={form.requirement}
              onChange={(e) => setForm({ ...form, requirement: e.target.value })}
              maxLength={500}
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="q-addr">Address</Label>
            <Textarea
              id="q-addr"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              maxLength={300}
              rows={2}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-yellow-500 text-black font-medium py-2.5 hover:bg-yellow-400 transition"
          >
            Send via WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
