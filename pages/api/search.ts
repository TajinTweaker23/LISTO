// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) Extract the “q” query parameter
  const rawQ = req.query.q;
  const q = Array.isArray(rawQ) ? rawQ[0] : rawQ;
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Missing or invalid query parameter 'q'" });
  }

  // 2) Read GOOGLE_CX (or SEARCH_ENGINE_ID) and GOOGLE_API_KEY from environment
  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!cx || !apiKey) {
    console.error(
      "❌  Missing CX or API key. GOOGLE_CX:",
      process.env.GOOGLE_CX,
      "SEARCH_ENGINE_ID:",
      process.env.SEARCH_ENGINE_ID,
      "GOOGLE_API_KEY:",
      process.env.GOOGLE_API_KEY
    );
    return res
      .status(500)
      .json({ error: "Server misconfigured: missing GOOGLE_CX / SEARCH_ENGINE_ID / GOOGLE_API_KEY" });
  }

  // 3) Build the Google Custom Search URL
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", q);
  // We want images:
  url.searchParams.set("searchType", "image");
  // Return up to 12 images:
  url.searchParams.set("num", "12");

  try {
    const r = await fetch(url.toString());
    if (!r.ok) {
      const text = await r.text();
      console.error("Google CSE returned non-OK:", r.status, text);
      return res.status(502).json({ error: "Bad response from Google CSE" });
    }
    const data = await r.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Error fetching from Google CSE:", err);
    return res.status(500).json({ error: err.message });
  }
}
