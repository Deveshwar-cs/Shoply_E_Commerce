import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user.role === 'admin' ? (
    <Route {...rest} />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
