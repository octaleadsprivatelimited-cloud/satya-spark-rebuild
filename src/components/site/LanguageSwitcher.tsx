import { useEffect } from "react";

// Google Website Translator: reliable multi-language switcher without a
// per-string dictionary. Renders a hidden gadget that we control via a select.

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
];

function setCookie(name: string, value: string) {
  const host = window.location.hostname;
  document.cookie = `${name}=${value};path=/`;
  document.cookie = `${name}=${value};path=/;domain=${host}`;
  const parts = host.split(".");
  if (parts.length > 1) {
    document.cookie = `${name}=${value};path=/;domain=.${parts.slice(-2).join(".")}`;
  }
}

export function LanguageSwitcher() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element",
      );
    };
    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  function change(code: string) {
    setCookie("googtrans", code === "en" ? "/en/en" : `/en/${code}`);
    // Reload so Google Translate picks up the cookie cleanly
    window.location.reload();
  }

  // read current
  const current = (document.cookie.match(/googtrans=\/en\/(\w+)/)?.[1]) || "en";

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <select
        aria-label="Language"
        value={current}
        onChange={(e) => change(e.target.value)}
        className="bg-transparent text-sm font-medium text-foreground/80 hover:text-brand focus:outline-none cursor-pointer notranslate"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </>
  );
}
