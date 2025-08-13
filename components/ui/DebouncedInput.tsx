import React, { useState, useEffect } from "react";

function DebouncedInput() {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300); // Delay in milliseconds

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return (
    <div>
      <input
        type="text"
        placeholder="Type something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export function formatDate(dateStr: string | Date, locale: string = "en-US") {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default DebouncedInput;
