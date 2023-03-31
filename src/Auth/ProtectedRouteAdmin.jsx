import { Navigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Swal from 'sweetalert2';

function ProtectedRouteAdmin({ children }) {
  const { userStorage, role } = useGlobalVolunteerContext();

  if (!userStorage || role !== 'ADMIN') {
    Swal.fire({
      title: 'Error',
      text: "You don't have authority to access this page",
      icon: 'error',
    });
    return <Navigate to="/notauth" />;
  }

  return children;
}

export default ProtectedRouteAdmin;
