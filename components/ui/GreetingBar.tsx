import React from 'react';

type GreetingBarProps = {
  greeting: string;
  isOnline: boolean;
};

const GreetingBar: React.FC<GreetingBarProps> = ({ greeting, isOnline }) => {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-40 mt-4 flex items-center gap-3 bg-white/70 dark:bg-black/60 px-6 py-2 rounded-full shadow-lg border border-blue-400/10 text-lg font-bold text-gray-700 dark:text-gray-100 backdrop-blur-lg animate-fade-in">
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='0' y='24' font-size='24'%3E%F0%9F%91%8B%3C/text%3E%3C/svg%3E"
        alt="Waving hand emoji"
        style={{ width: "2em", height: "2em", display: "inline" }}
      />
      {greeting}, <span className="text-blue-500">LISTO User!</span>
      {!isOnline && (
        <span className="ml-2 text-red-600 text-base">[Offline]</span>
      )}
    </div>
  );
};

export default GreetingBar;
