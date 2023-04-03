import axios from 'axios';

// Get base URL from env file
const BASE_URL = process.env.REACT_APP_SPRING_URL;
// Get access Token from localstorage
const ACCESS_TOKEN = JSON.parse(localStorage.getItem('authUser'))
  ?.stsTokenManager.accessToken;
// Initialization of spring API
const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

// ****APIs****
// Get all programs and enrolments
export const getAllPrograms = async () => {
  const [programs, enrolments] = await Promise.all([
    api.get('/admin/programs'),
    api.get('/admin/enrolments'),
  ]);
  return { programs: programs.data, enrolments: enrolments.data };
};

// Get a volunteer's profile API
export const getProfile = async (volunteerId) => {
  try {
    const profile = await api.get(`/admin/volunteers/profiles/${volunteerId}`);
    return profile.data;
  } catch (err) {
    console.log(err);
  }
};

// Edit a volunteer's profile API
export const editProfile = async (volunteerId, volunteerProfile) => {
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
export const getVolunteerAvail = async (volunteerId) => {
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
export const enrolVolunteer = async (volunteerId, programId) => {
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
export const editVolunteerAvail = async (volunteerId, date, isAvail) => {
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
export const addProgram = async (body) => {
  try {
    const response = await api.post(`/admin/newprogram`, body);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Edit a program
export const editProgram = async (id, body) => {
  try {
    console.log(body);
    const response = await api.put(`/admin/programs/${id}`, body);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Search for volunteers based on filters and query
export const searchVolunteersByParams = async (
  experience,
  education,
  language
) => {
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

// Get volunteers in a specific enrolment or program
export const getAllVolunteersInEnrolment = async (id) => {
  try {
    const enroledVolunteers = await api.get(
      `/admin/enrolments/volunteers?program_id=${id}`
    );
    return enroledVolunteers.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllAvailabilities = async () => {
  try {
    const getAllAvailabilities = await api.get('/volunteers/availability/all');
    return getAllAvailabilities.data;
  } catch (err) {
    console.log(err);
  }
};
