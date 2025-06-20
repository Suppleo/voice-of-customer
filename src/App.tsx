import React, { useEffect } from 'react';
import { useAssessment } from './hooks/useAssessment';
import { EmailCollection } from './components/EmailCollection';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';

function App() {
  const { state, actions } = useAssessment();

  // Add useEffect to track state changes
  useEffect(() => {
    console.log('=== APP STATE CHANGED ===');
    console.log('Current step:', state.currentStep);
    console.log('Full state:', state);
  }, [state.currentStep, state.resultLevel]);

  const renderCurrentStep = () => {
    console.log('=== RENDERING STEP ===', state.currentStep);
    
    switch (state.currentStep) {
      case 'email':
        console.log('Rendering EmailCollection');
        return <EmailCollection onEmailSubmit={actions.setEmail} />;
      case 'assessment':
        console.log('Rendering Assessment');
        return <Assessment />;
      case 'results':
        console.log('Rendering Results');
        return <Results />;
      default:
        console.log('Rendering default (EmailCollection)');
        return <EmailCollection onEmailSubmit={actions.setEmail} />;
    }
  };

  return (
    <div className="App">
      {/* Debug panel */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        background: 'black', 
        color: 'white', 
        padding: '10px', 
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px'
      }}>
        <div>Step: {state.currentStep}</div>
        <div>Score: {state.totalScore}</div>
        <div>Level: {state.resultLevel?.level || 'None'}</div>
        <div>Answers: {state.answers.length}</div>
      </div>
      
      {renderCurrentStep()}
    </div>
  );
}

export default App;