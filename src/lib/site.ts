export const SITE = {
  name: "SATYA POWER TECHNOLOGYS",
  tagline: "Service first, Sales next",
  // Primary contact (Peddapuram office)
  phone: "+91 95428 40444",
  phoneRaw: "919542840444",
  // Secondary contact (Hyderabad office)
  phoneAlt: "+91 86881 51526",
  phoneRawAlt: "918688151526",
  email: "satyapowertechnologys@gmail.com",
  // Primary address (Peddapuram HQ)
  address: "2-3/107, Koneru Street, C.B Devam, Peddapuram, AP - 533437",
  // Secondary address (Hyderabad branch)
  addressAlt:
    "House No. 49/50, Vayushakthi Nagar Road No.1, Dammaiguda, Hyderabad - 500083, Telangana, India",
  gstin: "37BILPL7684K1ZD",
  founded: 2013,
  ceo: "Mr. V Dorababu",
  website: "www.satyapowertechnologys.in",
  whatsappMsg: "Hello SATYA POWER TECHNOLOGYS, I'd like a quote.",
  // Social links (easy to update)
  instagram: "https://www.instagram.com/satya_power_technologys?igsh=NG1hdmZqYWIxZndn",
  youtube: "https://youtube.com/@satyapowertechnologys?si=gHQ1dsrUEQWk_wRg",
  facebook: "https://facebook.com",
  linkedin: "https://linkedin.com",
};

export const whatsappLink = (msg = SITE.whatsappMsg) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;
