import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import VolunteerContextProvider from './Context/VolunteerContext';
import AdminContextProvider from './Context/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <VolunteerContextProvider>
        <App />
      </VolunteerContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);
