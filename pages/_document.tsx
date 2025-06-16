// pages/vision-board.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

// --- Moodboard presets (update image links or colors if you want!)
const moodboards = [
  {
    title: "Dreamy Pastels",
    desc: "Soft hues to calm your mind and spark creativity.",
    colors: ["#E8D7C1", "#A8BBA8", "#F6E3CE", "#FFF9EC"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Earthy Tones",
    desc: "Natural shades to ground your ambitions.",
    colors: ["#A8BBA8", "#BFA387", "#7E8E7A", "#E8D7C1"],
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Modern Sage",
    desc: "Minimal, fresh, and clean for focus and clarity.",
    colors: ["#A8BBA8", "#8DAA9D", "#E8D7C1", "#D6B05A"],
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Clay & Cream",
    desc: "A cozy, uplifting palette for everyday joy.",
    colors: ["#C9B29B", "#E8D7C1", "#D6B05A", "#FCFAF5"],
    img: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Serene Blue",
    desc: "Cool calm, deep focus.",
    colors: ["#A7C7C7", "#E8D7C1", "#7E8E7A", "#FCFAF5"],
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
  }
];

export default function VisionBoard() {
  const [active, setActive] = useState(0);

  return (
    <div className="main-bg min-h-screen pb-8">
      {/* Navbar */}
      <nav className="navbar">
        <span style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: ".03em" }}>LISTO Vision Board</span>
        <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>Curate Your Dreams</span>
      </nav>

      {/* Title */}
      <div className="container text-center mb-8 mt-8">
        <h1>Inspiration Moodboards</h1>
        <p style={{ color: "var(--color-text-light)" }}>
          Tap a mood to preview colors & vibes. More features (drag & drop, GIFs, uploads) coming soon!
        </p>
      </div>

      {/* Moodboard Grid */}
      <div className="container grid grid-1 sm:grid-2 md:grid-3 lg:grid-4" style={{ gap: "2rem" }}>
        {moodboards.map((mb, i) => (
          <div className="card" key={mb.title} style={{ cursor: "pointer", border: i === active ? "2.5px solid var(--color-accent)" : undefined }}
            onClick={() => setActive(i)}
          >
            <div style={{ position: "relative", width: "100%", height: "180px", marginBottom: "1rem", borderRadius: "14px", overflow: "hidden" }}>
              <Image
                src={mb.img}
                alt={mb.title}
                fill
                sizes="(max-width: 700px) 100vw, 400px"
                style={{ objectFit: "cover" }}
                priority={i < 2}
              />
              {/* Mini color bar over image */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "30px",
                display: "flex",
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
                overflow: "hidden"
              }}>
                {mb.colors.map((c, ci) => (
                  <div key={ci} style={{
                    background: c,
                    flex: 1
                  }} />
                ))}
              </div>
            </div>
            <h2 style={{ marginBottom: "0.2rem" }}>{mb.title}</h2>
            <p style={{ color: "var(--color-text-main)", fontWeight: 400, fontSize: "1rem" }}>{mb.desc}</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem" }}>
              {mb.colors.map((c, ci) => (
                <div key={ci} style={{
                  background: c,
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)"
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <div>
          <span style={{ fontWeight: 500, color: "var(--color-sage)" }}>LISTO © {new Date().getFullYear()}</span>
          <span style={{ color: "var(--color-text-light)", marginLeft: 8 }}> | Advanced vision board builder coming soon!</span>
        </div>
      </footer>
    </div>
  );
}