import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const TrainerProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'TRAINER') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default TrainerProtectedRoute;