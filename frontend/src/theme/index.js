import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      lighter: '#6556ee0f',
      main: '#6556ee',
    },
    secondary: {
      main: '#32e7fb',
    },
    error: {
      main: '#f73365',
    },
    background: {
      default: '#f4f6ff'
    }
  },
  shape: {
    borderRadius: 6
  }
});

export default theme;
