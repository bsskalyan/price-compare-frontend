import { useState } from "react";
import ResultsGrid from "./components/ResultsGrid.jsx";
import { searchAmazon } from "./lib/api.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function doSearch(q) {
    setErr(""); setLoading(true); setQuery(q);
    try {
      const res = await searchAmazon(q);   // call Amazon only
      setItems(res.items || []);
    } catch (e) { setErr(e.message); } 
    finally { setLoading(false); }
  }

  return (
    <div>
      <h1>🛍️ Price Compare</h1>
      <input value={query} onChange={(e)=>setQuery(e.target.value)} />
      <button onClick={()=>doSearch(query)} disabled={!query || loading}>
        {loading ? "..." : "Search"}
      </button>
      {err && <div style={{color:"red"}}>{err}</div>}
      <ResultsGrid items={items} />
    </div>
  );
}
