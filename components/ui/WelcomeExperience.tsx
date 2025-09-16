import React from "react";
import { motion } from "framer-motion";

const WelcomeExperience: React.FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-600 text-white px-6 py-12"
		>
			<motion.h1
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="text-5xl font-extrabold mb-4 drop-shadow-lg tracking-tight"
			>
				Welcome to LISTO
			</motion.h1>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7, delay: 0.5 }}
				className="text-lg mb-8 max-w-xl text-center"
			>
				Your productivity, creativity, and wellness hub. Experience a new level of organization and inspiration with a beautifully designed interface and powerful features.
			</motion.p>
			<motion.button
				whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#7c3aed" }}
				className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-purple-700 hover:text-white"
			>
				Get Started
			</motion.button>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.7 }}
				transition={{ duration: 1.2, delay: 1 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-white/70"
			>
				© 2025 LISTO. Designed for ADHD, creativity, and wellness.
			</motion.div>
		</motion.div>
	);
};

export default WelcomeExperience;
