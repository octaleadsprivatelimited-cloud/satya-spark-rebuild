import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fileToDataUrl, filesToDataUrls } from "@/lib/media";
import { toast } from "sonner";

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB per image

function validate(file: File): boolean {
  if (!file.type.startsWith("image/")) {
    toast.error(`${file.name}: not an image`);
    return false;
  }
  if (file.size > MAX_BYTES) {
    toast.error(`${file.name}: exceeds 3 MB`);
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
  async function handle(files: FileList | null) {
    if (!files || !files[0]) return;
    const f = files[0];
    if (!validate(f)) return;
    onChange(await fileToDataUrl(f));
  }
  return (
    <div className="space-y-2">
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={(e) => handle(e.target.files)} />
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
          <Upload className="h-4 w-4" /> {value ? "Change" : label}
        </Button>
        {value ? (
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
  async function handle(files: FileList | null) {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter(validate);
    if (!valid.length) return;
    const urls = await filesToDataUrls(valid);
    onChange([...(value ?? []), ...urls]);
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
      <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
        <Upload className="h-4 w-4" /> Add images
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
