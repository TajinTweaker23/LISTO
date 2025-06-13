// pages/impact-projects.tsx
// ──────────────────────────────────────────────────────────────────────────────
// Example page that reads/writes from Firestore. We fix the import path for `db`.

import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { db } from "../lib/firebase"; // ← correct path to lib/firebase.ts
import { collection, addDoc, getDocs } from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ImpactProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch existing projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const loaded: Project[] = [];
        snapshot.forEach((doc) => {
          loaded.push({
            id: doc.id,
            ...(doc.data() as Omit<Project, "id">),
          });
        });
        setProjects(loaded);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // Add a dummy project (demo)
  const addDummyProject = async () => {
    try {
      const ref = await addDoc(collection(db, "projects"), {
        title: "New Impact Project",
        description: "Description goes here.",
      });
      setProjects((prev) => [
        ...prev,
        {
          id: ref.id,
          title: "New Impact Project",
          description: "Description goes here.",
        },
      ]);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Impact Projects</h2>

        <button
          onClick={addDummyProject}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Dummy Project
        </button>

        {loading ? (
          <p>Loading projects…</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((proj) => (
              <li
                key={proj.id}
                className="p-4 bg-white rounded-lg shadow flex flex-col"
              >
                <h3 className="font-bold text-lg">{proj.title}</h3>
                <p className="text-gray-600">{proj.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
