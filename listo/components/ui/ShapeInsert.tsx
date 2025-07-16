import React from "react";

export default function ShapeInsert({ onInsert }: { onInsert: (shape: string) => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onInsert("circle")} className="px-2 py-1 bg-pink-500 text-white rounded">Circle</button>
      <button onClick={() => onInsert("square")} className="px-2 py-1 bg-green-500 text-white rounded">Square</button>
      <button onClick={() => onInsert("triangle")} className="px-2 py-1 bg-yellow-500 text-white rounded">Triangle</button>
    </div>
  );
}