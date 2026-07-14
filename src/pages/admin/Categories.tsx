import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, deleteCategory, listCategories, updateCategory } from "@/lib/services/data-service";
import type { Category } from "@/lib/types";
import { toast } from "sonner";

export default function AdminCategories() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<Partial<Category>>({});

  function openNew() { setEditing(null); setForm({ name: "", slug: "", description: "" }); setOpen(true); }
  function openEdit(c: Category) { setEditing(c); setForm({ ...c }); setOpen(true); }
  async function onSubmit() {
    if (!form.name?.trim()) return toast.error("Name is required");
    if (editing) { await updateCategory(editing.id, form); toast.success("Category updated"); }
    else { await createCategory(form); toast.success("Category created"); }
    qc.invalidateQueries({ queryKey: ["categories"] });
    setOpen(false);
  }
  async function onDelete(c: Category) {
    if (!confirm(`Delete "${c.name}"?`)) return;
    await deleteCategory(c.id);
    toast.success("Category deleted");
    qc.invalidateQueries({ queryKey: ["categories"] });
  }

  return (
    <>
      <AdminPageHeader title="Categories" description="Group products for easy browsing."
        action={<Button variant="brand" onClick={openNew}><Plus className="h-4 w-4" /> Add category</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">/{c.slug}</p>
                {c.description ? <p className="mt-2 text-sm text-muted-foreground">{c.description}</p> : null}
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(c)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit category" : "New category"}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>Name</Label><Input value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={form.slug ?? ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated from name" /></div>
            <div><Label>Description</Label><Textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
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
