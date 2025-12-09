import {
  Box,
  Button,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useAppStore } from '../../stores/useAppStore';
import { APP_STEP_COUNT, AppStep, appStepOrder, getStepIndex } from '../../types/AppStep';

const stepLabels: Record<AppStep, string> = {
  [AppStep.Upload]: 'Upload',
  [AppStep.FrameSelect]: 'Frames',
  [AppStep.Detection]: 'Detect',
  [AppStep.Processing]: 'Process',
  [AppStep.Results]: 'Results',
};

export const ProgressStepper: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentStep = useAppStore((state) => state.currentStep);
  const currentStepIndex = getStepIndex(currentStep);
  const { goBack } = useAppNavigate();

  const isStepCompleted = (step: number) => step < currentStepIndex;
  const isStepClickable = (step: number) => isStepCompleted(step);

  const handleBackStepClick = (step: AppStep) => {
    if (isStepClickable(getStepIndex(step))) {
      goBack();
    }
  };

  return (
    <Box sx={{ width: '100%', py: isMobile ? 2 : 3 }}>
      <Box sx={{ textAlign: 'center', mt: isMobile ? 1 : 2 }}>
        <Typography
          variant={isMobile ? 'body2' : 'body1'}
          color="text.secondary"
          sx={{ m: 1 }}
        >
          Progress: {Math.round(((currentStepIndex + 1) / APP_STEP_COUNT) * 100)}%
        </Typography>
      </Box>

      <Stepper
        activeStep={currentStepIndex}
        alternativeLabel
        sx={{
          '& .MuiStep-root': {
            padding: isMobile ? '0 4px' : '0 8px',
          },
        }}
      >
        {appStepOrder.map((step, index) => (
          <Step key={step} completed={isStepCompleted(index)}>
            <StepLabel
              onClick={() => handleBackStepClick(step)}
              sx={{
                cursor: isStepClickable(index) ? 'pointer' : 'default',
              }}
            >
              {stepLabels[step]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStepIndex > 0 && (
        <Box sx={{ textAlign: 'center', mt: isMobile ? 1.5 : 2 }}>
          <Button
            variant="outlined"
            onClick={goBack}
            size={isMobile ? 'small' : 'medium'}
          >
            Return to previous step
          </Button>
        </Box>
      )}

      <Divider sx={{ mt: isMobile ? 1: 3 }} />
    </Box>
  );
};