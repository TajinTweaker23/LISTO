"use client";

import React from "react";

interface UniversalSearchProps {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

/**
 * A controlled input + “Search” button.  When “Enter” or the button is pressed,
 * it calls onSearch().
 */
export default function UniversalSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Type something to search…",
}: UniversalSearchProps) {
  return (
    <div className="flex items-center w-full max-w-xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onSearch}
        disabled={!value.trim()}
        className="px-5 py-2 bg-indigo-600 text-white rounded-r-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🔍
      </button>
    </div>
  );
}
