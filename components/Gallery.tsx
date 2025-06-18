import Image from "next/image";

const images = [
  // Self-improvement
  "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
  // Spirituality
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  // Unplugging from social media
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  // Goal-setting
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
  // Reading
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  // Biking
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=600&q=80",
  // Exercise & fitness
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
  // Cooking
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  // Beauty and makeup
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  // Fashion (haute couture & trends)
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
];

const captions = [
  "Self-improvement", "Spirituality", "Unplugging", "Goal-setting", "Reading",
  "Biking", "Fitness", "Cooking", "Beauty & Makeup", "Fashion"
];

export default function Gallery() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome to LISTO!</h1>
      <p className="mb-6 text-gray-600">
        Explore interests, get inspired, and organize your life. Jump into your
        favorite activities or open your calendar to plan your next move.
      </p>
      <div className="flex flex-wrap gap-4">
        {images.map((url, idx) => (
          <div key={idx} className="relative w-64 h-40 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-200">
            <Image
              src={url}
              alt={captions[idx]}
              fill
              style={{ objectFit: "cover" }}
              sizes="256px"
              priority={idx === 0}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm">
              {captions[idx]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <a
          href="https://calendar.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Open Google Calendar
        </a>
        <a
          href="https://www.notion.so/product/calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800"
        >
          Open Notion Calendar
        </a>
      </div>
    </div>
  );
}