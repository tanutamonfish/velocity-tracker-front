import { Box, Card, CardContent, Typography } from '@mui/material';
import panzoom, { type PanZoom } from 'panzoom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CanvasBox } from './types';

interface CanvasWrapperProps {
  boxes: CanvasBox[];
  onBoxClick: (boxId: string) => void;
  boxColor?: string;
  selectedColor?: string;
  hoverColor?: string;
  fileUrl: string;
  // selectingPoint1: boolean
  // selectingPoint2: boolean
  // onPoint1Selected: (point: Point) => void
  // onPointSelected: (point: Point) => void
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  boxes,
  onBoxClick,
  boxColor = 'rgba(33, 150, 243, 0.1)',
  selectedColor = '#3621f3ff',
  hoverColor = 'rgba(33, 150, 243, 0.2)',
  fileUrl,
  // selectingPoint1,
  // selectingPoint2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<PanZoom | null>(null);
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);

  // Load background image
  useEffect(() => {
    if (!fileUrl) {
      setBackgroundImage(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setBackgroundImage(img);
    };
    img.onerror = () => {
      console.error('Failed to load background image');
      setBackgroundImage(null);
    };
    img.src = fileUrl;
  }, [fileUrl]);

  const iniZoom = () => {
    if (containerRef.current) {
      panzoomRef.current = panzoom(containerRef.current, {
        maxZoom: 4,
        minZoom: 0.5,
        bounds: true,
        boundsPadding: 0.1,
      });

      return () => {
        if (panzoomRef.current) {
          panzoomRef.current.dispose();
        }
      };
    }
  };

  // Initialize panzoom
  useEffect(iniZoom, []);

  const drawCanvas = useCallback(() => {
    let canvasWidth:number = 1920
    let canvasHeight:number = 1080

    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (backgroundImage) {
      canvasWidth = backgroundImage.width
      canvasHeight = backgroundImage.height

      canvas.width = canvasWidth
      canvas.height = canvasHeight

      ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
      console.log('bg painted', canvas.width, canvas.height, backgroundImage.width, backgroundImage.height);
    }

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
  }, [backgroundImage]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleBoxMouseEnter = (boxId: string) => {
    setHoveredBoxId(boxId);
  };

  const handleBoxMouseLeave = () => {
    setHoveredBoxId(null);
  };

  const handleBoxClick = (boxId: string) => {
    setSelectedBoxId(boxId);
    onBoxClick(boxId);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: 1,
        backgroundColor: 'transparent',
      }}
    >
      {/* Canvas container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          cursor: 'grab',
          backgroundColor: 'transparent',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
          }}
        />

        {/* Boxes */}
        {boxes.map((box) => {
          const isHovered = hoveredBoxId === box.id;
          const isSelected = selectedBoxId === box.id;
          
          return (
            <Card
              key={box.id}
              sx={{
                position: 'absolute',
                left: box.x,
                top: box.y,
                width: box.width,
                height: box.height,
                border: `5px solid ${isSelected ? selectedColor : 'rgba(0, 0, 0, 0.3)'}`,
                backgroundColor: isHovered ? hoverColor : boxColor,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: 2,
                  border: `2px solid ${isSelected ? selectedColor : 'rgba(0, 0, 0, 0.5)'}`,
                },
              }}
              onMouseEnter={() => handleBoxMouseEnter(box.id)}
              onMouseLeave={handleBoxMouseLeave}
              onClick={() => handleBoxClick(box.id)}
            >
              <CardContent
                sx={{
                  p: 1,
                  '&:last-child': { pb: 1 },
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor: 'transparent',
                }}
              >
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    lineHeight: 1.2,
                    color: 'text.primary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {box.title}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Zoom controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => panzoomRef.current?.smoothZoom(0, 0, 1.2)}
            style={{
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '16px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            +
          </button>
          <button
            onClick={() => panzoomRef.current?.smoothZoom(0, 0, 0.8)}
            style={{
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            -
          </button>
        </Box>
        { <button
          onClick={iniZoom}
          style={{
            border: 'none',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Reset
        </button>}
      </Box>
    </Box>
  );
};