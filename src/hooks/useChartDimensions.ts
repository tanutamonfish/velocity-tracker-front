import { useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';
import type { ChartDimensions } from '../types/chartTypes';

export const useChartDimensions = (): ChartDimensions => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const calculateSize = (k: number) => window.innerWidth * k

    return useMemo(() => {
        if (isMobile) {
            return { width: calculateSize(1), height: 400 };
        } else if (isTablet) {
            return { width: calculateSize(1), height: 500 };
        } else {
            return { width: calculateSize(1), height: 600 };
        }
    }, [isMobile, isTablet]);
};