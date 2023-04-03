import { Navigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../Context/Volunteer/VolunteerContext';

function ProtectedRoute({ children }) {
  const { userStorage } = useGlobalVolunteerContext();

  if (!userStorage) {
    return <Navigate to="/volunteers/signin" />;
  }

  return children;
}

export default ProtectedRoute;
