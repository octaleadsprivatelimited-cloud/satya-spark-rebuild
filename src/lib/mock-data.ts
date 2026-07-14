import type {
  BlogPost,
  Brand,
  Category,
  GalleryItem,
  Inquiry,
  Product,
  Project,
  Service,
  SiteSettings,
} from "./types";

// All references to /ref/* map to assets downloaded verbatim from the
// original satyapowertechnologys.in build (see public/ref/).

export const siteSettings: SiteSettings = {
  companyName: "SATYA POWER TECHNOLOGYS",
  tagline: "Fiber Optic Tools & Services for AP & Telangana",
  phone: "+91 95428 40444",
  whatsapp: "919542840444",
  email: "satyapowertechnologys@gmail.com",
  address:
    "2-3/107, Koneru Street, C.B Devam, Peddapuram, Andhra Pradesh - 533437",
  social: {
    instagram:
      "https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn",
    youtube: "https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg",
  },
};

export const whatsappLink = (
  text = "Hello SATYA POWER TECHNOLOGYS, I'd like a quote.",
) => `https://wa.me/919542840444?text=${encodeURIComponent(text)}`;

export const offices = [
  {
    id: "billing",
    label: "Billing Address",
    company: "SATYA POWER TECHNOLOGYS",
    city: "Peddapuram, Andhra Pradesh",
    address:
      "2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437",
    phone: "+91 95428 40444",
    phoneTel: "+919542840444",
    gstin: "37BILPL7684K1ZD",
    email: "satyapowertechnologys@gmail.com",
  },
  {
    id: "head",
    label: "Head Office",
    company: "SATYA POWER TECHNOLOGYS",
    city: "Hyderabad, Telangana",
    address:
      "House No. 49/50, Vayushakthi Nagar Road No.1, Dammaiguda, Hyderabad - 500083, Telangana, India",
    phone: "+91 86881 51526",
    phoneTel: "+918688151526",
    email: "satyapowertechnologys@gmail.com",
  },
];

export const categories: Category[] = [
  { id: "c1", slug: "fusion-splicers", name: "Fusion Splicers", description: "Precision core & cladding alignment splicers." },
  { id: "c2", slug: "otdr", name: "OTDR", description: "Optical Time Domain Reflectometers." },
  { id: "c3", slug: "power-meters", name: "Power Meters", description: "Optical power measurement instruments." },
  { id: "c4", slug: "cleavers", name: "Cleavers", description: "High-precision fiber cleavers." },
  { id: "c5", slug: "vfl", name: "Visual Fault Locators", description: "Red-light fault locators." },
  { id: "c6", slug: "cleaning-kits", name: "Cleaning Kits", description: "Fiber end-face cleaning solutions." },
  { id: "c7", slug: "toolkits", name: "Toolkits", description: "Professional fiber optic toolkits." },
  { id: "c8", slug: "connectors", name: "Connectors & Adaptors", description: "SC/LC connectors, adaptors and patch cords." },
  { id: "c9", slug: "spare-electrodes", name: "Spare Electrodes", description: "OEM replacement splicer electrodes." },
  { id: "c10", slug: "spare-blades", name: "Spare Cleaver Blades", description: "Replacement blades for cleavers." },
];

export const brands = ["INNO", "Grandway", "Claron", "EXFO", "VIAVI", "SKL", "Fujikura", "Sumitomo"];

// The 4 fixed main partners — everything else must live in `additional`.
export const MAIN_BRAND_NAMES = ["INNO", "INNO Instrument", "Grandway", "EXFO", "Claron"] as const;

