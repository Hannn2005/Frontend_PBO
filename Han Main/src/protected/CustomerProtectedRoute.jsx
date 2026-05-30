import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const CustomerProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'CUSTOMER') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default CustomerProtectedRoute;