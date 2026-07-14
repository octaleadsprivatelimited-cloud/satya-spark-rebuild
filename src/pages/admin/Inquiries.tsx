import { useQuery } from "@tanstack/react-query";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listInquiries } from "@/lib/services/data-service";

const statusStyles: Record<string, string> = {
  new: "bg-amber text-amber-foreground border-0",
  read: "bg-secondary text-secondary-foreground border-0",
  resolved: "bg-green-600 text-white border-0",
};

export default function AdminInquiries() {
  const { data = [] } = useQuery({ queryKey: ["inquiries"], queryFn: listInquiries });
  return (
    <>
      <AdminPageHeader title="Inquiries" description="Contact form submissions from your website." />
      <div className="grid gap-4">
        {data.map((i) => (
          <Card key={i.id} className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
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
              <span className="text-xs text-muted-foreground">{i.createdAt}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
