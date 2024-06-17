import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
