import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Play, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { getYouTubeThumb } from "@/lib/media";
import { createGalleryItem, deleteGalleryItem, listGallery, updateGalleryItem } from "@/lib/services/data-service";
import type { GalleryItem } from "@/lib/types";
import { toast } from "sonner";

export default function AdminGallery() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["gallery"], queryFn: listGallery });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>({});

  function openNew() { setEditing(null); setForm({ title: "", image: "", videoUrl: "", category: "General" }); setOpen(true); }
  function openEdit(g: GalleryItem) { setEditing(g); setForm({ ...g }); setOpen(true); }
  async function onSubmit() {
    if (!form.title?.trim()) return toast.error("Title is required");
    if (!form.image && !form.videoUrl) return toast.error("Upload an image or add a YouTube URL");
    const payload = { ...form };
    // If only video, use its thumb as image fallback
    if (!payload.image && payload.videoUrl) {
      payload.image = getYouTubeThumb(payload.videoUrl) ?? "";
    }
    if (editing) { await updateGalleryItem(editing.id, payload); toast.success("Item updated"); }
    else { await createGalleryItem(payload); toast.success("Item added"); }
    qc.invalidateQueries({ queryKey: ["gallery"] });
    setOpen(false);
  }
  async function onDelete(g: GalleryItem) {
    if (!confirm(`Delete "${g.title}"?`)) return;
    await deleteGalleryItem(g.id);
    toast.success("Item deleted");
    qc.invalidateQueries({ queryKey: ["gallery"] });
  }

  return (
    <>
      <AdminPageHeader title="Gallery" description="Manage gallery images and videos."
        action={<Button variant="brand" onClick={openNew}><Plus className="h-4 w-4" /> Add item</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((g) => (
          <Card key={g.id} className="overflow-hidden group relative">
            <div className="aspect-square bg-secondary relative">
              <img src={g.image} alt={g.title} className="h-full w-full object-cover" />
              {g.videoUrl ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-10 w-10 text-white" fill="currentColor" />
                </div>
              ) : null}
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
        <DialogContent className="max-w-lg max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2 border-b"><DialogTitle>{editing ? "Edit item" : "Add item"}</DialogTitle></DialogHeader>
          <div className="grid gap-3 overflow-y-auto px-6 py-4">
            <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div>
              <Label>Image</Label>
              <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            </div>
            <div>
              <Label>YouTube video URL (optional)</Label>
              <Input value={form.videoUrl ?? ""} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..." />
              <p className="text-xs text-muted-foreground mt-1">If provided, the item plays as a video. Its thumbnail is used when no image is uploaded.</p>
            </div>
          </div>
          <DialogFooter className="p-4 border-t bg-background">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="brand" onClick={onSubmit}>{editing ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
