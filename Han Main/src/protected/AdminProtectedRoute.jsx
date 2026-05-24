import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AdminProtectedRoute;