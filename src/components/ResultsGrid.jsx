import ResultCard from "./ResultCard.jsx";
export default function ResultsGrid({ items }) {
  if (!items?.length) return <div className="opacity-70">No results yet.</div>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
      {items.map((it, idx)=><ResultCard key={idx} item={it} />)}
    </div>
  );
}
