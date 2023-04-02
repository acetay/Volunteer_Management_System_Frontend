import React from 'react';
import Dashboard from '../../Components/AdminMainPanel_Components/Dashboard';
import { useState, useEffect } from 'react';
import BannerContainer from '../../Components/AdminMainPanel_Components/BannerContainer';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import Spinner from '../../Assets/Sample_images/spinner.gif';
import ChartsContainer from '../../Components/AdminMainPanel_Components/ChartsContainer';

function AdminMainPanel() {
  const [state, setState] = useState(null);
  const [completedProfiles, setCompletedProfiles] = useState(0);
  const { getAllPrograms, getAllVolunteers } = useGlobalAdminContext();

  useEffect(() => {
    const apiCalls = async () => {
      const { volunteers, profiles } = await getAllVolunteers();
      const { programs, enrolments } = await getAllPrograms();
      if (profiles) {
        let checkCompletion = profiles.filter(
          (profile) =>
            profile.interests === '' ||
            profile.hobbies === '' ||
            profile.professionalExperience === ''
        );
        setCompletedProfiles(() => checkCompletion.length);
      }
      setState(
        {
          ...state,
          volunteers: volunteers,
          profiles: profiles,
          programs: programs,
          enrolments: enrolments,
        } || {}
      );
    };
    apiCalls();
  }, []);

  if (!state) {
    return (
      <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="spinner" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center">
      {/* <h1 className="text-4xl text-gray-600 tracking-widest font-bold mb-5 italic">
        Welcome back!
      </h1> */}
      <div className="flex justify-between w-[75vw] p-2">
        <button className="btn text-white btn-sm">Override</button>
        <h1 className="font-bold text-lg text-blue-700">VMS Control Panel</h1>
      </div>
      <Dashboard state={state} completedProfiles={completedProfiles} />
      <BannerContainer />
      <ChartsContainer />
    </div>
  );
}

export default AdminMainPanel;
