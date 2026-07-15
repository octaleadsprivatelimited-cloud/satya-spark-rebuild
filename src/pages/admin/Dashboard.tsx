import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, Database, Image as ImageIcon, Mail, Package, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import {
  listGallery,
  listInquiries,
  listProducts,
  listProjects,
  listServices,
  seedFirestoreFromMock,
} from "@/lib/services/data-service";

export default function AdminDashboard() {
  const qc = useQueryClient();
  const products = useQuery({ queryKey: ["products"], queryFn: listProducts });
  const services = useQuery({ queryKey: ["services"], queryFn: listServices });
  const projects = useQuery({ queryKey: ["projects"], queryFn: listProjects });
  const gallery = useQuery({ queryKey: ["gallery"], queryFn: listGallery });
  const inquiries = useQuery({ queryKey: ["inquiries"], queryFn: listInquiries });
  const [seeding, setSeeding] = useState(false);

  const cards = [
    { label: "Products", count: products.data?.length ?? "—", icon: Package },
    { label: "Services", count: services.data?.length ?? "—", icon: Wrench },
    { label: "Projects", count: projects.data?.length ?? "—", icon: Briefcase },
    { label: "Gallery", count: gallery.data?.length ?? "—", icon: ImageIcon },
    { label: "Inquiries", count: inquiries.data?.length ?? "—", icon: Mail },
  ];

  const isEmpty =
    (products.data?.length ?? 0) === 0 &&
    (services.data?.length ?? 0) === 0 &&
    (projects.data?.length ?? 0) === 0 &&
    (gallery.data?.length ?? 0) === 0;

  async function onSeed() {
    if (!confirm("Populate empty Firestore collections with the built-in sample data?")) return;
    setSeeding(true);
    try {
      const res = await seedFirestoreFromMock();
      toast.success(
        `Seeded: ${res.seeded.join(", ") || "nothing"}${res.skipped.length ? ` · Skipped (already present): ${res.skipped.join(", ")}` : ""}`,
      );
      await qc.invalidateQueries();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Seed failed");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your website content and inquiries."
        action={
          <Button variant="outline" onClick={onSeed} disabled={seeding}>
            <Database className="h-4 w-4" />
            {seeding ? "Seeding…" : isEmpty ? "Seed sample data" : "Seed missing collections"}
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label} className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{c.label}</div>
              <div className="mt-2 text-3xl font-bold">{c.count}</div>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand text-brand-foreground">
              <c.icon className="h-5 w-5" />
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-8 p-6">
        <h2 className="font-semibold">Recent inquiries</h2>
        <div className="mt-4 divide-y divide-border">
          {(inquiries.data ?? []).slice(0, 5).map((i) => (
            <div key={i.id} className="py-3 flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{i.name} — {i.subject}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{i.message}</div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{i.createdAt?.slice(0, 10)}</span>
            </div>
          ))}
          {(inquiries.data ?? []).length === 0 ? (
            <div className="py-3 text-sm text-muted-foreground">No inquiries yet.</div>
          ) : null}
        </div>
      </Card>
    </>
  );
}
