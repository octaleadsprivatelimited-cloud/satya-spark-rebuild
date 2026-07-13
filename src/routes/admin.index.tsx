import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Briefcase, Image as ImageIcon, Mail, Package, Wrench } from "lucide-react";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/card";
import {
  listGallery,
  listInquiries,
  listProducts,
  listProjects,
  listServices,
} from "@/lib/services/data-service";

const q = {
  queryKey: ["admin", "stats"],
  queryFn: async () => {
    const [products, services, projects, gallery, inquiries] = await Promise.all([
      listProducts(),
      listServices(),
      listProjects(),
      listGallery(),
      listInquiries(),
    ]);
    return { products, services, projects, gallery, inquiries };
  },
};

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Dashboard — Admin | Satya Power" }, { name: "robots", content: "noindex" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data } = useSuspenseQuery(q);
  const cards = [
    { label: "Products", value: data.products.length, icon: Package },
    { label: "Services", value: data.services.length, icon: Wrench },
    { label: "Projects", value: data.projects.length, icon: Briefcase },
    { label: "Gallery items", value: data.gallery.length, icon: ImageIcon },
    { label: "Inquiries", value: data.inquiries.length, icon: Mail },
  ];
  return (
    <AdminShell>
      <AdminPageHeader title="Dashboard" description="Overview of your website content and activity." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{c.label}</div>
                <div className="mt-2 text-3xl font-bold">{c.value}</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand">
                <c.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Recent inquiries</h2>
          <ul className="mt-4 divide-y divide-border">
            {data.inquiries.slice(0, 5).map((i) => (
              <li key={i.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{i.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{i.name} · {i.email}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary">{i.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Latest products</h2>
          <ul className="mt-4 divide-y divide-border">
            {data.products.slice(0, 5).map((p) => (
              <li key={p.id} className="py-3 flex items-center gap-3">
                <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand} · {p.categoryName}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AdminShell>
  );
}
