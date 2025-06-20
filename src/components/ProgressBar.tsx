import React from 'react';

interface ProgressBarProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  currentQuestion, 
  totalQuestions 
}) => {
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-white opacity-20 animate-pulse rounded-full"></div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-600">
          Câu hỏi {currentQuestion} / {totalQuestions}
        </span>
        <span className="text-sm font-medium text-blue-600">
          {Math.round(progress)}% hoàn thành
        </span>
      </div>
    </div>
  );
};