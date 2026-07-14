import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listProjects } from "@/lib/services/data-service";

export default function AdminProjects() {
  const { data = [] } = useQuery({ queryKey: ["projects"], queryFn: listProjects });
  return (
    <>
      <AdminPageHeader title="Projects" description="Showcase your project portfolio."
        action={<Button variant="brand"><Plus className="h-4 w-4" /> Add project</Button>} />
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
