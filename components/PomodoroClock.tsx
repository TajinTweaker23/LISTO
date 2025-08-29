
import React, { useState, useEffect, useRef } from 'react';

const PomodoroClock: React.FC = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerType, setTimerType] = useState<'session' | 'break'>('session');
  const [isPaused, setIsPaused] = useState(true);
  const [sessionNum, setSessionNum] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          }
          if (timerType === 'session') {
            setTimerType('break');
            setSessionNum(prev => prev + 1);
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play();
            }
            return breakLength * 60;
          } else {
            setTimerType('session');
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play();
            }
            return sessionLength * 60;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, timerType, breakLength, sessionLength]);

  const handleStartPause = () => {
    if (isPaused && sessionNum === 0) {
        setSessionNum(1);
    }
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsPaused(true);
    setTimerType('session');
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setSessionNum(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAudioSelect = (src: string) => {
    if (audioRef.current) {
      audioRef.current.src = src;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans">
      <audio ref={audioRef} />
      <div className="text-center">
        <h1 id="title" className="text-4xl mb-4">
          {isPaused ? 'Ready?' : timerType === 'session' ? `Session ${sessionNum}` : `Break ${sessionNum}`}
        </h1>
        <div className="text-8xl font-bold mb-8">
          <span id="minutes">{formatTime(timeLeft).split(':')[0]}</span>
          <span>:</span>
          <span id="seconds">{formatTime(timeLeft).split(':')[1]}</span>
        </div>
        <div id="controls" className="flex justify-center gap-4 mb-8">
          <button id="start" onClick={handleStartPause} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            {isPaused ? 'Start' : 'Pause'}
          </button>
          <button id="reset" onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Reset
          </button>
        </div>
        <div id="options" className="flex justify-center gap-8">
          <div className="text-center">
            <h2 className="text-xl mb-2">Session</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setSessionLength(Math.max(5, sessionLength - 1))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">-</button>
              <input id="sessionInput" type="number" value={sessionLength} onChange={(e) => setSessionLength(Number(e.target.value))} className="w-16 text-center bg-gray-800 border border-gray-700 rounded" />
              <button onClick={() => setSessionLength(Math.min(60, sessionLength + 1))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">+</button>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl mb-2">Break</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setBreakLength(Math.max(1, breakLength - 1))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">-</button>
              <input id="breakInput" type="number" value={breakLength} onChange={(e) => setBreakLength(Number(e.target.value))} className="w-16 text-center bg-gray-800 border border-gray-700 rounded" />
              <button onClick={() => setBreakLength(Math.min(10, breakLength + 1))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">+</button>
            </div>
          </div>
        </div>
        <div className="mt-8">
            <h2 className="text-xl mb-2">Theme</h2>
            <div className="flex justify-center gap-2">
                <button onClick={() => handleAudioSelect('/forest.mp3')} className="theme bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Forest</button>
                <button onClick={() => handleAudioSelect('/ocean.mp3')} className="theme bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Ocean</button>
                <button onClick={() => handleAudioSelect('/rain.mp3')} className="theme bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Rain</button>
                <button onClick={() => handleAudioSelect('/peace.mp3')} className="theme bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Peace</button>
                <button onClick={() => handleAudioSelect('/cafe.mp3')} className="theme bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">Cafe</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroClock;
