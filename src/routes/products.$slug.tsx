import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProduct } from "@/lib/services/data-service";

const productQuery = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: () => getProduct(slug),
});

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params, context }) => {
    const p = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${loaderData.brand} | Satya Power Technologys` },
          { name: "description", content: loaderData.shortDescription },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.shortDescription },
          { property: "og:image", content: loaderData.image },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product — Satya Power Technologys" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Button asChild className="mt-6" variant="brand">
          <Link to="/products">Back to products</Link>
        </Button>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <Button className="mt-6" onClick={reset}>Try again</Button>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(productQuery(slug));
  if (!p) return null;

  return (
    <SiteLayout>
      <section className="py-10">
        <div className="container-page">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand">
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl overflow-hidden bg-secondary aspect-[4/3]">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{p.brand} · {p.categoryName}</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold">{p.name}</h1>
            {p.featured ? <Badge className="mt-3 bg-amber text-amber-foreground border-0">Featured</Badge> : null}
            <p className="mt-5 text-lg text-muted-foreground">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <a href={`https://wa.me/919542840444?text=I%20want%20a%20quote%20for%20${encodeURIComponent(p.name)}`}>
                  Get a Quote
                </a>
              </Button>
              <Button asChild variant="brandOutline" size="lg">
                <a href="tel:+919542840444">
                  <Phone className="h-4 w-4" /> Call sales
                </a>
              </Button>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold">Key features</h2>
              <ul className="mt-3 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-brand shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold">Specifications</h2>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} className="rounded-md border border-border p-3">
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
