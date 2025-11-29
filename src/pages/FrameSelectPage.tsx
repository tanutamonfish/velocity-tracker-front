import { Box, Button, Slider, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { useAppNavigate } from '../hooks/useAppNavigate';
import { useAppStore } from '../stores/useAppStore';

export default function FrameSelectPage() {
   const videoRef = useRef<HTMLVideoElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [duration, setDuration] = useState(0);
   const [selectedFrameTime, setCurrentTime] = useState(0);
   const [isReady, setIsReady] = useState(false);
   const videoUrl = useAppStore((state) => state.uploadData?.fileUrl);
   const setSelectedFrame = useAppStore((state) => state.setSelectedFrameData);
   const { goNext } = useAppNavigate()

   const captureFrame = async (): Promise<{ url: string, file: Blob } | null> => {
      if (!videoRef.current || !canvasRef.current) {
         console.error('Video or canvas reference not found');
         return null;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
         console.error('Canvas context not available');
         return null;
      }

      try {
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

         return new Promise((resolve, reject) => {
            canvas.toBlob(
               (blob) => {
                  if (blob) {
                     const objectUrl = URL.createObjectURL(blob);
                     resolve({ url: objectUrl, file: blob });
                  } else {
                     reject(new Error('Blob creating error'));
                  }
               },
               'image/png',
               1
            );
         });
      } catch (error) {
         console.error('Error in captureFrame:', error);
         return null;
      }
   };

   const onLoadedMetadata = () => {
      if (videoRef.current) {
         setDuration(videoRef.current.duration);
         setIsReady(true);
      }
   };

   const onSliderChange = (_event: Event, value: number | number[]) => {
      if (videoRef.current && typeof value === 'number') {
         videoRef.current.currentTime = value;
         setCurrentTime(value);
      }
   };

   const handleContinue = async () => {
      if (!isReady) {
         alert('Video is loading. Please wait');
         return;
      }

      const frame = await captureFrame();
      if (frame) {
         setSelectedFrame({ frameFile: frame.file, frameFileUrl: frame.url, selectedFrameTime });
         goNext()
      } else {
         alert('Failed to capture frame.');
      }
   };

   return (
      <>
         <ProgressStepper />

         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            select a frame in which the object is visible
         </Typography>

         <canvas ref={canvasRef} style={{ display: 'none' }} />

         {videoUrl ? (
            <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
               <video
                  ref={videoRef}
                  src={videoUrl}
                  controls={undefined}
                  onLoadedMetadata={onLoadedMetadata}
                  onError={(e) => console.error('Video error:', e)}
                  crossOrigin="anonymous"
                  style={{
                     width: '100%',
                     maxHeight: 400,
                     display: 'block',
                     marginBottom: 2,
                     borderRadius: 1
                  }}
               />

               <Slider
                  value={selectedFrameTime}
                  min={0}
                  max={duration}
                  step={0.01}
                  onChange={onSliderChange}
                  aria-labelledby="video-slider"
                  sx={{ mb: 3 }}
               />

               <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                     Timestamp: {selectedFrameTime.toFixed(2)}s / {duration.toFixed(2)}s
                     {!isReady && " (Loading...)"}
                  </Typography>

                  <Button
                     variant="contained"
                     onClick={handleContinue}
                     disabled={!isReady}
                  >
                     Next
                  </Button>
               </Box>
            </Box>
         ) : (
            <ErrorMessage errorMessage='No video file selected. Please go back and upload a video.' />
         )}
      </>
   );
}