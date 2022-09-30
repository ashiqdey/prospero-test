import React from 'react';
import ReactDOM from 'react-dom/client';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

import App from './App';
import theme from './theme';

// -----------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
);
