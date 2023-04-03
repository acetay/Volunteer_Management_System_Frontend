import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { adminReducer, initialState } from './AdminReducer';
import { useGlobalVolunteerContext } from '../Volunteer/VolunteerContext';
import axios from 'axios';

const defaultState = JSON.parse(localStorage.getItem('date')) || initialState;

const BASE_URL = process.env.REACT_APP_SPRING_URL;
const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, defaultState);
  const [tempEditForm, setTempEditForm] = useState({});
  const { userUid } = useGlobalVolunteerContext();
  // console.log(userUid);

  // Listener to persist data into local storage wheneven there is changes in state
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
  }, [state]);

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
      api.get(`/admin/volunteers/profiles/all?UID=${userUid}`),
    ]);
    return { volunteers: volunteers.data, profiles: profiles.data };
  };

  const getAllPrograms = async () => {
    const [programs, enrolments] = await Promise.all([
      api.get('/admin/programs'),
      api.get('/admin/enrolments'),
    ]);
    return { programs: programs.data, enrolments: enrolments.data };
  };

  const ctx = {
    profile: state.profile,
    isLoading: state.isLoading,
    volunteerEnrolments: state.volunteerEnrolments,
    volunteerInEnrolment: state.volunteerInEnrolment,
    allAvailabilitiesOfVolunteers: state.allAvailabilitiesOfVolunteers,
    dispatch,
    userUid,
    adminUser,
    tempEditForm,
    setTempEditForm,
    availabilities: state.availabilities,
    getAllVolunteers,
    getAllPrograms,
  };

  return <AdminContext.Provider value={ctx}>{children}</AdminContext.Provider>;
}

export const useGlobalAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
