import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

interface EmailCollectionProps {
  onEmailSubmit: (email: string) => void;
}

export const EmailCollection: React.FC<EmailCollectionProps> = ({
  onEmailSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email của bạn");
      return;
    }

    if (!validateEmail(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onEmailSubmit(email);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span>Đánh giá mức độ trưởng thành về</span>
            <span className="text-blue-600 block">
              quản trị trải nghiệm khách hàng
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Khám phá năng lực Lắng nghe khách hàng (Voice of Customer) của doanh
            nghiệp bạn thông qua bài đánh giá chuyên sâu. Nhận kết quả chi tiết
            và lộ trình cải thiện cụ thể.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl m-8 md:m-8 p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Bắt đầu đánh giá của bạn
            </h2>
            <p className="text-gray-600">
              Chỉ mất 5 phút để hoàn thành • 10 câu hỏi • Kết quả ngay lập tức
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Địa chỉ email của bạn
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-4 border-2 rounded-xl text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  error
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                placeholder="your.email@company.com"
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs mr-2">
                    !
                  </span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Bắt đầu đánh giá</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Bằng cách tiếp tục, bạn đồng ý nhận thông tin về sản phẩm và dịch
              vụ từ chúng tôi
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Được phát triển bởi{" "}
            <span className="font-semibold text-blue-600">Suppleo</span>
          </p>
        </div>
      </div>
    </div>
  );
};
