import {
  Wrench,
  Gauge,
  ClipboardCheck,
  MapPin,
  Package,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: "splicer-repair",
    icon: Wrench,
    title: "Fusion Splicer Repair",
    description: "Full diagnostics and repair for INNO, Fujikura, Sumitomo and other splicers.",
  },
  {
    id: "otdr-calibration",
    icon: Gauge,
    title: "OTDR Calibration",
    description: "Precision calibration to manufacturer specifications with certificate.",
  },
  {
    id: "preventive-maintenance",
    icon: ClipboardCheck,
    title: "Preventive Maintenance",
    description: "Scheduled maintenance contracts keep your fleet field-ready.",
  },
  {
    id: "onsite-support",
    icon: Headphones,
    title: "On-Site Support",
    description: "Engineers dispatched across AP & Telangana for urgent issues.",
  },
  {
    id: "spare-parts",
    icon: Package,
    title: "Spare Parts Supply",
    description: "Electrodes, blades, heaters, motors, LCD displays and more in stock.",
  },
  {
    id: "coverage",
    icon: MapPin,
    title: "Pan-Region Coverage",
    description: "Service hubs covering Hyderabad, Vijayawada, Visakhapatnam and beyond.",
  },
];
