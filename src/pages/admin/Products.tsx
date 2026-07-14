import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listProducts } from "@/lib/services/data-service";

export default function AdminProducts() {
  const { data = [] } = useQuery({ queryKey: ["products"], queryFn: listProducts });
  return (
    <>
      <AdminPageHeader title="Products" description="Manage your product catalogue."
        action={<Button variant="brand"><Plus className="h-4 w-4" /> Add product</Button>} />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((p) => (
                <tr key={p.id}>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                      <div className="font-medium">{p.name}</div>
                    </div>
                  </td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.categoryName}</td>
                  <td className="p-3">{p.featured ? <Badge className="bg-amber text-amber-foreground border-0">Featured</Badge> : "—"}</td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
