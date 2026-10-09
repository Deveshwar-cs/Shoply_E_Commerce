import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, notification } from 'antd';

import {
  MailOutlined,
  GoogleOutlined,
  ArrowRightOutlined,
  LockOutlined,
} from '@ant-design/icons';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { login, googleLogin } from '../../../store/actions/authActions';

import { roleBasedRedirect } from '../../../functions/authFunctions';

import './Login.css';

const { Item } = Form;

const Login = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { loginInProgress, isAuthenticated, loginGoogleInProgress, user } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      roleBasedRedirect(user, navigate, location);
    }
  }, [navigate, isAuthenticated, user, location]);

  const onFinish = ({ email, password }) => {
    if (password.length < 6) {
      notification.error({
        message: 'Password must be at least 6 characters',
      });

      return;
    }

    dispatch(login(email, password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <main className="shoply-login">
      <div className="shoply-login-grid"></div>

      <div className="shoply-login-container">
        {/* Left / Intro */}
        <section className="shoply-login-intro">
          <div className="shoply-login-intro-top">
            <div className="shoply-login-label">
              <span className="shoply-login-label-line"></span>
              <span>SHOPLY / ACCOUNT</span>
            </div>

            <span className="shoply-login-number">01</span>
          </div>

          <div className="shoply-login-intro-content">
            <span className="shoply-login-eyebrow">WELCOME BACK</span>

            <h1>
              Welcome
              <span> back.</span>
            </h1>

            <p>
              Sign in to access your orders, wishlist, saved products, and
              account settings.
            </p>
          </div>

          <div className="shoply-login-intro-footer">
            <span>SHOPLY</span>
            <span>ESSENTIALS / 2026</span>
          </div>
        </section>

        {/* Login Form */}
        <section className="shoply-login-panel">
          <div className="shoply-login-panel-header">
            <div>
              <span className="shoply-login-eyebrow">ACCOUNT ACCESS</span>

              <h2>Sign in.</h2>
            </div>

            <LockOutlined className="shoply-login-panel-icon" />
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            className="shoply-login-form"
          >
            <Item
              name="email"
              label="EMAIL ADDRESS"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                autoFocus
              />
            </Item>

            <Item
              name="password"
              label="PASSWORD"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Item>

            <div className="shoply-login-forgot">
              <Link to="/forgot-password">
                Forgot password?
                <span>↗</span>
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loginInProgress}
              disabled={loginGoogleInProgress}
              className="shoply-login-submit"
            >
              <span>
                {loginInProgress ? 'Signing in...' : 'Login with email'}
              </span>

              {!loginInProgress && <ArrowRightOutlined />}
            </Button>

            <div className="shoply-login-divider">
              <span></span>
              <strong>OR</strong>
              <span></span>
            </div>

            <Button
              type="default"
              loading={loginGoogleInProgress}
              disabled={loginInProgress}
              icon={<GoogleOutlined />}
              onClick={onGoogleLogin}
              className="shoply-google-button"
            >
              <span>
                {loginGoogleInProgress
                  ? 'Connecting...'
                  : 'Continue with Google'}
              </span>
            </Button>
          </Form>

          <div className="shoply-login-register">
            <span>NEW TO SHOPLY?</span>

            <Link to="/register">
              Create an account
              <span>↗</span>
            </Link>
          </div>

          <div className="shoply-login-security">
            <span className="shoply-login-security-dot"></span>

            <span>Your account information is securely protected.</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
