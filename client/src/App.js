import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Spin } from 'antd';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';

const App = () => {
  const { authInfoInProgress } = useSelector((state) => state.auth);

  return authInfoInProgress ? (
    <div className="spiner">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-complete" component={RegisterComplete} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <UserRoute exact path="/user/history">
          <History />
        </UserRoute>
      </Switch>
    </>
  );
};

export default App;
