import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/services/auth-service";

/**
 * Admin layout: pathless auth guard.
 * Children live at /admin/*. Login lives at /admin/login (a separate top-level route).
 */
export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!getCurrentUser()) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => <Outlet />,
});
