import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSiteSettings } from "@/lib/services/data-service";

export default function AdminSettings() {
  const { data } = useQuery({ queryKey: ["settings"], queryFn: getSiteSettings });
  if (!data) return null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Settings saved (mock).");
  }

  return (
    <>
      <AdminPageHeader title="Website Settings" description="Company details and contact information." />
      <form onSubmit={onSubmit}>
        <Card className="p-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Company name</Label><Input defaultValue={data.companyName} className="mt-1.5" /></div>
            <div><Label>Tagline</Label><Input defaultValue={data.tagline} className="mt-1.5" /></div>
            <div><Label>Phone</Label><Input defaultValue={data.phone} className="mt-1.5" /></div>
            <div><Label>WhatsApp number</Label><Input defaultValue={data.whatsapp} className="mt-1.5" /></div>
            <div className="sm:col-span-2"><Label>Email</Label><Input defaultValue={data.email} className="mt-1.5" /></div>
            <div className="sm:col-span-2"><Label>Address</Label><Textarea defaultValue={data.address} className="mt-1.5" rows={2} /></div>
            <div><Label>Instagram URL</Label><Input defaultValue={data.social.instagram ?? ""} className="mt-1.5" /></div>
            <div><Label>YouTube URL</Label><Input defaultValue={data.social.youtube ?? ""} className="mt-1.5" /></div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="brand">Save changes</Button>
          </div>
        </Card>
      </form>
    </>
  );
}
