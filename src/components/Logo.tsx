const logoUrl = "/logo.png";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Satya Power Technologys logo"
      width={598}
      height={417}
      className={`w-auto object-contain ${className}`}
    />
  );
}
