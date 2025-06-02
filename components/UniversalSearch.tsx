// components/UniversalSearch.tsx
"use client";

import React, { KeyboardEvent } from "react";
import { Search } from "lucide-react";

export default function UniversalSearch(props: {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => Promise<void>;
  placeholder?: string;
}) {
  const { value, onChange, onSearch, placeholder } = props;

  // When user hits “Enter” in the input, trigger onSearch()
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Search…"}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={() => onSearch()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-full shadow-md transition"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
