import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader, AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listBlog } from "@/lib/services/data-service";
import type { BlogPost } from "@/lib/types";

const q = { queryKey: ["blog"], queryFn: listBlog };

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Blog — Admin" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: AdminBlog,
});

function AdminBlog() {
  const { data } = useSuspenseQuery(q);
  const [items, setItems] = useState<BlogPost[]>(data);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [open, setOpen] = useState(false);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    const post: BlogPost = {
      id: editing.id || crypto.randomUUID(),
      slug: editing.slug || String(fd.get("title") ?? "").toLowerCase().replace(/\s+/g, "-"),
      title: String(fd.get("title") ?? ""),
      excerpt: String(fd.get("excerpt") ?? ""),
      content: String(fd.get("content") ?? ""),
      cover: String(fd.get("cover") ?? ""),
      author: String(fd.get("author") ?? "Admin"),
      publishedAt: editing.publishedAt || new Date().toISOString(),
      tags: String(fd.get("tags") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    };
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === post.id);
      return idx === -1 ? [post, ...prev] : prev.map((x) => (x.id === post.id ? post : x));
    });
    setOpen(false);
    setEditing(null);
    toast.success("Post saved");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Blog / News"
        action={<Button variant="brand" onClick={() => { setEditing({ id: "", slug: "", title: "", excerpt: "", content: "", cover: "", author: "Admin", publishedAt: "", tags: [] }); setOpen(true); }}><Plus className="h-4 w-4" /> New post</Button>}
      />
      <Card className="p-4">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Published</TableHead><TableHead className="text-right w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.author}</TableCell>
                <TableCell>{new Date(p.publishedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { setItems((prev) => prev.filter((x) => x.id !== p.id)); toast.success("Deleted"); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} post</DialogTitle></DialogHeader>
          {editing ? (
            <form onSubmit={save} className="grid gap-4">
              <div><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={editing.title} required className="mt-1.5" /></div>
              <div><Label htmlFor="excerpt">Excerpt</Label><Input id="excerpt" name="excerpt" defaultValue={editing.excerpt} className="mt-1.5" /></div>
              <div><Label htmlFor="cover">Cover URL</Label><Input id="cover" name="cover" defaultValue={editing.cover} className="mt-1.5" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="author">Author</Label><Input id="author" name="author" defaultValue={editing.author} className="mt-1.5" /></div>
                <div><Label htmlFor="tags">Tags (comma separated)</Label><Input id="tags" name="tags" defaultValue={editing.tags.join(", ")} className="mt-1.5" /></div>
              </div>
              <div><Label htmlFor="content">Content</Label><Textarea id="content" name="content" defaultValue={editing.content} rows={6} className="mt-1.5" /></div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="brand">Save</Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
