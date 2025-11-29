import {
  Box,
  Button,
  Divider,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useAppStore } from '../../stores/useAppStore';
import { APP_STEP_COUNT, AppStep, appStepOrder, getStepIndex } from '../../types/AppStep';

const stepLabels: Record<AppStep, string> = {
  [AppStep.Upload]: 'File Upload',
  [AppStep.FrameSelect]: 'Frame Selection',
  [AppStep.Detection]: 'Detection',
  [AppStep.Processing]: 'Processing',
  [AppStep.Results]: 'Results',
};

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export const ProgressStepper: React.FC = () => {
  const currentStep = useAppStore((state) => state.currentStep)
  const currentStepIndex = getStepIndex(currentStep);

  const isStepCompleted = (step: number) => step < currentStepIndex;
  const isStepClickable = (step: number) => isStepCompleted(step);

  const { goBack } = useAppNavigate()

  const handleBackStepClick = (step: AppStep) => {
    if (isStepClickable(getStepIndex(step))) {
      goBack()
    }
  };

  return (
    <Box sx={{ width: '100%', py: 3 }}>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ m: 1 }}>
          Progress: {Math.round(((currentStepIndex + 1) / APP_STEP_COUNT) * 100)}%
        </Typography>
      </Box>

      <Stepper
        activeStep={currentStepIndex}
        connector={<Connector />}
        alternativeLabel
      >
        {appStepOrder.map((step, index) => (
          <Step key={step} completed={isStepCompleted(index)}>
            <StepLabel
              onClick={() => handleBackStepClick(step)}
              sx={{
                cursor: isStepClickable(index) ? 'pointer' : 'default',
                '& .MuiStepLabel-label': {
                  fontSize: '0.875rem',
                  fontWeight: isStepCompleted(index) ? 600 : 400,
                  color: step === currentStep ? 'primary.main' : 'text.primary',
                },
                '&:hover': {
                  '& .MuiStepLabel-label': isStepClickable(index) ? {
                    color: 'primary.main',
                  } : {},
                },
              }}
            >
              {stepLabels[step]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {getStepIndex(currentStep) > 0 && <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant='outlined' onClick={goBack} >Return to previous step</Button>
      </Box>}

      <Divider />
    </Box>
  );
};