import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === 'admin') {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoute;
