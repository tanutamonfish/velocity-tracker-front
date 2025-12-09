import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface ChartTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  labels: string[];
  ariaLabel: string;
  variant?: 'fullWidth' | 'standard' | 'scrollable';
  maxWidth?: string | number;
}

export const ChartTabs: React.FC<ChartTabsProps> = ({
  value,
  onChange,
  labels,
  ariaLabel,
  variant = 'fullWidth',
  maxWidth = '1200px',
}) => {
  return (
    <Box 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        width: '100%',
        maxWidth,
        backgroundColor: '#ffffff',
        borderRadius: maxWidth !== '1200px' ? 1 : 0,
      }}
    >
      <Tabs 
        value={value} 
        onChange={onChange} 
        aria-label={ariaLabel}
        variant={variant}
        sx={{
          '& .MuiTab-root': {
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            py: { xs: 1, sm: 1.5, md: 2 },
          }
        }}
      >
        {labels.map((label, index) => (
          <Tab 
            key={`${label}-${index}`}
            label={label}
            id={`${ariaLabel}-tab-${index}`}
            aria-controls={`${ariaLabel}-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    </Box>
  );
};