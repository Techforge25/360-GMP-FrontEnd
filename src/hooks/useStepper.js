import { useState } from "react";

export function useStepper(initialStep = 1, totalSteps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      return true; // Indicated step changed
    }
    return false; // Indicates max step reached
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      return true;
    }
    return false;
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirst: currentStep === 1,
    isLast: currentStep === totalSteps,
  };
}
