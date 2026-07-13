import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listGallery } from "@/lib/services/data-service";
import type { GalleryItem } from "@/lib/types";

const q = { queryKey: ["gallery"], queryFn: listGallery };

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminGallery,
});

function AdminGallery() {
  const { data } = useSuspenseQuery(q);
  const [items, setItems] = useState<GalleryItem[]>(data);
  const [open, setOpen] = useState(false);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item: GalleryItem = {
      id: crypto.randomUUID(),
      title: String(fd.get("title") ?? ""),
      image: String(fd.get("image") ?? ""),
      category: String(fd.get("category") ?? ""),
    };
    setItems((prev) => [item, ...prev]);
    setOpen(false);
    toast.success("Image added");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Gallery"
        description="Upload and manage gallery images."
        action={<Button variant="brand" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add image</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((g) => (
          <Card key={g.id} className="overflow-hidden">
            <div className="aspect-[4/3] bg-secondary">
              <img src={g.image} alt={g.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{g.title}</div>
                <div className="text-xs text-muted-foreground">{g.category}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setItems((prev) => prev.filter((x) => x.id !== g.id)); toast.success("Deleted"); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add gallery image</DialogTitle></DialogHeader>
          <form onSubmit={save} className="grid gap-4">
            <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required className="mt-1.5" /></div>
            <div><Label htmlFor="category">Category</Label><Input id="category" name="category" className="mt-1.5" /></div>
            <div><Label htmlFor="image">Image URL</Label><Input id="image" name="image" required className="mt-1.5" /></div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="brand">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
