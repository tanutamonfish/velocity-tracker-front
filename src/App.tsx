import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/common/navbar/NavigationBar'
import { RouteGuard } from './components/common/RouteGuard'
import DetectionPage from './pages/DetectionPage'
import FrameSelectPage from './pages/FrameSelectPage'
import HistoryPage from './pages/HistoryPage'
import Home from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProcessingPage from './pages/ProcessingPage'
import ResultPage from './pages/ResultPage'
import VideoUploaderPage from './pages/VideoUploaderPage'
import mainTheme from './theme'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />

        <NavigationBar />

        <Box sx={{
          mt: 2, mb: 2,
          ml: 3, mr: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <RouteGuard />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<VideoUploaderPage />} />
            <Route path="/frame-select" element={<FrameSelectPage />} />
            <Route path="/detection" element={<DetectionPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/result/:id" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
