import React, { useState } from "react";
import { motion } from "framer-motion";

const beers = [
	{ name: "IPA", description: "Hoppy and refreshing.", rating: 4.5 },
	{ name: "Stout", description: "Rich and creamy.", rating: 4.2 },
	{ name: "Lager", description: "Crisp and clean.", rating: 4.0 },
	{ name: "Pilsner", description: "Light and floral.", rating: 3.8 },
];

const BeerMenu: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="max-w-md mx-auto bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-100 p-8 rounded-3xl shadow-2xl mt-12"
		>
			<h2 className="text-3xl font-bold mb-6 text-yellow-900 text-center drop-shadow">Beer Menu</h2>
			<ul className="space-y-4">
				{beers.map((beer, idx) => (
					<motion.li
						key={beer.name}
						whileHover={{ scale: 1.05, backgroundColor: "#fffbe6" }}
						className={`p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${selected === idx ? "border-2 border-yellow-500" : "border border-transparent"}`}
						onClick={() => setSelected(idx)}
					>
						<div className="flex justify-between items-center">
							<span className="text-xl font-semibold text-orange-800">{beer.name}</span>
							<span className="text-yellow-600 font-bold">{"★".repeat(Math.round(beer.rating))}</span>
						</div>
						<p className="text-orange-700 mt-2">{beer.description}</p>
					</motion.li>
				))}
			</ul>
			{selected !== null && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mt-8 p-6 bg-white rounded-xl shadow-lg text-center"
				>
					<h3 className="text-2xl font-bold text-yellow-800 mb-2">{beers[selected].name}</h3>
					<p className="text-orange-700 mb-4">{beers[selected].description}</p>
					<div className="text-yellow-600 text-lg">Rating: {beers[selected].rating} / 5</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default BeerMenu;
