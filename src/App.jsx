import { useState, useMemo, useEffect } from "react";
import ResultsGrid from "./components/ResultsGrid.jsx";
import { searchProducts, suggestAlternatives, smartRecommend } from "./lib/api.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState(()=> JSON.parse(localStorage.getItem("recent")||"[]").slice(0,6));
  const [alt, setAlt] = useState([]);
  const [pick, setPick] = useState(null);

  async function doSearch(q) {
    setErr(""); setLoading(true); setQuery(q);
    try {
      const res = await searchProducts(q);
      setItems(res.items || []);
      const recents = [q, ...recent.filter(x=>x!==q)].slice(0,6);
      setRecent(recents);
      localStorage.setItem("recent", JSON.stringify(recents));
      const sug = await suggestAlternatives(q);
      setAlt(sug.alternatives || []);
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  }

  const filtered = useMemo(() => items, [items]);

  useEffect(()=>{ (async()=>{ const { pick } = await smartRecommend(filtered); setPick(pick); })(); },[filtered]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🛍️ Price Compare</h1>
        </header>

        <div className="flex gap-2">
          <input className="flex-1 rounded-xl border px-3 py-2" placeholder="Search product..."
                 value={query} onChange={(e)=>setQuery(e.target.value)} />
          <button className="rounded-xl px-4 py-2 bg-black text-white"
                  onClick={()=>doSearch(query)} disabled={!query || loading}>
            {loading ? "..." : "Search"}
          </button>
        </div>

        {err && <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-xl my-2">{err}</div>}

        {recent.length>0 && (
          <div className="text-sm">
            <span className="opacity-70 mr-2">Recent:</span>
            {recent.map((r,i)=><button key={i} className="underline mr-2" onClick={()=>doSearch(r)}>{r}</button>)}
          </div>
        )}

        {alt.length>0 && (
          <div className="text-sm">
            <span className="opacity-70 mr-2">Try also:</span>
            {alt.map((a,i)=><button key={i} className="underline mr-2" onClick={()=>doSearch(a)}>{a}</button>)}
          </div>
        )}

        {pick && (
          <div className="rounded-2xl border p-3 bg-amber-50 dark:bg-amber-900/20">
            <div className="text-sm opacity-80">Smart pick:</div>
            <div className="font-medium">{pick.title ? pick.title : "—"} {pick.price ? `— ₹${pick.price.toLocaleString()}` : ""} {pick.site ? `on ${pick.site}` : ""}</div>
          </div>
        )}

        <ResultsGrid items={filtered} />
      </div>
    </div>
  );
}
