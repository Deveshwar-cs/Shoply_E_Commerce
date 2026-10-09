import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button } from 'antd';

import {
  MailOutlined,
  ArrowRightOutlined,
  LockOutlined,
} from '@ant-design/icons';

import { useNavigate, Link } from 'react-router-dom';

import { forgotPassword } from '../../../store/actions/authActions';

import './ForgotPassword.css';

const { Item } = Form;

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated, sendForgotPasswordEmailInProgress } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [navigate, isAuthenticated]);

  const onFinish = ({ email }) => {
    dispatch(forgotPassword(email));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className="shoply-forgot-password">
      <div className="shoply-forgot-password-grid"></div>

      <div className="shoply-forgot-password-container">
        {/* Intro */}
        <section className="shoply-forgot-password-intro">
          <div className="shoply-forgot-password-intro-top">
            <div className="shoply-forgot-password-label">
              <span className="shoply-forgot-password-label-line"></span>
              <span>SHOPLY / ACCOUNT</span>
            </div>

            <span className="shoply-forgot-password-number">03</span>
          </div>

          <div className="shoply-forgot-password-intro-content">
            <span className="shoply-forgot-password-eyebrow">
              ACCOUNT RECOVERY
            </span>

            <h1>
              Reset
              <span> access.</span>
            </h1>

            <p>
              Forgot your password? Enter the email connected to your account
              and we'll send you a secure link to reset it.
            </p>
          </div>

          <div className="shoply-forgot-password-intro-footer">
            <span>SHOPLY</span>
            <span>SECURE / SIMPLE / PRIVATE</span>
          </div>
        </section>

        {/* Recovery panel */}
        <section className="shoply-forgot-password-panel">
          <div className="shoply-forgot-password-panel-header">
            <div>
              <span className="shoply-forgot-password-eyebrow">
                PASSWORD RECOVERY
              </span>

              <h2>Recover account.</h2>
            </div>

            <LockOutlined className="shoply-forgot-password-panel-icon" />
          </div>

          <div className="shoply-forgot-password-info">
            <div className="shoply-forgot-password-info-number">01</div>

            <div>
              <span>RESET LINK</span>

              <p>
                Enter your email address below. Check your inbox for a password
                reset link from SHOPLY.
              </p>
            </div>
          </div>

          <Form
            form={form}
            name="forgot-password"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            className="shoply-forgot-password-form"
          >
            <Item
              name="email"
              label="EMAIL ADDRESS"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid email!',
                },
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                autoFocus
              />
            </Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={sendForgotPasswordEmailInProgress}
              className="shoply-forgot-password-submit"
            >
              <span>
                {sendForgotPasswordEmailInProgress
                  ? 'Sending email...'
                  : 'Send reset link'}
              </span>

              {!sendForgotPasswordEmailInProgress && <ArrowRightOutlined />}
            </Button>
          </Form>

          <div className="shoply-forgot-password-back">
            <span>REMEMBERED YOUR PASSWORD?</span>

            <Link to="/login">
              Back to login
              <span>↗</span>
            </Link>
          </div>

          <div className="shoply-forgot-password-security">
            <span className="shoply-forgot-password-security-dot"></span>

            <span>Your password reset request is handled securely.</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForgotPassword;
