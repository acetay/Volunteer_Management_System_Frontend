import { createContext, useContext, useState, useEffect } from 'react';

const VolunteerContext = createContext();

function VolunteerContextProvider({ children }) {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {}, []);

  const ctx = {
    volunteers,
    setVolunteers,
  };

  return (
    <VolunteerContext.Provider value={ctx}>
      {children}
    </VolunteerContext.Provider>
  );
}

export const useGlobalVolunteerContext = () => useContext(VolunteerContext);

export default VolunteerContextProvider;
