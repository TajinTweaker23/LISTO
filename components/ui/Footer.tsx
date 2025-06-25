import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-inner flex flex-col items-center gap-1 transition-all duration-300">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
        <span className="animate-pulse text-blue-500">✨</span>
        <span>
          © {new Date().getFullYear()}{" "}
          <span className="font-bold tracking-wide">LISTO</span>
        </span>
        <span className="animate-pulse text-indigo-500">✨</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Made with{" "}
        <span className="text-pink-500 animate-heartbeat">♥</span> for
        productivity
      </div>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1);}
          20% { transform: scale(1.2);}
          40% { transform: scale(0.95);}
          60% { transform: scale(1.1);}
          80% { transform: scale(0.98);}
        }
        .animate-heartbeat {
          animation: heartbeat 1.2s infinite;
          display: inline-block;
        }
      `}</style>
    </footer>
  );
}