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

  const getAllVolunteersInEnrolment = async (id) => {
    try {
      const enroledVolunteers = await api.get(
        `/admin/enrolments/volunteers?program_id=${id}`
      );
      return enroledVolunteers.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAvailabilities = async () => {
    try {
      const getAllAvailabilities = await api.get(
        '/volunteers/availability/all'
      );
      return getAllAvailabilities.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getVolunteerAvail = async (volunteerId) => {
    try {
      const availability = await api.get(
        `/volunteers/availabilities/${volunteerId}`
      );
      return availability.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Get a volunteer's profile API
  const getProfile = async (volunteerId) => {
    try {
      const profile = await api.get(
        `/admin/volunteers/profiles/${volunteerId}`
      );
      return profile.data;
    } catch (err) {
      console.log(err);
    }
  };

  const enrolVolunteer = async (volunteerId, programId) => {
    try {
      const response = await api.post(
        `/admin/enrolments/volunteers?volunteer_id=${volunteerId}&program_id=${programId}`,
        {}
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const editVolunteerAvail = async (volunteerId, date, isAvail) => {
    try {
      const response = await api.put(
        `/volunteers/availability/${volunteerId}?date=${date}&isAvail=${isAvail}`,
        {}
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const addProgram = async (body) => {
    try {
      const response = await api.post(`/admin/newprogram`, body);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const editProgram = async (id, body) => {
    try {
      console.log(body);
      const response = await api.put(`/admin/programs/${id}`, body);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const editProfile = async (volunteerId, volunteerProfile) => {
    try {
      const profile = await api.put(
        `/admin/volunteers/profiles/${volunteerId}/edit`,
        volunteerProfile
      );
      return profile.data;
    } catch (err) {
      console.log(err);
    }
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
    getAllVolunteersInEnrolment,
    getAllAvailabilities,
    getProfile,
    getVolunteerAvail,
    enrolVolunteer,
    editVolunteerAvail,
    editProgram,
    editProfile,
    addProgram,
  };

  return <AdminContext.Provider value={ctx}>{children}</AdminContext.Provider>;
}

export const useGlobalAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
