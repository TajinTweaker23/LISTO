// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Missing query' });
  }
  // Grab your env vars (set these in Vercel next)
  const KEY = process.env.GOOGLE_API_KEY;
  const CX  = process.env.GOOGLE_CX;
  if (!KEY || !CX) {
    return res.status(500).json({ error: 'API keys not configured' });
  }

  const url = `https://www.googleapis.com/customsearch/v1?` +
              `key=${KEY}&cx=${CX}&q=${encodeURIComponent(q)}`;
  const apiRes = await fetch(url);
  const data   = await apiRes.json();
  return res.status(200).json(data);
}
