import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { DEMO_CREDENTIALS, getCurrentUser, signIn } from "@/lib/services/auth-service";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);

  if (typeof window !== "undefined" && getCurrentUser()) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/40 p-4">
      <Seo title="Admin Login — Satya Power Technologys" noIndex />
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-brand text-brand-foreground font-bold">SP</div>
          <h1 className="mt-4 text-2xl font-bold">Admin Console</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage the website.</p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5" />
          </div>
          <Button type="submit" variant="brand" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </Card>
    </div>
  );
}
