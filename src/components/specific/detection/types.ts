export interface CanvasBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  isSelected?: boolean;
}

export interface CanvasBoxLook {
  borderColor: string;
  bgColor: string;
  hoverBgColor: string;
  selectedBorderColor: string;
}