export const siteBrands: Brand[] = [
  { id: "b1", name: "INNO Instrument", logo: "/ref/inno-BCaViBd-.png", note: "Fusion Splicers · OTDR", tier: "main", showOnHome: true, order: 1 },
  { id: "b2", name: "Grandway", logo: "/ref/grandway-C3AfGUQz.png", note: "OTDR · Test Instruments", tier: "main", showOnHome: true, order: 2 },
  { id: "b3", name: "EXFO", logo: undefined, note: "OTDR · Power Meters", tier: "main", showOnHome: true, order: 3 },
  { id: "b4", name: "Claron", logo: "/ref/claron-CcrHz5w9.png", note: "Fiber Accessories", tier: "main", showOnHome: true, order: 4 },
  { id: "b5", name: "Fujikura", note: "Premium fusion splicers, OTDRs — trusted globally for active and core alignment.", tier: "additional", showOnHome: true, order: 5 },
  { id: "b6", name: "Sumitomo", note: "T-72C and Z2C series — engineered for reliability and field-proven precision.", tier: "additional", showOnHome: true, order: 6 },
  { id: "b7", name: "VIAVI", note: "MTS-2000 modular platform OTDRs for metro, long-haul and FTTx testing.", tier: "additional", showOnHome: true, order: 7 },
  { id: "b8", name: "T-berlus", note: "Mid-tier splicers ideal for FTTH and access-network installations.", tier: "additional", showOnHome: false, order: 8 },
  { id: "b9", name: "Devise-h", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 9 },
  { id: "b10", name: "Net Link", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 10 },
  { id: "b11", name: "Uniway", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 11 },
  { id: "b12", name: "Digisol", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 12 },
  { id: "b13", name: "Syntech", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 13 },
  { id: "b14", name: "GX", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 14 },
  { id: "b15", name: "TP-Link", note: "Authorized partner providing product support and warranty service.", tier: "additional", showOnHome: false, order: 15 },
];

// Legacy shim — kept because a few components imported the flat logo list.
export const brandLogos = siteBrands
  .filter((b) => b.tier === "main" && b.logo)
  .map((b) => ({ name: b.name, src: b.logo as string }));


const IMG = {
  splicer: "/ref/product-splicer-CaWSWLtE.jpg",
  otdr: "/ref/product-otdr-B7V5uU5f.jpg",
  opm: "/ref/product-opm-rWdvVZAD.jpg",
  cleaver: "/ref/product-cleaver-C7OIw4FA.jpg",
  vfl: "/ref/product-vfl-DKWvn-Hg.jpg",
  toolkit: "/ref/product-toolkit-BLFZNVVF.jpg",
  cleaning: "/ref/product-cleaning-IEDxy06j.jpg",
  connectors: "/ref/product-connectors-B8UzSWLl.jpg",
  electrodes: "/ref/product-electrodes-Bez7w95M.jpg",
};

