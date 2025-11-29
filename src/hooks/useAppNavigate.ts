import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'
import { APP_STEP_COUNT, AppStepIndexMap, appStepOrder, getStepByIndex, getStepIndex, type AppStep } from '../types/AppStep'

export function useAppNavigate() {
  const navigate = useNavigate()
  const { setCurrentStep, currentStep, clearStepData } = useAppStore()

  const goToStep = (step: AppStep, url? : string) => {
    setCurrentStep(step)

    if (getStepIndex(currentStep) > getStepIndex(step)) {
      for (let index = getStepIndex(step) + 1; index < AppStepIndexMap.length; index++) {
        const element = getStepByIndex(index)
        clearStepData(element)
      }
    }


    if (url) {
      console.log('navigate to ', url);
      navigate(url)
    }
    else navigate('/' + step)
  }

  const goNext = () => {
    const newIndex = AppStepIndexMap[currentStep] + 1
    if (newIndex < APP_STEP_COUNT) {
      goToStep(appStepOrder[newIndex])
    }
  }

  const goBack = () => {
    const newIndex = AppStepIndexMap[currentStep] - 1
    if (newIndex >= 0) {
      goToStep(appStepOrder[newIndex])
    }
  }

  return { goNext, goBack, goToStep }
}