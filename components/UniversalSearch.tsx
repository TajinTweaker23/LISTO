"use client";

import React, { useState, useEffect, useRef } from "react";

interface UniversalSearchProps {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  onGrab?: (item: SearchResult, boardName: string) => void;
}

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  image?: string;
}

export default function UniversalSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Search Google...",
  onGrab,
}: UniversalSearchProps) {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [boards, setBoards] = useState<string[]>(["Default Board"]); // List of user boards
  const [selectedBoard, setSelectedBoard] = useState<string>("Default Board");
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch Google search results
  const fetchGoogleResults = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results.");
      const data = await response.json();
      setSuggestions(data.items || []);
    } catch (error) {
      console.error("Error fetching Google results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    if (newValue.trim()) {
      fetchGoogleResults(newValue);
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1); // Reset highlight index on input change
  };

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setIsVoiceActive(true);
    recognition.onend = () => setIsVoiceActive(false);
    recognition.onerror = () => alert("Voice search failed. Please try again.");
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onChange(transcript);
      onSearch(transcript);
    };
    recognition.start();
  };

  const sanitizeInput = (input: string) => {
    const div = document.createElement("div");
    div.innerText = input;
    return div.innerHTML;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setHighlightIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        const selectedSuggestion = suggestions[highlightIndex];
        onChange(selectedSuggestion.title);
        setSuggestions([]);
        onSearch(selectedSuggestion.title);
        updateSearchHistory(selectedSuggestion.title);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateSearchHistory = (query: string) => {
    setSearchHistory((prev) => {
      const updatedHistory = [query, ...prev.filter((q) => q !== query)];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleGrab = (item: SearchResult) => {
    if (onGrab) {
      onGrab(item, selectedBoard);
    }
    alert(`Saved to "${selectedBoard}"`);
  };

  const addNewBoard = () => {
    const newBoardName = prompt("Enter a name for the new board:");
    if (newBoardName && !boards.includes(newBoardName)) {
      setBoards((prev) => [...prev, newBoardName]);
      setSelectedBoard(newBoardName);
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center w-full max-w-xl mx-auto ${
        isDarkMode ? "dark-mode" : ""
      }`}
    >
      {/* Search Bar */}
      <div className="flex items-center w-full">
        <input
          type="text"
          value={sanitizeInput(value)}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleVoiceSearch}
          className={`px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 ${
            isVoiceActive ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          🎤
        </button>
        <button
          onClick={() => {
            onSearch(value);
            updateSearchHistory(value);
          }}
          disabled={!value.trim()}
          className="px-5 py-2 bg-indigo-600 text-white rounded-r-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔍
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="mt-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Board Selection */}
      <div className="mt-4 flex items-center w-full">
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md"
        >
          {boards.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
        <button
          onClick={addNewBoard}
          className="px-4 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
        >
          + Add Board
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(suggestion.title);
                  setSuggestions([]);
                  onSearch(suggestion.title);
                  updateSearchHistory(suggestion.title);
                }}
                className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-indigo-100 ${
                  highlightIndex === index ? "bg-indigo-200" : ""
                }`}
              >
                {suggestion.image && (
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                )}
                <div>
                  <div className="font-semibold">{suggestion.title}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.snippet}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGrab(suggestion);
                  }}
                  className="ml-auto bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                >
                  Grab
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
