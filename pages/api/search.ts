// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = String(req.query.q || "");
  const API_KEY = process.env.GOOGLE_API_KEY!;
  const CX      = process.env.GOOGLE_CX!;

  // proxy the Google Custom Search JSON API
  const googleRes = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
      q
    )}`
  );
  const data = await googleRes.json();
  res.status(200).json(data);
}
