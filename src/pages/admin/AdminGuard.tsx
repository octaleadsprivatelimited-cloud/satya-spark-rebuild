import { Navigate, Outlet } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCurrentUser } from "@/lib/services/auth-service";

export default function AdminGuard() {
  const user = typeof window !== "undefined" ? getCurrentUser() : null;
  if (!user) return <Navigate to="/admin/login" replace />;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
