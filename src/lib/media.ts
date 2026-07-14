// Helpers for image upload (file -> compressed base64) and YouTube URL handling.
// Firestore hard-caps a document at 1 MiB, so images stored as base64 in a doc
// must be well under that. We compress client-side to stay safe.

export interface CompressOptions {
  maxWidth?: number;      // px, longest edge
  maxHeight?: number;     // px
  maxBytes?: number;      // target base64 size in bytes
  mimeType?: "image/jpeg" | "image/webp" | "image/png";
  initialQuality?: number;
}

const DEFAULTS: Required<Omit<CompressOptions, "mimeType">> & { mimeType: string } = {
  maxWidth: 1600,
  maxHeight: 1600,
  maxBytes: 700 * 1024, // ~700 KB base64 → safely under Firestore's 1 MiB doc limit
  mimeType: "image/jpeg",
  initialQuality: 0.82,
};

function readAsImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

function canvasToDataUrl(canvas: HTMLCanvasElement, type: string, quality: number): string {
  return canvas.toDataURL(type, quality);
}

// Approx bytes from a base64 data URL
function dataUrlBytes(dataUrl: string): number {
  const comma = dataUrl.indexOf(",");
  const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  return Math.floor((b64.length * 3) / 4);
}

export async function compressImage(file: File, opts: CompressOptions = {}): Promise<string> {
  const o = { ...DEFAULTS, ...opts };
  // PNG with transparency: preserve, but still shrink dimensions
  const preservePng = file.type === "image/png" && opts.mimeType == null;
  const outType = preservePng ? "image/png" : o.mimeType;

  const img = await readAsImage(file);
  let { width, height } = { width: img.naturalWidth, height: img.naturalHeight };
  const scale = Math.min(1, o.maxWidth / width, o.maxHeight / height);
  width = Math.round(width * scale);
  height = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0, width, height);

  // Iterate: reduce quality, then dimensions, until under target size
  let quality = o.initialQuality;
  let dataUrl = canvasToDataUrl(canvas, outType, quality);
  let bytes = dataUrlBytes(dataUrl);
  let guard = 0;
  while (bytes > o.maxBytes && guard++ < 8) {
    if (quality > 0.4) {
      quality -= 0.12;
    } else {
      // shrink 15% and reset quality slightly
      width = Math.round(width * 0.85);
      height = Math.round(height * 0.85);
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      quality = 0.75;
    }
    dataUrl = canvasToDataUrl(canvas, outType, quality);
    bytes = dataUrlBytes(dataUrl);
  }
  return dataUrl;
}

// Backwards-compat: file -> compressed data URL
export async function fileToDataUrl(file: File): Promise<string> {
  return compressImage(file);
}

export async function filesToDataUrls(files: FileList | File[]): Promise<string[]> {
  const arr = Array.from(files);
  const out: string[] = [];
  // sequential to keep memory low on large batches
  for (const f of arr) out.push(await compressImage(f));
  return out;
}

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function getYouTubeEmbed(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function getYouTubeThumb(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
