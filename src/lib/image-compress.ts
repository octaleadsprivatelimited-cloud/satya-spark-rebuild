import imageCompression from "browser-image-compression";

// Compress an image File client-side using browser-image-compression.
// Returns a data URL (jpeg/png).
export async function compressImage(
  file: File,
  opts: {
    maxSize?: number;
    quality?: number;
    mimeType?: string;
    maxBytes?: number;
    strict?: boolean;
  } = {},
): Promise<string> {
  const isTransparent = /png|webp/i.test(file.type);
  const mimeType = opts.mimeType ?? (isTransparent ? "image/png" : "image/jpeg");

  const options = {
    maxSizeMB: (opts.maxBytes ?? 500 * 1024) / (1024 * 1024), // 500 KB limit for images roughly
    maxWidthOrHeight: opts.maxSize ?? 1200,
    useWebWorker: true,
    fileType: mimeType,
    initialQuality: opts.quality ?? 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.error("Compression error:", error);
    if (opts.strict) throw new Error("Image could not be optimized. Please choose another image.");
    // Fallback to reading the original file if compression fails
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

/**
 * "Compress" a PDF for client-side storage. We can't truly recompress PDF
 * streams in the browser without a heavy library, but we:
 *  - reject files over a hard upper limit,
 *  - return the file as a data URL (base64) ready to embed/download,
 *  - report the resulting size so the UI can warn for large files.
 *
 * If a hosted Storage bucket is available the caller can swap the data URL
 * for a download URL — the format is identical to how compressImage returns.
 */
export async function compressPdf(
  file: File,
  opts: { maxBytes?: number } = {},
): Promise<{ dataUrl: string; size: number }> {
  const maxBytes = opts.maxBytes ?? 700 * 1024; // 700 KB hard cap for Firestore document limit
  if (!/pdf$/i.test(file.type) && !/\.pdf$/i.test(file.name)) {
    throw new Error("Please upload a PDF file.");
  }
  if (file.size > maxBytes) {
    throw new Error(
      `PDF brochure is too large (${(file.size / 1024).toFixed(0)} KB). Since files are stored directly in the database, please keep brochures under ${(maxBytes / 1024).toFixed(0)} KB to prevent database payload errors.`,
    );
  }
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { dataUrl, size: file.size };
}
