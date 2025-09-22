// lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE;

// 🔍 Search products from Amazon (for now)
export async function searchAmazon(query) {
  const res = await fetch(`${API_BASE}/api/amazon?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Amazon API failed");
  return await res.json();
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
