import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteInquiry, listInquiries, updateInquiryStatus } from "@/lib/services/data-service";
import type { Inquiry } from "@/lib/types";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  new: "bg-amber text-amber-foreground border-0",
  read: "bg-secondary text-secondary-foreground border-0",
  resolved: "bg-green-600 text-white border-0",
};

export default function AdminInquiries() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["inquiries"], queryFn: listInquiries });

  async function setStatus(i: Inquiry, status: Inquiry["status"]) {
    await updateInquiryStatus(i.id, status);
    qc.invalidateQueries({ queryKey: ["inquiries"] });
  }
  async function onDelete(i: Inquiry) {
    if (!confirm(`Delete inquiry from "${i.name}"?`)) return;
    await deleteInquiry(i.id);
    toast.success("Inquiry deleted");
    qc.invalidateQueries({ queryKey: ["inquiries"] });
  }

  return (
    <>
      <AdminPageHeader title="Inquiries" description="Contact form submissions from your website." />
      <div className="grid gap-4">
        {data.map((i) => (
          <Card key={i.id} className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{i.name}</h3>
                  <Badge className={statusStyles[i.status]}>{i.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {i.email} · {i.phone}
                </div>
                <div className="mt-3 text-sm font-medium">{i.subject}</div>
                <p className="mt-1 text-sm text-muted-foreground">{i.message}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground">{i.createdAt}</span>
                <div className="flex gap-1">
                  <select
                    className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                    value={i.status}
                    onChange={(e) => setStatus(i, e.target.value as Inquiry["status"])}
                  >
                    <option value="new">new</option>
                    <option value="read">read</option>
                    <option value="resolved">resolved</option>
                  </select>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
