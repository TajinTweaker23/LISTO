"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Youtube, Plus, Search } from "lucide-react";

// Moodboard Presets
const moodboardsData = [
	{
		title: "Dreamy Pastels",
		description: "Soft hues to calm your mind and spark creativity.",
		colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
		image: "https://source.unsplash.com/300x180/?pastel",
	},
	{
		title: "Bold Contrast",
		description: "Vivid shades that ignite passion and energy.",
		colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
		image: "https://source.unsplash.com/300x180/?bold",
	},
	{
		title: "Earthy Tones",
		description: "Natural shades to ground your ambitions.",
		colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
		image: "https://source.unsplash.com/300x180/?earth",
	},
	{
		title: "Vibrant Energy",
		description: "Bursting with zest and vigor for a productive day.",
		colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
		image: "https://source.unsplash.com/300x180/?vibrant",
	},
	{
		title: "Calm Serenity",
		description: "A peaceful blend of cool tones to relax and inspire.",
		colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
		image: "https://source.unsplash.com/300x180/?serene",
	},
];

// Giphy API Key
const GIPHY_API_KEY = "SvaLDNl2HY3Hf1gmvT2rLNJwH6Tbiano";

export default function VisionBoard() {
	const [visionItems, setVisionItems] = useState<any[]>([]);
	const [showFabMenu, setShowFabMenu] = useState(false);
	const [showGifModal, setShowGifModal] = useState(false);
	const [gifSearch, setGifSearch] = useState("");
	const [gifResults, setGifResults] = useState<any[]>([]);
	const [showMoodboards, setShowMoodboards] = useState(true);

	// Giphy Search Handler
	const handleGifSearch = async () => {
		if (!gifSearch) return;
		setGifResults([]);
		const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
			gifSearch
		)}&limit=12&rating=pg`;
		const res = await fetch(url);
		const data = await res.json();
		setGifResults(data.data || []);
	};

	const handleAddGifResult = (gif: any) => {
		setVisionItems([
			...visionItems,
			{ type: "gif", src: gif.images.fixed_height.url },
		]);
		setShowGifModal(false);
		setGifResults([]);
		setGifSearch("");
	};

	// Moodboard quick add
	const handleAddMoodboard = (mb: any) => {
		setVisionItems([
			...visionItems,
			{
				type: "moodboard",
				title: mb.title,
				description: mb.description,
				colors: mb.colors,
				image: mb.image,
			},
		]);
	};

	// Add YouTube link (simple demo, can be improved later)
	const handleAddYouTube = () => {
		const url = prompt("Paste a YouTube link:");
		if (url) {
			setVisionItems([...visionItems, { type: "youtube", src: url }]);
		}
	};

	// Drag and drop (simple; full reorder coming next version)
	const dragItem = useRef<number | null>(null);
	const dragOverItem = useRef<number | null>(null);

	const handleDragStart = (index: number) => {
		dragItem.current = index;
	};
	const handleDragEnter = (index: number) => {
		dragOverItem.current = index;
	};
	const handleDragEnd = () => {
		const items = [...visionItems];
		const dragged = items.splice(dragItem.current!, 1)[0];
		items.splice(dragOverItem.current!, 0, dragged);
		setVisionItems(items);
		dragItem.current = null;
		dragOverItem.current = null;
	};

	// UI
	return (
		<div
			className="min-h-screen py-6 px-2 sm:px-6 relative"
			style={{ fontFamily: "Inter, Poppins, Arial, sans-serif" }}
		>
			{/* Animated Gradient BG */}
			<div className="animated-gradient-bg" />

			<div className="relative z-10 max-w-4xl mx-auto">
				<header className="flex items-center justify-between mb-4">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
						✨ Vision Board
					</h1>
					<button
						className="rounded-full bg-blue-600 text-white w-12 h-12 shadow-xl flex items-center justify-center hover:bg-blue-700 transition"
						onClick={() => setShowFabMenu((s) => !s)}
						aria-label="Add"
					>
						<Plus size={28} />
					</button>
				</header>

				{/* Moodboards always visible */}
				{showMoodboards && (
					<>
						<h2 className="text-xl font-bold text-white mb-2">Moodboards</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
							{moodboardsData.map((mb, idx) => (
								<motion.div
									key={idx}
									className="bg-white/80 rounded-xl shadow flex flex-col items-center p-2 border border-gray-200 hover:scale-105 transition cursor-pointer"
									whileHover={{ scale: 1.04 }}
									onClick={() => handleAddMoodboard(mb)}
									draggable
									onDragStart={() => handleDragStart(idx)}
									onDragEnter={() => handleDragEnter(idx)}
									onDragEnd={handleDragEnd}
								>
									<img
										src={mb.image}
										alt={mb.title}
										className="rounded-lg mb-1"
										style={{ width: 120, height: 72, objectFit: "cover" }}
									/>
									<div className="font-semibold text-sm mb-1 text-gray-800 text-center">
										{mb.title}
									</div>
									<div className="flex gap-1 mb-1">
										{mb.colors.map((c, i) => (
											<div
												key={i}
												style={{
													background: c,
													width: 16,
													height: 16,
													borderRadius: "100%",
													border: "1px solid #eee",
												}}
											/>
										))}
									</div>
									<div className="text-xs text-gray-500 text-center">
										{mb.description}
									</div>
									<button className="mt-1 px-2 py-1 bg-blue-500 text-xs text-white rounded shadow hover:bg-blue-600">
										Add
									</button>
								</motion.div>
							))}
						</div>
					</>
				)}

				{/* Floating Add Menu */}
				<AnimatePresence>
					{showFabMenu && (
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.92, y: 20 }}
							className="fixed right-8 bottom-20 sm:bottom-12 bg-white/90 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-3"
						>
							<button
								onClick={() => setShowGifModal(true)}
								className="bg-pink-500 hover:bg-pink-600 text-white rounded px-4 py-2 flex items-center gap-1"
							>
								<Search size={18} /> Giphy GIF
							</button>
							<button
								onClick={handleAddYouTube}
								className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 flex items-center gap-1"
							>
								<Youtube size={18} /> YouTube
							</button>
							<button
								onClick={() => setShowFabMenu(false)}
								className="text-gray-700 hover:underline text-sm mt-1"
							>
								Cancel
							</button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Vision Board Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
					{visionItems.map((item, idx) => (
						<motion.div
							key={idx}
							className="bg-white/80 rounded-lg shadow p-2 flex flex-col gap-1 items-center"
							draggable
							onDragStart={() => handleDragStart(idx)}
							onDragEnter={() => handleDragEnter(idx)}
							onDragEnd={handleDragEnd}
						>
							{item.type === "gif" ? (
								<img
									src={item.src}
									alt="GIF"
									style={{
										width: "100%",
										height: 90,
										objectFit: "cover",
										borderRadius: 8,
									}}
								/>
							) : item.type === "youtube" ? (
								<iframe
									width="100%"
									height={90}
									src={item.src.replace("watch?v=", "embed/")}
									title="YouTube video"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									style={{
										borderRadius: 8,
									}}
								></iframe>
							) : item.type === "moodboard" ? (
								<>
									<img
										src={item.image}
										alt={item.title}
										style={{
											width: "100%",
											height: 90,
											objectFit: "cover",
											borderRadius: 8,
										}}
									/>
									<div className="font-semibold text-xs text-gray-800">
										{item.title}
									</div>
									<div className="flex gap-1">
										{item.colors.map((c: string, i: number) => (
											<div
												key={i}
												style={{
													background: c,
													width: 14,
													height: 14,
													borderRadius: "100%",
													border: "1px solid #eee",
												}}
											/>
										))}
									</div>
								</>
							) : null}
						</motion.div>
					))}
				</div>
			</div>

			{/* GIF Modal */}
			<AnimatePresence>
				{showGifModal && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full flex flex-col gap-3">
							<h3 className="font-bold mb-2">Search Giphy GIFs</h3>
							<div className="flex gap-1">
								<input
									type="text"
									placeholder="Search GIFs"
									value={gifSearch}
									onChange={(e) => setGifSearch(e.target.value)}
									className="p-2 border rounded w-4/5"
									onKeyDown={(e) => e.key === "Enter" && handleGifSearch()}
								/>
								<button
									onClick={handleGifSearch}
									className="bg-pink-400 text-white px-2 rounded"
								>
									Search
								</button>
							</div>
							<div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-auto">
								{gifResults.map((gif, i) => (
									<img
										key={gif.id}
										src={gif.images.fixed_height_small.url}
										alt={gif.title}
										className="rounded shadow cursor-pointer transition hover:scale-105"
										onClick={() => handleAddGifResult(gif)}
									/>
								))}
							</div>
							<button
								onClick={() => setShowGifModal(false)}
								className="text-gray-600 hover:underline text-sm mt-2"
							>
								Cancel
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Quick Action Button */}
			<motion.button
				className="fixed bottom-8 right-8 z-50 bg-indigo-500 hover:bg-pink-400 text-white rounded-full shadow-xl p-5 text-3xl border-4 border-white dark:border-indigo-900"
				whileHover={{ scale: 1.15, rotate: 8 }}
				whileTap={{ scale: 0.95 }}
				animate={{ y: [0, -10, 0] }}
				transition={{ repeat: Infinity, duration: 2 }}
				aria-label="Quick Action"
			>
				+
			</motion.button>

			{/* Animated Gradient BG */}
			<style jsx global>{`
				.animated-gradient-bg {
					position: fixed;
					inset: 0;
					width: 100vw;
					height: 100vh;
					z-index: 0;
					background: linear-gradient(
						270deg,
						#5eead4,
						#818cf8,
						#f472b6,
						#fde68a,
						#34d399,
						#a21caf
					);
					background-size: 1800% 1800%;
					animation: gradient-animate 24s ease infinite;
				}
				@keyframes gradient-animate {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			`}</style>
		</div>
	);
}