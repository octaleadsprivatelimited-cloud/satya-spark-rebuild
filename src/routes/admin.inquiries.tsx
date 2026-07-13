import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listInquiries } from "@/lib/services/data-service";
import type { Inquiry } from "@/lib/types";

const q = { queryKey: ["inquiries"], queryFn: listInquiries };

export const Route = createFileRoute("/admin/inquiries")({
  head: () => ({ meta: [{ title: "Inquiries — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminInquiries,
});

function AdminInquiries() {
  const { data } = useSuspenseQuery(q);
  const [items, setItems] = useState<Inquiry[]>(data);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  function setStatus(id: string, status: Inquiry["status"]) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Status updated");
  }

  return (
    <AdminShell>
      <AdminPageHeader title="Inquiries" description="Contact form submissions from the website." />
      <Card className="p-4">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Subject</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right w-32">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.name}<div className="text-xs text-muted-foreground">{i.email}</div></TableCell>
                <TableCell>{i.subject}</TableCell>
                <TableCell>
                  <Badge variant={i.status === "new" ? "default" : "outline"}>{i.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(i.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelected(i)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { setItems((prev) => prev.filter((x) => x.id !== i.id)); toast.success("Deleted"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selected?.subject}</DialogTitle></DialogHeader>
          {selected ? (
            <div className="space-y-4 text-sm">
              <div><span className="font-medium">From:</span> {selected.name} · {selected.email} · {selected.phone}</div>
              <div><span className="font-medium">Received:</span> {new Date(selected.createdAt).toLocaleString()}</div>
              <div className="rounded-md bg-muted p-4 whitespace-pre-wrap">{selected.message}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setStatus(selected.id, "read")}>Mark read</Button>
                <Button variant="brand" size="sm" onClick={() => setStatus(selected.id, "resolved")}>Mark resolved</Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