export const products: Product[] = [
  {
    id: "p1", slug: "inno-view-7-fusion-splicer", name: "INNO View 7 Fusion Splicer",
    brand: "INNO", categoryId: "c1", categoryName: "Fusion Splicers",
    shortDescription: "Active-clad alignment fusion splicer with rugged build and 5\" touchscreen.",
    description: "The INNO View 7 delivers precision splicing with active clad alignment, ideal for FTTH and enterprise deployments. Rugged IP-rated body with fast splicing and heating cycles.",
    features: ["Active clad alignment", "5-inch touchscreen", "Splice time ~7 s", "Heat time ~13 s", "IP-rated rugged body"],
    specs: { "Splice Loss": "0.02 dB (SM)", "Splice Time": "7 s", "Heat Time": "13 s", Display: "5\" Touchscreen", Battery: "300 cycles" },
    image: IMG.splicer, featured: true, createdAt: "2025-01-10",
  },
  {
    id: "p2", slug: "inno-view-3-fusion-splicer", name: "INNO View 3 Fusion Splicer",
    brand: "INNO", categoryId: "c1", categoryName: "Fusion Splicers",
    shortDescription: "Compact active-clad splicer for FTTH technicians.",
    description: "Compact and lightweight fusion splicer built for daily FTTH work.",
    features: ["Active clad alignment", "Compact build", "Fast splicing"],
    specs: { "Splice Loss": "0.02 dB (SM)", "Splice Time": "9 s", Battery: "250 cycles" },
    image: IMG.splicer, featured: true, createdAt: "2025-02-05",
  },
  {
    id: "p3", slug: "fujikura-90s-plus-splicer", name: "Fujikura 90S+ Splicer",
    brand: "Fujikura", categoryId: "c1", categoryName: "Fusion Splicers",
    shortDescription: "Industry-leading core-alignment splicer with fastest splice cycle.",
    description: "Fujikura 90S+ is the industry benchmark for high-productivity core-alignment splicing with intelligent motor calibration.",
    features: ["Core alignment", "Fastest splice cycle", "Auto blade rotation"],
    specs: { "Splice Loss": "0.02 dB", "Splice Time": "5 s", "Heat Time": "9 s" },
    image: IMG.splicer, createdAt: "2025-02-10",
  },
  {
    id: "p4", slug: "sumitomo-t72c-plus-splicer", name: "Sumitomo T-72C+ Splicer",
    brand: "Sumitomo", categoryId: "c1", categoryName: "Fusion Splicers",
    shortDescription: "Premium core-alignment splicer with rugged Japanese engineering.",
    description: "Sumitomo T-72C+ combines fast splicing with reliable field performance for demanding operators.",
    features: ["Core alignment", "Long battery life", "Robust construction"],
    specs: { "Splice Loss": "0.02 dB", "Splice Time": "6 s" },
    image: IMG.splicer, createdAt: "2025-02-12",
  },
  {
    id: "p5", slug: "viavi-mts-2000-otdr", name: "VIAVI MTS-2000 OTDR",
    brand: "VIAVI", categoryId: "c2", categoryName: "OTDR",
    shortDescription: "Modular handheld OTDR platform for field testing.",
    description: "Modular test platform supporting a wide range of OTDR modules and applications.",
    features: ["Modular platform", "Long dynamic range", "Touchscreen UI"],
    specs: { "Dynamic Range": "42 dB", Wavelengths: "1310/1550 nm" },
    image: IMG.otdr, featured: true, createdAt: "2025-01-20",
  },
  {
    id: "p6", slug: "exfo-maxtester-730c-otdr", name: "EXFO MaxTester 730C OTDR",
    brand: "EXFO", categoryId: "c2", categoryName: "OTDR",
    shortDescription: "Rugged handheld OTDR for FTTx and access networks.",
    description: "Purpose-built for FTTx access networks. Easy to use and highly rugged.",
    features: ["FTTx optimized", "iOLM support", "Rugged build"],
    specs: { "Dynamic Range": "39 dB", Wavelengths: "1310/1550/1625 nm" },
    image: IMG.otdr, featured: true, createdAt: "2025-03-01",
  },
  {
    id: "p7", slug: "grandway-fho5000-otdr", name: "Grandway FHO5000 OTDR",
    brand: "Grandway", categoryId: "c2", categoryName: "OTDR",
    shortDescription: "Value-priced handheld OTDR with strong dynamic range.",
    description: "Reliable Grandway FHO5000 series OTDR for daily field testing.",
    features: ["Handheld", "Colour touchscreen", "Long dynamic range"],
    specs: { "Dynamic Range": "40 dB", Wavelengths: "1310/1550 nm" },
    image: IMG.otdr, createdAt: "2025-03-08",
  },
  {
    id: "p8", slug: "grandway-fhp2a04-power-meter", name: "Grandway FHP2A04 Power Meter",
    brand: "Grandway", categoryId: "c3", categoryName: "Power Meters",
    shortDescription: "Handheld optical power meter with wide dynamic range.",
    description: "Reliable and affordable power meter for daily field measurements.",
    features: ["Wide dynamic range", "Auto wavelength ID", "USB charging"],
    specs: { Range: "-70 to +10 dBm", Wavelengths: "800–1700 nm" },
    image: IMG.opm, featured: true, createdAt: "2025-02-14",
  },
  {
    id: "p9", slug: "skl-6c-high-precision-cleaver", name: "SKL-6C High-Precision Cleaver",
    brand: "SKL", categoryId: "c4", categoryName: "Cleavers",
    shortDescription: "16-position blade cleaver for consistent fiber end faces.",
    description: "High precision cleaver with a long-life blade delivering consistent low cleave angles.",
    features: ["16 blade positions", "Sub-0.5° cleave angle", "Long blade life"],
    specs: { "Blade Life": "48,000 cleaves", "Cleave Angle": "≤0.5°" },
    image: IMG.cleaver, featured: true, createdAt: "2025-01-25",
  },
  {
    id: "p10", slug: "fe-23a-optical-fiber-cleaver", name: "FE-23A Optical Fiber Cleaver",
    brand: "SATYA POWER TECHNOLOGYS", categoryId: "c4", categoryName: "Cleavers",
    shortDescription: "Compact cleaver ideal for FTTH and general splicing.",
    description: "Trusted every-day cleaver with a smooth pressing action and durable blade.",
    features: ["Compact", "Durable blade", "Field-friendly"],
    specs: { "Cleave Angle": "≤0.7°" },
    image: IMG.cleaver, createdAt: "2025-02-01",
  },
  {
    id: "p11", slug: "vfl-30-visual-fault-locator", name: "VFL-30 Visual Fault Locator",
    brand: "SATYA POWER TECHNOLOGYS", categoryId: "c5", categoryName: "Visual Fault Locators",
    shortDescription: "30 mW visual fault locator with long-range detection.",
    description: "Locate breaks, bends, and connector faults quickly with strong red-light output.",
    features: ["30 mW output", "Continuous & flash modes", "Rugged aluminium body"],
    specs: { Output: "30 mW", Wavelength: "650 nm", Range: "20 km" },
    image: IMG.vfl, featured: true, createdAt: "2025-02-18",
  },
  {
    id: "p12", slug: "fiber-cleaning-kit-pro", name: "Fiber Cleaning Kit (Pro)",
    brand: "SATYA POWER TECHNOLOGYS", categoryId: "c6", categoryName: "Cleaning Kits",
    shortDescription: "Complete cleaning kit for ferrules, connectors and end-faces.",
    description: "One-click cleaners, lint-free wipes and optical-grade solvent — everything to keep splices low-loss.",
    features: ["One-click cleaners", "Lint-free wipes", "Optical-grade solvent"],
    specs: { Includes: "Cleaners, wipes, solvent" },
    image: IMG.cleaning, createdAt: "2025-02-22",
  },
  {
    id: "p13", slug: "professional-fiber-optic-toolkit", name: "Professional Fiber Optic Toolkit",
    brand: "SATYA POWER TECHNOLOGYS", categoryId: "c7", categoryName: "Toolkits",
    shortDescription: "Complete toolkit for FTTH & enterprise fiber installations.",
    description: "Everything a technician needs in one rugged case: strippers, cleavers, cleaning tools and more.",
    features: ["30+ tools included", "Rugged carry case", "Field-ready"],
    specs: { "Tool Count": "30+", Case: "Rugged ABS" },
    image: IMG.toolkit, featured: true, createdAt: "2025-03-08",
  },
  {
    id: "p14", slug: "sc-lc-connectors-adaptors", name: "SC/LC Connectors & Adaptors",
    brand: "SATYA POWER TECHNOLOGYS", categoryId: "c8", categoryName: "Connectors & Adaptors",
    shortDescription: "Genuine SC/LC single-mode and multi-mode connectors and adaptors.",
    description: "OEM-grade connectors and adaptors for splicing, patching and termination work.",
    features: ["SM & MM options", "Low insertion loss", "Bulk pack"],
    specs: { Types: "SC, LC, FC, ST" },
    image: IMG.connectors, createdAt: "2025-03-11",
  },
  {
    id: "p15", slug: "splicer-spare-electrodes", name: "Splicer Spare Electrodes (Pair)",
    brand: "INNO", categoryId: "c9", categoryName: "Spare Electrodes",
    shortDescription: "Genuine INNO replacement electrodes for View series splicers.",
    description: "OEM replacement electrodes to maintain factory splice-loss performance.",
    features: ["Genuine OEM", "Long life", "Consistent arcs"],
    specs: { Life: "3,000+ arcs" },
    image: IMG.electrodes, createdAt: "2025-03-14",
  },
  {
    id: "p16", slug: "cleaver-replacement-blade", name: "Cleaver Replacement Blade",
    brand: "SATYA POWER TECHNOLOGYS", categoryId: "c10", categoryName: "Spare Cleaver Blades",
    shortDescription: "Long-life replacement blade for standard cleavers.",
    description: "Precision-ground carbide blade — restores like-new cleave angles.",
    features: ["Carbide", "Multi-position", "Precision ground"],
    specs: { Positions: "16" },
    image: IMG.cleaver, createdAt: "2025-03-16",
  },
];

