export interface AssessmentOption {
  id: number;
  text: string;
  score: number;
}

export interface AssessmentQuestion {
  id: number;
  title: string;
  options: AssessmentOption[];
}

export interface KeyAction {
  text: string;
  image_url: string;
}

export interface KeyActionsCTA {
  text: string;
  url: string;
}

export interface ResultDescription {
  text: string;
  image_url: string;
}

export interface AssessmentResult {
  level: number;
  icon: string;
  name: string;
  range: number[];
  description: ResultDescription;
  key_actions: KeyAction[];
  key_actions_cta: KeyActionsCTA;
}

export interface Assessment {
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  results: AssessmentResult[];
}

export interface UserAnswer {
  questionId: number;
  optionId: number;
  score: number;
}

export interface AssessmentState {
  currentStep: "email" | "assessment" | "results";
  email: string;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  totalScore: number;
  resultLevel: AssessmentResult | null;
}
