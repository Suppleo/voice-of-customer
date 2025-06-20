import { useState, useCallback } from 'react';
import { AssessmentState, UserAnswer, AssessmentResult } from '../types/assessment';
import assessmentData from '../data/assessment.json';

const initialState: AssessmentState = {
  currentStep: 'email',
  email: '',
  currentQuestionIndex: 0,
  answers: [],
  totalScore: 0,
  resultLevel: null,
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);

  const setEmail = useCallback((email: string) => {
    console.log('Setting email and moving to assessment:', email);
    setState(prev => ({
      ...prev,
      email,
      currentStep: 'assessment'
    }));
  }, []);

  const answerQuestion = useCallback((questionId: number, optionId: number, score: number) => {
    console.log('Answering question:', questionId, 'with option:', optionId, 'score:', score);
    setState(prev => {
      const existingAnswerIndex = prev.answers.findIndex(a => a.questionId === questionId);
      let newAnswers: UserAnswer[];

      if (existingAnswerIndex >= 0) {
        newAnswers = [...prev.answers];
        newAnswers[existingAnswerIndex] = { questionId, optionId, score };
      } else {
        newAnswers = [...prev.answers, { questionId, optionId, score }];
      }

      console.log('Updated answers:', newAnswers);
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  }, []);

  const previousQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  }, []);

  const calculateResults = useCallback(() => {
    console.log('=== CALCULATE RESULTS CALLED ===');
    
    setState(prev => {
      console.log('Previous state:', prev);
      
      const totalScore = prev.answers.reduce((sum, answer) => sum + answer.score, 0);
      console.log('Calculated total score:', totalScore);
      
      // Find the appropriate result level based on score
      let resultLevel = null;
      
      for (const result of assessmentData.results) {
        const [min, max] = result.range;
        console.log(`Checking level ${result.level}: ${min} <= ${totalScore} < ${max}`);
        if (totalScore >= min && totalScore < max) {
          resultLevel = result;
          console.log('Found matching level:', result.level);
          break;
        }
      }
      
      // Handle edge case for maximum score (level 5 range is 8-11)
      if (!resultLevel && totalScore >= 8) {
        resultLevel = assessmentData.results.find(result => result.level === 5);
        console.log('Using level 5 for high score:', totalScore);
      }
      
      // Fallback to level 1 if still no match
      if (!resultLevel) {
        resultLevel = assessmentData.results.find(result => result.level === 1);
        console.log('Fallback to level 1');
      }
      
      console.log('Final selected result level:', resultLevel);

      const newState = {
        ...prev,
        totalScore,
        resultLevel,
        currentStep: 'results' as const
      };
      
      console.log('=== NEW STATE BEING SET ===', newState);
      console.log('Current step changing from', prev.currentStep, 'to', newState.currentStep);
      
      return newState;
    });
    
    console.log('=== CALCULATE RESULTS FINISHED ===');
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

  const isQuestionAnswered = useCallback((questionId: number) => {
    return state.answers.some(answer => answer.questionId === questionId);
  }, [state.answers]);

  const getAnswerForQuestion = useCallback((questionId: number) => {
    return state.answers.find(answer => answer.questionId === questionId);
  }, [state.answers]);

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
    }
  };
};