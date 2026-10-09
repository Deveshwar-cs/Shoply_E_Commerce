import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, notification } from 'antd';

import {
  MailOutlined,
  LockOutlined,
  UserAddOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { signUp } from '../../../store/actions/authActions';
import { roleBasedRedirect } from '../../../functions/authFunctions';

import './RegisterComplete.css';

const { Item } = Form;

const RegisterComplete = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const { signupInProgress, isAuthenticated, signupError, user } = useSelector(
    (state) => state.auth
  );

  // Prefill email from the registration email-link flow.
  useEffect(() => {
    const email = window.localStorage.getItem('emailForRegistration');

    if (email) {
      form.setFieldsValue({ email });
    }
  }, [form]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     notification.info({
  //       message: 'You are already logged in.',
  //     });

  //     navigate('/');
  //     return;
  //   }

  //   if (signupError) {
  //     navigate('/register');
  //   }
  // }, [navigate, signupError, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      roleBasedRedirect(user, navigate, location);
    }

    if (signupError) {
      navigate('/register');
    }
  }, [navigate, isAuthenticated, user, location, signupError]);

  const onFinish = ({ email, password }) => {
    if (password.length < 6) {
      notification.error({
        message: 'Password must be at least 6 characters.',
      });

      return;
    }

    dispatch(signUp(email, password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className="shoply-register-complete">
      <div className="shoply-register-complete-grid"></div>

      <div className="shoply-register-complete-container">
        {/* Intro */}
        <section className="shoply-register-complete-intro">
          <div className="shoply-register-complete-intro-top">
            <div className="shoply-register-complete-label">
              <span className="shoply-register-complete-label-line"></span>
              <span>SHOPLY / ACCOUNT</span>
            </div>

            <span className="shoply-register-complete-number">04</span>
          </div>

          <div className="shoply-register-complete-intro-content">
            <span className="shoply-register-complete-eyebrow">
              ONE LAST STEP
            </span>

            <h1>
              Make it
              <span> yours.</span>
            </h1>

            <p>
              You're almost there. Set a secure password to complete your
              registration and start exploring everything SHOPLY has to offer.
            </p>
          </div>

          <div className="shoply-register-complete-intro-footer">
            <span>SHOPLY</span>
            <span>CREATE / DISCOVER / SHOP</span>
          </div>
        </section>

        {/* Registration form */}
        <section className="shoply-register-complete-panel">
          <div className="shoply-register-complete-panel-header">
            <div>
              <span className="shoply-register-complete-eyebrow">
                COMPLETE REGISTRATION
              </span>

              <h2>Create account.</h2>
            </div>

            <UserAddOutlined className="shoply-register-complete-panel-icon" />
          </div>

          <div className="shoply-register-complete-info">
            <div className="shoply-register-complete-info-number">01</div>

            <div>
              <span>ACCOUNT DETAILS</span>

              <p>
                Confirm your email and choose a password of at least six
                characters.
              </p>
            </div>
          </div>

          <Form
            form={form}
            name="register-complete"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            className="shoply-register-complete-form"
          >
            <Item
              name="email"
              label="EMAIL ADDRESS"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email address.',
                },
                {
                  required: true,
                  message: 'Please enter your email address.',
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
              label="CREATE PASSWORD"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please create a password.',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters.',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Create a password"
              />
            </Item>

            <Item
              name="confirm"
              label="CONFIRM PASSWORD"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('Your passwords do not match.')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm your password"
              />
            </Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={signupInProgress}
              className="shoply-register-complete-submit"
            >
              <span>
                {signupInProgress
                  ? 'Creating account...'
                  : 'Complete registration'}
              </span>

              {!signupInProgress && <ArrowRightOutlined />}
            </Button>
          </Form>

          <div className="shoply-register-complete-login">
            <span>ALREADY REGISTERED?</span>

            <Link to="/login">
              Back to login
              <span>↗</span>
            </Link>
          </div>

          <div className="shoply-register-complete-security">
            <span className="shoply-register-complete-security-dot"></span>

            <span>Choose a password you don't use on other websites.</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterComplete;
