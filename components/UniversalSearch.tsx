// components/UniversalSearch.tsx
"use client";

import React, { KeyboardEvent } from "react";

export interface UniversalSearchProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function UniversalSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Search…",
}: UniversalSearchProps) {
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex w-full max-w-3xl mx-auto">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-sage"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKey}
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
