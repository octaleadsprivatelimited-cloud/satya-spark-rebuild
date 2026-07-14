// Razorpay Checkout helper (client-side, "Standard Checkout" without a server order).
// NOTE: For production, you SHOULD create the order on a server (Cloud Function) and
// verify the payment signature server-side. Never expose the Key Secret in the browser.

const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler?: (resp: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
  order_id?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

let loading: Promise<boolean> | null = null;
export function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (loading) return loading;
  loading = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.onload = () => resolve(true);
    s.onerror = () => { loading = null; resolve(false); };
    document.body.appendChild(s);
  });
  return loading;
}

export interface OpenCheckoutInput {
  amount: number;              // in rupees (₹)
  name?: string;
  description?: string;
  prefill?: RazorpayOptions["prefill"];
  onSuccess?: (r: RazorpayResponse) => void;
  onDismiss?: () => void;
}

export async function openRazorpayCheckout(input: OpenCheckoutInput): Promise<void> {
  if (!KEY_ID) throw new Error("Razorpay key not configured");
  const ok = await loadRazorpay();
  if (!ok || !window.Razorpay) throw new Error("Failed to load Razorpay");
  const rzp = new window.Razorpay({
    key: KEY_ID,
    amount: Math.round(input.amount * 100),
    currency: "INR",
    name: input.name ?? "Satya Power Technologys",
    description: input.description ?? "Payment",
    prefill: input.prefill,
    theme: { color: "#0b2a4a" },
    handler: input.onSuccess,
    modal: { ondismiss: input.onDismiss },
  });
  rzp.open();
}

export const razorpayConfigured = () => Boolean(KEY_ID);
