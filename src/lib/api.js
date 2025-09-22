const API_BASE = import.meta.env.VITE_API_BASE;

export async function searchProducts(q) {
  const res = await fetch(`${API_BASE}/api/amazon?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Failed to fetch Amazon products");
  return res.json();
}
