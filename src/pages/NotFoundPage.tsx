import { Link } from "react-router-dom"
import { Alert, Button } from "@mui/material"

function NotFoundPage() {
  return (
    <>
      <Alert severity="error">Page not found</Alert>
      <Button
        component={Link}
        to='/'
        variant="contained"
        sx={{ mt: 2 }}
      >
        Home
      </Button>
    </>
  )
}

export default NotFoundPage
