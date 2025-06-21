import React from "react";
import { X, Facebook, Mail, Copy } from "lucide-react";
import { AssessmentResult } from "../types/assessment";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  resultLevel: AssessmentResult;
  totalScore: number;
}

export const SharePopup: React.FC<SharePopupProps> = ({
  isOpen,
  onClose,
  resultLevel,
  totalScore,
}) => {
  if (!isOpen) return null;

  // Generate unique result ID: {level}-{score}-{timestamp}
  const timestamp = Date.now();
  const resultId = `${resultLevel.level}-${totalScore}-${timestamp}`;

  const shareText = `Tôi vừa hoàn thành bài đánh giá năng lực Lắng nghe khách hàng và đạt cấp ${resultLevel.level} - ${resultLevel.name}! Hãy thử đánh giá doanh nghiệp của bạn.`;
  const shareUrl = `${window.location.origin}/share-result/${resultId}`;

  // Get the correct image based on result level
  const getLevelImage = (level: number) => {
    const baseUrl = window.location.origin;
    switch (level) {
      case 1:
        return `${baseUrl}/images/lv1.jpg`;
      case 2:
        return `${baseUrl}/images/lv2.jpg`;
      case 3:
        return `${baseUrl}/images/lv3.jpg`;
      case 4:
        return `${baseUrl}/images/lv4.jpg`;
      case 5:
        return `${baseUrl}/images/lv5.jpg`;
      default:
        return `${baseUrl}/images/lv1.jpg`;
    }
  };

  const imageUrl = getLevelImage(resultLevel.level);

  const handleFacebookShare = () => {
    // Facebook sharing using the dynamic share URL
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}&quote=${encodeURIComponent(shareText)}`;
    console.log("Facebook sharing URL:", facebookUrl);
    console.log("Share URL:", shareUrl);
    console.log("Image URL:", imageUrl);
    console.log("Result ID:", resultId);
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const handleEmailShare = () => {
    const subject = "Kết quả đánh giá năng lực Lắng nghe khách hàng";
    const body = `${shareText}\n\nXem kết quả tại: ${shareUrl}\n\nHình ảnh kết quả: ${imageUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
      alert("Đã sao chép đường dẫn!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Không thể sao chép đường dẫn");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Chia sẻ kết quả</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của
          mình:
        </p>

        {/* Share Options */}
        <div className="space-y-3">
          {/* Facebook Share */}
          <button
            onClick={handleFacebookShare}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Facebook className="w-5 h-5" />
            <span>Chia sẻ qua Facebook</span>
          </button>

          {/* Email Share */}
          <button
            onClick={handleEmailShare}
            className="w-full flex items-center justify-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Mail className="w-5 h-5" />
            <span>Chia sẻ qua Email</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Copy className="w-5 h-5" />
            <span>Sao chép đường dẫn đến trang kết quả</span>
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};
