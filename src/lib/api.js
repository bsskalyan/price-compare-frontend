const API_BASE = import.meta.env.VITE_API_BASE;

export async function searchProducts(query) {
  const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  return res.json();
}

export async function suggestAlternatives(query) {
  const res = await fetch(`${API_BASE}/api/suggest?q=${encodeURIComponent(query)}`);
  if (!res.ok) return { alternatives: [] }; // fallback
  return res.json();
}

export async function smartRecommend(items) {
  const res = await fetch(`${API_BASE}/api/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) return { pick: null }; // fallback
  return res.json();
}
