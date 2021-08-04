import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
