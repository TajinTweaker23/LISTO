// pages/index.tsx

import { useState, useEffect } from "react";
import AnimatedMoodboardCard from "../components/AnimatedMoodboardCard";
import OnboardingModal from "../components/OnboardingModal";

const moodboards = [
	{
		title: "Dreamy Pastels",
		description: "Soft hues to calm your mind and spark creativity.",
		colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"],
		images: [
			// FIXED Unsplash asset URLs
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1513116476489-7635e79feb27?auto=format&fit=crop&w=600&q=80",
		],
	},
	{
		title: "Bold Contrast",
		description: "Vivid shades that ignite passion and energy.",
		colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
		images: [
			"https://images.unsplash.com/photo-1511909525230-c4f3092f0a47?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
		],
	},
	{
		title: "Earthy Tones",
		description: "Natural shades to ground your ambitions.",
		colors: ["#8B4513", "#D2B48C", "#A0522D", "#F4A460"],
		images: [
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
		],
	},
	{
		title: "Vibrant Energy",
		description: "Bursting with zest and vigor for a productive day.",
		colors: ["#f77f00", "#d62828", "#003049", "#fcbf49"],
		images: [
			"https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
		],
	},
	{
		title: "Calm Serenity",
		description: "A peaceful blend of cool tones to relax and inspire.",
		colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703"],
		images: [
			"https://images.unsplash.com/photo-1470274477920-577b0e039142?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?auto=format&fit=crop&w=600&q=80",
			"https://images.unsplash.com/photo-1500631195313-5a1b7f6a6dd8?auto=format&fit=crop&w=600&q=80",
		],
	},
];

export default function Home() {
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);

	useEffect(() => {
		setUserName(localStorage.getItem("listoUserName"));
		if (!localStorage.getItem("seenOnboarding")) setShowOnboarding(true);
	}, []);

	const handleCloseOnboarding = () => {
		setShowOnboarding(false);
		setUserName(localStorage.getItem("listoUserName"));
	};

	return (
		<div className="max-w-5xl mx-auto p-4">
			{showOnboarding && (
				<OnboardingModal
					onClose={handleCloseOnboarding}
					onComplete={(avatar: any) => {
						// You can handle avatar logic here if needed
						setShowOnboarding(false);
					}}
				/>
			)}
			<h1 className="text-3xl font-bold mb-4">
				Welcome{userName ? `, ${userName}` : ""} to LISTO!
			</h1>
			<div className="flex flex-wrap gap-4 mb-8 justify-center">
				<a
					href="/explore"
					className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
				>
					🌐 Explore
				</a>
				<a
					href="/calendar"
					className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
				>
					📅 Calendar
				</a>
				<a
					href="/vision-board"
					className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 transition"
				>
					🎯 Vision Board
				</a>
			</div>
			<section>
				<h2 className="text-xl font-semibold mb-2">Your Moodboards</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Render your moodboard cards here */}
					{/* Example: moodboards.map((m, i) => <AnimatedMoodboardCard key={i} {...m} />) */}
				</div>
			</section>
		</div>
	);
}