// pages/impact-projects.tsx
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  FileText,
  UploadCloud,
  Lock,
  Globe,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  timestamp: any;
  isPublic: boolean;
  fileUrl?: string;
}

export default function ImpactProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "impactProjects"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(data);
    });
    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    if (!title || !description || !location || !date) return;
    await addDoc(collection(db, "impactProjects"), {
      title,
      description,
      location,
      date,
      isPublic,
      timestamp: serverTimestamp(),
    });
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setIsPublic(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f9f3] text-[#2e423f] p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center gap-2">
            🌍 Impact Projects
          </h1>
          <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow mb-10">
            <input
              type="text"
              placeholder="Project Title"
              className="border px-4 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="border px-4 py-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="border px-4 py-2 rounded col-span-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {isPublic ? "Public" : "Private"}
            </label>
            <button
              onClick={handleCreate}
              className="col-span-2 bg-[#6c9a8b] hover:bg-[#588076] text-white py-2 rounded"
            >
              Create Project
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-1">{proj.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
                <div className="text-xs text-gray-500 flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {proj.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {proj.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" /> {proj.isPublic ? "Public" : "Private"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
