import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listCategories, listProducts } from "@/lib/services/data-service";
import { brands } from "@/lib/mock-data";

const productsQuery = { queryKey: ["products"], queryFn: listProducts };
const catsQuery = { queryKey: ["categories"], queryFn: listCategories };

export default function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { data: categories } = useSuspenseQuery(catsQuery);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [brand, setBrand] = useState("all");

  const filtered = useMemo(() => products.filter((p) => {
    if (cat !== "all" && p.categoryId !== cat) return false;
    if (brand !== "all" && p.brand !== brand) return false;
    if (q && !`${p.name} ${p.brand} ${p.categoryName}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [products, cat, brand, q]);

  return (
    <SiteLayout>
      <Seo title="Products — Fiber Optic Tools | Satya Power Technologys"
        description="Browse fusion splicers, OTDRs, power meters, cleavers, VFLs and toolkits from INNO, VIAVI, EXFO, Grandway and more." />
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm uppercase tracking-widest opacity-80">Catalogue</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Products</h1>
          <p className="mt-3 max-w-2xl text-white/85">
            Genuine fiber optic tools from authorized brands. Fusion splicers, OTDRs, power meters, cleavers, VFLs and complete toolkits.
          </p>
        </div>
      </section>

      <section className="py-10 border-b border-border">
        <div className="container-page grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="pl-9" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">All brands</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} product{filtered.length === 1 ? "" : "s"}</p>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              No products match your filters.
              <div className="mt-4">
                <Button variant="brandOutline" onClick={() => { setQ(""); setCat("all"); setBrand("all"); }}>Reset filters</Button>
              </div>
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
    </SiteLayout>
  );
}
