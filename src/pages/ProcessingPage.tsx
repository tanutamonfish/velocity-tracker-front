import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProgressStepper } from "../components/common/ProgressStepper";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { useLocalLastResults, type StoredResultForHistory } from "../hooks/useLocalLastResults";
import { useAppStore } from "../stores/useAppStore";
import { AppStep } from "../types/AppStep";
import type { DataResponse } from "../types/DataResponse";
import type { DetectedObject, JobsIdGetResponse, JobsPostResponse } from "../types/JobsApiTypes";

function ProcessingPage() {
  const POLLING_INTERVAL = 1000;

  const { uploadData, selectedFrameData, detectionData } = useAppStore()
  const [error, setError] = useState<string | null>(null)
  const [jobPostResponse, setJobPostResponse] = useState<JobsPostResponse | null>(null)
  const [jobIdGetResponse, setJobIdGetResponse] = useState<JobsIdGetResponse | null>(null)
  const [isSuccessed, setIsSuccessed] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { goToStep } = useAppNavigate()

  const { add } = useLocalLastResults()

  // useEffect(() => { send() }, [])

  const send = async () => {
    setLoading(true)
    setError(null)

    try {
      if (uploadData && selectedFrameData && detectionData) {
        const formData = new FormData();
        formData.append('video_file', uploadData.file, uploadData.file.name);

        const r = detectionData.response
        const detectedObjectForApi: DetectedObject = {
          id: r.id.toString(),
          x1: r.x1, x2: r.x2, y1: r.y1, y2: r.y2, obj_type: r.obj_type
        }

        const data = {
          'selected_frame_time': selectedFrameData.selectedFrameTime,
          'detect_object': detectedObjectForApi,
          'pixel_size': detectionData.pixelSize
        }

        const jsonStringForAPI = JSON.stringify(data, null, 3)
        formData.append('data', jsonStringForAPI)

        const response = await fetch('/api/v1/jobs', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result: JobsPostResponse = await response.json();
          setJobPostResponse(result)

          console.log('GOT: ', result);

          setError(null)
        } else {
          throw new Error(`Upload failed: ${response.status}`);
        }
      }
      else {
        throw new Error("something is null!!!");
      }
    } catch (error) {
      console.error('POST failed:', error);
      setError('Fetch error')
    }

    setLoading(false)
  };

  useEffect(() => {
    let timeoutId

    if (jobPostResponse) {
      console.log('START polling!');
      setLoading(true);
      pollServer();
    } else {
      console.error('jobPostResponse is null');
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [jobPostResponse]);

  const pollServer = async () => {
    if (!jobPostResponse) return;

    try {
      const response = await fetch(`/api/v1/jobs/${jobPostResponse.id}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: JobsIdGetResponse = await response.json();
      console.log('data: ', data.status, JSON.stringify(data, null, 3));

      setJobIdGetResponse(data);

      if (data.status === 'done') {
        processResult(data.data)
        setLoading(false);
      } else {
        return setTimeout(pollServer, POLLING_INTERVAL);
      }
    } catch (error) {
      console.error('ERROR: ', error);
      // setTimeout(pollServer, POLLING_INTERVAL);
    }

    return null
  };

  const processResult = (data: DataResponse) => {
    if (data !== null && jobPostResponse !== null) {
      const dataForHistory: StoredResultForHistory = {
        data: data,
        id: jobPostResponse.id,
        created_at: jobPostResponse.current_time
      }

      add(dataForHistory)

      setIsSuccessed(true);

      // temp. Added autonavigating.
      //TODO: remove unused click() and button
      handleNextClick()
    }
  }

  const handleNextClick = () => {
    const path = `/result/${jobPostResponse?.id}`
    goToStep(AppStep.Results, path)
  };

  return (
    <>
      <ProgressStepper />
      <Typography variant="body1" >Now everything is ready to send the video to the server</Typography>
      {!isLoading && !isSuccessed && <Button
        onClick={send}
        variant="contained"
      >
        Send
      </Button>}

      {isLoading && <LinearProgress />}

      {jobPostResponse && <Alert severity="success">The task was created</Alert>} <br />
      {jobIdGetResponse && <Alert severity="info">status: {jobIdGetResponse.status}</Alert>} <br />
      {isSuccessed && <>

        <Alert severity="success">The task was done</Alert> <br />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" component="span">
            <Button
              onClick={handleNextClick}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Result
            </Button>
          </Typography>
        </Box>
      </>}

      {error && <>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={send}>Try again</Button>
      </>}
    </>
  )
}

export default ProcessingPage
