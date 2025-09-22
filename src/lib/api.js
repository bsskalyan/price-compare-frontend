// lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE;

// 🔍 Search products from Amazon (for now)
export async function searchProducts(q) {
  const res = await fetch(`${API_BASE}/api/amazon?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Failed to fetch Amazon products");
  return res.json();
}

// 💡 Suggest alternatives (dummy for now)
export async function suggestAlternatives(q) {
  return { alternatives: [] }; // you can extend later
}

// 🤖 Smart recommend (dummy for now)
export async function smartRecommend(items) {
  if (items.length > 0) {
    return { pick: items[0] }; // just return the first as "smart pick"
  }
  return { pick: null };
}
