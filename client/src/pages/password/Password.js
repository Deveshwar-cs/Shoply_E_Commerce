import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Grid, Layout, notification } from 'antd';
import {
  KeyOutlined,
  MenuUnfoldOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import UserNav from '../../components/nav/UserNav/UserNav';
import MobileSideDrawer from '../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import { updatePassword } from '../../store/actions/authActions';
import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

import './Password.css';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
const { Item } = Form;

const Password = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const { updatePasswordInProgress } = useSelector((state) => state.auth);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const onFinish = ({ currentPassword, password: newPassword }) => {
    if (newPassword.length < 6) {
      notification.error({
        message: 'Password must be at least 6 characters!',
      });

      return;
    }

    dispatch(updatePassword(currentPassword, newPassword));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="password-layout">
      {/* Header */}
      <Header className="password-header">
        <div className="password-header-inner">
          {!screens.md && (
            <Button
              type="text"
              className="password-mobile-menu"
              icon={<MenuUnfoldOutlined />}
              onClick={showMobileMenuDrawer}
              aria-label="Open navigation"
            />
          )}

          <div className="password-header-label">
            <span className="password-header-line"></span>
            <span>SHOPLY / ACCOUNT</span>
          </div>
        </div>
      </Header>

      <Layout className="password-body">
        {/* Mobile navigation */}
        {!screens.md && (
          <MobileSideDrawer>
            <UserNav />
          </MobileSideDrawer>
        )}

        {/* Desktop navigation */}
        {screens.md && <UserNav />}

        <Content className="password-content">
          <div className="password-container">
            {/* Intro */}
            <section className="password-intro">
              <div className="password-intro-top">
                <span className="password-eyebrow">ACCOUNT SECURITY</span>

                <span className="password-intro-number">02</span>
              </div>

              <div className="password-intro-content">
                <div>
                  <h1>
                    Change
                    <span> password.</span>
                  </h1>

                  <p>
                    Keep your account secure by regularly updating your
                    password.
                  </p>
                </div>

                <div className="password-intro-mark">
                  <KeyOutlined />
                  <span>SECURE</span>
                  <span>ACCOUNT</span>
                </div>
              </div>
            </section>

            {/* Password form */}
            <section className="password-panel">
              <div className="password-panel-header">
                <div>
                  <span className="password-eyebrow">PASSWORD UPDATE</span>

                  <h2>Your credentials.</h2>
                </div>

                <span className="password-panel-count">03</span>
              </div>

              <Form
                form={form}
                name="password-update"
                layout="vertical"
                size="large"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                className="password-form"
              >
                {/* Current password */}
                <Item
                  name="currentPassword"
                  label="CURRENT PASSWORD"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current password!',
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your current password"
                    autoFocus
                  />
                </Item>

                {/* New password */}
                <Item
                  name="password"
                  label="NEW PASSWORD"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your new password" />
                </Item>

                {/* Confirm password */}
                <Item
                  name="confirm"
                  label="CONFIRM NEW PASSWORD"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!'
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your new password" />
                </Item>

                {/* Submit */}
                <Item className="password-submit">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatePasswordInProgress}
                    icon={!updatePasswordInProgress && <ArrowRightOutlined />}
                  >
                    {updatePasswordInProgress
                      ? 'Updating password...'
                      : 'Update password'}
                  </Button>
                </Item>
              </Form>

              {/* Security note */}
              <div className="password-security-note">
                <span className="password-security-dot"></span>

                <span>Your password should contain at least 6 characters.</span>
              </div>
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Password;
