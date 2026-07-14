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
import { createProject, deleteProject, listProjects, updateProject } from "@/lib/services/data-service";
import type { Project } from "@/lib/types";
import { toast } from "sonner";

export default function AdminProjects() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["projects"], queryFn: listProjects });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  function openNew() { setEditing(null); setForm({ title: "", client: "", location: "", year: new Date().getFullYear(), summary: "", category: "FTTH", image: "" }); setOpen(true); }
  function openEdit(p: Project) { setEditing(p); setForm({ ...p }); setOpen(true); }
  async function onSubmit() {
    if (!form.title?.trim()) return toast.error("Title is required");
    if (editing) { await updateProject(editing.id, form); toast.success("Project updated"); }
    else { await createProject(form); toast.success("Project created"); }
    qc.invalidateQueries({ queryKey: ["projects"] });
    setOpen(false);
  }
  async function onDelete(p: Project) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    await deleteProject(p.id);
    toast.success("Project deleted");
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <>
      <AdminPageHeader title="Projects" description="Showcase your project portfolio."
        action={<Button variant="brand" onClick={openNew}><Plus className="h-4 w-4" /> Add project</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="aspect-[4/3] bg-secondary">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{p.category}</Badge>
                <span className="text-xs text-muted-foreground">{p.year}</span>
              </div>
              <h3 className="mt-2 font-semibold text-sm">{p.title}</h3>
              <div className="mt-3 flex justify-end gap-1">
                <Button size="sm" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(p)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit project" : "New project"}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Client</Label><Input value={form.client ?? ""} onChange={(e) => setForm({ ...form, client: e.target.value })} /></div>
              <div><Label>Location</Label><Input value={form.location ?? ""} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Year</Label><Input type="number" value={form.year ?? ""} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} /></div>
              <div><Label>Category</Label><Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            </div>
            <div><Label>Image URL</Label><Input value={form.image ?? ""} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            <div><Label>Summary</Label><Textarea rows={3} value={form.summary ?? ""} onChange={(e) => setForm({ ...form, summary: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="brand" onClick={onSubmit}>{editing ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
