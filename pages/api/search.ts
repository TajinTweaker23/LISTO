// ─────────────────────────────────────────────────────────────────────────────
// File: pages/api/search.ts
// ─────────────────────────────────────────────────────────────────────────────

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ───────────────────────────────────────────────────────────────────────────
  // 1) Extract the “q” query parameter from /api/search?q=...
  // ───────────────────────────────────────────────────────────────────────────
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 2) Read your Custom Search Engine ID and API Key from env vars:
  //    - Either process.env.SEARCH_ENGINE_ID or process.env.GOOGLE_CX
  //    - process.env.GOOGLE_API_KEY
  // ───────────────────────────────────────────────────────────────────────────
  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!cx || !apiKey) {
    console.error(
      "❌  Missing config:",
      "SEARCH_ENGINE_ID=", process.env.SEARCH_ENGINE_ID,
      "GOOGLE_CX=", process.env.GOOGLE_CX,
      "GOOGLE_API_KEY=", process.env.GOOGLE_API_KEY
    );
    return res
      .status(500)
      .json({
        error:
          "Server misconfigured: missing SEARCH_ENGINE_ID / GOOGLE_API_KEY",
      });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 3) Build the URL to call Google’s Custom Search JSON API:
  //    - We specify searchType=image so that results.items will be images
  //    - We set num=12 to retrieve up to 12 images
  // ───────────────────────────────────────────────────────────────────────────
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", q);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("num", "12");

  try {
    const googleResponse = await fetch(url.toString());
    if (!googleResponse.ok) {
      const text = await googleResponse.text();
      console.error(
        "Google CSE returned non-OK:",
        googleResponse.status,
        text
      );
      return res.status(502).json({ error: "Bad response from Google CSE" });
    }
    const data = await googleResponse.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Error fetching from Google CSE:", err);
    return res.status(500).json({ error: err.message });
  }
}
