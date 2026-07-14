import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload, MultiImageUpload } from "@/components/admin/ImageUpload";
import {
  createProduct, deleteProduct, listCategories, listProducts, updateProduct,
} from "@/lib/services/data-service";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

type FormState = Partial<Product> & { featuresText?: string };

export default function AdminProducts() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["products"], queryFn: listProducts });
  const { data: cats = [] } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>({});

  function openNew() {
    setEditing(null);
    setForm({ name: "", brand: "", categoryId: cats[0]?.id, shortDescription: "", image: "", gallery: [], videoUrl: "", featured: false });
    setOpen(true);
  }
  function openEdit(p: Product) {
    setEditing(p);
    setForm({ ...p, gallery: p.gallery ?? [], videoUrl: p.videoUrl ?? "", featuresText: p.features.join("\n") });
    setOpen(true);
  }
  async function onSubmit() {
    if (!form.name?.trim()) return toast.error("Name is required");
    if (!form.image) return toast.error("Please upload a main image");
    const payload: Partial<Product> = {
      ...form,
      features: (form.featuresText || "").split("\n").map((s) => s.trim()).filter(Boolean),
    };
    delete (payload as FormState).featuresText;
    if (editing) {
      await updateProduct(editing.id, payload);
      toast.success("Product updated");
    } else {
      await createProduct(payload);
      toast.success("Product created");
    }
    qc.invalidateQueries({ queryKey: ["products"] });
    setOpen(false);
  }
  async function onDelete(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await deleteProduct(p.id);
    toast.success("Product deleted");
    qc.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <>
      <AdminPageHeader title="Products" description="Manage your product catalogue."
        action={<Button variant="brand" onClick={openNew}><Plus className="h-4 w-4" /> Add product</Button>} />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((p) => (
                <tr key={p.id}>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                      <div className="font-medium">{p.name}</div>
                    </div>
                  </td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.categoryName}</td>
                  <td className="p-3">{p.featured ? <Badge className="bg-amber text-amber-foreground border-0">Featured</Badge> : "—"}</td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(p)}><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2 border-b"><DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle></DialogHeader>
          <div className="grid gap-3 overflow-y-auto px-6 py-4">
            <div><Label>Name</Label><Input value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Brand</Label><Input value={form.brand ?? ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
              <div>
                <Label>Category</Label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                  value={form.categoryId ?? ""} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <Label>Main image</Label>
              <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            </div>
            <div>
              <Label>Additional images (gallery)</Label>
              <MultiImageUpload value={form.gallery ?? []} onChange={(v) => setForm({ ...form, gallery: v })} />
            </div>
            <div>
              <Label>YouTube video URL (optional)</Label>
              <Input value={form.videoUrl ?? ""} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..." />
            </div>
            <div><Label>Short description</Label><Textarea rows={2} value={form.shortDescription ?? ""} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Features (one per line)</Label><Textarea rows={3} value={form.featuresText ?? ""} onChange={(e) => setForm({ ...form, featuresText: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={!!form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} /><Label>Featured</Label></div>
          </div>
          <DialogFooter className="p-4 border-t bg-background">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="brand" onClick={onSubmit}>{editing ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
