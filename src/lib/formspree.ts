// Formspree integration - sends all inquiries to admin email.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqeolynv";

export async function sendToFormspree(payload: Record<string, unknown>) {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.warn("Formspree returned", res.status);
    return res.ok;
  } catch (e) {
    console.error("Formspree error:", e);
    return false;
  }
}
