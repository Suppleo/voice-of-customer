import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { AssessmentState } from "../types/assessment";
import { useAssessment } from "../hooks/useAssessment";

type AssessmentProps = {
  state: AssessmentState;
  actions: ReturnType<typeof useAssessment>["actions"];
  computed: ReturnType<typeof useAssessment>["computed"];
};

export const Assessment: React.FC<AssessmentProps> = ({
  state,
  actions,
  computed,
}) => {
  const currentQuestion = computed.getCurrentQuestion();
  const progress = computed.getProgress();
  const isCurrentQuestionAnswered = computed.isQuestionAnswered(
    currentQuestion.id
  );
  const currentAnswer = computed.getAnswerForQuestion(currentQuestion.id);

  const handleNext = () => {
    if (state.currentQuestionIndex < computed.totalQuestions - 1) {
      actions.nextQuestion();
    } else {
      actions.calculateResults();
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      actions.previousQuestion();
    }
  };

  const isLastQuestion =
    state.currentQuestionIndex === computed.totalQuestions - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đánh giá năng lực Lắng nghe khách hàng
          </h1>
          <p className="text-gray-600">
            Trả lời các câu hỏi dưới đây để đánh giá mức độ trưởng thành của
            doanh nghiệp bạn
          </p>
        </div>

        {/* Progress */}
        <ProgressBar
          progress={progress}
          currentQuestion={state.currentQuestionIndex + 1}
          totalQuestions={computed.totalQuestions}
        />

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={actions.answerQuestion}
          selectedAnswer={currentAnswer}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={state.currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Câu trước</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span>{isLastQuestion ? "Xem kết quả" : "Câu tiếp theo"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Question Overview */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tổng quan câu hỏi
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: computed.totalQuestions }, (_, index) => {
              const questionId = index + 1;
              const isAnswered = computed.isQuestionAnswered(questionId);
              const isCurrent = index === state.currentQuestionIndex;

              return (
                <div
                  key={questionId}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : isAnswered
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {questionId}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
