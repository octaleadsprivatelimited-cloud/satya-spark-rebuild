import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/services/auth-service";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({ meta: [{ title: "Profile — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminProfile,
});

function AdminProfile() {
  const user = getCurrentUser();
  const [name, setName] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  return (
    <AdminShell>
      <AdminPageHeader title="Your profile" description="Manage your admin account." />
      <Card className="p-6 max-w-xl">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }} className="grid gap-4">
          <div><Label htmlFor="name">Display name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
          <div><Label htmlFor="email">Email</Label><Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" /></div>
          <div><Label htmlFor="role">Role</Label><Input id="role" value={user?.role ?? "admin"} readOnly className="mt-1.5 bg-muted" /></div>
          <div><Button type="submit" variant="brand">Save</Button></div>
        </form>
      </Card>
    </AdminShell>
  );
}
