import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaCog, FaStar, FaUser, FaRocket } from "react-icons/fa";

const links = [
	{ icon: <FaHome />, label: "Home", href: "/" },
	{ icon: <FaStar />, label: "Featured", href: "/featured" },
	{ icon: <FaRocket />, label: "Boost", href: "/boost" },
	{ icon: <FaUser />, label: "Profile", href: "/profile" },
	{ icon: <FaCog />, label: "Settings", href: "/settings" },
];

const FloatingSidebar: React.FC = () => {
	return (
		<motion.nav
			initial={{ x: -80, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="fixed top-1/2 left-6 -translate-y-1/2 z-50 flex flex-col gap-6 bg-gradient-to-br from-purple-700 via-blue-800 to-pink-600 p-4 rounded-2xl shadow-2xl border border-white/10"
		>
			{links.map((link, idx) => (
				<motion.a
					key={link.label}
					href={link.href}
					whileHover={{ scale: 1.15, backgroundColor: "#fff", color: "#7c3aed" }}
					className="flex items-center gap-3 text-lg font-semibold text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white hover:text-purple-700"
				>
					<span className="text-2xl">{link.icon}</span>
					<span>{link.label}</span>
				</motion.a>
			))}
		</motion.nav>
	);
};

export default FloatingSidebar;
