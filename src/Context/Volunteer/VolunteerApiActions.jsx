// import axios from 'axios';

// // Get base URL from env file
// const BASE_URL = process.env.REACT_APP_SPRING_URL;
// // Get access Token from localstorage
// const ACCESS_TOKEN = JSON.parse(localStorage.getItem('authUser'))
//   .stsTokenManager.accessToken;
// // Initialization of spring API
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
// });

// // Create a new volunteer
// export const signupVolunteer = async (volunteer, uid) => {
//   try {
//     const response = await api.post(
//       `http://localhost:8080/api/signup?uid=${uid}`,
//       volunteer
//     );
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Get enrolments of a volunteer
// export const getEnrolments = async (volunteerId) => {
//   try {
//     const enrolments = await api.get(
//       `http://localhost:8080/volunteers/${volunteerId}/enrolments`
//     );
//     return enrolments.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Change a volunteer's avail date
// export const unmarkAvailDate = async (volunteerId, date) => {
//   try {
//     const response = await api.delete(
//       `http://localhost:8080/volunteers/availability/${volunteerId}?date=${date}`
//     );
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
