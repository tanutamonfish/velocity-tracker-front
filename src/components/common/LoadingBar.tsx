import { Box, LinearProgress } from "@mui/material";

export const LoadingBar: React.FC = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
};
