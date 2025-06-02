import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!cx || !apiKey) {
    return res
      .status(500)
      .json({
        error: "Server misconfigured: missing GOOGLE_CX / SEARCH_ENGINE_ID / GOOGLE_API_KEY"
      });
  }

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", q);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("num", "12");

  try {
    const r = await fetch(url.toString());
    const text = await r.text();
    if (!r.ok) {
      // Try to parse error as JSON, fallback to plain text
      let errorDetail;
      try { errorDetail = JSON.parse(text); }
      catch { errorDetail = text; }
      return res.status(502).json({
        error: "Bad response from Google CSE",
        status: r.status,
        googleError: errorDetail
      });
    }
    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
