import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/services/auth-service";

export default function AdminProfile() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  useEffect(() => { setUser(getCurrentUser()); }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Profile updated (mock).");
  }

  return (
    <>
      <AdminPageHeader title="Profile" description="Manage your admin account." />
      <form onSubmit={onSubmit}>
        <Card className="p-6 max-w-xl grid gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-brand text-brand-foreground text-xl font-bold">
              {(user?.displayName ?? "A").slice(0, 1)}
            </div>
            <div>
              <div className="font-semibold">{user?.displayName ?? "Admin"}</div>
              <div className="text-sm text-muted-foreground">{user?.role ?? "admin"}</div>
            </div>
          </div>
          <div><Label>Display name</Label><Input defaultValue={user?.displayName ?? ""} className="mt-1.5" /></div>
          <div><Label>Email</Label><Input type="email" defaultValue={user?.email ?? ""} className="mt-1.5" /></div>
          <div className="flex justify-end">
            <Button type="submit" variant="brand">Save changes</Button>
          </div>
        </Card>
      </form>
    </>
  );
}
