import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ChartTabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`plot-tabpanel-${index}`}
      aria-labelledby={`plot-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box 
          sx={{ 
            p: { xs: 1, sm: 2, md: 3 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default ChartTabPanel;