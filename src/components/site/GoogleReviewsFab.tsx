const REVIEWS_URL =
  "https://www.google.com/search?q=Satya+Power+Technologys+reviews";

export function GoogleReviewsFab() {
  return (
    <a
      href={REVIEWS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="See our Google Reviews"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-[var(--shadow-elegant)] border border-border hover:scale-105 transition-transform"
    >
      <span className="font-medium text-[13px] leading-tight" style={{ fontFamily: "arial, sans-serif" }}>
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-semibold text-foreground/80">Reviews</span>
        <span className="text-[10px] text-amber-500 tracking-wide">★★★★★</span>
      </span>
    </a>
  );
}
