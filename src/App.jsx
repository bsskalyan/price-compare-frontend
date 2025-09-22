import { useState } from "react";
import ResultsGrid from "./components/ResultsGrid.jsx";
import { searchAmazon } from "./lib/api.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function doSearch(q) {
    setErr(""); 
    setLoading(true); 
    setQuery(q);
    try {
      const res = await searchAmazon(q);
      setItems(res.items || []);
    } catch (e) { 
      setErr(e.message); 
    } finally { 
      setLoading(false); 
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🛍️ Price Compare</h1>
        </header>

        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border px-3 py-2"
            placeholder="Search product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="rounded-xl px-4 py-2 bg-black text-white"
            onClick={() => doSearch(query)}
            disabled={!query || loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {err && (
          <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-xl my-2">
            {err}
          </div>
        )}

        <ResultsGrid items={items} />
      </div>
    </div>
  );
}
