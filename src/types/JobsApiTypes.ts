import type { DataResponse } from "./DataResponse";

export interface JobsPostResponse {
    id: string
    current_time: number
}

export interface DetectedObject {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  obj_type: string;
  id: string;
}

export interface JobsIdGetResponse {
    status: string
    data: DataResponse
    error_message: string
}