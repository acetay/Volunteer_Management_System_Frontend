import React from 'react';
import Dashboard from '../Components/AdminMainPanel_Components/Dashboard';
import ChartsContainer from '../Components/AdminMainPanel_Components/ChartsContainer';

function AdminMainPanel() {
  return (
    <div className="flex flex-col h-auto p-8 justify-start items-center">
      <h1 className="text-3xl tracking-widest font-bold mb-5">MyAdmin Panel</h1>
      <Dashboard />
      <ChartsContainer />
    </div>
  );
}

export default AdminMainPanel;
