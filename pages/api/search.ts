import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the search query
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  // Get type (optional)
  const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  // Get Google API and Search Engine ID from env
  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!cx || !apiKey) {
    return res.status(500).json({
      error: "Server misconfigured: missing GOOGLE_CX / SEARCH_ENGINE_ID / GOOGLE_API_KEY"
    });
  }

  // Build Google Custom Search API URL
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", q);
  url.searchParams.set("num", "10");

  // Only add searchType=image for images
  if (type === "image") {
    url.searchParams.set("searchType", "image");
  }

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
