import React, { useState } from "react";
import { X, Mail, ArrowLeft } from "lucide-react";

interface EmailSharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  shareText: string;
  shareUrl: string;
  imageUrl: string;
}

export const EmailSharePopup: React.FC<EmailSharePopupProps> = ({
  isOpen,
  onClose,
  shareText,
  shareUrl,
  imageUrl,
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");

  if (!isOpen) return null;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentEmail.trim()) {
      e.preventDefault();
      if (!emails.includes(currentEmail.trim())) {
        setEmails([...emails, currentEmail.trim()]);
        setCurrentEmail("");
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSendEmail = () => {
    if (emails.length === 0) return;

    const subject = "Kết quả đánh giá năng lực Lắng nghe khách hàng";
    const body = `${shareText}\n\nXem kết quả tại: ${shareUrl}\n\nHình ảnh kết quả: ${imageUrl}`;
    const mailtoUrl = `mailto:${emails.join(",")}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);

    // Reset and close
    setEmails([]);
    setCurrentEmail("");
    onClose();
  };

  const handleBack = () => {
    setEmails([]);
    setCurrentEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Chia sẻ qua email
          </h2>
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Instructional Text */}
        <p className="text-gray-600 mb-6">
          Vui lòng cung cấp địa chỉ email mà bạn muốn chia sẻ kết quả:
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Địa chỉ email nhận kết quả"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-2">
            Ấn enter sau mỗi email để xác nhận
          </p>
        </div>

        {/* Email List */}
        {emails.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Email đã thêm:
            </h3>
            <div className="space-y-2">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg"
                >
                  <span className="text-sm text-blue-700">{email}</span>
                  <button
                    onClick={() => removeEmail(email)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>

          <button
            onClick={handleSendEmail}
            disabled={emails.length === 0}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
          >
            <Mail className="w-4 h-4" />
            <span>Gửi email</span>
          </button>
        </div>
      </div>
    </div>
  );
};
