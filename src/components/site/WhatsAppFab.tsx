import { Instagram, Phone, Youtube } from "lucide-react";
import { whatsappLink } from "@/lib/mock-data";

export function WhatsAppFab() {
  const items = [
    {
      href: whatsappLink("Hello, I would like to request a quotation."),
      label: "WhatsApp",
      bg: "bg-[oklch(0.7_0.17_150)]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.9 11.9 0 0012.06 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.87 11.87 0 005.76 1.47h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.45zM12.07 21.8h-.01a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.85 9.85 0 01-1.51-5.29c0-5.45 4.43-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 012.9 6.99c0 5.45-4.43 9.9-9.89 9.9zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn",
      label: "Instagram",
      bg: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      href: "https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg",
      label: "YouTube",
      bg: "bg-[#ff0000]",
      icon: <Youtube className="h-5 w-5" />,
    },
    {
      href: "tel:+919542840444",
      label: "Call",
      bg: "bg-brand",
      icon: <Phone className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={it.label}
          className={`grid h-11 w-11 place-items-center rounded-full text-white shadow-[var(--shadow-elegant)] hover:scale-110 transition-transform ${it.bg}`}
        >
          {it.icon}
        </a>
      ))}
    </div>
  );
}
