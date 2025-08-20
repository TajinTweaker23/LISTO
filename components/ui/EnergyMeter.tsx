import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, Sun, Moon } from 'lucide-react';

interface EnergyMeterProps {
  level: number; // 0-100
  onChange?: (level: number) => void;
  showDetails?: boolean;
  className?: string;
}

export const EnergyMeter: React.FC<EnergyMeterProps> = ({ 
  level, 
  onChange, 
  showDetails = false,
  className = '' 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Calculate color based on energy level
  const getEnergyColor = (energy: number) => {
    if (energy <= 30) return '#ef4444'; // Red
    if (energy <= 60) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const getEnergyIcon = (energy: number) => {
    if (energy <= 30) return Moon;
    if (energy <= 60) return Battery;
    return Sun;
  };

  const getEnergyLabel = (energy: number) => {
    if (energy <= 20) return 'Very Low';
    if (energy <= 40) return 'Low';
    if (energy <= 60) return 'Moderate';
    if (energy <= 80) return 'Good';
    return 'High';
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(e.target.value);
    onChange?.(newLevel);
  };

  const EnergyIcon = getEnergyIcon(level);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Energy Level Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-100 to-purple-100 rounded-xl">
            <EnergyIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Energy Level</h3>
            <p className="text-sm text-gray-500">{getEnergyLabel(level)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: getEnergyColor(level) }}>
            {level}%
          </div>
        </div>
      </div>

      {/* Energy Meter */}
      <div className="relative">
        <div className="energy-meter relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)`,
              width: '100%'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          
          {/* Energy Indicator */}
          <motion.div
            className="energy-indicator absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 rounded-full shadow-lg z-10"
            style={{ 
              left: `calc(${level}% - 8px)`,
              borderColor: getEnergyColor(level)
            }}
            animate={{ 
              scale: isDragging ? 1.2 : 1,
              boxShadow: isDragging 
                ? `0 4px 12px ${getEnergyColor(level)}40` 
                : '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </div>

        {/* Interactive Slider (invisible but functional) */}
        {onChange && (
          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={`Set energy level to ${level}%`}
          />
        )}
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-4 space-y-3"
        >
          {/* Energy Recommendations */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Recommendations</h4>
            {level <= 30 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Moon className="w-4 h-4 text-blue-500" />
                <span>Consider rest or light activities</span>
              </div>
            )}
            {level > 30 && level <= 60 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Battery className="w-4 h-4 text-amber-500" />
                <span>Moderate activities would be ideal</span>
              </div>
            )}
            {level > 60 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Good time for challenging tasks</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button 
              onClick={() => onChange?.(Math.max(0, level - 10))}
              className="btn-gentle text-xs px-3 py-1.5 rounded-lg"
              disabled={!onChange}
            >
              Lower
            </button>
            <button 
              onClick={() => onChange?.(Math.min(100, level + 10))}
              className="btn-gentle text-xs px-3 py-1.5 rounded-lg"
              disabled={!onChange}
            >
              Higher
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnergyMeter;
