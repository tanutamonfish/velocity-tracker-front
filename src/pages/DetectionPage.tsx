import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage";
import { LoadingBox } from "../components/common/LoadingBox";
import { ProgressStepper } from "../components/common/ProgressStepper";
import { CanvasWrapper } from "../components/specific/detection/CanvasFrameZoomPaint";
import type { CanvasBox } from "../components/specific/detection/types";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { useAppStore } from "../stores/useAppStore";
import type { DetectObjectResponse } from "../types/DetectObjectResponse";
import { Point } from "../types/Point";
import { calculatePixelSize } from "../utils/pixelSizeCalculation";

function DetectionPage() {
  const { selectedFrameData, setDetectionData } = useAppStore()
  const [detectedObjects, setDetectResult] = useState<DetectObjectResponse[] | null>(null)
  const [canvasBoxes, setCanvasBoxes] = useState<CanvasBox[]>([])

  const [error, setError] = useState<string | null>(null)
  const [noSuchElementsError, setNoSuchElementsError] = useState<boolean>(false)
  const [isLoading, setLoading] = useState(false)

  const [selectedObject, setSelectedObject] = useState<DetectObjectResponse | null>(null);

  const [diagonalInMetersInput, setDiagonalInMetersInput] = useState('0.0')
  const [massInKilogramsInput, setMassInKilogramsInput] = useState('0.0')

  const [isReady, setIsReady] = useState(false);

  const { goNext, goBack } = useAppNavigate()

  // const [pointClickSelected, setPointClickSelected] = useState<string | null>(null);
  // const [point1, setPoint1] = useState<Point | null>(null);
  // const [point2, setPoint2] = useState<Point | null>(null);

  useEffect(() => { runDetection() }, [])

  const runDetection = async () => {
    setLoading(true)
    setError(null)

    try {
      if (selectedFrameData) {
        const formData = new FormData();
        formData.append('image', selectedFrameData.frameFile, 'file.png');

        const response = await fetch('/api/v1/detect', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result: DetectObjectResponse[] = await response.json();
          setDetectResult(result)

          console.log('GOT: ', result);

          setError(null)

        } else {
          throw new Error(`Upload failed: ${response.status}`);
        }
      }
      else {
        throw new Error("selectedFrameData is null");
      }
    } catch (error) {
      console.error('Detection failed:', error);
      setError('Fetch error')
    }

    setLoading(false)
  };

  useEffect(() => {
    if (detectedObjects) {
      if (detectedObjects.length === 0) {
        setNoSuchElementsError(true)
      }
      else {
        detectedObjects.forEach((x, index) => {
          x.id = index + 1
          x.title = `ID: ${x.id}, ${x.obj_type}`
        })

        const array: CanvasBox[] = detectedObjects.map((x) => {
          const t: CanvasBox = {
            id: x.id.toString(),
            title: x.title,
            x: x.x1,
            y: x.y1,
            width: x.x2 - x.x1,
            height: x.y2 - x.y1
          }

          return t
        })

        setCanvasBoxes(array)

        console.log('set canvasBoxes, ', array);
      }
    }
  }, [detectedObjects]);

  const handleBoxClick = (boxId: string) => {
    console.log(`Box ${boxId} clicked`);

    const selectedResponse = detectedObjects?.filter(x => x.id.toString() === boxId).at(0) ?? null

    setSelectedObject(selectedResponse)
  };

  // const handlePointSelection = (point: Point) => {
  //   if (pointClickSelected === 'first') {
  //     setPoint1(point)
  //   } else if (pointClickSelected === 'second') {
  //     setPoint2(point)
  //   }
  // };

  // const handlePointToggleButtonClickSelected = (
  //   _event: React.MouseEvent<HTMLElement>,
  //   newPoint: string | null,
  // ) => {
  //   setPointClickSelected(newPoint);
  // };

  const handleDiagonalInMetersChange = (event: { target: { value: string; }; }) => {
    const val = event.target.value
    setDiagonalInMetersInput(val)
  }

  const handleMassInKilogramsInput = (event: { target: { value: string; }; }) => {
    const val = event.target.value
    setMassInKilogramsInput(val)
  }

  const handleContinue = async () => {
    if (selectedObject) {
      const diagonalInMeters = parseFloat(diagonalInMetersInput)
      const p1 = new Point(selectedObject.x1, selectedObject.y1)
      const p2 = new Point(selectedObject.x2, selectedObject.y2)
      const pixelSize = calculatePixelSize(p1, p2, diagonalInMeters)

      // mass is not a required field now
      const massInKilograms = parseFloat(massInKilogramsInput);
      const valueIsInRangeMass = !isNaN(massInKilograms) && massInKilograms > 0.0;
      if (!valueIsInRangeMass) setMassInKilogramsInput('0.0')

      setDetectionData({ response: selectedObject, pixelSize, mass: massInKilograms });
      goNext()
    }
  };

  useEffect(() => {
    let isNowReady = diagonalInMetersInput !== null
    if (isNowReady) {
      const numDiagonal = parseFloat(diagonalInMetersInput);
      const valueIsInRangeDiagonal = !isNaN(numDiagonal) && numDiagonal > 0.0;
      isNowReady &&= valueIsInRangeDiagonal
    }

    isNowReady &&= (selectedObject !== null && !isLoading && detectedObjects !== null)
    // console.log(JSON.stringify({diagonalInMetersInput, selectedObject, isLoading, detectedObjects}));

    setIsReady(isNowReady);
  }, [diagonalInMetersInput, isLoading, selectedObject, detectedObjects]);


  return (
    <>
      <ProgressStepper />

      {selectedFrameData ? (
        <>

          {!isLoading && !detectedObjects && <Box>
            <Typography variant="body1" >Selected timestamp: {selectedFrameData.selectedFrameTime?.toFixed(2)}s.</Typography>
            <Button variant="contained" onClick={runDetection}>Send to server for object detecttion</Button>
          </Box>}

          <LoadingBox loading={isLoading} />

          <Box>
            {selectedObject &&

              <>
                <Typography variant="body1" >Selected object: {selectedObject.title}s.</Typography>
                <TextField
                  label="The diagonal of the selected object in meters"
                  type="number"
                  value={diagonalInMetersInput}
                  onChange={handleDiagonalInMetersChange}
                  inputProps={{
                    min: 0,
                    step: "any",
                  }}
                  sx={{ mt: 5 }}
                  variant="outlined"
                />

                <TextField
                  label="The mass of the selected object in kilograms (optional)"
                  type="number"
                  value={massInKilogramsInput}
                  onChange={handleMassInKilogramsInput}
                  inputProps={{
                    min: 0,
                    step: "any",
                  }}
                  sx={{ mt: 5 }}
                  variant="outlined"
                />

                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button
                    variant="contained"
                    onClick={handleContinue}
                    disabled={!isReady}
                  >
                    Next
                  </Button>
                </Box>
              </>
            }

            {detectedObjects && !selectedObject && <Typography variant="body1" >Select an object (click)</Typography>}


            {error && <>
              <Alert severity="error">{error}</Alert>
              <Button variant="contained" onClick={runDetection}>Try again</Button>
            </>}


            {noSuchElementsError && <>
              <Alert severity="error">No objects were found in this frame. Please try another frame. Or upload another video in which the object is clearly visible. (By the way, the application works better with standard objects: people, cars, bicycles, dogs, etc.)</Alert>
              <Button variant="contained" onClick={goBack}>Select another frame</Button>
            </>}
          </Box>


          {/* <Box sx={{ textAlign: "center" }}>
            {selectedObject &&

              <>
                <Typography variant="body1" >Selected object: {selectedObject.title}s.</Typography>


                <ToggleButtonGroup
                  value={pointClickSelected}
                  exclusive
                  onChange={handlePointToggleButtonClickSelected}
                  aria-label="text alignment"
                >
                  <ToggleButton value="first" aria-label="left aligned">
                    Select first point
                  </ToggleButton>
                  <ToggleButton value="second" aria-label="centered">
                    Select second point
                  </ToggleButton>
                </ToggleButtonGroup>

                {point1 && <Typography variant="body1" >Point 1: ({point1.x}, {point1.y})</Typography>}
                {point2 && <Typography variant="body1" >Point 2: ({point2.x}, {point2.y})</Typography>}
              </>
            }
          </Box> */}

          <Box sx={{
            width: '100%',
            height: 'calc(100vh - 120px)',
            backgroundColor: 'white',
            borderRadius: 1,
            p: 1
          }}>
            <CanvasWrapper
              boxes={canvasBoxes}
              onBoxClick={handleBoxClick}
              boxColor="rgba(33, 150, 243, 0.1)"
              selectedColor="#1b4cd3ff"
              hoverColor="rgba(33, 150, 243, 0.2)"
              fileUrl={selectedFrameData.frameFileUrl}
            // selectingPoint1={pointClickSelected === 'first'}
            // selectingPoint2={pointClickSelected === 'second'}
            />
          </Box>

          {/* <Grid container spacing={2}>
            <Grid>
              <CanvasFramePaint ref={canvasRef} />
            </Grid>
            <Grid>
              {renderComboox()}
            </Grid>
          </Grid> */}

          {/* {!isLoading && detectResult &&
            <Grid container spacing={10}>
              <Grid>
                <CanvasFramePaint frameUrl={selectedFrameData.frameFileUrl} ref={canvasRef} />
              </Grid>
              <Grid>

              </Grid>
            </Grid>
          } */}


        </>
      ) : (
        <ErrorMessage errorMessage="The frame is empty" />
      )
      }
    </>
  )
}

export default DetectionPage;
