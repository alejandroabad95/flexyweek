import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/auth.context';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>


  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
