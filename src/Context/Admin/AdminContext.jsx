import { useContext, createContext, useEffect, useReducer } from 'react';
import { adminReducer, initialState } from './AdminReducer';
import { useGlobalVolunteerContext } from '../VolunteerContext';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SPRING_URL;
const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { userUid } = useGlobalVolunteerContext();

  // let authUser = JSON.parse(localStorage.getItem('authUser'));
  let adminUser = JSON.parse(localStorage.getItem('userCredentials'));
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem('authUser'))
    ?.stsTokenManager.accessToken;

  // Initialization of spring API
  const api = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });

  // Get all Volunteers and Profiles
  const getAllVolunteers = async () => {
    const [volunteers, profiles] = await Promise.all([
      api.get('/admin/volunteers'),
      api.get('/volunteers/profiles/all'),
    ]);
    return { volunteers: volunteers.data, profiles: profiles.data };
  };

  // Get all programs and enrolments
  const getAllPrograms = async () => {
    const [programs, enrolments] = await Promise.all([
      api.get('/admin/programs'),
      api.get('/admin/enrolments'),
    ]);
    return { programs: programs.data, enrolments: enrolments.data };
  };

  // Setting all Information when Admin panel loads
  useEffect(() => {
    if (userUid) {
      if (adminUser?.role === 'ADMIN') {
        dispatch({ type: 'SET_LOADING' });
        const getAllData = async () => {
          const volunteersSummary = await getAllVolunteers();
          const programsSummary = await getAllPrograms();
          dispatch({
            type: 'GET_VOLUNTEERS_PROFILES',
            payload: volunteersSummary,
          });
          dispatch({
            type: 'GET_PROGRAMS_ENROLMENTS',
            payload: programsSummary,
          });
        };
        getAllData();
      }
    }
  }, [adminUser?.role]);

  const ctx = {
    volunteers: state.volunteers,
    profiles: state.profiles,
    programs: state.programs,
    enrolments: state.enrolments,
    isLoading: state.isLoading,
    dispatch,
    userUid,
    adminUser,
  };

  return <AdminContext.Provider value={ctx}>{children}</AdminContext.Provider>;
}

export const useGlobalAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
