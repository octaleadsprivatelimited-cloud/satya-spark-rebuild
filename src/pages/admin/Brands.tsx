import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  createBrand,
  deleteBrand,
  listBrands,
  updateBrand,
} from "@/lib/services/data-service";
import { MAIN_BRAND_NAMES } from "@/lib/mock-data";
import type { Brand } from "@/lib/types";
import { toast } from "sonner";

const isMainName = (n: string) =>
  (MAIN_BRAND_NAMES as readonly string[]).some(
    (m) => m.toLowerCase() === (n ?? "").trim().toLowerCase(),
  );

export default function AdminBrands() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["brands"], queryFn: listBrands });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState<Partial<Brand>>({});

  function openNew() {
    setEditing(null);
    setForm({ name: "", note: "", logo: undefined, tier: "additional", showOnHome: false, order: data.length + 1 });
    setOpen(true);
  }
  function openEdit(b: Brand) {
    setEditing(b);
    setForm({ ...b });
    setOpen(true);
  }
  async function onSubmit() {
    if (!form.name?.trim()) return toast.error("Name is required");
    const payload: Partial<Brand> = { ...form };
    // Enforce: only INNO / Grandway / EXFO / Claron can be main.
    if (!isMainName(payload.name || "")) payload.tier = "additional";
    if (editing) {
      await updateBrand(editing.id, payload);
      toast.success("Brand updated");
    } else {
      await createBrand(payload);
      toast.success("Brand created");
    }
    qc.invalidateQueries({ queryKey: ["brands"] });
    setOpen(false);
  }
  async function onDelete(b: Brand) {
    if (!confirm(`Delete "${b.name}"?`)) return;
    await deleteBrand(b.id);
    toast.success("Brand deleted");
    qc.invalidateQueries({ queryKey: ["brands"] });
  }
  async function toggleHome(b: Brand, v: boolean) {
    await updateBrand(b.id, { showOnHome: v });
    qc.invalidateQueries({ queryKey: ["brands"] });
  }

  const nameIsMain = isMainName(form.name || "");

  return (
    <>
      <AdminPageHeader
        title="Brands"
        description="Manage partner logos. Only INNO, Grandway, EXFO and Claron can appear as 'Main partners' — everything else goes into 'Additional brands'."
        action={
          <Button variant="brand" onClick={openNew}>
            <Plus className="h-4 w-4" /> Add brand
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((b) => (
          <Card key={b.id} className="p-4">
            <div className="aspect-[4/3] rounded-md border border-border bg-white grid place-items-center p-4">
              {b.logo ? (
                <img src={b.logo} alt={b.name} className="max-h-16 w-auto object-contain" />
              ) : (
                <div className="text-xl font-black text-brand tracking-wider">{b.name}</div>
              )}
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold truncate">{b.name}</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge variant={b.tier === "main" ? "default" : "secondary"}>
                    {b.tier === "main" ? "Main" : "Additional"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => openEdit(b)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => onDelete(b)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <label className="mt-3 flex items-center justify-between rounded-md border border-border px-3 py-2 text-xs">
              <span>Show in Home brands section</span>
              <Switch
                checked={!!b.showOnHome}
                onCheckedChange={(v) => toggleHome(b, v)}
              />
            </label>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit brand" : "New brand"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <ImageUpload
                value={form.logo}
                onChange={(v) => setForm({ ...form, logo: v || undefined })}
              />
            </div>
            <div>
              <Label>Note / tagline</Label>
              <Textarea
                rows={3}
                value={form.note ?? ""}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Short description shown under the logo"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Placement</Label>
                <select
                  value={nameIsMain ? form.tier ?? "additional" : "additional"}
                  disabled={!nameIsMain}
                  onChange={(e) =>
                    setForm({ ...form, tier: e.target.value as Brand["tier"] })
                  }
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="additional">Additional brands</option>
                  <option value="main" disabled={!nameIsMain}>
                    Main partners
                  </option>
                </select>
                {!nameIsMain ? (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Only INNO, Grandway, EXFO and Claron can be main partners.
                  </p>
                ) : null}
              </div>
              <div>
                <Label>Order</Label>
                <Input
                  type="number"
                  value={form.order ?? 0}
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <label className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
              <div>
                <div className="font-medium">Show on Home page</div>
                <div className="text-xs text-muted-foreground">
                  Include this brand in the home page "Authorized Brands" strip.
                </div>
              </div>
              <Switch
                checked={!!form.showOnHome}
                onCheckedChange={(v) => setForm({ ...form, showOnHome: v })}
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="brand" onClick={onSubmit}>
              {editing ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
