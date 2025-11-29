import { CloudUpload, Start, Upload, Videocam } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { useAppNavigate } from '../../../hooks/useAppNavigate';
import { useAppStore } from '../../../stores/useAppStore';
import { DropZone, VisuallyHiddenInput } from './StyledComponents';
import { type VideoInfo, formatDate, formatDuration, formatFileSize, validateFile } from '../../../utils/videoUploadUtils';

export const VideoUploaderComponent: React.FC = () => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { goNext } = useAppNavigate()
  const setUploadData = useAppStore(state => state.setUploadData);
  const MAX_FILE_SIZE = 500 * 1024 * 1024;

  const processFile = useCallback((file: File) => {
    setError('');
    const validationError = validateFile(file, MAX_FILE_SIZE);
    if (validationError) return setError(validationError);

    setLoading(true);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setUploadedFile(file);

    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = () => {
      setVideoInfo({
        name: file.name,
        size: file.size,
        type: file.type.split('/')[1].toUpperCase(),
        duration: video.duration,
        resolution: `${video.videoWidth}x${video.videoHeight}`,
        lastModified: file.lastModified,
      });
      setLoading(false);
    };
    video.onerror = () => {
      setError('Error loading video metadata. Please try another file.');
      setLoading(false);
      URL.revokeObjectURL(url);
    };
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    file && processFile(file);
  }, [processFile]);

  const handleDrag = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragIn = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragOut = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    const file = event.dataTransfer.files[0];
    file && processFile(file);
  }, [processFile]);

  const handleDropZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleReset = useCallback(() => {
    setVideoInfo(null);
    setPreviewUrl('');
    setUploadedFile(null);
    setError('');
    previewUrl && URL.revokeObjectURL(previewUrl);
    fileInputRef.current && (fileInputRef.current.value = '');
  }, [previewUrl]);

  const handleStart = useCallback(() => {
    if (uploadedFile && previewUrl) {
      setUploadData({file: uploadedFile, fileUrl: previewUrl});
      goNext()
    }
  }, [uploadedFile, previewUrl, setUploadData, goNext]);

  const renderUploadIcon = () => (
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: 'action.hover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        transition: 'all 0.3s ease',
        '& .MuiSvgIcon-root': {
          fontSize: 40,
          color: 'primary.main',
        },
      }}
    >
      {isDragActive ? <Upload /> : <Videocam />}
    </Box>
  );

  const renderDropZone = () => (
    <DropZone
      isDragActive={isDragActive}
      onClick={handleDropZoneClick}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {renderUploadIcon()}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        {isDragActive ? 'Drop your video here' : 'Upload your video'}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Drag and drop your video file here, or click to browse
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Supports MP4, AVI, MOV, WEBM, MKV • Max 500MB
      </Typography>
      <Button variant="contained" size="large" startIcon={<CloudUpload />}>
        Browse Files
      </Button>
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
      />
    </DropZone>
  );

  const renderLoading = () => (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      {renderUploadIcon()}
      <Typography variant="h6" gutterBottom>
        Processing your video...
      </Typography>
      <LinearProgress
        sx={{
          mt: 2,
          maxWidth: 300,
          mx: 'auto',
          height: 6,
          borderRadius: 3,
        }}
      />
    </Box>
  );

  const renderVideoInfo = () => videoInfo && (
    <Box sx={{ mt: 3 }}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          p: 3,
          backgroundColor: 'background.default',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            {videoInfo.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            <Chip label={formatFileSize(videoInfo.size)} variant="outlined" size="small" />
            <Chip label={videoInfo.type} variant="outlined" size="small" />
            <Chip label={`Duration: ${formatDuration(videoInfo.duration)}`} variant="outlined" size="small" />
            <Chip label={videoInfo.resolution} variant="outlined" size="small" />
            <Chip label={`Modified: ${formatDate(videoInfo.lastModified)}`} variant="outlined" size="small" />
          </Box>
        </Box>
        <Button
          variant="outlined"
          onClick={handleReset}
          startIcon={<CloudUpload />}
          sx={{ borderRadius: 2, minWidth: 160 }}
        >
          Upload Another
        </Button>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Video Preview
        </Typography>
        <Box
          component="video"
          src={previewUrl}
          controls
          sx={{
            width: '100%',
            maxHeight: 500,
            borderRadius: 1,
            boxShadow: 2,
            backgroundColor: '#000',
            overflow: 'hidden',
            display: 'block',
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Video Analyzing
        </Typography>
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          startIcon={<Start />}
          onClick={handleStart}
        >
          Start
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {loading && renderLoading()}
      {!videoInfo && !loading && renderDropZone()}
      {error && (
        <Alert severity="error" sx={{ my: 2, borderRadius: 1 }}>
          {error}
        </Alert>
      )}
      {renderVideoInfo()}
    </>
  );
};