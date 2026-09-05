import splicer from "@/assets/product-splicer.jpg";
import otdr from "@/assets/product-otdr.jpg";
import opm from "@/assets/product-opm.jpg";
import cleaver from "@/assets/product-cleaver.jpg";
import vfl from "@/assets/product-vfl.jpg";
import cleaning from "@/assets/product-cleaning.jpg";
import toolkit from "@/assets/product-toolkit.jpg";
import connectors from "@/assets/product-connectors.jpg";
import electrodes from "@/assets/product-electrodes.jpg";

export type Category =
  | "Fusion Splicers"
  | "OTDR"
  | "Power Meters"
  | "Cleavers"
  | "Visual Fault Locators"
  | "Cleaning Kits"
  | "Cable Accessories"
  | "Toolkits"
  | "Connectors & Adaptors"
  | "Spare Electrodes"
  | "Spare Cleaver Blades"
  | "Splicer Spare Parts"
  | "Power Supplies"
  | "SMPS (1.5V to 110V)"
  | "Adapters";

export const CATEGORIES: Category[] = [
  "Fusion Splicers",
  "OTDR",
  "Power Meters",
  "Cleavers",
  "Visual Fault Locators",
  "Cleaning Kits",
  "Cable Accessories",
  "Toolkits",
  "Connectors & Adaptors",
  "Spare Electrodes",
  "Spare Cleaver Blades",
  "Splicer Spare Parts",
  "Power Supplies",
  "SMPS (1.5V to 110V)",
  "Adapters",
];

export const BRANDS = [
  "INNO",
  "Grandway",
  "Claron",
  "EXFO",
  "Fujikura",
  "Sumitomo",
  "VIAVI",
  "Fiberfox",
  "SATYA POWER TECHNOLOGYS",
  "SKL",
] as const;
export type Brand = (typeof BRANDS)[number];

export interface Product {
  id: string;
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  image: string;
  featured?: boolean;
  /** Optional product brochure/datasheet (data URL or hosted URL). */
  pdf?: string;
  /** Optional filename for the PDF (used when downloading). */
  pdfName?: string;
  images?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "inno-view7",
    name: "INNO View 7 Fusion Splicer",
    category: "Fusion Splicers",
    brand: "INNO",
    image: splicer,
    featured: true,
    description:
      "Core-alignment fusion splicer with 5-inch touchscreen, 6-sec splice time and 18-sec heat. Authorized distributor — AP & Telangana.",
  },
  {
    id: "inno-view3",
    name: "INNO View 3 Fusion Splicer",
    category: "Fusion Splicers",
    brand: "INNO",
    image: splicer,
    featured: true,
    description: "Compact cladding-alignment splicer ideal for FTTH installations.",
  },
  {
    id: "fujikura-90s",
    name: "Fujikura 90S+ Splicer",
    category: "Fusion Splicers",
    brand: "Fujikura",
    image: splicer,
    description: "Active fusion control with 5-second splice time and rugged build.",
  },
  {
    id: "sumitomo-t72c",
    name: "Sumitomo T-72C+ Splicer",
    category: "Fusion Splicers",
    brand: "Sumitomo",
    image: splicer,
    description: "Core alignment splicer engineered for reliability and speed.",
  },
  {
    id: "viavi-mts2",
    name: "VIAVI MTS-2000 OTDR",
    category: "OTDR",
    brand: "VIAVI",
    image: otdr,
    featured: true,
    description: "Modular OTDR with high dynamic range for FTTx and metro testing.",
  },
  {
    id: "exfo-maxtester",
    name: "EXFO MaxTester 730C OTDR",
    category: "OTDR",
    brand: "EXFO",
    image: otdr,
    featured: true,
    description: "Smart handheld OTDR with iOLM intelligent analysis.",
  },
  {
    id: "grandway-fho",
    name: "Grandway FHO5000 OTDR",
    category: "OTDR",
    brand: "Grandway",
    image: otdr,
    description: "Cost-effective handheld OTDR for installation & maintenance.",
  },
  {
    id: "grandway-opm",
    name: "Grandway FHP2A04 Power Meter",
    category: "Power Meters",
    brand: "Grandway",
    image: opm,
    featured: true,
    description: "High-precision optical power meter with USB data logging.",
  },
  {
    id: "skl-cleaver",
    name: "SKL-6C High-Precision Cleaver",
    category: "Cleavers",
    brand: "SKL",
    image: cleaver,
    featured: true,
    description: "16-position 48,000-cleave blade life precision fiber cleaver.",
  },
  {
    id: "fe-cleaver",
    name: "FE-23A Optical Fiber Cleaver",
    category: "Cleavers",
    brand: "SATYA POWER TECHNOLOGYS",
    image: cleaver,
    description: "Reliable cleaver designed for field splicing operations.",
  },
  {
    id: "vfl-30",
    name: "VFL-30 Visual Fault Locator",
    category: "Visual Fault Locators",
    brand: "SATYA POWER TECHNOLOGYS",
    image: vfl,
    featured: true,
    description: "30mW red-laser fault locator with 30km range.",
  },
  {
    id: "cleaning-kit",
    name: "Fiber Cleaning Kit (Pro)",
    category: "Cleaning Kits",
    brand: "SATYA POWER TECHNOLOGYS",
    image: cleaning,
    description: "Complete cleaning kit: swabs, fluid, one-click cleaners, wipes.",
  },
  {
    id: "toolkit-pro",
    name: "Professional Fiber Optic Toolkit",
    category: "Toolkits",
    brand: "SATYA POWER TECHNOLOGYS",
    image: toolkit,
    featured: true,
    description: "30+ piece kit with strippers, scissors, cleaver and case.",
  },
  {
    id: "connectors-set",
    name: "SC/LC Connectors & Adaptors",
    category: "Connectors & Adaptors",
    brand: "SATYA POWER TECHNOLOGYS",
    image: connectors,
    description: "Assorted connectors and adaptors for FTTH and datacom.",
  },
  {
    id: "electrodes",
    name: "Splicer Spare Electrodes (Pair)",
    category: "Spare Electrodes",
    brand: "INNO",
    image: electrodes,
    description: "Genuine replacement electrodes for INNO/Fujikura/Sumitomo splicers.",
  },
  {
    id: "cleaver-blade",
    name: "Cleaver Replacement Blade",
    category: "Spare Cleaver Blades",
    brand: "SATYA POWER TECHNOLOGYS",
    image: cleaver,
    description: "Long-life replacement blade for precision cleavers.",
  },
];
