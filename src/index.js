import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import VolunteerContextProvider from './Context/VolunteerContext';
import AdminContextProvider from './Context/Admin/AdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <VolunteerContextProvider>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </VolunteerContextProvider>
  // </React.StrictMode>
);
