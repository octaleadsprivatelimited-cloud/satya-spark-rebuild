import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listBlog } from "@/lib/services/data-service";

export default function AdminBlog() {
  const { data = [] } = useQuery({ queryKey: ["blog"], queryFn: listBlog });
  return (
    <>
      <AdminPageHeader title="Blog / News" description="Publish updates and articles."
        action={<Button variant="brand"><Plus className="h-4 w-4" /> New post</Button>} />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="p-3">Post</th>
                <th className="p-3">Author</th>
                <th className="p-3">Published</th>
                <th className="p-3">Tags</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((post) => (
                <tr key={post.id}>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={post.cover} alt="" className="h-10 w-14 rounded object-cover" />
                      <div className="font-medium">{post.title}</div>
                    </div>
                  </td>
                  <td className="p-3">{post.author}</td>
                  <td className="p-3">{post.publishedAt}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