export const services: Service[] = [
  { id: "s1", slug: "fusion-splicer-repair", title: "Fusion Splicer Repair", summary: "Full diagnostics and repair for INNO, Fujikura, Sumitomo and other splicers.", description: "Factory-trained technicians repair, calibrate and service fusion splicers with genuine parts and precise alignment testing.", icon: "Wrench" },
  { id: "s2", slug: "otdr-calibration", title: "OTDR Calibration", summary: "Precision calibration to manufacturer specifications with certificate.", description: "Complete diagnostic, module-level repair and NABL-traceable calibration for VIAVI, EXFO, INNO and Grandway OTDRs.", icon: "Activity" },
  { id: "s3", slug: "preventive-maintenance", title: "Preventive Maintenance", summary: "Scheduled maintenance contracts keep your fleet field-ready.", description: "AMC plans with priority response and free calibration windows tailored to your fleet size.", icon: "ShieldCheck" },
  { id: "s4", slug: "on-site-support", title: "On-Site Support", summary: "Engineers dispatched across AP & Telangana for urgent issues.", description: "Field engineers deployed to your site for critical repair and installation work — usually the same day.", icon: "Truck" },
  { id: "s5", slug: "spare-parts-supply", title: "Spare Parts Supply", summary: "Electrodes, blades, heaters, motors, LCD displays and more in stock.", description: "OEM spares for all major splicer and OTDR brands — dispatched pan-India.", icon: "Package" },
  { id: "s6", slug: "ev-battery-repair", title: "EV Battery Repair & Service", summary: "Diagnostics, safety testing and capacity restoration for EV batteries.", description: "Comprehensive health diagnostics, safety testing, capacity validation and servicing to restore original battery efficiency.", icon: "BatteryCharging" },
  { id: "s7", slug: "cell-replacement", title: "EV Battery Cells Replacement", summary: "Cost-effective replacement of degraded cell modules.", description: "Replace individual degraded or faulty cell modules to extend the lifecycle of your existing pack.", icon: "Zap" },
];

