import React, { useState } from "react";

export default function TableInsert({ onInsert }: { onInsert: (rows: number, cols: number) => void }) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onInsert(rows, cols);
      }}
      className="flex gap-2 items-center"
    >
      <label>
        Rows:
        <input type="number" min={1} max={10} value={rows} onChange={e => setRows(Number(e.target.value))} className="w-12 mx-1" />
      </label>
      <label>
        Columns:
        <input type="number" min={1} max={10} value={cols} onChange={e => setCols(Number(e.target.value))} className="w-12 mx-1" />
      </label>
      <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded">Insert Table</button>
    </form>
  );
}