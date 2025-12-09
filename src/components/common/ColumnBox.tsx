import { Box } from "@mui/material";
import React, { type ReactNode } from "react";

interface ColumnBoxProps {
    children: ReactNode;
}

export const ColumnBox: React.FC<ColumnBoxProps> = ({ children }) => {
    return (
        <Box
            sx={{
                mt: 2,
                mb: 2,
                ml: 3,
                mr: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {children}
        </Box>
    );
};
