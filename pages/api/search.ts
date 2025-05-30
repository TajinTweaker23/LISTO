// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  // first try GOOGLE_CX, then SEARCH_ENGINE_ID
  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!cx || !apiKey) {
    console.error("Missing GOOGLE_CX or SEARCH_ENGINE_ID or GOOGLE_API_KEY");
    return res
      .status(500)
      .json({ error: "Server mis-configured. Check your env vars." });
  }

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", q);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("num", "12");

  try {
    const r = await fetch(url.toString());
    const data = await r.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Google search error:", err);
    return res.status(500).json({ error: err.message });
  }
}
