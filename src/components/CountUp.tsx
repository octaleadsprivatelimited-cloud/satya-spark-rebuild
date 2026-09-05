import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up. Parses a numeric prefix from `value` (e.g. "5000+", "10K+",
 * "24/7", "Pan-India") and smoothly counts from 1 → number whenever the element
 * enters the viewport. Non-numeric values are rendered as-is.
 */
export function CountUp({
  value,
  duration = 1800,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    const match = /^(\d+(?:\.\d+)?)\s*([KMkm]?)([+%]?)(.*)$/.exec(value);

    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const unit = match[2] ?? "";
    const suffix = (match[3] ?? "") + (match[4] ?? "");
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let start = 0;
    let hasAnimated = false;

    const formatValue = (current: number) => {
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      return formatted + unit + suffix;
    };

    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = 1 + (target - 1) * eased;
      setDisplay(formatValue(current));
      if (p < 1) raf = requestAnimationFrame(animate);
      else setDisplay(value);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            cancelAnimationFrame(raf);
            start = 0;
            setDisplay(formatValue(1));
            raf = requestAnimationFrame(animate);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
