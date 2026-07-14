import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
  jsonLd?: object;
}

export function Seo({ title, description, image, type = "website", noIndex, jsonLd }: SeoProps) {
  const { pathname } = useLocation();
  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pathname} />
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <link rel="canonical" href={pathname} />
      {noIndex ? <meta name="robots" content="noindex" /> : null}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
