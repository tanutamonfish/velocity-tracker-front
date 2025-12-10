import { Box } from '@mui/material';
import React from 'react';
import Plot from 'react-plotly.js';
import type { DataResponse } from '../../types/DataResponse';
import { type PlotConfig } from '../../types/chartTypes';
import { getPlotlyLayout } from './getPlotlyLayout';

interface PlotlyChartProps {
  time: number[];
  plotConfig: PlotConfig;
  data: DataResponse;
  plotDimensions: { width: number; height: number };
}

export const PlotlyChartWithErrors: React.FC<PlotlyChartProps> = ({
  time,
  plotConfig,
  data,
  plotDimensions,
}) => {
  const plotLayout = getPlotlyLayout(plotDimensions, plotConfig);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Plot
        data={[
          {
            x: time,
            y: data[plotConfig.yDataKey],
            type: 'scattergl',
            mode: 'lines',
            line: { 
              color: plotConfig.color, 
              width: 3,
              shape: 'spline',
              smoothing: 1.3
            },
            name: plotConfig.title,
            hovertemplate: '<b>Time</b>: %{x:.2f}<br><b>Value</b>: %{y:.4f}<extra></extra>',
          },
        ]}
        layout={plotLayout}
        style={{
          width: '100%',
          maxWidth: `${plotDimensions.width}px`,
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#ffffff'
        }}
      />
    </Box>
  );
};