import React, { useEffect, useState } from 'react';

interface GaugeChartProps {
  score: number;
  maxScore: number;
  level: number;
  levelName: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ 
  score, 
  maxScore, 
  level, 
  levelName 
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);

  const percentage = (animatedScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Level colors
  const getLevelColor = (level: number) => {
    const colors = {
      1: '#ef4444', // red-500
      2: '#f97316', // orange-500
      3: '#eab308', // yellow-500
      4: '#22c55e', // green-500
      5: '#3b82f6', // blue-500
    };
    return colors[level as keyof typeof colors] || '#6b7280';
  };

  const levelColor = getLevelColor(level);

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="transparent"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke={levelColor}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))'
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {animatedScore.toFixed(1)}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            trên {maxScore} điểm
          </div>
          <div 
            className="text-lg font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: levelColor }}
          >
            Cấp {level}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {levelName}
          </div>
        </div>
      </div>

      {/* Level indicators */}
      <div className="absolute inset-0">
        {[1, 2, 3, 4, 5].map((levelNum) => {
          const angle = (levelNum - 1) * 72 - 90; // 360/5 = 72 degrees per level
          const x = 100 + 110 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 110 * Math.sin((angle * Math.PI) / 180);
          
          return (
            <div
              key={levelNum}
              className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transform -translate-x-1/2 -translate-y-1/2 ${
                levelNum <= level 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
              style={{ left: x, top: y }}
            >
              {levelNum}
            </div>
          );
        })}
      </div>
    </div>
  );
};