export const projects: Project[] = [
  { id: "pr1", slug: "ftth-rollout-hyderabad", title: "FTTH Rollout — Hyderabad Metro", client: "Regional ISP", location: "Hyderabad", year: 2024, summary: "Supplied splicing and testing equipment for a 40,000-home FTTH build-out.", image: "/ref/hyderabad-CC_eXlg0.jpg", category: "FTTH" },
  { id: "pr2", slug: "backbone-upgrade-vijayawada", title: "Backbone Upgrade — Vijayawada", client: "State Data Center", location: "Vijayawada", year: 2024, summary: "OTDR testing and certification of 220 km inter-city dark fiber backbone.", image: "/ref/vijayawada-DdUBHLLr.jpg", category: "Backbone" },
  { id: "pr3", slug: "campus-network-kakinada", title: "Campus Network — Kakinada", client: "Engineering College", location: "Kakinada", year: 2023, summary: "End-to-end passive optical network for a 5,000-student campus.", image: "/ref/kakinada-I6yQw3_u.jpg", category: "Enterprise" },
  { id: "pr4", slug: "ev-fleet-service-tirupati", title: "EV Fleet Battery Service — Tirupathi", client: "Mobility Operator", location: "Tirupathi", year: 2025, summary: "Diagnostics and cell replacement for a fleet of 80 electric three-wheelers.", image: "/ref/tirupati-BIku-Lu3.jpg", category: "EV" },
  { id: "pr5", slug: "smart-city-srikakulam", title: "Smart City Fiber — Srikakulam", client: "Municipal Corporation", location: "Srikakulam", year: 2023, summary: "Splicing, testing and commissioning for smart-city surveillance backbone.", image: "/ref/srikakulam-Dd7XUh2L.jpg", category: "Government" },
  { id: "pr6", slug: "isp-deployment-nellore", title: "ISP Deployment — Nellore", client: "Local ISP", location: "Nellore", year: 2022, summary: "Turnkey equipment supply and staff training for a new regional ISP.", image: "/ref/service-engineer-4bWYO3Iz.jpg", category: "FTTH" },
];

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Fusion Splicer Service", image: "/ref/engineer-1-bcsnKP6b.jpg", category: "Service" },
  { id: "g2", title: "Field Engineering", image: "/ref/service-engineer-4bWYO3Iz.jpg", category: "Field" },
  { id: "g3", title: "Hyderabad Branch", image: "/ref/hyderabad-CC_eXlg0.jpg", category: "Branches" },
  { id: "g4", title: "Toolkit", image: "/ref/product-toolkit-BLFZNVVF.jpg", category: "Products" },
  { id: "g5", title: "OTDR Testing", image: "/ref/product-otdr-B7V5uU5f.jpg", category: "Service" },
  { id: "g6", title: "EV Battery Lab", image: "/ref/ev-service-B4BVgvt-.png", category: "EV" },
  { id: "g7", title: "Team", image: "/ref/team-CMydRHty.jpg", category: "Team" },
  { id: "g8", title: "Quality Control", image: "/ref/engineer-2-CV9e-2Ti.jpg", category: "Quality" },
  { id: "g9", title: "Vijayawada Branch", image: "/ref/vijayawada-DdUBHLLr.jpg", category: "Branches" },
  { id: "g10", title: "Kakinada Branch", image: "/ref/kakinada-I6yQw3_u.jpg", category: "Branches" },
  { id: "g11", title: "Srikakulam Branch", image: "/ref/srikakulam-Dd7XUh2L.jpg", category: "Branches" },
  { id: "g12", title: "Tirupathi Branch", image: "/ref/tirupati-BIku-Lu3.jpg", category: "Branches" },
];

