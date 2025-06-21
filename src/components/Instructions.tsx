import React from "react";

interface InstructionsProps {
  onStart: () => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đánh Giá Mức Độ Trưởng Thành
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá mức độ trưởng thành của doanh nghiệp trong việc lắng nghe
            khách hàng
          </p>
        </div>

        {/* Instructions Section */}
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-8">
          {/* Section Label */}
          <div className="mb-4">
            <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              ● HƯỚNG DẪN TRẢ LỜI
            </span>
          </div>

          {/* Instruction Header */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
            Hãy dựa vào hướng dẫn sau đây để trả lời các câu hỏi:
          </h2>

          {/* Bullet Point Instructions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-600 font-semibold text-sm">✓</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Chọn 'Có':</span>
                <span className="text-gray-700">
                  {" "}
                  nếu câu đó phản ánh hiện trạng đang có VÀ được thực hiện một
                  cách nhất quán (ít nhất 80% thời gian)
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-red-600 font-semibold text-sm">✗</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  Chọn 'Không có':
                </span>
                <span className="text-gray-700">
                  {" "}
                  nếu hoàn toàn chưa từng thực hiện
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-yellow-600 font-semibold text-sm">?</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  Chọn 'Không rõ về vấn đề này':
                </span>
                <span className="text-gray-700">
                  {" "}
                  nếu không chắc chắn đã thực hiện hay chưa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Bắt đầu →
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Bài đánh giá gồm 10 câu hỏi và sẽ mất khoảng 3-5 phút để hoàn thành
          </p>
        </div>
      </div>
    </div>
  );
};
