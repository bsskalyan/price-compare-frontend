export default function ResultCard({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer"
       className="rounded-2xl border p-3 hover:shadow transition flex flex-col">
      <div className="aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden mb-2 flex items-center justify-center">
        {item.image ? <img src={item.image} alt={item.title} className="object-contain w-full h-full"/> : <span>No image</span>}
      </div>
      <div className="text-xs opacity-70">{item.site}</div>
      <div className="font-medium line-clamp-2">{item.title}</div>
      <div className="mt-1 text-lg font-semibold">{item.price ? `₹${item.price.toLocaleString()}` : "Price N/A"}</div>
      <div className="text-sm">{item.rating ? `⭐ ${item.rating}` : "No rating"} {item.discount ? ` • ${item.discount}% off` : ""}</div>
    </a>
  );
}
