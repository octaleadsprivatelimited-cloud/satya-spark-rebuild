import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  BarChart3,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Package,
  Settings,
  UserCircle,
  Wrench,
  Briefcase,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut, getCurrentUser } from "@/lib/services/auth-service";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/blog", label: "Blog / News", icon: Newspaper },
  { to: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/profile", label: "Profile", icon: UserCircle },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function onSignOut() {
    await signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  const nav = (
    <nav className="p-3 flex-1 space-y-1 overflow-y-auto">
      {items.map((it) => {
        const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
        return (
          <Link
            key={it.to}
            to={it.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              active
                ? "bg-amber text-amber-foreground font-semibold"
                : "hover:bg-sidebar-accent",
            )}
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarHeader = (
    <div className="p-5 border-b border-sidebar-border flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-amber text-amber-foreground font-bold">
        SP
      </div>
      <div className="leading-tight">
        <div className="text-sm font-bold">Satya Power</div>
        <div className="text-[10px] uppercase tracking-widest opacity-70">Admin</div>
      </div>
    </div>
  );

  const sidebarFooter = (
    <div className="p-3 border-t border-sidebar-border">
      <div className="px-3 py-2 text-xs opacity-80">
        <div className="font-medium truncate">{user?.displayName ?? "Admin"}</div>
        <div className="truncate opacity-70">{user?.email}</div>
      </div>
      <Button
        onClick={onSignOut}
        variant="ghost"
        size="sm"
        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        {sidebarHeader}
        {nav}
        {sidebarFooter}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="relative flex w-72 max-w-[80%] flex-col bg-sidebar text-sidebar-foreground shadow-xl">
            <div className="flex items-center justify-between border-b border-sidebar-border pr-2">
              {sidebarHeader}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-sidebar-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
            {sidebarFooter}
          </aside>
        </div>
      ) : null}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-md hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BarChart3 className="h-5 w-5 text-brand md:hidden" />
            <div className="text-sm font-medium">Admin Console</div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-brand">
              View site →
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
