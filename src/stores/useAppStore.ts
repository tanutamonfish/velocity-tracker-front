import { create } from 'zustand';
import { AppStep } from '../types/AppStep';
import type { DetectionData, ProcessingData, ResultData, SelectedFrameData, UploadData } from './appStoreTypes';

interface AppState {
  currentStep: AppStep;

  // State
  uploadData: UploadData | null;
  selectedFrameData: SelectedFrameData | null;
  detectionData: DetectionData | null;
  processingData: ProcessingData | null;
  resultData: ResultData | null;

  // Setters
  setCurrentStep: (step: AppStep) => void;
  setUploadData: (data: UploadData | null) => void;
  setSelectedFrameData: (data: SelectedFrameData | null) => void;
  setDetectionData: (data: DetectionData | null) => void;
  setProcessingData: (data: ProcessingData | null) => void;
  setResultData: (data: ResultData | null) => void;

  clearStepData: (step: AppStep) => void;

  resetAll: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentStep: AppStep.Upload,

  uploadData: null,
  selectedFrameData: null,
  detectionData: null,
  processingData: null,
  resultData: null,


  setCurrentStep: (step) => set({
    currentStep: step
  }),

  // Setters
  setUploadData: (uploadData) => set({ uploadData }),
  setSelectedFrameData: (selectedFrameData) => set({ selectedFrameData }),
  setDetectionData: (detectionData) => set({ detectionData }),
  setProcessingData: (processingData) => set({ processingData }),
  setResultData: (resultData) => set({ resultData }),

  clearStepData: (step: AppStep) => {
    const state = get();
    switch (step) {
      case AppStep.Upload:
        if (state.uploadData) {
          URL.revokeObjectURL(state.uploadData.fileUrl);
        }
        set({ selectedFrameData: null });
        break;

      case AppStep.FrameSelect:
        if (state.selectedFrameData) {
          URL.revokeObjectURL(state.selectedFrameData.frameFileUrl);
        }
        set({ selectedFrameData: null });
        break;

      case AppStep.Detection:
        set({ detectionData: null });
        break;
    }
  },

  resetAll: () => {
    set({
      currentStep: AppStep.Upload,
      uploadData: null,
      selectedFrameData: null,
      detectionData: null,
      processingData: null,
      resultData: null,
    })
  },
}));