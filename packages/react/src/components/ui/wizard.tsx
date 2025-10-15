'use client';

import * as React from 'react';
import type { z } from 'zod';

import { useFormErrors } from '../../hooks/use-form-errors';
import { cn } from '../../lib/theme-utils';

import { Card, CardContent } from './card';
import { FormActions } from './form-actions';
import { WizardStepper } from './wizard-stepper';

export interface StepFormActions<WizardData> {
  showPrevious?: boolean;
  showNext?: boolean;
  onPreviousAction?: (stepId: string, data: WizardData) => Promise<void> | void;
  onNextAction?: (stepId: string, data: WizardData) => Promise<void> | void;
}

export interface WizardStep<WizardData, StepSchema = z.ZodSchema> {
  id: string;
  title: string;
  description?: string;
  schema?: StepSchema;
  content: React.ComponentType<StepProps<WizardData>>;
  actions?: StepFormActions<WizardData>;
}

export interface StepProps<WizardData> {
  wizardData: WizardData;
  errors: Record<string, string>;
  onChange: (name: string, value: unknown) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isLoading?: boolean;
}

export interface FormActionLabels {
  nextButtonLabel?: string;
  previousButtonLabel?: string;
  completeButtonLabel?: string;
}

export interface WizardProps<WizardData> {
  defaultData: WizardData;
  steps: WizardStep<WizardData>[];
  initialStep?: number;
  onComplete?: (data: WizardData) => Promise<void> | void;
  className?: string;
  formActionLabels?: FormActionLabels;
  hideStepperNumbers?: boolean;
}

function Wizard<WizardData>({
  defaultData,
  steps,
  initialStep = 0,
  onComplete,
  className,
  formActionLabels,
  hideStepperNumbers = false,
}: WizardProps<WizardData>) {
  const [activeStep, setActiveStep] = React.useState(initialStep);
  const [wizardData, setWizardData] = React.useState<WizardData>(defaultData);
  const [isLoading, setIsLoading] = React.useState(false);
  const { errors, validateData, clearAllErrors, updateFieldError } = useFormErrors();

  const currentStepConfig = steps[activeStep];
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleChange = React.useCallback(
    (name: string, value: unknown) => {
      setWizardData((prev) => ({ ...prev, [name]: value }));
      updateFieldError(name);
    },
    [updateFieldError],
  );

  const validateCurrentStep = React.useCallback(async (): Promise<boolean> => {
    const step = steps[activeStep];
    if (!step.schema) return true;
    const { isValid } = validateData(step.schema, wizardData);
    return isValid;
  }, [activeStep, steps, wizardData, validateData]);

  const handleNext = React.useCallback(async () => {
    setIsLoading(true);
    clearAllErrors();

    try {
      const isValid = await validateCurrentStep();
      if (!isValid) return;

      const step = steps[activeStep];
      if (step.actions?.onNextAction) {
        await step.actions.onNextAction(step.id, wizardData);
      }

      if (isLastStep) {
        onComplete?.(wizardData);
      } else {
        setActiveStep((prev) => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeStep, isLastStep, steps, wizardData, onComplete, validateCurrentStep, clearAllErrors]);

  const handlePrevious = React.useCallback(async () => {
    if (isFirstStep) return;
    setIsLoading(true);
    clearAllErrors();

    try {
      const step = steps[activeStep];
      if (step.actions?.onPreviousAction) {
        await step.actions.onPreviousAction(step.id, wizardData);
      }
      setActiveStep((prev) => prev - 1);
    } finally {
      setIsLoading(false);
    }
  }, [activeStep, isFirstStep, steps, wizardData, clearAllErrors]);

  const CurrentStepComponent = currentStepConfig.content;
  const showPrevious = currentStepConfig.actions?.showPrevious !== false && !isFirstStep;
  const showNext = currentStepConfig.actions?.showNext ?? true;

  const labels = {
    nextButtonLabel: 'Next',
    previousButtonLabel: 'Previous',
    completeButtonLabel: 'Submit',
    ...formActionLabels,
  };

  return (
    <div className={cn('space-y-6', className)}>
      <WizardStepper steps={steps} currentStep={activeStep} hideNumbers={hideStepperNumbers} />

      <Card>
        <CardContent className="p-6">
          <CurrentStepComponent
            wizardData={wizardData}
            errors={errors}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <FormActions
        isLoading={isLoading}
        showPrevious={showPrevious}
        showNext={showNext}
        nextAction={{
          type: 'button',
          label: isLastStep ? labels.completeButtonLabel : labels.nextButtonLabel,
          variant: 'primary',
          onClick: handleNext,
        }}
        previousAction={{
          type: 'button',
          label: labels.previousButtonLabel,
          variant: 'outline',
          onClick: handlePrevious,
        }}
      />
    </div>
  );
}

export { Wizard };
