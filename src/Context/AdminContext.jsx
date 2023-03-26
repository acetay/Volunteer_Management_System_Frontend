import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from 'react';
import { adminReducer, initialState } from './AdminReducer';
import { useGlobalVolunteerContext } from './VolunteerContext';
import axios from 'axios';

const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { userUid } = useGlobalVolunteerContext();
  const [volunteers, setVolunteers] = useState([]);

  let authUser = JSON.parse(localStorage.getItem('authUser'));
  let adminUser = JSON.parse(localStorage.getItem('userCredentials'));

  useEffect(() => {
    if (userUid) {
      if (adminUser?.role === 'ADMIN') {
        getAllVolunteers();
        // console.log(authUser?.stsTokenManager.accessToken);
      }
    }
  }, [adminUser?.role]);

  // SPRINGBOOT APIs - *****TO BE REFACTORED
  // Get All Volunteers
  const getAllVolunteers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/admin/volunteers',
        {
          headers: {
            Authorization: `Bearer ${authUser?.stsTokenManager.accessToken}`,
          },
        }
      );
      //   console.log(response.data);
      dispatch({ type: 'GET_VOLUNTEERS', volunteers: response.data });
      //   setVolunteers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const ctx = {
    volunteers: state.volunteers,
    setVolunteers,
  };

  return <AdminContext.Provider value={ctx}>{children}</AdminContext.Provider>;
}

export const useGlobalAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
