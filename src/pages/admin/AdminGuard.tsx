import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { subscribeAuth } from "@/lib/services/auth-service";
import type { AdminUser } from "@/lib/types";

export default function AdminGuard() {
  const [state, setState] = useState<{ loading: boolean; user: AdminUser | null }>(
    { loading: true, user: null },
  );

  useEffect(() => {
    return subscribeAuth((user) => setState({ loading: false, user }));
  }, []);

  if (state.loading) {
    return (
      <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }
  if (!state.user) return <Navigate to="/admin/login" replace />;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
