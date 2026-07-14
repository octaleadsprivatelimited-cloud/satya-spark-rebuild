import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fileToDataUrl, filesToDataUrls } from "@/lib/media";
import { toast } from "sonner";

const MAX_INPUT_BYTES = 15 * 1024 * 1024; // 15 MB source cap; we compress afterwards

function validate(file: File): boolean {
  if (!file.type.startsWith("image/")) {
    toast.error(`${file.name}: not an image`);
    return false;
  }
  if (file.size > MAX_INPUT_BYTES) {
    toast.error(`${file.name}: exceeds 15 MB`);
    return false;
  }
  return true;
}

interface SingleProps {
  value?: string;
  onChange: (dataUrl: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload image" }: SingleProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  async function handle(files: FileList | null) {
    if (!files || !files[0]) return;
    const f = files[0];
    if (!validate(f)) return;
    setBusy(true);
    try {
      const url = await fileToDataUrl(f);
      onChange(url);
      toast.success(`Compressed to ~${Math.round((url.length * 0.75) / 1024)} KB`);
    } catch {
      toast.error("Failed to process image");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-2">
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={(e) => { handle(e.target.files); if (ref.current) ref.current.value = ""; }} />
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => ref.current?.click()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {busy ? "Compressing…" : value ? "Change" : label}
        </Button>
        {value && !busy ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            <X className="h-4 w-4" /> Remove
          </Button>
        ) : null}
      </div>
      {value ? (
        <img src={value} alt="preview" className="max-h-40 rounded border bg-muted object-contain" />
      ) : null}
    </div>
  );
}

interface MultiProps {
  value?: string[];
  onChange: (dataUrls: string[]) => void;
}

export function MultiImageUpload({ value = [], onChange }: MultiProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  async function handle(files: FileList | null) {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter(validate);
    if (!valid.length) return;
    setBusy(true);
    try {
      const urls = await filesToDataUrls(valid);
      onChange([...(value ?? []), ...urls]);
      toast.success(`Added ${urls.length} image${urls.length > 1 ? "s" : ""} (compressed)`);
    } catch {
      toast.error("Failed to process images");
    } finally {
      setBusy(false);
    }
  }
  function remove(i: number) {
    const next = [...value];
    next.splice(i, 1);
    onChange(next);
  }
  return (
    <div className="space-y-2">
      <input ref={ref} type="file" accept="image/*" multiple className="hidden"
        onChange={(e) => { handle(e.target.files); if (ref.current) ref.current.value = ""; }} />
      <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {busy ? "Compressing…" : "Add images"}
      </Button>
      {value.length ? (
        <div className="grid grid-cols-3 gap-2">
          {value.map((src, i) => (
            <div key={i} className="relative group aspect-square rounded border bg-muted overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button type="button" onClick={() => remove(i)}
                className="absolute top-1 right-1 rounded-full bg-black/70 text-white p-1 opacity-0 group-hover:opacity-100 transition">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
