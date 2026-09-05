// Centralized brand logo map. Keys are lowercased brand names (and aliases).
import inno from "@/assets/brands/inno.png";
import grandway from "@/assets/brands/grandway.png";
import exfo from "@/assets/brands/exfo.jpg";
import viavi from "@/assets/brands/viavi.svg";
import sumitomo from "@/assets/brands/sumitomo.svg";
import fujikura from "@/assets/brands/fujikura.png";
import fiberfox from "@/assets/brands/fiberfox.png";
import claron from "@/assets/brands/claron.png";
import skl from "@/assets/brands/skl.png";
import satya from "@/assets/brands/satya.png";

export const BRAND_LOGOS: Record<string, string> = {
  inno,
  "inno instrument": inno,
  grandway,
  exfo,
  viavi,
  "viavi solutions": viavi,
  sumitomo,
  sumitorno: sumitomo, // common misspelling found in admin data
  "sumitomo electric": sumitomo,
  fujikura,
  fiberfox,
  claron,
  skl,
  satya,
  "satya power": satya,
  "satya power technologys": satya,
  "satya power technologies": satya,
};

export function getBrandLogo(name: string | undefined): string | undefined {
  if (!name) return undefined;
  return BRAND_LOGOS[name.trim().toLowerCase()];
}
