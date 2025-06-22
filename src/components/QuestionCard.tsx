import React from "react";
import { AssessmentQuestion, UserAnswer } from "../types/assessment";
import { CheckCircle } from "lucide-react";

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (questionId: number, optionId: number, score: number) => void;
  selectedAnswer?: UserAnswer;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  selectedAnswer,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.title}
        </h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option) => {
          const isSelected = selectedAnswer?.optionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id, option.score)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-lg font-medium ${
                    isSelected ? "text-blue-900" : "text-gray-700"
                  }`}
                >
                  {option.text}
                </span>
                {isSelected && (
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
