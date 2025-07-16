import { Groq } from 'groq-sdk';
import { motion } from 'framer-motion';

export default async function handler(req, res) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: "Hello from Vercel!" }
      ]
    });
    
    res.status(200).json({ message: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add this near the end of your main layout or each page
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