import React from "react";
import { useAssessment } from "./hooks/useAssessment";
import { EmailCollection } from "./components/EmailCollection";
import { Instructions } from "./components/Instructions";
import { Assessment } from "./components/Assessment";
import { Results } from "./components/Results";

function App() {
  const { state, actions, computed } = useAssessment();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case "email":
        return <EmailCollection onEmailSubmit={actions.setEmail} />;
      case "instructions":
        return <Instructions onStart={actions.startAssessment} />;
      case "assessment":
        return (
          <Assessment state={state} actions={actions} computed={computed} />
        );
      case "results":
        return <Results state={state} actions={actions} />;
      default:
        return <EmailCollection onEmailSubmit={actions.setEmail} />;
    }
  };

  return <div className="App">{renderCurrentStep()}</div>;
}

export default App;