export const blogPosts: BlogPost[] = [
  { id: "b1", slug: "choosing-right-fusion-splicer", title: "How to choose the right fusion splicer for FTTH", excerpt: "A practical guide to picking between active clad and core alignment splicers.", content: "Full article content...", cover: "/ref/product-splicer-CaWSWLtE.jpg", author: "Satya Team", publishedAt: "2025-04-12", tags: ["FTTH", "Splicers"] },
  { id: "b2", slug: "otdr-basics", title: "OTDR basics: reading traces like a pro", excerpt: "Learn to interpret events, reflections and losses from OTDR traces.", content: "Full article content...", cover: "/ref/product-otdr-B7V5uU5f.jpg", author: "Satya Team", publishedAt: "2025-03-18", tags: ["OTDR", "Training"] },
  { id: "b3", slug: "ev-battery-care", title: "Extending EV battery lifecycle with cell-level service", excerpt: "Why replacing individual cells is smarter than swapping the full pack.", content: "Full article content...", cover: "/ref/ev-service-B4BVgvt-.png", author: "Satya Team", publishedAt: "2025-02-20", tags: ["EV", "Service"] },
];

export const inquiries: Inquiry[] = [
  { id: "i1", name: "K. Raghunath", email: "raghu@example.com", phone: "+91 90000 11111", subject: "Bulk order — INNO View 7", message: "Need a quote for 5 units. Please share pricing.", status: "new", createdAt: "2025-07-10" },
  { id: "i2", name: "Mohammad Ali", email: "ali@example.com", phone: "+91 90000 22222", subject: "EXFO OTDR calibration", message: "Our OTDR needs annual calibration, please advise.", status: "read", createdAt: "2025-07-08" },
  { id: "i3", name: "P. Srinivas Rao", email: "psr@example.com", phone: "+91 90000 33333", subject: "Toolkit order", message: "Interested in 10 professional toolkits.", status: "resolved", createdAt: "2025-07-01" },
];

