import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerContext = createContext();

function VolunteerContextProvider({ children }) {
  const [volunteers, setVolunteers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getAllVolunteers();
  }, []);

  // Get All Volunteers
  const getAllVolunteers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/admin/volunteers'
      );
      console.log(response.data);
      setVolunteers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create a new volunteer
  const signupVolunteer = async (volunteer) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/newvolunteer',
        volunteer
      );
      console.log(response.data);
      setCurrentUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Edit a Volunteer
  const editVolunteer = async (id, volunteer) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/volunteers/${id}`,
        volunteer
      );
      const newList = volunteers.map((person) =>
        person.id === id ? volunteer : person
      );
      setVolunteers(newList);
      console.log(response.data);
      getAllVolunteers();
    } catch (err) {
      console.log(err);
    }
  };

  const ctx = {
    volunteers,
    setVolunteers,
    signupVolunteer,
    currentUser,
    editVolunteer,
  };

  return (
    <VolunteerContext.Provider value={ctx}>
      {children}
    </VolunteerContext.Provider>
  );
}

export const useGlobalVolunteerContext = () => useContext(VolunteerContext);

export default VolunteerContextProvider;
