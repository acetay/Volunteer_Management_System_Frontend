import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { initialState } from './InitialStates';
import Swal from 'sweetalert2';

import { auth } from '../../FirebaseConfiguration/Firebase';

import {
  createUserWithEmailAndPassword, // signup new user
  signInWithEmailAndPassword, // signin and receive jwt token from firebase
  onAuthStateChanged, // recceive user jwt and details after signin
  signOut,
  updatePassword,
} from 'firebase/auth';

const VolunteerContext = createContext();

function VolunteerContextProvider({ children }) {
  const [volunteers, setVolunteers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // States created for testing only - to remove once stable
  const [authUser, setAuthUser] = useState({});
  const [singleUser, setSingleUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [userUid, setUserUid] = useState('');

  // Temp signup Form - To be refactored
  const [tempForm, setTempForm] = useState(initialState);

  let userStorage = JSON.parse(localStorage.getItem('singleUser'));
  let credentials = JSON.parse(localStorage.getItem('userCredentials'));
  let role = credentials?.role;

  // Get access Info from firebase
  useEffect(() => {
    const listenToAuth = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      setUserUid(currentUser?.uid);
      localStorage.setItem('authUser', JSON.stringify(currentUser));
      console.log(currentUser.accessToken);
    });
    return () => {
      listenToAuth();
    };
    // }
  }, [isLoggedIn]);

  // Edit a Volunteer
  const editVolunteer = async (id, volunteer) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('authUser'))
        .stsTokenManager.accessToken;

      await axios.put(`http://localhost:8080/volunteers/${id}`, volunteer, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const editedUser = { ...singleUser, volunteer: volunteer };
      setSingleUser({ ...singleUser, volunteer: volunteer });
      localStorage.setItem('singleUser', JSON.stringify(editedUser));
    } catch (err) {
      console.log(err);
    }
  };

  // Sign-in a Volunteer
  const signInVolunteer = async (uid) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/signin`,
        uid
      );
      setSingleUser(response.data);
      localStorage.setItem('singleUser', JSON.stringify(response.data));
      localStorage.setItem(
        'userCredentials',
        JSON.stringify(response.data?.userCredentials)
      );
    } catch (err) {
      setIsLoggedIn(false);
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
      });
    }
  };

  // Sign-out a Volunteer
  const signOutVolunteer = async (uid) => {
    try {
      await axios.post(`http://localhost:8080/api/signout`, uid);
      setSingleUser(null);
      setUserUid(() => null);
      setAuthUser(null);
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };

  // Create a new volunteer
  const signupVolunteer = async (volunteer, uid) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/signup?uid=${uid}`,
        volunteer
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // Get enrolments of a volunteer
  const getEnrolments = async (volunteerId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('authUser'))
        .stsTokenManager.accessToken;
      const enrolments = await axios.get(
        `http://localhost:8080/volunteers/${volunteerId}/enrolments`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(enrolments.data);
      return enrolments.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Change a volunteer's avail date
  const unmarkAvailDate = async (volunteerId, date) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('authUser'))
        .stsTokenManager.accessToken;
      const response = await axios.delete(
        `http://localhost:8080/volunteers/availability/${volunteerId}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // FIREBASE APIs - ****TO BE REFACTORED
  // 1. Firebase = Create new user
  const createUserWithPwAndEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Firebase = Sign in Existing user
  const signInUserWithPwAndEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Logout
  const signout = () => {
    signOut(auth);
  };

  // 4. Reset Password
  const passwordReset = (newPassword) => {
    const user = auth.currentUser;
    return updatePassword(user, newPassword);
  };

  const ctx = {
    volunteers,
    setVolunteers,
    signupVolunteer,
    editVolunteer,
    setEditForm,
    editForm,
    signInUserWithPwAndEmail,
    createUserWithPwAndEmail,
    signout,
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    signInVolunteer,
    signOutVolunteer,
    tempForm,
    setTempForm,
    initialState,
    singleUser,
    setSingleUser,
    userStorage,
    isLoading,
    setIsLoading,
    setAuthUser,
    credentials,
    userUid,
    getEnrolments,
    unmarkAvailDate,
    passwordReset,
    role,
  };

  return (
    <VolunteerContext.Provider value={ctx}>
      {children}
    </VolunteerContext.Provider>
  );
}

export const useGlobalVolunteerContext = () => useContext(VolunteerContext);

export default VolunteerContextProvider;