import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createService, deleteService, listServices, updateService } from "@/lib/services/data-service";
import type { Service } from "@/lib/types";
import { toast } from "sonner";

export default function AdminServices() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["services"], queryFn: listServices });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  function openNew() { setEditing(null); setForm({ title: "", summary: "", description: "", icon: "Wrench" }); setOpen(true); }
  function openEdit(s: Service) { setEditing(s); setForm({ ...s }); setOpen(true); }
  async function onSubmit() {
    if (!form.title?.trim()) return toast.error("Title is required");
    if (editing) { await updateService(editing.id, form); toast.success("Service updated"); }
    else { await createService(form); toast.success("Service created"); }
    qc.invalidateQueries({ queryKey: ["services"] });
    setOpen(false);
  }
  async function onDelete(s: Service) {
    if (!confirm(`Delete "${s.title}"?`)) return;
    await deleteService(s.id);
    toast.success("Service deleted");
    qc.invalidateQueries({ queryKey: ["services"] });
  }

  return (
    <>
      <AdminPageHeader title="Services" description="Manage the services you offer."
        action={<Button variant="brand" onClick={openNew}><Plus className="h-4 w-4" /> Add service</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((s) => (
          <Card key={s.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-brand text-brand-foreground"><Wrench className="h-5 w-5" /></div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(s)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit service" : "New service"}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Summary</Label><Textarea rows={2} value={form.summary ?? ""} onChange={(e) => setForm({ ...form, summary: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea rows={4} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Icon (lucide name)</Label><Input value={form.icon ?? ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
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
