// components/UniversalSearch.tsx
"use client";

import React, { KeyboardEvent } from "react";

export interface UniversalSearchProps {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function UniversalSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Search…",
}: UniversalSearchProps) {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex w-full">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      <button
        onClick={onSearch}
        className="px-4 bg-sage text-white rounded-r-full hover:bg-sage/90 transition"
      >
        🔍
      </button>
    </div>
  );
}