export const branches = [
  { city: "Hyderabad", type: "Sales & Service Branch", phone: "+91 86881 51526", image: "/ref/hyderabad-CC_eXlg0.jpg" },
  { city: "Vijayawada", type: "Sales & Service Branch", phone: "+91 86624 78901", image: "/ref/vijayawada-DdUBHLLr.jpg" },
  { city: "Kakinada", type: "Sales & Service Branch", phone: "+91 95428 40444", image: "/ref/kakinada-I6yQw3_u.jpg" },
  { city: "Srikakulam", type: "Service Support", phone: "+91 89424 56789", image: "/ref/srikakulam-Dd7XUh2L.jpg" },
  { city: "Tirupathi", type: "Service Support", phone: "+91 95428 40444", image: "/ref/tirupati-BIku-Lu3.jpg" },
];

export const heroSlides = [
  {
    src: "/ref/hero-1-B7wO0rR4.jpg",
    kicker: "AUTHORIZED DISTRIBUTOR",
    title: "Fiber Optic Tools for AP & Telangana",
    subtitle:
      "Authorized Distributor for Inno, Grandway, Claron & EXFO — sales and service across both states.",
    primary: { label: "Shop products", to: "/products" },
    secondary: { label: "Our services", to: "/services" },
  },
  {
    src: "/ref/hero-2-DdNjZtF1.jpg",
    kicker: "SERVICE FIRST",
    title: "Repair, Calibration & On-site Support",
    subtitle:
      "Factory-trained engineers keep your splicers and OTDRs field-ready. Same-week turnaround across AP & Telangana.",
    primary: { label: "Our services", to: "/services" },
    secondary: { label: "Talk to us", to: "/contact" },
  },
  {
    src: "/ref/hero-3-Dc-W2l5d.jpg",
    kicker: "500+ PRODUCTS",
    title: "One catalogue for every fiber project",
    subtitle:
      "Splicers, OTDRs, power meters, cleavers, VFLs, toolkits, connectors and spares — genuine, in-stock and dispatch-ready.",
    primary: { label: "Browse catalogue", to: "/products" },
    secondary: { label: "Get a quote", to: "/contact" },
  },
  {
    src: "/ref/ev-service-B4BVgvt-.png",
    kicker: "NEW SERVICE FRONTIER",
    title: "EV Battery Repair & Cell Replacement",
    subtitle:
      "Diagnostics, safety testing and cell-level service to restore battery capacity — a cost-effective alternative to full pack replacement.",
    primary: { label: "Inquire on WhatsApp", to: "/contact" },
    secondary: { label: "Learn more", to: "/services" },
  },
];

export const testimonials = [
  { name: "K. Raghunath", role: "Managing Director, Kakinada", quote: "We have been purchasing Inno fusion splicers and accessories from Satya Power since 2018. Their pricing is unbeatable, and the service support in Kakinada is exceptionally prompt." },
  { name: "Mohammad Ali", role: "Network Operator, Hyderabad", quote: "The team resolved a calibration issue on our EXFO OTDR within 24 hours. The repair work is highly professional and they only use genuine components. Strongly recommended!" },
  { name: "P. Srinivas Rao", role: "Proprietor, Vijayawada", quote: "Very reliable supplier for fiber equipment in Andhra Pradesh. Bought multiple toolkit sets and cleaning supplies. Best prices and excellent customer service." },
  { name: "G. Venkatesh", role: "Operations Head, Nellore", quote: "Satya Power is our go-to partner for fusion splicer electrode replacement and service. Their technicians are highly knowledgeable and handle calibration perfectly." },
  { name: "T. Anil Kumar", role: "ISP Partner, Tirupati", quote: "Recently purchased the Grandway optical power meters and laser sources. The products are extremely durable, and the team provided excellent guidance on operation." },
];
