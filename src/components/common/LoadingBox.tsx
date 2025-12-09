import { Typography } from "@mui/material";
import { ColumnBox } from "./ColumnBox";
import { LoadingBar } from "./LoadingBar";

interface LoadingBoxProps {
    loading: boolean,
    message?: string
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ loading, message = "Wait please!" }) => {


    if (loading) return (
        <ColumnBox>
            <Typography align="center" variant="body1" sx={{ mb: 1 }}>{message}</Typography>

            <LoadingBar />
        </ColumnBox>
    );
    else return null
}