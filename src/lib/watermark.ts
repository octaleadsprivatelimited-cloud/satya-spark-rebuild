// Canvas-based image watermark utility.
// Draws "SATYA POWER TECHNOLOGYS" + phone number as a translucent overlay onto a product image.
export interface WatermarkOpts {
  text?: string;
  phone?: string;
  opacity?: number;
}

export async function watermarkImage(
  src: string,
  {
    text = "SATYA POWER TECHNOLOGYS",
    phone = "+91 98765 43210",
    opacity = 0.85,
  }: WatermarkOpts = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0);

      const pad = Math.round(img.width * 0.025);
      const barH = Math.round(img.width * 0.11);
      ctx.fillStyle = `rgba(17,17,17,${opacity * 0.75})`;
      ctx.fillRect(0, canvas.height - barH, canvas.width, barH);
      ctx.fillStyle = "#E32028";
      ctx.fillRect(0, canvas.height - barH, Math.round(img.width * 0.012), barH);

      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${Math.round(barH * 0.36)}px Inter, system-ui, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillText(text, pad + Math.round(img.width * 0.02), canvas.height - barH * 0.62);

      ctx.fillStyle = "#E32028";
      ctx.font = `600 ${Math.round(barH * 0.28)}px Inter, system-ui, sans-serif`;
      ctx.fillText(phone, pad + Math.round(img.width * 0.02), canvas.height - barH * 0.28);

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = reject;
    img.src = src;
  });
}
