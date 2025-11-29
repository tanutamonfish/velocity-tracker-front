import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useAppStore } from "../../stores/useAppStore";

export interface Point {
  x: number;
  y: number;
}

// interface RectProps {
//   x: number
//   y: number
//   w: number
//   h: number
//   color: string
//   title?: string
// }

export interface CanvasFramePaintHandle {
  drawLine: (point1: Point, point2: Point) => void;
  drawRect: (x: number, y: number, w: number, h: number, color: string, title?: string) => void;
  clear: () => void;
}

export interface CanvasFramePaintProps {
  
}

export const CanvasFramePaint = forwardRef<CanvasFramePaintHandle, CanvasFramePaintProps>(
  ({ }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const selectedFrameData = useAppStore((state) => state.selectedFrameData)

    useEffect(() => {
      if (!selectedFrameData) return

      const frameUrl = selectedFrameData.frameFileUrl

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = frameUrl;

      console.log('canvas initialize base image');
      
    }, [selectedFrameData]);

    const redrawBaseImage = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || !imageRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageRef.current, 0, 0);

      console.log('canvas repainted base');
    };

    useImperativeHandle(ref, () => ({
      drawLine: (point1: Point, point2: Point) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.stroke();
      },

      drawRect: (x1: number, x2: number, y1: number, y2: number, color: string, title?: string) => {
        const ctx = canvasRef.current?.getContext('2d');

        if (!ctx) return;

        const width = x2 - x1;
        const height = y2 - y1;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, width, height);

        if (title) {
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.font = '14px Arial';
          ctx.textBaseline = 'bottom';

          const textMetrics = ctx.measureText(title);
          const textX = x1 + (width - textMetrics.width) / 2;
          const textY = y1 - 5;

          ctx.fillRect(
            textX - 2,
            textY - 14,
            textMetrics.width + 4,
            18
          );

          ctx.fillStyle = '#000000';
          ctx.fillText(title, textX, textY);
        }

        console.log('canvas painted', title);
      },

      clear: () => {
        redrawBaseImage();
      }
    }));

    return <canvas ref={canvasRef} style={{ maxHeight: '70vh', maxWidth: '70vw' }} />;
  }
);