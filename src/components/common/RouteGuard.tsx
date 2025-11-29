import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import { AppStep } from '../../types/AppStep';

const routeToStep: Record<string, AppStep> = {
  '/upload': AppStep.Upload,
  '/frame-select': AppStep.FrameSelect,
  '/detection': AppStep.Detection,
  '/processing': AppStep.Processing,
  '/result': AppStep.Results,
};

const stepToRoute: Record<AppStep, string> = {
  [AppStep.Upload]: '/upload',
  [AppStep.FrameSelect]: '/frame-select',
  [AppStep.Detection]: '/detection',
  [AppStep.Processing]: '/processing',
  [AppStep.Results]: '/result',
};

export const RouteGuard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentStep } = useAppStore();

  useEffect(() => {
    const targetStep = routeToStep[location.pathname];
    //TODO: /result/:id - good, /result - bad
    if (targetStep && targetStep !== currentStep && targetStep !== AppStep.Results && currentStep !== AppStep.Results) {
      navigate(stepToRoute[currentStep], { replace: true });
    }
  }, [location.pathname, currentStep, navigate]);

  return null;
};