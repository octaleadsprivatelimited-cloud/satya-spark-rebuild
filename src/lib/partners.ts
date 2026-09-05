export interface Partner {
  name: string;
  logo?: string;
  primary?: boolean;
}

export const SEED_PARTNERS: Partner[] = [
  { name: "INNO", primary: true },
  { name: "Fujikura" },
  { name: "Sumitomo" },
  { name: "Grandway" },
  { name: "EXFO" },
  { name: "VIAVI" },
  { name: "Fiberfox" },
];

export const PARTNERS_KEY = "admin-partners";

export function loadPartners(): Partner[] {
  if (typeof localStorage === "undefined") return SEED_PARTNERS;
  const raw = localStorage.getItem(PARTNERS_KEY);
  if (!raw) return SEED_PARTNERS;
  try {
    const parsed = JSON.parse(raw) as Partner[];
    return Array.isArray(parsed) && parsed.length ? parsed : SEED_PARTNERS;
  } catch {
    return SEED_PARTNERS;
  }
}

export function savePartners(list: Partner[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(PARTNERS_KEY, JSON.stringify(list));
  }
}
