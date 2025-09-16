import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBolt, FaCog, FaList, FaUser } from "react-icons/fa";

const commands = [
	{ icon: <FaBolt />, label: "Quick Boost", action: () => alert("Boost activated!") },
	{ icon: <FaCog />, label: "Settings", action: () => alert("Open settings") },
	{ icon: <FaList />, label: "Tasks", action: () => alert("Show tasks") },
	{ icon: <FaUser />, label: "Profile", action: () => alert("Open profile") },
];

const CommandPalette: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "k") {
				setOpen((prev) => !prev);
				setTimeout(() => inputRef.current?.focus(), 100);
			}
			if (open) {
				if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
				if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
				if (e.key === "Enter") filtered[selected]?.action();
				if (e.key === "Escape") setOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, selected, query]);

	const filtered = commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="bg-white rounded-2xl shadow-2xl p-6 min-w-[350px] max-w-[90vw]">
				<div className="flex items-center gap-2 mb-4">
					<FaSearch className="text-gray-400 text-xl" />
					<input
						ref={inputRef}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
						placeholder="Type a command..."
						autoFocus
					/>
				</div>
				<ul className="space-y-2">
					{filtered.length === 0 && (
						<li className="text-gray-400 text-center py-2">No commands found</li>
					)}
					{filtered.map((cmd, idx) => (
						<li
							key={cmd.label}
							className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${selected === idx ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`}
							onClick={cmd.action}
							onMouseEnter={() => setSelected(idx)}
						>
							<span className="text-xl">{cmd.icon}</span>
							<span>{cmd.label}</span>
						</li>
					))}
				</ul>
				<div className="mt-4 text-xs text-gray-400 text-right">Press <kbd>Ctrl+K</kbd> to toggle</div>
			</div>
		</div>
	);
};

export default CommandPalette;
