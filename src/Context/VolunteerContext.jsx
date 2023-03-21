import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { auth } from '../FirebaseConfiguration/Firebase';

import {
  createUserWithEmailAndPassword, // signup new user
  signInWithEmailAndPassword, // signin and receive jwt token from firebase
  GoogleAuthProvider, // google signin
  signInWithRedirect, // optional route
  signInWithPopup, // optional route
  onAuthStateChanged, // recceive user jwt and details after signin
  signOut,
} from 'firebase/auth';

const VolunteerContext = createContext();

function VolunteerContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  // This will be replaced by JWT Access Token
  const [currentUser, setCurrentUser] = useState({});

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const listenToAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
    });
    return () => {
      listenToAuth();
    };
  }, []);

  useEffect(() => {
    // getAllVolunteers();
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
      setVolunteers([...newList]);
    } catch (err) {
      console.log(err);
    }
  };

  // 1. Firebase = Create new user

  const createUserWithPwAndEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Firebase = Sign in Existing user
  const signInUserWithPwAndEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // 3. Firebase = sign in with Google - with redirect
  const googleSigninWithRedirect = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // 4. Logout
  const signout = () => {
    signOut(auth);
  };

  const ctx = {
    volunteers,
    setVolunteers,
    signupVolunteer,
    currentUser,
    editVolunteer,
    setEditForm,
    editForm,
    signInUserWithPwAndEmail,
    createUserWithPwAndEmail,
    googleSigninWithRedirect,
    signout,
  };

  return (
    <VolunteerContext.Provider value={ctx}>
      {children}
    </VolunteerContext.Provider>
  );
}

export const useGlobalVolunteerContext = () => useContext(VolunteerContext);

export default VolunteerContextProvider;
