import { useState, useCallback } from "react";
import {
  AssessmentState,
  UserAnswer,
  AssessmentResult,
} from "../types/assessment";
import assessmentData from "../data/assessment.json";

const initialState: AssessmentState = {
  currentStep: "email",
  email: "",
  currentQuestionIndex: 0,
  answers: [],
  totalScore: 0,
  resultLevel: null,
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);

  const setEmail = useCallback((email: string) => {
    setState((prev) => ({
      ...prev,
      email,
      currentStep: "assessment",
    }));
  }, []);

  const answerQuestion = useCallback(
    (questionId: number, optionId: number, score: number) => {
      setState((prev) => {
        const existingAnswerIndex = prev.answers.findIndex(
          (a) => a.questionId === questionId
        );
        let newAnswers: UserAnswer[];

        if (existingAnswerIndex >= 0) {
          newAnswers = [...prev.answers];
          newAnswers[existingAnswerIndex] = { questionId, optionId, score };
        } else {
          newAnswers = [...prev.answers, { questionId, optionId, score }];
        }

        return {
          ...prev,
          answers: newAnswers,
        };
      });
    },
    []
  );

  const nextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  }, []);

  const previousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
    }));
  }, []);

  const calculateResults = useCallback(() => {
    setState((prev) => {
      const totalScore = prev.answers.reduce(
        (sum, answer) => sum + answer.score,
        0
      );

      // Find the appropriate result level based on score
      let resultLevel = null;

      for (const result of assessmentData.results) {
        const [min, max] = result.range;
        if (totalScore >= min && totalScore < max) {
          resultLevel = result;
          break;
        }
      }

      // Handle edge case for maximum score (level 5 range is 8-11)
      if (!resultLevel && totalScore >= 8) {
        resultLevel =
          assessmentData.results.find((result) => result.level === 5) || null;
      }

      // Fallback to level 1 if still no match
      if (!resultLevel) {
        resultLevel =
          assessmentData.results.find((result) => result.level === 1) || null;
      }

      const newState = {
        ...prev,
        totalScore,
        resultLevel,
        currentStep: "results" as const,
      };

      return newState;
    });
  }, []);

  const resetAssessment = useCallback(() => {
    setState(initialState);
  }, []);

  const getProgress = useCallback(() => {
    return (state.answers.length / assessmentData.questions.length) * 100;
  }, [state.answers.length]);

  const getCurrentQuestion = useCallback(() => {
    return assessmentData.questions[state.currentQuestionIndex];
  }, [state.currentQuestionIndex]);

  const isQuestionAnswered = useCallback(
    (questionId: number) => {
      return state.answers.some((answer) => answer.questionId === questionId);
    },
    [state.answers]
  );

  const getAnswerForQuestion = useCallback(
    (questionId: number) => {
      return state.answers.find((answer) => answer.questionId === questionId);
    },
    [state.answers]
  );

  return {
    state,
    actions: {
      setEmail,
      answerQuestion,
      nextQuestion,
      previousQuestion,
      calculateResults,
      resetAssessment,
    },
    computed: {
      getProgress,
      getCurrentQuestion,
      isQuestionAnswered,
      getAnswerForQuestion,
      totalQuestions: assessmentData.questions.length,
    },
  };
};
