import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listServices } from "@/lib/services/data-service";

export default function AdminServices() {
  const { data = [] } = useQuery({ queryKey: ["services"], queryFn: listServices });
  return (
    <>
      <AdminPageHeader title="Services" description="Manage the services you offer."
        action={<Button variant="brand"><Plus className="h-4 w-4" /> Add service</Button>} />
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
