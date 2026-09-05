import { useEffect, useRef, useState } from "react";
import { loadProductImage, type CatalogProduct } from "@/lib/product-catalog";

export function ProductImage({
  product,
  alt,
  className,
}: {
  product: CatalogProduct;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState({ id: product.id, src: product.image });
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "failed">("loading");
  const [retry, setRetry] = useState(0);
  const { id, revision, image: primary } = product;
  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    setStatus("loading");
    // Keep the last rendered photo while same-product metadata is refreshed.
    if (primary) {
      setImage({ id, src: primary });
      setStatus("ready");
      return;
    }
    const load = async (attempt = 0) => {
      try {
        const value = await loadProductImage({ id, revision, image: primary } as CatalogProduct);
        if (!cancelled) {
          setImage({ id, src: value });
          setStatus(value ? "ready" : "empty");
        }
      } catch {
        if (cancelled) return;
        if (attempt === 0) retryTimer = setTimeout(() => void load(1), 500);
        else setStatus("failed");
      }
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                observer?.disconnect();
                void load();
              }
            },
            { rootMargin: "350px" },
          );
    if (observer && ref.current) observer.observe(ref.current);
    else void load();
    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
      observer?.disconnect();
    };
  }, [id, revision, primary, retry]);
  useEffect(() => {
    const online = () => setRetry((value) => value + 1);
    window.addEventListener("online", online);
    return () => window.removeEventListener("online", online);
  }, []);
  const src = image.id === id ? image.src : "";
  return (
    <div ref={ref} className="h-full w-full">
      {src && status !== "failed" ? (
        <img
          src={src}
          alt={alt}
          className={className}
          decoding="async"
          onError={() => setStatus("failed")}
        />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center bg-muted text-xs text-muted-foreground"
          role="img"
          aria-label={alt}
        >
          {status === "failed"
            ? "Image unavailable — open details to retry"
            : status === "empty"
              ? "No photo uploaded"
              : "Loading image…"}
        </div>
      )}
    </div>
  );
}
