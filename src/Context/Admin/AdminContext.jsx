import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { adminReducer, initialState } from './AdminReducer';

import { useGlobalVolunteerContext } from '../VolunteerContext';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SPRING_URL;
const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const [toggle, setToggle] = useState(false);
  const [tempEditForm, setTempEditForm] = useState({});
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
      api.get(`/admin/volunteers/profiles/all?UID=${userUid}`),
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

  // Edit a volunteer's profile API
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

  // Get availability of a volunteer based on ID API
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

  // Enrol a volunteer into the program
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

  // Edit availability of a volunteer
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

  // Add a new program
  const addProgram = async (body) => {
    try {
      const response = await api.post(`/admin/newprogram`, body);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Edit a program
  const editProgram = async (id, body) => {
    try {
      console.log(body);
      const response = await api.put(`/admin/programs/${id}`, body);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const searchVolunteersByParams = async (experience, education, language) => {
    try {
      const volunteers = await api.get(
        `/admin/volunteers/search?experience=${experience}&education=${education}&language=${language}`
      );
      console.log(volunteers);
      return volunteers.data;
    } catch (err) {
      console.log(err);
    }
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

  // Listener to set all Information when Admin panel loads
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
    profile: state.profile,
    isLoading: state.isLoading,
    volunteerEnrolments: state.volunteerEnrolments,
    volunteerInEnrolment: state.volunteerInEnrolment,
    allAvailabilitiesOfVolunteers: state.allAvailabilitiesOfVolunteers,
    dispatch,
    userUid,
    adminUser,
    getProfile,
    tempEditForm,
    setTempEditForm,
    editProfile,
    toggle,
    setToggle,
    getVolunteerAvail,
    availabilities: state.availabilities,
    enrolVolunteer,
    editVolunteerAvail,
    addProgram,
    getAllPrograms,
    editProgram,
    searchVolunteersByParams,
    getAllVolunteersInEnrolment,
    getAllAvailabilities,
  };

  return <AdminContext.Provider value={ctx}>{children}</AdminContext.Provider>;
}

export const useGlobalAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;

// const params1 = `experience=${experience}&education=${education}&language=${language}`;
// const params2 = `education=${education}&language=${language}`;
// const params3 = `language=${language}`;
// const params4 = `experience=${experience}&language=${language}`;
// let condition = '';

// if (experience !== '' && education !== '' && language !== '') {
//   condition = params1;
// } else if (experience === '' && education !== '' && language !== '') {
//   condition = params2;
// } else if (experience === '' && education === '' && language !== '') {
//   condition = params3;
// } else if (experience !== '' && education === '' && language !== '') {
//   condition = params4;
// } else if (experience !== '' && education === '' && language !== '') {
// }
