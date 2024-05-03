import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from './contexts/auth.context';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>


  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
