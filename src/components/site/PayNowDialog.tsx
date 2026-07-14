import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { openRazorpayCheckout, razorpayConfigured } from "@/lib/razorpay";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function PayNowDialog({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function pay() {
    const amt = Number(amount);
    if (!amt || amt < 1) return toast.error("Enter a valid amount");
    if (!name.trim() || !phone.trim()) return toast.error("Name and phone are required");
    if (!razorpayConfigured()) return toast.error("Payments not configured");
    setBusy(true);
    try {
      await openRazorpayCheckout({
        amount: amt,
        description: note || "Invoice payment",
        prefill: { name, email, contact: phone },
        onSuccess: (r) => {
          toast.success(`Payment successful: ${r.razorpay_payment_id}`);
          onOpenChange(false);
        },
        onDismiss: () => setBusy(false),
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment failed to start");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pay Satya Power Technologys</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>Phone *</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          </div>
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label>Amount (₹) *</Label><Input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
          <div><Label>Invoice / Note</Label><Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Invoice #, PO, etc." /></div>
          <p className="text-xs text-muted-foreground">
            Secured by Razorpay. Cards, UPI, Net Banking & Wallets accepted.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>Cancel</Button>
          <Button onClick={pay} disabled={busy}>{busy ? "Opening…" : "Proceed to Pay"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
