import { ProgressStepper } from "../components/common/ProgressStepper"
import { VideoUploaderComponent } from "../components/specific/uploader/VideoUploaderComponent"

function VideoUploaderPage() {
  return (
    <>
      <ProgressStepper />
      <VideoUploaderComponent />
    </>
  )
}

export default VideoUploaderPage
