import logoUrl from "@/assets/satya-logo-v1.png";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img src={logoUrl} alt="Satya Power Technologies" className={`object-contain ${className}`} />
  );
}
