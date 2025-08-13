import React from 'react';

type ActionButtonsProps = {
  onFocusClick: () => void;
  onCommandClick: () => void;
  isFocusMode: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onFocusClick, onCommandClick, isFocusMode }) => {
  return (
    <>
      <button
        onClick={onFocusClick}
        className="fixed top-8 left-8 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold shadow-lg hover:scale-105 focus:outline-none transition group"
        aria-label="Toggle Focus Mode"
      >
        <span className="mr-2">🧘</span>
        {isFocusMode ? "Exit Focus Mode" : "Focus Mode"}{' '}
        <span className="ml-2 text-xs opacity-60 group-hover:opacity-100 transition">
          [F]
        </span>
      </button>

      <button
        onClick={onCommandClick}
        className="fixed top-8 right-8 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 focus:outline-none transition group"
        aria-label="Open Command Palette"
      >
        ⌨️ Command Palette
        <span className="ml-2 text-xs opacity-60 group-hover:opacity-100 transition">
          [Ctrl+K]
        </span>
      </button>
    </>
  );
};

export default ActionButtons;
