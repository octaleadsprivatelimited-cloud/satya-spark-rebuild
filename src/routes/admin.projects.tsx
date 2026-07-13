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
import { listProjects } from "@/lib/services/data-service";
import type { Project } from "@/lib/types";

const q = { queryKey: ["projects"], queryFn: listProjects };

export const Route = createFileRoute("/admin/projects")({
  head: () => ({ meta: [{ title: "Projects — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminProjects,
});

function AdminProjects() {
  const { data } = useSuspenseQuery(q);
  const [items, setItems] = useState<Project[]>(data);
  const [editing, setEditing] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const p: Project = {
      id: editing.id || crypto.randomUUID(),
      slug: editing.slug || String(fd.get("title") ?? "").toLowerCase().replace(/\s+/g, "-"),
      title: String(fd.get("title") ?? ""),
      client: String(fd.get("client") ?? ""),
      location: String(fd.get("location") ?? ""),
      year: Number(fd.get("year") ?? new Date().getFullYear()),
      summary: String(fd.get("summary") ?? ""),
      image: String(fd.get("image") ?? ""),
      category: String(fd.get("category") ?? ""),
    };
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      return idx === -1 ? [p, ...prev] : prev.map((x) => (x.id === p.id ? p : x));
    });
    setOpen(false);
    setEditing(null);
    toast.success("Project saved");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Projects"
        action={<Button variant="brand" onClick={() => { setEditing({ id: "", slug: "", title: "", client: "", location: "", year: new Date().getFullYear(), summary: "", image: "", category: "" }); setOpen(true); }}><Plus className="h-4 w-4" /> New</Button>}
      />
      <Card className="p-4">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Client</TableHead><TableHead>Location</TableHead><TableHead>Year</TableHead><TableHead className="text-right w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.client}</TableCell>
                <TableCell>{p.location}</TableCell>
                <TableCell>{p.year}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { setItems((prev) => prev.filter((x) => x.id !== p.id)); toast.success("Deleted"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} project</DialogTitle></DialogHeader>
          {editing ? (
            <form onSubmit={save} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={editing.title} required className="mt-1.5" /></div>
                <div><Label htmlFor="client">Client</Label><Input id="client" name="client" defaultValue={editing.client} className="mt-1.5" /></div>
                <div><Label htmlFor="location">Location</Label><Input id="location" name="location" defaultValue={editing.location} className="mt-1.5" /></div>
                <div><Label htmlFor="year">Year</Label><Input id="year" name="year" type="number" defaultValue={editing.year} className="mt-1.5" /></div>
                <div><Label htmlFor="category">Category</Label><Input id="category" name="category" defaultValue={editing.category} className="mt-1.5" /></div>
                <div><Label htmlFor="image">Image URL</Label><Input id="image" name="image" defaultValue={editing.image} className="mt-1.5" /></div>
              </div>
              <div><Label htmlFor="summary">Summary</Label><Textarea id="summary" name="summary" defaultValue={editing.summary} className="mt-1.5" /></div>
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
