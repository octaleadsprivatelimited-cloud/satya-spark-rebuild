import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGalleryItem, deleteGalleryItem, listGallery, updateGalleryItem } from "@/lib/services/data-service";
import type { GalleryItem } from "@/lib/types";
import { toast } from "sonner";

export default function AdminGallery() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["gallery"], queryFn: listGallery });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>({});

  function openNew() { setEditing(null); setForm({ title: "", image: "", category: "General" }); setOpen(true); }
  function openEdit(g: GalleryItem) { setEditing(g); setForm({ ...g }); setOpen(true); }
  async function onSubmit() {
    if (!form.title?.trim() || !form.image?.trim()) return toast.error("Title and image are required");
    if (editing) { await updateGalleryItem(editing.id, form); toast.success("Image updated"); }
    else { await createGalleryItem(form); toast.success("Image added"); }
    qc.invalidateQueries({ queryKey: ["gallery"] });
    setOpen(false);
  }
  async function onDelete(g: GalleryItem) {
    if (!confirm(`Delete "${g.title}"?`)) return;
    await deleteGalleryItem(g.id);
    toast.success("Image deleted");
    qc.invalidateQueries({ queryKey: ["gallery"] });
  }

  return (
    <>
      <AdminPageHeader title="Gallery" description="Manage gallery images."
        action={<Button variant="brand" onClick={openNew}><Plus className="h-4 w-4" /> Add image</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((g) => (
          <Card key={g.id} className="overflow-hidden group relative">
            <div className="aspect-square bg-secondary">
              <img src={g.image} alt={g.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{g.title}</div>
                <div className="text-xs text-muted-foreground">{g.category}</div>
              </div>
              <div className="flex">
                <Button size="sm" variant="ghost" onClick={() => openEdit(g)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(g)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit image" : "Add image"}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.image ?? ""} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/ref/... or https://..." /></div>
            <div><Label>Category</Label><Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            {form.image ? <img src={form.image} alt="" className="mt-2 rounded max-h-40 object-contain bg-muted" /> : null}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="brand" onClick={onSubmit}>{editing ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
