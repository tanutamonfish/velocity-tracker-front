import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import type { DataResponse } from '../../types/DataResponse';
import ChartTabPanel from './ChartTabPanel';

interface Props {
  data: DataResponse;
}

const ChartCollection: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mainTabValue, setMainTabValue] = useState(0);
  const [positionTabValue, setPositionTabValue] = useState(0);
  const [speedTabValue, setSpeedTabValue] = useState(0);
  const [accelerationTabValue, setAccelerationTabValue] = useState(0);

  const handleMainTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMainTabValue(newValue);
  };

  const handlePositionTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setPositionTabValue(newValue);
  };

  const handleSpeedTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSpeedTabValue(newValue);
  };

  const handleAccelerationTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setAccelerationTabValue(newValue);
  };

  const plotDimensions = useMemo(() => {
    if (isMobile) {
      return { width: Math.min(800, window.innerWidth - 40), height: 400 };
    } else if (isTablet) {
      return { width: Math.min(1000, window.innerWidth - 80), height: 500 };
    } else {
      return { width: Math.min(1200, window.innerWidth - 100), height: 600 };
    }
  }, [isMobile, isTablet]);

  // Common plot layout
  const plotLayout = useMemo(() => ({
    width: plotDimensions.width,
    height: plotDimensions.height,
    showlegend: false,
    margin: { 
      t: 80, 
      l: 80, 
      r: 60, 
      b: 80 
    },
    font: {
      family: 'Roboto, Arial, sans-serif',
      size: 14,
      color: '#333333'
    },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#fafafa',
    xaxis: {
      title: {
        text: 'Time, s',
        font: { size: 16, weight: 700 }
      },
      titlefont: { size: 14 },
      tickfont: { size: 12 },
      gridcolor: '#e0e0e0',
      gridwidth: 1,
      zerolinecolor: '#cccccc',
      zerolinewidth: 2,
      linecolor: '#333333',
      linewidth: 1
    },
    yaxis: {
      title: {
        font: { size: 16, weight: 700 }
      },
      titlefont: { size: 14 },
      tickfont: { size: 12 },
      gridcolor: '#e0e0e0',
      gridwidth: 1,
      zerolinecolor: '#cccccc',
      zerolinewidth: 2,
      linecolor: '#333333',
      linewidth: 1
    },
    title: {
      text: '',
      font: { size: 20, weight: 700 },
      x: 0.5,
      xanchor: 'center' as const
    },
  }), [plotDimensions]);

  // plot configurations
  const positionPlots = [
    {
      title: 'x(t)',
      yData: data.x,
      yLabel: 'x Position, m',
      color: '#1f77b4'
    },
    {
      title: 'y(t)',
      yData: data.y,
      yLabel: 'y Position, m',
      color: '#ff7f0e'
    },
  ];

  const speedPlots = [
    {
      title: 'v_x(t)',
      yData: data.v_x,
      yLabel: 'Velocity X, m/s',
      color: '#2ca02c'
    },
    {
      title: 'v_y(t)',
      yData: data.v_y,
      yLabel: 'Velocity Y, m/s',
      color: '#d62728'
    },
    {
      title: 'v(t)',
      yData: data.v,
      yLabel: 'Velocity Magnitude, m/s',
      color: '#9467bd'
    },
  ];

  const accelerationPlots = [
    {
      title: 'a_x(t)',
      yData: data.a_x,
      yLabel: 'Acceleration X, m/s^2',
      color: '#8c564b'
    },
    {
      title: 'a_y(t)',
      yData: data.a_y,
      yLabel: 'Acceleration Y, m/s^2',
      color: '#e377c2'
    },
    {
      title: 'a(t)',
      yData: data.a,
      yLabel: 'Acceleration Magnitude, m/s^2',
      color: '#7f7f7f'
    },
  ];

  const mainTabLabels = ['Position', 'Speed', 'Acceleration'];
  const positionTabLabels = ['x(t)', 'y(t)'];
  const speedTabLabels = ['v_x(t)', 'v_y(t)', 'v(t)'];
  const accelerationTabLabels = ['a_x(t)', 'a_y(t)', 'a(t)'];

  const renderPlot = (plotConfig: typeof positionPlots[0]) => (
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
            x: data.time,
            y: plotConfig.yData,
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
        layout={{
          ...plotLayout,
          title: {
            ...plotLayout.title,
            text: plotConfig.title
          },
          yaxis: { 
            ...plotLayout.yaxis, 
            title: {
              text: plotConfig.yLabel,
              font: { size: 16, weight: 700 }
            }
          }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToAdd: ['zoom2d', 'pan2d', 'resetScale2d'],
          modeBarButtonsToRemove: ['lasso2d', 'select2d'],
          responsive: true,
          toImageButtonOptions: {
            format: 'png',
            filename: plotConfig.title,
            height: plotDimensions.height,
            width: plotDimensions.width,
            scale: 2
          }
        }}
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

  return (
    <>
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          width: '100%',
          maxWidth: '1200px',
          backgroundColor: '#ffffff'
        }}
      >
        <Tabs 
          value={mainTabValue} 
          onChange={handleMainTabChange} 
          aria-label="main plot tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              py: { xs: 1, sm: 1.5, md: 2 },
            }
          }}
        >
          {mainTabLabels.map((label, index) => (
            <Tab 
              key={label}
              label={label}
              id={`main-tab-${index}`}
              aria-controls={`main-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Position */}
      <ChartTabPanel value={mainTabValue} index={0}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: '#333333'
            }}
          >
            Position Analysis
          </Typography>
          
          {/* Position subtabs */}
          <Box 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              mb: 4,
              maxWidth: '800px',
              backgroundColor: '#ffffff',
              borderRadius: 1
            }}
          >
            <Tabs 
              value={positionTabValue} 
              onChange={handlePositionTabChange} 
              aria-label="position subtabs"
              variant="fullWidth"
            >
              {positionTabLabels.map((label, index) => (
                <Tab 
                  key={label}
                  label={label}
                  id={`position-tab-${index}`}
                  aria-controls={`position-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          {/* Position subtabs panels */}
          {positionPlots.map((plot, index) => (
            <ChartTabPanel key={plot.title} value={positionTabValue} index={index}>
              {renderPlot(plot)}
            </ChartTabPanel>
          ))}
        </Box>
      </ChartTabPanel>

      {/* Speed */}
      <ChartTabPanel value={mainTabValue} index={1}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: '#333333'
            }}
          >
            Speed Analysis
          </Typography>
          
          {/* Speed subtabs */}
          <Box 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              mb: 4,
              maxWidth: '800px',
              backgroundColor: '#ffffff',
              borderRadius: 1
            }}
          >
            <Tabs 
              value={speedTabValue} 
              onChange={handleSpeedTabChange} 
              aria-label="speed subtabs"
              variant="fullWidth"
            >
              {speedTabLabels.map((label, index) => (
                <Tab 
                  key={label}
                  label={label}
                  id={`speed-tab-${index}`}
                  aria-controls={`speed-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          {/* Speed subtabs panels */}
          {speedPlots.map((plot, index) => (
            <ChartTabPanel key={plot.title} value={speedTabValue} index={index}>
              {renderPlot(plot)}
            </ChartTabPanel>
          ))}
        </Box>
      </ChartTabPanel>

      {/* Acceleration */}
      <ChartTabPanel value={mainTabValue} index={2}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: '#333333'
            }}
          >
            Acceleration Analysis
          </Typography>
          
          {/* Acceleration subtabs */}
          <Box 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              mb: 4,
              maxWidth: '800px',
              backgroundColor: '#ffffff',
              borderRadius: 1
            }}
          >
            <Tabs 
              value={accelerationTabValue} 
              onChange={handleAccelerationTabChange} 
              aria-label="acceleration subtabs"
              variant="fullWidth"
            >
              {accelerationTabLabels.map((label, index) => (
                <Tab 
                  key={label}
                  label={label}
                  id={`acceleration-tab-${index}`}
                  aria-controls={`acceleration-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          {/* Acceleration subtabs panels */}
          {accelerationPlots.map((plot, index) => (
            <ChartTabPanel key={plot.title} value={accelerationTabValue} index={index}>
              {renderPlot(plot)}
            </ChartTabPanel>
          ))}
        </Box>
      </ChartTabPanel>
    </>
  );
};

export default ChartCollection;