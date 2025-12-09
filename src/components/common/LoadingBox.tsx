import { Box, Typography } from "@mui/material";
import { LoadingBar } from "./LoadingBar";

interface LoadingBoxProps {
    loading: boolean,
    message?: string
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ loading, message = "Wait please!" }) => {


    if (loading) return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography align="center" variant="body1">{message}</Typography>
            </Box>
            
            <LoadingBar />
        </>
    );
    else return null
}