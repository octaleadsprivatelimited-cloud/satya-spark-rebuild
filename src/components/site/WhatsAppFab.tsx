import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/mock-data";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(
        "Hello, I would like to request a quotation.",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.17_150)] text-white shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">WhatsApp</span>
      <span className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.7_0.17_150)] animate-ping opacity-60" />
    </a>
  );
}
