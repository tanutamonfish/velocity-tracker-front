import type { DataResponse } from "./DataResponse";

export interface PlotConfig {
  title: string;
  yDataKey: keyof DataResponse;
  yErrorDataKey?: keyof DataResponse;
  yLabel: string;
  color: string;
}

export interface ChartCategory {
  label: string;
  title: string;
  plots: PlotConfig[];
}

export interface ChartDimensions {
  width: number;
  height: number;
}