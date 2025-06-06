// pages/impact-projects.tsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { db } from "../lib/firebase"; // ← updated path
import {
  collection,
  addDoc,
  getDocs,
  type DocumentData
} from "firebase/firestore";

export default function ImpactProjects() {
  const [projects, setProjects] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // Fetch all projects on mount
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const items: DocumentData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(items);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Add a new project
  const addProject = async () => {
    if (!newTitle.trim()) return;
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        title: newTitle,
        createdAt: new Date()
      });
      setProjects((prev) => [
        ...prev,
        { id: docRef.id, title: newTitle, createdAt: new Date() }
      ]);
      setNewTitle("");
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Impact Projects
        </h1>

        {/* New Project Input */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter project title…"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            onClick={addProject}
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
          >
            Add
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-gray-600">Loading…</p>}

        {/* Project List */}
        {!loading && projects.length === 0 && (
          <p className="text-gray-500">No projects yet.</p>
        )}
        {!loading && projects.length > 0 && (
          <ul className="space-y-2">
            {projects.map((proj) => (
              <li key={proj.id} className="p-4 bg-white rounded shadow">
                <strong className="text-lg text-gray-800">{proj.title}</strong>
                <span className="block text-sm text-gray-500">
                  {proj.createdAt?.toDate
                    ? proj.createdAt.toDate().toLocaleString()
                    : new Date(proj.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
