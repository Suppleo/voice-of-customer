import React, { useState } from "react";
import { Share2, RotateCcw, ExternalLink, CheckCircle } from "lucide-react";
import { GaugeChart } from "./GaugeChart";
import { SharePopup } from "./SharePopup";
import { AssessmentState } from "../types/assessment";

type ResultsProps = {
  state: AssessmentState;
  actions: {
    resetAssessment: () => void;
  };
};

export const Results: React.FC<ResultsProps> = ({ state, actions }) => {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  if (!state.resultLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Đang tải kết quả...
          </h1>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const { resultLevel, totalScore } = state;

  const handleShare = () => {
    setIsSharePopupOpen(true);
  };

  const handleRestart = () => {
    actions.resetAssessment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kết quả đánh giá của bạn
          </h1>
          <p className="text-xl text-gray-600">
            Dựa trên câu trả lời của bạn, đây là mức độ trưởng thành hiện tại
            của doanh nghiệp
          </p>
        </div>

        {/* Score Visualization */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <GaugeChart
            score={totalScore}
            maxScore={10}
            level={resultLevel.level}
            levelName={resultLevel.name}
          />
        </div>

        {/* Result Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <img
              src={resultLevel.icon}
              alt={resultLevel.name}
              className="w-16 h-16 mr-4"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Cấp {resultLevel.level}: {resultLevel.name}
              </h2>
              <p className="text-lg text-gray-600">Điểm số: {totalScore}/10</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {resultLevel.description.text}
            </p>
          </div>
        </div>

        {/* Key Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Các hành động khuyến nghị
          </h3>
          <div className="space-y-4">
            {resultLevel.key_actions.map((action, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{action.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
            <h4 className="text-xl font-semibold mb-3">
              {resultLevel.key_actions_cta.text}
            </h4>
            <a
              href={resultLevel.key_actions_cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <span>Tìm hiểu thêm</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Share2 className="w-5 h-5" />
            <span>Chia sẻ kết quả</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Làm lại đánh giá</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">
            Cảm ơn bạn đã sử dụng công cụ đánh giá của Filum.ai
          </p>
          <p className="text-sm text-gray-400">
            Kết quả này sẽ được gửi đến email:{" "}
            <span className="font-medium">{state.email}</span>
          </p>
        </div>
      </div>

      {/* Share Popup */}
      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
        resultLevel={resultLevel}
        totalScore={totalScore}
      />
    </div>
  );
};
