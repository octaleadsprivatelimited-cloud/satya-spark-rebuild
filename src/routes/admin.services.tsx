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
import { listServices } from "@/lib/services/data-service";
import type { Service } from "@/lib/types";

const q = { queryKey: ["services"], queryFn: listServices };

export const Route = createFileRoute("/admin/services")({
  head: () => ({ meta: [{ title: "Services — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminServices,
});

function AdminServices() {
  const { data } = useSuspenseQuery(q);
  const [items, setItems] = useState<Service[]>(data);
  const [editing, setEditing] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const s: Service = {
      id: editing.id || crypto.randomUUID(),
      slug: editing.slug || String(fd.get("title") ?? "").toLowerCase().replace(/\s+/g, "-"),
      title: String(fd.get("title") ?? ""),
      summary: String(fd.get("summary") ?? ""),
      description: String(fd.get("description") ?? ""),
      icon: String(fd.get("icon") ?? "Wrench"),
    };
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === s.id);
      return idx === -1 ? [s, ...prev] : prev.map((x) => (x.id === s.id ? s : x));
    });
    setOpen(false);
    setEditing(null);
    toast.success("Service saved");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Services"
        action={<Button variant="brand" onClick={() => { setEditing({ id: "", slug: "", title: "", summary: "", description: "", icon: "Wrench" }); setOpen(true); }}><Plus className="h-4 w-4" /> New</Button>}
      />
      <Card className="p-4">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Summary</TableHead><TableHead>Icon</TableHead><TableHead className="text-right w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.summary}</TableCell>
                <TableCell><code className="text-xs">{s.icon}</code></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(s); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { setItems((p) => p.filter((x) => x.id !== s.id)); toast.success("Deleted"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} service</DialogTitle></DialogHeader>
          {editing ? (
            <form onSubmit={save} className="grid gap-4">
              <div><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={editing.title} required className="mt-1.5" /></div>
              <div><Label htmlFor="summary">Summary</Label><Input id="summary" name="summary" defaultValue={editing.summary} className="mt-1.5" /></div>
              <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={editing.description} className="mt-1.5" /></div>
              <div><Label htmlFor="icon">Lucide icon name</Label><Input id="icon" name="icon" defaultValue={editing.icon} className="mt-1.5" /></div>
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
