import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';

const UserRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Route {...rest} render={() => children} />
  ) : (
    <div className="spiner">
      <Spin size="large" />
    </div>
  );
};

export default UserRoute;
