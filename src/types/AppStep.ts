export const enum AppStep {
    Upload = 'upload',
    FrameSelect = 'frame-select',
    Detection = 'detection',
    Processing = 'processing',
    Results = 'results'
}

export const appStepOrder = [AppStep.Upload, AppStep.FrameSelect, AppStep.Detection, AppStep.Processing, AppStep.Results]
export const AppStepIndexMap = Object.fromEntries(
  appStepOrder.map((step, index) => [step, index])
);

export const APP_STEP_COUNT = appStepOrder.length;
export function getStepIndex(step : AppStep) {
    return AppStepIndexMap[step];
}

export function getStepByIndex(step : number) {
    if (step<0 || step>=APP_STEP_COUNT)
        throw new Error("bound error");
        
    return appStepOrder[step]
}