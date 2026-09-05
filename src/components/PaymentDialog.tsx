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
import { toast } from "sonner";
import { z } from "zod";
import { usePayments, RAZORPAY_CONFIG } from "@/lib/payments-data";
import logoUrl from "@/assets/satya-logo-v1.png";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, "Invalid phone number (must be 10-15 digits)"),
  amount: z.number().min(1, "Minimum amount is ₹1").max(10000000, "Maximum amount exceeded"),
  description: z.string().trim().max(300).optional(),
});

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: { razorpay_payment_id: string }) => Promise<void>;
  modal: { ondismiss: () => void };
}
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentDialog({
  trigger,
  initialOpen = false,
}: {
  trigger: React.ReactNode;
  initialOpen?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);
  const [loading, setLoading] = useState(false);
  const { savePayment } = usePayments();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    description: "",
  });

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parsedAmount = parseFloat(form.amount);
    const validation = schema.safeParse({
      ...form,
      amount: isNaN(parsedAmount) ? 0 : parsedAmount,
    });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    const { name, email, phone, amount, description } = validation.data;

    // Load checkout script
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const options = {
        key: RAZORPAY_CONFIG.keyId,
        amount: Math.round(amount * 100), // paise
        currency: "INR",
        name: "SATYA POWER TECHNOLOGYS",
        description: description || "General Payment",
        image: logoUrl,
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#ef4444", // brand red
        },
        handler: async function (response: { razorpay_payment_id: string }) {
          try {
            // Save transaction log in Firestore
            await savePayment({
              name,
              email,
              phone,
              amount,
              description: description || "",
              razorpayPaymentId: response.razorpay_payment_id,
              status: "pending_verification",
            });

            toast.success("Payment received by gateway. Confirmation is pending.");
            setForm({ name: "", email: "", phone: "", amount: "", description: "" });
            setOpen(false);
          } catch (err: unknown) {
            console.error(err);
            toast.error(
              "Payment received by gateway, but the receipt could not be saved. Do not pay again; contact us with your payment ID.",
            );
          }
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
          },
        },
      };

      if (!window.Razorpay) throw new Error("Payment gateway unavailable.");
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        (err instanceof Error ? err.message : undefined) || "Failed to initialize payment.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Make a Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePay} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="pay-name" className="text-sm font-medium">
              Customer Name
            </Label>
            <Input
              id="pay-name"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-background border border-input focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="pay-email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="pay-email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-background border border-input focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pay-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="pay-phone"
                type="tel"
                placeholder="10-digit number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="bg-background border border-input focus:ring-primary"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pay-amount" className="text-sm font-medium">
              Payment Amount (INR)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                ₹
              </span>
              <Input
                id="pay-amount"
                type="number"
                min="1"
                step="any"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
                className="pl-7 bg-background border border-input focus:ring-primary font-semibold"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pay-desc" className="text-sm font-medium">
              Purpose / Description (Optional)
            </Label>
            <Textarea
              id="pay-desc"
              placeholder="e.g. Splicer service, Invoice payment, cell replacement"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              maxLength={300}
              className="bg-background border border-input focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded hover:bg-emerald-700 disabled:opacity-60 transition shadow-sm text-sm"
          >
            {loading ? "Initializing Gateway..." : "Proceed to Pay"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
