import React from 'react';

const StepProgress = ({ 
  steps, 
  currentStep, 
  completedSteps = [],
  className = "",
  showLabels = true,
  variant = "horizontal" // horizontal | vertical
}) => {
  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'completed';
    return 'upcoming';
  };

  const getStepIcon = (step, status, index) => {
    if (status === 'completed') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    
    if (step.icon) {
      return step.icon;
    }
    
    return <span className="text-sm font-bold">{index + 1}</span>;
  };

  const getStepClasses = (status) => {
    const baseClasses = "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-success text-success-content border-success shadow-lg scale-110`;
      case 'current':
        return `${baseClasses} bg-primary text-primary-content border-primary shadow-lg scale-110 ring-4 ring-primary/20`;
      case 'upcoming':
        return `${baseClasses} bg-base-200 text-base-content border-base-300 hover:border-primary/50`;
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (fromStatus, toStatus) => {
    const baseClasses = "flex-1 h-0.5 transition-all duration-500";
    
    if (fromStatus === 'completed' && (toStatus === 'completed' || toStatus === 'current')) {
      return `${baseClasses} bg-success`;
    }
    
    return `${baseClasses} bg-base-300`;
  };

  if (variant === "vertical") {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={index} className="flex items-start gap-4">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div className={getStepClasses(status)}>
                  {getStepIcon(step, status, index)}
                </div>
                {!isLast && (
                  <div className="w-0.5 h-8 bg-base-300 mt-2 transition-all duration-500"
                       style={{
                         backgroundColor: status === 'completed' ? 'hsl(var(--su))' : 'hsl(var(--b3))'
                       }}
                  />
                )}
              </div>
              
              {/* Step Content */}
              {showLabels && (
                <div className="flex-1 pb-8">
                  <h3 className={`font-medium transition-colors duration-200 ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-base-content/70'
                  }`}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-sm text-base-content/60 mt-1">
                      {step.description}
                    </p>
                  )}
                  {status === 'current' && step.estimatedTime && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ~{step.estimatedTime} min
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const nextStatus = index < steps.length - 1 ? getStepStatus(index + 1) : null;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={index}>
              {/* Step */}
              <div className="flex flex-col items-center group">
                <div className={getStepClasses(status)}>
                  {getStepIcon(step, status, index)}
                </div>
                
                {showLabels && (
                  <div className="mt-3 text-center max-w-24">
                    <div className={`text-sm font-medium transition-colors duration-200 ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-base-content/70'
                    }`}>
                      {step.title}
                    </div>
                    {status === 'current' && step.estimatedTime && (
                      <div className="text-xs text-base-content/50 mt-1">
                        ~{step.estimatedTime} min
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Connector */}
              {!isLast && (
                <div className={getConnectorClasses(status, nextStatus)} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 w-full bg-base-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-success transition-all duration-700 ease-out"
          style={{ 
            width: `${((currentStep + (completedSteps.length > currentStep ? 1 : 0)) / steps.length) * 100}%` 
          }}
        />
      </div>
      
      {/* Step Info */}
      <div className="mt-4 flex justify-between items-center text-sm text-base-content/60">
        <span>Step {currentStep + 1} of {steps.length}</span>
        <span>{Math.round(((currentStep + (completedSteps.length > currentStep ? 1 : 0)) / steps.length) * 100)}% Complete</span>
      </div>
    </div>
  );
};

export default StepProgress; 