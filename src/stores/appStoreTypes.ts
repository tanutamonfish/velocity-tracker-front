import type { DataResponse } from "../types/DataResponse";
import type { DetectObjectResponse } from "../types/DetectObjectResponse";

export interface UploadData {
  file: File;
  fileUrl: string;
}

export interface SelectedFrameData {
  selectedFrameTime: number;
  frameFileUrl: string;
  frameFile: Blob;
}

export interface DetectionData {
  response: DetectObjectResponse;
  pixelSize: number
}

export interface ProcessingData {
  
}

export interface ResultData {
  response: DataResponse
}