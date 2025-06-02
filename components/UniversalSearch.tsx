import React, { useState } from "react";

// ✅ Read both values from environment variables instead of hard-coding:
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID!;

export default function UniversalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query) return;
    setLoading(true);

    // Compose the URL using the env vars:
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Custom Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type something to search…"
      />
      <button onClick={search} disabled={loading || !query}>
        {loading ? "Searching…" : "Search"}
      </button>

      {results.length > 0 && (
        <ul>
          {results.map((item: any, idx: number) => (
            <li key={idx}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <p>{item.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
