import React from 'react';
import Dashboard from '../Components/AdminMainPanel_Components/Dashboard';
import ChartsContainer from '../Components/AdminMainPanel_Components/ChartsContainer';
import { useGlobalAdminContext } from '../Context/Admin/AdminContext';
import Spinner from '../Assets/Sample_images/spinner.gif';

function AdminMainPanel() {
  const { isLoading } = useGlobalAdminContext();

  if (isLoading) {
    return (
      <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="spinner" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center">
      <h1 className="text-2xl text-gray-400 tracking-widest font-bold mb-5">
        MyAdmin Panel
      </h1>
      <Dashboard />
      <ChartsContainer />
    </div>
  );
}

export default AdminMainPanel;
