
import ReactDOM from 'react-dom';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
// redux
// import { Provider as ReduxProvider } from 'react-redux';
// import store from './redux/store';

import App from './App';
import theme from './theme';

// ----------------------------------------------------------------------

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* <ReduxProvider store={store}> */}
    <App />
    {/* </ReduxProvider> */}
  </ThemeProvider>,
  document.getElementById('root')
);