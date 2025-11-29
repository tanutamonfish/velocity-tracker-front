import { Alert, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ErrorMessageProps {
    errorMessage: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
    return (
        <>
            <Alert
                severity="error"
                sx={{
                    my: 2,
                    borderRadius: 1,
                }}
            >
                {errorMessage}
            </Alert>

            <Button
                component={Link}
                to='/upload'
                variant="contained"
                sx={{ mt: 2 }}
            >
                Upload a new file
            </Button>
        </>
    );
}

export default ErrorMessage;