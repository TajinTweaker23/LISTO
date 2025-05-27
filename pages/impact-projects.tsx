// /pages/impact-projects.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { UploadCloud, Calendar, MapPin, FileText } from "lucide-react";

export default function ImpactProjects() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    file: null as File | null,
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await addDoc(collection(db, "impactProjects"), {
      ...form,
      createdAt: Timestamp.now(),
    });
    setForm({ title: "", description: "", date: "", location: "", file: null });
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "impactProjects"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f4] p-6 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10">🌍 Organize Humanitarian Projects</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 bg-white p-6 rounded-xl shadow-xl">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border p-2 rounded"
          rows={3}
        />
        <div className="flex gap-2">
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <input
          name="file"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Add Project
        </button>
      </form>

      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-400 italic">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400 italic">No projects yet. Be the first to make a difference.</p>
        ) : (
          projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition space-y-2"
            >
              <h2 className="text-lg font-bold">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {p.date || "TBD"}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {p.location || "TBD"}
              </div>
              {p.file && (
                <div className="text-xs text-blue-600 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> File attached
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
