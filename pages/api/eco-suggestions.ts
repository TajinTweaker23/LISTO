// pages/api/eco-suggestions.ts
interface LocalProject {
  title: string;
  desc: string;
  lat: number;
  lng: number;
  img: string;
}
const [ecoSuggestions, setEcoSuggestions] = useState<LocalProject[]>([]);
import type { NextApiRequest, NextApiResponse } from "next";
import { motion } from "framer-motion";
import { useState } from "react";

// Example static data; replace with real API or DB queries as needed
const ALL_PROJECTS = [
  {
    title: "Local Food Bank",
    desc: "Donate or volunteer to fight hunger.",
    lat: 40.7608,
    lng: -111.8910,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=500&q=80",
  },
  // ...add more real opportunities, or fetch dynamically!
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: "Missing lat/lng" });

  // Basic "nearby" filter
  const suggestions = ALL_PROJECTS.sort((a, b) => {
    const da = Math.abs(a.lat - Number(lat)) + Math.abs(a.lng - Number(lng));
    const db = Math.abs(b.lat - Number(lat)) + Math.abs(b.lng - Number(lng));
    return da - db;
  });

  res.status(200).json({ suggestions });
}

// Add this near the end of your main layout or each page (move this JSX to a React component, not an API route)