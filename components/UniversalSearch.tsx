// components/UniversalSearch.tsx
"use client";

import React from "react";

type UniversalSearchProps = {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: () => void;
  placeholder?: string;
};

export default function UniversalSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Type to search…",
}: UniversalSearchProps) {
  return (
    <div className="flex w-full max-w-4xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1
          px-4 py-2
          border border-gray-300
          rounded-l-xl
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          text-gray-700
        "
      />
      <button
        onClick={onSearch}
        disabled={value.trim().length === 0}
        className="
          px-6 py-2
          bg-indigo-600
          text-white
          font-semibold
          rounded-r-xl
          hover:bg-indigo-700
          transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        🔍
      </button>
    </div>
  );
}
