// src/lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function searchAmazon(q) {
  const url = `${API_BASE}/api/amazon?q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Amazon API error: ${res.status}`);
  return await res.json();
}
