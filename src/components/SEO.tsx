import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export function SEO({ title, description, keywords }: SEOProps) {
  const { pathname } = useLocation();
  const domain = "https://satyapowertechnologys.in";
  const canonicalUrl = `${domain}${pathname === "/" ? "" : pathname}`;

  useEffect(() => {
    // 1. Update document title
    const fullTitle = `${title} | SATYA POWER TECHNOLOGYS`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (
      selector: string,
      attributeName: string,
      attributeValue: string,
      contentValue: string,
    ) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // 2. Update description
    updateMetaTag('meta[name="description"]', "name", "description", description);

    // 3. Update keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // 4. Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 5. Update OpenGraph tags
    updateMetaTag('meta[property="og:title"]', "property", "og:title", fullTitle);
    updateMetaTag('meta[property="og:description"]', "property", "og:description", description);
    updateMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);

    // 6. Update Twitter tags
    updateMetaTag('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    updateMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
  }, [title, description, keywords, canonicalUrl]);

  return null;
}
