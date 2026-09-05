import hyderabadImg from "@/assets/hyderabad.jpg";
import vijayawadaImg from "@/assets/vijayawada.jpg";
import kakinadaImg from "@/assets/kakinada.jpg";
import srikakulamImg from "@/assets/srikakulam.jpg";
import tirupatiImg from "@/assets/tirupati.jpg";

export interface Branch {
  city: string;
  role: string;
  image: string;
  phone: string;
}

// Single source of truth for the five service centers used across the site.
export const BRANCHES: Branch[] = [
  {
    city: "Hyderabad",
    role: "Sales & Service Branch",
    image: hyderabadImg,
    phone: "+91 86881 51526",
  },
  {
    city: "Vijayawada",
    role: "Sales & Service Branch",
    image: vijayawadaImg,
    phone: "+91 866 247 8901",
  },
  {
    city: "Kakinada",
    role: "Sales & Service Branch",
    image: kakinadaImg,
    phone: "+91 95428 40444",
  },
  { city: "Srikakulam", role: "Service Support", image: srikakulamImg, phone: "+91 894 245 6789" },
  { city: "Tirupathi", role: "Service Support", image: tirupatiImg, phone: "+91 95428 40444" },
];
