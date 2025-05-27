// components/UniversalSearch.tsx
"use client";

import React, { FC, KeyboardEvent } from "react";
import { Search } from "lucide-react";

interface UniversalSearchProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const UniversalSearch: FC<UniversalSearchProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search…",
}) => {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex items-center max-w-3xl mx-auto mt-8 px-4 py-2 bg-white rounded-full shadow-md">
      <input
        type="text"
        className="flex-1 outline-none px-3 py-2 rounded-full text-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
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
};

export default UniversalSearch;
