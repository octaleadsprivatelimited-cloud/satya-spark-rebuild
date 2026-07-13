import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listCategories } from "@/lib/services/data-service";
import type { Category } from "@/lib/types";

const q = { queryKey: ["categories"], queryFn: listCategories };

export const Route = createFileRoute("/admin/categories")({
  head: () => ({ meta: [{ title: "Categories — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminCategories,
});

function AdminCategories() {
  const { data } = useSuspenseQuery(q);
  const [items, setItems] = useState<Category[]>(data);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const c: Category = {
      id: editing.id || crypto.randomUUID(),
      name: String(fd.get("name") ?? ""),
      slug: String(fd.get("slug") ?? "") || String(fd.get("name") ?? "").toLowerCase().replace(/\s+/g, "-"),
      description: String(fd.get("description") ?? ""),
    };
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === c.id);
      return idx === -1 ? [c, ...prev] : prev.map((x) => (x.id === c.id ? c : x));
    });
    setOpen(false);
    setEditing(null);
    toast.success("Category saved");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Categories"
        description="Manage product categories."
        action={
          <Button variant="brand" onClick={() => { setEditing({ id: "", slug: "", name: "", description: "" }); setOpen(true); }}>
            <Plus className="h-4 w-4" /> New category
          </Button>
        }
      />
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell><code className="text-xs">{c.slug}</code></TableCell>
                <TableCell className="text-muted-foreground text-sm">{c.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(c); setOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setItems((p) => p.filter((x) => x.id !== c.id)); toast.success("Deleted"); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} category</DialogTitle></DialogHeader>
          {editing ? (
            <form onSubmit={save} className="grid gap-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" name="name" defaultValue={editing.name} required className="mt-1.5" /></div>
              <div><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={editing.slug} className="mt-1.5" /></div>
              <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={editing.description} className="mt-1.5" /></div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="brand">Save</Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
