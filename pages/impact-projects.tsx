// pages/impact-projects.tsx
"use client";

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Navbar from "../components/ui/Navbar";
import { motion } from "framer-motion";

export default function ImpactProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "impactProjects"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    await addDoc(collection(db, "impactProjects"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    setForm({ title: "", description: "", location: "", date: "" });
    setUploading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f6f9f7] text-[#2e423f] p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">🌍 Impact Projects</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-10"
          >
            <input
              type="text"
              required
              placeholder="Project Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border p-2 rounded h-24"
            ></textarea>
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-[#6c9a8b] text-white py-2 rounded hover:bg-[#588076]"
              disabled={uploading}
            >
              {uploading ? "Posting..." : "Create Project"}
            </button>
          </form>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-md space-y-2"
              >
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-700">{p.description}</p>
                <div className="text-xs text-gray-500">
                  📍 {p.location} — 📅 {p.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
