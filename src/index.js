import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import VolunteerContextProvider from './Context/VolunteerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VolunteerContextProvider>
      <App />
    </VolunteerContextProvider>
  </React.StrictMode>
);
