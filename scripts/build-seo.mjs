import { readFile, writeFile, mkdir } from "node:fs/promises";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const route of [
  "index",
  "about",
  "products",
  "services",
  "brands",
  "gallery",
  "contact",
  "admin",
]) {
  const source = await readFile(`src/routes/${route}.tsx`, "utf8");
  const block = source.match(/<SEO\s[\s\S]*?\/>/)?.[0];
  if (!block) throw new Error(`Missing SEO for ${route}`);
  const get = (name) => block.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";
  const title = `${get("title")} | SATYA POWER TECHNOLOGYS`;
  const url = `https://satyapowertechnologys.in/${route === "index" ? "" : route}`;
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
  const meta = (attribute, key, value) => {
    const tag = `<meta ${attribute}="${key}" content="${escape(value)}" />`;
    const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, "g");
    html = pattern.test(html)
      ? html.replace(pattern, tag)
      : html.replace("</head>", `${tag}\n</head>`);
  };
  meta("name", "description", get("description"));
  meta("name", "keywords", get("keywords"));
  meta(
    "name",
    "robots",
    route === "admin" ? "noindex, nofollow" : "index, follow, max-image-preview:large",
  );
  for (const [attribute, prefix] of [
    ["property", "og"],
    ["name", "twitter"],
  ]) {
    meta(attribute, `${prefix}:title`, title);
    meta(attribute, `${prefix}:description`, get("description"));
  }
  meta("property", "og:url", url);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  const directory = route === "index" ? "dist" : `dist/${route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
