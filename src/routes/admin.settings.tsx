import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteSettings } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  const [saved, setSaved] = useState(siteSettings);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = {
      ...saved,
      companyName: String(fd.get("companyName") ?? ""),
      tagline: String(fd.get("tagline") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      email: String(fd.get("email") ?? ""),
      address: String(fd.get("address") ?? ""),
    };
    setSaved(next);
    toast.success("Settings saved");
  }

  return (
    <AdminShell>
      <AdminPageHeader title="Website settings" description="Global site information. Persisted to Firestore later." />
      <Card className="p-6 max-w-3xl">
        <form onSubmit={save} className="grid gap-4">
          <div><Label htmlFor="companyName">Company name</Label><Input id="companyName" name="companyName" defaultValue={saved.companyName} className="mt-1.5" /></div>
          <div><Label htmlFor="tagline">Tagline</Label><Input id="tagline" name="tagline" defaultValue={saved.tagline} className="mt-1.5" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" defaultValue={saved.phone} className="mt-1.5" /></div>
            <div><Label htmlFor="whatsapp">WhatsApp</Label><Input id="whatsapp" name="whatsapp" defaultValue={saved.whatsapp} className="mt-1.5" /></div>
          </div>
          <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" defaultValue={saved.email} className="mt-1.5" /></div>
          <div><Label htmlFor="address">Address / branches</Label><Textarea id="address" name="address" defaultValue={saved.address} className="mt-1.5" /></div>
          <div><Button type="submit" variant="brand">Save changes</Button></div>
        </form>
      </Card>
    </AdminShell>
  );
}
