import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listGallery } from "@/lib/services/data-service";

export default function AdminGallery() {
  const { data = [] } = useQuery({ queryKey: ["gallery"], queryFn: listGallery });
  return (
    <>
      <AdminPageHeader title="Gallery" description="Manage gallery images."
        action={<Button variant="brand"><Plus className="h-4 w-4" /> Upload image</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((g) => (
          <Card key={g.id} className="overflow-hidden group relative">
            <div className="aspect-square bg-secondary">
              <img src={g.image} alt={g.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium truncate">{g.title}</div>
                <div className="text-xs text-muted-foreground">{g.category}</div>
              </div>
              <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
