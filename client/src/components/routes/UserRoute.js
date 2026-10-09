import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === 'subscriber') {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default UserRoute;
