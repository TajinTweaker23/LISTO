// pages/profile.tsx

import React from "react";
import Navbar from "../components/ui/Navbar";
import { useAuth } from "../context/AuthContext"; // ← updated path
import Link from "next/link";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-700 mb-4">You are not logged in.</p>
        <Link href="/login" passHref>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
        <div className="bg-white p-6 rounded shadow">
          <p>
            <strong className="text-gray-700">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="text-gray-700">UID:</strong> {user.uid}
          </p>
        </div>
      </main>
    </div>
  );
}
