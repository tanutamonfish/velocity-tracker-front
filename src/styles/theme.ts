import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#fff',
    }
  }
});

export default mainTheme;
