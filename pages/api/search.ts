import type { NextApiRequest, NextApiResponse } from "next";

function getQueryParam(query: any, key: string): string | undefined {
  const val = query[key];
  if (!val) return undefined;
  return Array.isArray(val) ? val[0] : val;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = getQueryParam(req.query, "q");
  const type = getQueryParam(req.query, "type") || "all"; // default "all"
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  // Google CSE for web/image, YouTube API for videos
  const cx = process.env.GOOGLE_CX || process.env.SEARCH_ENGINE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  const youtubeKey = process.env.YOUTUBE_API_KEY; // Add this to Vercel

  try {
    if (type === "video") {
      // Use YouTube Data API v3 for video results
      if (!youtubeKey) {
        return res.status(500).json({ error: "Missing YOUTUBE_API_KEY" });
      }
      const yt = new URL("https://www.googleapis.com/youtube/v3/search");
      yt.searchParams.set("key", youtubeKey);
      yt.searchParams.set("part", "snippet");
      yt.searchParams.set("type", "video");
      yt.searchParams.set("maxResults", "12");
      yt.searchParams.set("q", q);
      const ytRes = await fetch(yt.toString());
      const ytData = await ytRes.json();
      if (!ytRes.ok) {
        return res.status(502).json({ error: "Bad response from YouTube", ytData });
      }
      return res.status(200).json({ items: ytData.items });
    } else {
      // Use Google CSE for everything else
      if (!cx || !apiKey) {
        return res.status(500).json({
          error: "Server misconfigured: missing GOOGLE_CX / SEARCH_ENGINE_ID / GOOGLE_API_KEY"
        });
      }
      const url = new URL("https://www.googleapis.com/customsearch/v1");
      url.searchParams.set("key", apiKey);
      url.searchParams.set("cx", cx);
      url.searchParams.set("q", q);
      url.searchParams.set("num", "12");
      if (type === "image") url.searchParams.set("searchType", "image");
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
      const data = JSON.parse(text);
      return res.status(200).json(data);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
