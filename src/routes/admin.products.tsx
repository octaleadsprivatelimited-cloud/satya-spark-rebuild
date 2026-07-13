import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { listProducts } from "@/lib/services/data-service";
import type { Product } from "@/lib/types";

const q = { queryKey: ["products"], queryFn: listProducts };

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminProducts,
});

function AdminProducts() {
  const { data } = useSuspenseQuery(q);
  const qc = useQueryClient();
  const [items, setItems] = useState<Product[]>(data);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => items.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  function openNew() {
    setEditing({
      id: "",
      slug: "",
      name: "",
      brand: "",
      categoryId: "",
      categoryName: "",
      shortDescription: "",
      description: "",
      features: [],
      specs: {},
      image: "",
      featured: false,
      createdAt: new Date().toISOString(),
    });
    setOpen(true);
  }

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const updated: Product = {
      ...editing,
      name: String(fd.get("name") ?? ""),
      brand: String(fd.get("brand") ?? ""),
      categoryName: String(fd.get("categoryName") ?? ""),
      shortDescription: String(fd.get("shortDescription") ?? ""),
      description: String(fd.get("description") ?? ""),
      image: String(fd.get("image") ?? ""),
      slug: editing.slug || String(fd.get("name") ?? "").toLowerCase().replace(/\s+/g, "-"),
      id: editing.id || crypto.randomUUID(),
    };
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      return idx === -1 ? [updated, ...prev] : prev.map((p) => (p.id === updated.id ? updated : p));
    });
    setOpen(false);
    setEditing(null);
    toast.success("Product saved");
    qc.invalidateQueries({ queryKey: ["products"] });
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Products"
        description="Create, edit and remove catalogue items. Later synced to Firestore."
        action={
          <Button variant="brand" onClick={openNew}>
            <Plus className="h-4 w-4" /> New product
          </Button>
        }
      />
      <Card className="p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="pl-9" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{p.brand}</TableCell>
                  <TableCell>{p.categoryName}</TableCell>
                  <TableCell>{p.featured ? <Badge className="bg-amber text-amber-foreground border-0">Yes</Badge> : "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(p.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit product" : "New product"}</DialogTitle>
          </DialogHeader>
          {editing ? (
            <form onSubmit={save} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={editing.name} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" name="brand" defaultValue={editing.brand} required className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="categoryName">Category</Label>
                <Input id="categoryName" name="categoryName" defaultValue={editing.categoryName} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" defaultValue={editing.image} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="shortDescription">Short description</Label>
                <Input id="shortDescription" name="shortDescription" defaultValue={editing.shortDescription} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editing.description} rows={4} className="mt-1.5" />
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="brand">Save</Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog><DialogTrigger asChild><span /></DialogTrigger></Dialog>
    </AdminShell>
  );
}
