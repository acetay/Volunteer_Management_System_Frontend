import { Navigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';

function ProtectedRoute({ children }) {
  const { authUser } = useGlobalVolunteerContext();

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;