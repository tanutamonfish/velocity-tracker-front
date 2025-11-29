import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBarLinkButton from './NavBarLinkButton';

function NavigationBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <NavBarLinkButton to="/">Tracker</NavBarLinkButton>
        </Typography>

        <Typography sx={{ flexGrow: 1 }}>
          <NavBarLinkButton to="/">Веб-сервис для анализа поступательного механического движения на основе видеоматериала</NavBarLinkButton>
        </Typography>

        <Box>
          <NavBarLinkButton to="/">Home</NavBarLinkButton>
          <NavBarLinkButton to="/history">History</NavBarLinkButton>
          {/* <NavBarLinkButton to="/result">Result</NavBarLinkButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;