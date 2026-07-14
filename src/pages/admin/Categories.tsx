import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listCategories } from "@/lib/services/data-service";

export default function AdminCategories() {
  const { data = [] } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  return (
    <>
      <AdminPageHeader title="Categories" description="Group products for easy browsing."
        action={<Button variant="brand"><Plus className="h-4 w-4" /> Add category</Button>} />
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
                <Button size="sm" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
