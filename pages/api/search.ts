import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) Get the query and type
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type; // "image" | "web" | undefined

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  // 2) Read search engine id and API key
  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!cx || !apiKey) {
    return res.status(500).json({
      error: "Server misconfigured: missing GOOGLE_CX / SEARCH_ENGINE_ID / GOOGLE_API_KEY"
    });
  }

  // 3) Build request URL
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", q);
  url.searchParams.set("num", "12");

  // Only add image searchType if requested
  if (type === "image") {
    url.searchParams.set("searchType", "image");
  }
  // Optionally: support for videos/docs in future (not all CSEs can do this)

  try {
    const response = await fetch(url.toString());
    const text = await response.text();

    if (!response.ok) {
      let googleError;
      try { googleError = JSON.parse(text); }
      catch { googleError = text; }
      return res.status(502).json({
        error: "Bad response from Google CSE",
        status: response.status,
        googleError
      });
    }

    // Parse and return successful result
    const data = JSON.parse(text);
    return res.status(200).json(data);

  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
