// components/UniversalSearch.tsx
"use client";

import React, { KeyboardEvent } from "react";
import { Search } from "lucide-react";

interface Props {
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
}: Props) {
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); onSearch(); }
  };
  return (
    <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
      <input
        type="text"
        className="flex-1 outline-none px-3 py-2 text-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKey}
      />
      <button
        onClick={onSearch}
        className="ml-2 p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Search"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
