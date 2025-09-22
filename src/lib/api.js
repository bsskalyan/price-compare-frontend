// replace with your Render backend URL after deploy
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function searchProducts(q) {
  const r = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(q)}`);
  if (!r.ok) throw new Error(`Search failed: ${r.status}`);
  return r.json();
}
export async function suggestAlternatives(q) {
  const r = await fetch(`${API_BASE}/api/suggest?q=${encodeURIComponent(q)}`);
  return r.json();
}
export async function smartRecommend(items) {
  const r = await fetch(`${API_BASE}/api/smart-recommend?items=${encodeURIComponent(JSON.stringify(items))}`);
  return r.json();
}
