'use client';

import React, { useState, useEffect, useCallback } from 'react';
import StepProgress from './StepProgress';

const EnhancedForm = ({
  steps,
  initialData = {},
  onSubmit,
  onStepChange,
  autoSave = true,
  autoSaveKey,
  className = '',
  countryTheme = 'default',
  children
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && autoSaveKey && Object.keys(formData).length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(autoSaveKey, JSON.stringify({
          formData,
          currentStep,
          completedSteps,
          timestamp: new Date().toISOString()
        }));
        setLastSaved(new Date());
      }, 2000); // Save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [formData, currentStep, completedSteps, autoSave, autoSaveKey]);

  // Load saved data on mount
  useEffect(() => {
    if (autoSave && autoSaveKey) {
      const saved = localStorage.getItem(autoSaveKey);
      if (saved) {
        try {
          const { formData: savedData, currentStep: savedStep, completedSteps: savedCompleted } = JSON.parse(saved);
          setFormData(prev => ({ ...prev, ...savedData }));
          setCurrentStep(savedStep);
          setCompletedSteps(savedCompleted);
          setLastSaved(new Date());
        } catch (error) {
          console.warn('Failed to load saved form data:', error);
        }
      }
    }
  }, [autoSave, autoSaveKey]);

  const updateFormData = useCallback((updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    const currentStepConfig = steps[currentStep];
    if (currentStepConfig.validate) {
      const stepErrors = currentStepConfig.validate(formData);
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }
    return true;
  }, [currentStep, steps, formData]);

  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
      if (onStepChange) {
        onStepChange(stepIndex, formData);
      }
    }
  }, [steps.length, onStepChange, formData]);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      // Mark current step as completed
      setCompletedSteps(prev => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });

      if (currentStep < steps.length - 1) {
        goToStep(currentStep + 1);
      }
    }
  }, [currentStep, steps.length, validateCurrentStep, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        // Clear auto-saved data on successful submission
        if (autoSave && autoSaveKey) {
          localStorage.removeItem(autoSaveKey);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [formData, validateCurrentStep, onSubmit, autoSave, autoSaveKey]);

  const getThemeClasses = () => {
    const themes = {
      usa: 'bg-gradient-to-br from-blue-50 to-red-50',
      uk: 'bg-gradient-to-br from-blue-50 to-purple-50',
      india: 'bg-gradient-to-br from-orange-50 to-green-50',
      thailand: 'bg-gradient-to-br from-red-50 to-yellow-50',
      egypt: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      cuba: 'bg-gradient-to-br from-red-50 to-blue-50',
      default: 'bg-gradient-to-br from-base-50 to-primary/5'
    };
    return themes[countryTheme] || themes.default;
  };

  const currentStepConfig = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={`min-h-screen ${getThemeClasses()} ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Auto-save Indicator */}
          {autoSave && lastSaved && (
            <div className="mb-4 text-right">
              <div className="inline-flex items-center gap-2 text-xs text-base-content/60 bg-base-100/80 px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-success">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Auto-saved {lastSaved.toLocaleTimeString()}
              </div>
            </div>
          )}

          {/* Step Progress */}
          <div className="mb-12">
            <StepProgress
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>

          {/* Form Content */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-8 mb-8">
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {currentStepConfig.icon && (
                  <div className="bg-primary/10 p-3 rounded-full">
                    {currentStepConfig.icon}
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-base-content">
                    {currentStepConfig.title}
                  </h2>
                  {currentStepConfig.description && (
                    <p className="text-base-content/70 mt-2">
                      {currentStepConfig.description}
                    </p>
                  )}
                </div>
              </div>
              
              {currentStepConfig.estimatedTime && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Estimated time: {currentStepConfig.estimatedTime} minutes
                </div>
              )}
            </div>

            {/* Step Content */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {currentStepConfig.component && (
                  <currentStepConfig.component
                    formData={formData}
                    setFormData={updateFormData}
                    errors={errors}
                  />
                )}
                
                {/* Custom children can be passed for specific steps */}
                {children}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-base-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="btn btn-outline btn-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-4">
                  {isLastStep ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm mr-2"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary btn-lg"
                    >
                      Continuar
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Help Section */}
          {currentStepConfig.helpText && (
            <div className="bg-info/10 border border-info/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-info mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <div>
                  <h4 className="font-medium text-info mb-2">Need Help?</h4>
                  <p className="text-sm text-info/80">{currentStepConfig.helpText}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedForm;