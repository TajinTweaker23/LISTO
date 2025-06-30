// pages/api/eco-suggestions.ts
interface LocalProject {
  title: string;
  desc: string;
  lat: number;
  lng: number;
  img: string;
}

const ecoSuggestions: LocalProject[] = [
  {
    title: "Local Food Bank",
    desc: "Donate or volunteer to fight hunger.",
    lat: 40.7608,
    lng: -111.8910,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=500&q=80",
  },
  // Add more real opportunities or fetch dynamically!
];

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat/lng" });
  }

  // Basic "nearby" filter
  const suggestions = ecoSuggestions.sort((a, b) => {
    const da = Math.abs(a.lat - Number(lat)) + Math.abs(a.lng - Number(lng));
    const db = Math.abs(b.lat - Number(lat)) + Math.abs(b.lng - Number(lng));
    return da - db;
  });

  res.status(200).json({ suggestions });
}

// Remove unrelated React component code from this API route file.
// Move Mascot and SomeComponent to their own files in the components/ui directory.