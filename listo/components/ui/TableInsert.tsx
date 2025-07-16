import React, { useState } from "react";

export default function TableInsert({ onInsert }: { onInsert: (rows: number, cols: number) => void }) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);

  const handleRows = (v: number) => {
    if (v < 1 || v > 10) setError("Rows must be 1-10");
    else setError("");
    setRows(v);
    setAnimate(true);
  };
  const handleCols = (v: number) => {
    if (v < 1 || v > 10) setError("Columns must be 1-10");
    else setError("");
    setCols(v);
    setAnimate(true);
  };

  // Remove animation after it plays
  React.useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setAnimate(false), 400);
      return () => clearTimeout(t);
    }
  }, [animate]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!error) onInsert(rows, cols);
      }}
      className="flex flex-col gap-3 items-start p-4 bg-white/70 dark:bg-black/30 rounded-lg shadow-lg"
    >
      <div className="flex gap-4 items-center">
        <label>
          Rows:
          <input
            type="number"
            min={1}
            max={10}
            value={rows}
            onChange={e => handleRows(Number(e.target.value))}
            className="w-12 mx-1 rounded border px-1 focus:ring-2 focus:ring-blue-400 transition"
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={e => handleCols(Number(e.target.value))}
            className="w-12 mx-1 rounded border px-1 focus:ring-2 focus:ring-blue-400 transition"
          />
        </label>
        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition text-white rounded shadow active:scale-95 relative group"
          disabled={!!error}
          tabIndex={0}
        >
          <span className="text-lg animate-bounce">🪄</span>
          Insert Table
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded shadow pointer-events-none z-10">
            Magic Table!
          </span>
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-sm animate-shake">
          {error}
        </div>
      )}
      <div className="mt-2">
        <span className="text-xs text-gray-500">Preview:</span>
        <div
          className={`inline-block border rounded overflow-hidden mt-1 transition-all duration-300 ${
            animate ? "ring-2 ring-blue-400 scale-105" : ""
          }`}
        >
          <table className="border-collapse">
            <tbody>
              {Array.from({ length: rows }).map((_, r) => (
                <tr key={r}>
                  {Array.from({ length: cols }).map((_, c) => (
                    <td
                      key={c}
                      className="w-6 h-6 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .animate-shake {
          animation: shake 0.3s;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </form>
  );
}