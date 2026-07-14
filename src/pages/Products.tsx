import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { QuoteCta } from "@/components/site/QuoteCta";
import { Seo } from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listBrands, listCategories, listProducts } from "@/lib/services/data-service";
import { brands } from "@/lib/mock-data";

const productsQuery = { queryKey: ["products"], queryFn: listProducts };
const catsQuery = { queryKey: ["categories"], queryFn: listCategories };
const brandsQuery = { queryKey: ["brands"], queryFn: listBrands };

export default function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { data: categories } = useSuspenseQuery(catsQuery);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [brand, setBrand] = useState("all");

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (cat !== "all" && p.categoryId !== cat) return false;
        if (brand !== "all" && p.brand !== brand) return false;
        if (q && !`${p.name} ${p.brand} ${p.categoryName}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [products, cat, brand, q],
  );

  return (
    <SiteLayout>
      <Seo
        title="Brands & Products — Satya Power Technologys"
        description="Authorized distributor for INNO, Grandway, EXFO, Claron and more. Fusion splicers, OTDRs, power meters, cleavers and toolkits."
      />
      <PageHero
        eyebrow="Our partners"
        title="Brands We Represent"
        size="lg"
        subtitle="Genuine equipment from the world's most trusted fiber optic manufacturers."
      />

      {/* Authorized partner strip */}
      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <span className="inline-block rounded-sm bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-foreground">
              Authorized Distributor
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Official Sales & Service Partner</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              For Andhra Pradesh & Telangana
            </p>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg">
              SATYA POWER TECHNOLOGYS is the Authorized Distributor for INNO Instrument, Grandway,
              Claron and EXFO across South India. We provide genuine equipment, full manufacturer
              warranty support, certified calibration, and in-region spare parts.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
              <div className="rounded-md border border-border bg-white p-4">
                <div className="text-xs text-muted-foreground">01</div>
                <div className="mt-1 text-sm font-bold">Authorized Products</div>
              </div>
              <div className="rounded-md border border-border bg-white p-4">
                <div className="text-xs text-muted-foreground">02</div>
                <div className="mt-1 text-sm font-bold">13+ Years experience</div>
              </div>
              <div className="rounded-md border border-border bg-white p-4">
                <div className="text-xs text-muted-foreground">03</div>
                <div className="mt-1 text-sm font-bold">05 Service centers</div>
              </div>
              <div className="rounded-md border border-border bg-white p-4">
                <div className="text-xs text-muted-foreground">04</div>
                <div className="mt-1 text-sm font-bold">100% Genuine Support</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="brand"><a href="#catalog">Shop Authorized Products</a></Button>
              <Button asChild variant="brandOutline"><a href="/services">Service & Repair</a></Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mainBrands.map((b) => (
              <div key={b.name} className="rounded-md border border-border bg-white aspect-square grid place-items-center p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="text-center">
                  {b.src ? (
                    <img src={b.src} alt={b.name} className="max-h-14 w-auto object-contain mx-auto" />
                  ) : (
                    <div className="text-2xl font-black text-brand tracking-wider">{b.name.split(" ")[0]}</div>
                  )}
                  <div className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {b.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional brands */}
      <section className="py-16 bg-secondary/40 border-y border-border">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Portfolio</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold">Our Additional Brands</h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs text-right">
              Premium brands available in-region — all backed by our own in-region support.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {additionalBrands.map((b) => (
              <div key={b.name} className="rounded-md border border-border bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="font-bold">{b.name}</div>
                  <span className="text-[10px] uppercase tracking-widest text-brand">Partner</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Catalogue</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold">Browse our products</h2>
            </div>
            <p className="text-sm text-muted-foreground">{filtered.length} product{filtered.length === 1 ? "" : "s"}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="pl-9" />
            </div>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">All categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">All brands</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-border p-12 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="group">
                  <Card className="overflow-hidden h-full transition-shadow group-hover:shadow-[var(--shadow-elegant)]">
                    <div className="aspect-[4/3] relative overflow-hidden bg-secondary">
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {p.featured ? <Badge className="absolute top-3 left-3 bg-amber text-amber-foreground border-0">Featured</Badge> : null}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                      <h3 className="mt-1 font-semibold leading-tight">{p.name}</h3>
                      <p className="mt-2 text-xs text-muted-foreground">{p.categoryName}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <QuoteCta />
    </SiteLayout>
  );
}
