import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function HomePage() {
  //TODO: add information about the application
  return (
    <>
      <Box width={600}>
        <Typography>Приложение предназначено для отслеживания изменения координат, скорости и ускорения объектов в видеоматериале.</Typography>
      </Box>
      <Button
        component={Link}
        to='/upload'
        variant="contained"
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
    </>
  )
}

export default HomePage
