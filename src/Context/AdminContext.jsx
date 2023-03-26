import { useContext, createContext, useState, useEffect } from 'react';

const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const [volunteers, setVolunteers] = useState([]);

  let authUser = JSON.parse(localStorage.getItem('authUser'));

  useEffect(() => {
    if (authUser?.stsTokenManager) {
      console.log('Yes, auth present');
    } else {
      console.log('No, the auth is not present');
    }
  }, []);

  // SPRINGBOOT APIs - *****TO BE REFACTORED
  // Get All Volunteers
  // const getAllVolunteers = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:8080/admin/volunteers'
  //     );
  //     console.log(response.data);
  //     setVolunteers(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const ctx = {};

  return <AdminContext.Provider value={ctx}>{children}</AdminContext.Provider>;
}

export const useGlobalAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
