import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import type { ChartCategory } from '../../types/chartTypes';
import type { DataResponse } from '../../types/DataResponse';
import ChartTabPanel from '../charts/ChartTabPanel';
import { ChartTabs } from './ChartTabs';
import { PlotlyChart } from './PlotlyChart';

interface ChartCategoryProps {
  category: ChartCategory;
  data: DataResponse;
  plotDimensions: { width: number; height: number };
  isActive: boolean;
  mainTabIndex: number;
}

export const ChartCategoryCompomemt: React.FC<ChartCategoryProps> = ({
  category,
  data,
  plotDimensions,
  isActive,
  mainTabIndex,
}) => {
  const [subTabValue, setSubTabValue] = useState(0);

  const handleSubTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSubTabValue(newValue);
  };

  if (!isActive) return null;

  return (
    <ChartTabPanel value={mainTabIndex} index={mainTabIndex}>
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
          {category.title}
        </Typography>
        
        <ChartTabs
          value={subTabValue}
          onChange={handleSubTabChange}
          labels={category.plots.map(plot => plot.title)}
          ariaLabel={`${category.label.toLowerCase()}-subtabs`}
          maxWidth="800px"
        />

        {category.plots.map((plotConfig, index) => (
          <ChartTabPanel 
            key={plotConfig.title} 
            value={subTabValue} 
            index={index}
          >
            <PlotlyChart
              time={data.time}
              plotConfig={plotConfig}
              data={data}
              plotDimensions={plotDimensions}
            />
          </ChartTabPanel>
        ))}
      </Box>
    </ChartTabPanel>
  );
};