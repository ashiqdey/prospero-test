
import ReactDOM from 'react-dom';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
//
import App from './App';
import theme from './theme';

// ----------------------------------------------------------------------

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);