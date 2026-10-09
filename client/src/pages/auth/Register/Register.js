import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import {
  MailOutlined,
  ArrowRightOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { sendEmail } from '../../../store/actions/authActions';

import './Register.css';

const { Item } = Form;

const Register = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated, sendEmailInProgress } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [navigate, isAuthenticated]);

  // Submit user email and get link to complete registration via email
  const onFinish = ({ email }) => {
    dispatch(sendEmail(email));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className="shoply-register">
      <div className="shoply-register-grid"></div>

      <div className="shoply-register-container">
        {/* Intro */}
        <section className="shoply-register-intro">
          <div className="shoply-register-intro-top">
            <div className="shoply-register-label">
              <span className="shoply-register-label-line"></span>
              <span>SHOPLY / ACCOUNT</span>
            </div>

            <span className="shoply-register-number">02</span>
          </div>

          <div className="shoply-register-intro-content">
            <span className="shoply-register-eyebrow">CREATE YOUR ACCOUNT</span>

            <h1>
              Start
              <span> here.</span>
            </h1>

            <p>
              Create your SHOPLY account with a valid email address. We'll send
              you a secure registration link to complete the process.
            </p>
          </div>

          <div className="shoply-register-intro-footer">
            <span>SHOPLY</span>
            <span>JOIN / DISCOVER / SHOP</span>
          </div>
        </section>

        {/* Registration panel */}
        <section className="shoply-register-panel">
          <div className="shoply-register-panel-header">
            <div>
              <span className="shoply-register-eyebrow">
                ACCOUNT REGISTRATION
              </span>

              <h2>Get started.</h2>
            </div>

            <UserAddOutlined className="shoply-register-panel-icon" />
          </div>

          <div className="shoply-register-info">
            <div className="shoply-register-info-number">01</div>

            <div>
              <span>REGISTRATION LINK</span>

              <p>
                Enter your email below. We'll send a link to your inbox so you
                can securely complete your registration.
              </p>
            </div>
          </div>

          <Form
            form={form}
            name="register"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            className="shoply-register-form"
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
              loading={sendEmailInProgress}
              className="shoply-register-submit"
            >
              <span>
                {sendEmailInProgress
                  ? 'Sending email...'
                  : 'Send registration link'}
              </span>

              {!sendEmailInProgress && <ArrowRightOutlined />}
            </Button>
          </Form>

          <div className="shoply-register-login">
            <span>ALREADY HAVE AN ACCOUNT?</span>

            <a href="/login">
              Login to SHOPLY
              <span>↗</span>
            </a>
          </div>

          <div className="shoply-register-security">
            <span className="shoply-register-security-dot"></span>

            <span>We'll never share your email without your permission.</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
