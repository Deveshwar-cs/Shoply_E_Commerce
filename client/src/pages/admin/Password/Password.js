import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Grid,
  Space,
  notification,
  Breadcrumb,
  Divider,
} from 'antd';
import {
  KeyOutlined,
  MenuUnfoldOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav/AdminNav';
import MobileSideDrawer from '../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import { updatePassword } from '../../../store/actions/authActions';
import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

import './Password.css';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Item } = Form;
const { useBreakpoint } = Grid;

const Password = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const { updatePasswordInProgress } = useSelector((state) => state.auth);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const onFinish = ({ currentPassword, password: newPassword }) => {
    if (newPassword.length < 6) {
      notification.error({
        message: 'Password is too short',
        description: 'Your new password must contain at least 6 characters.',
      });
      return;
    }

    if (currentPassword === newPassword) {
      notification.error({
        message: 'Choose a different password',
        description:
          'Your new password must be different from your current password.',
      });
      return;
    }

    dispatch(updatePassword(currentPassword, newPassword));
  };

  const onFinishFailed = () => {
    notification.error({
      message: 'Please check the form',
      description:
        'Complete the required fields and correct any validation errors.',
    });
  };

  return (
    <Layout className="shoply-password-layout">
      <Header className="shoply-password-header">
        <div className="shoply-password-header-left">
          {!screens.md && (
            <Button
              className="shoply-password-menu-button"
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={showMobileMenuDrawer}
              aria-label="Open navigation menu"
            />
          )}

          <div className="shoply-password-brand">
            <span className="shoply-password-brand-name">SHOPLY</span>
            <span className="shoply-password-brand-divider">/</span>
            <span className="shoply-password-brand-section">ADMIN</span>
          </div>
        </div>

        <div className="shoply-password-header-right">
          <span className="shoply-password-status-dot" />
          <Text className="shoply-password-header-status">
            ACCOUNT SECURITY
          </Text>
        </div>
      </Header>

      <Layout className="shoply-password-main-layout" hasSider>
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-password-content">
          <div className="shoply-password-page">
            <Breadcrumb
              className="shoply-password-breadcrumb"
              items={[
                {
                  title: (
                    <a onClick={() => navigate('/admin/dashboard')}>
                      Dashboard
                    </a>
                  ),
                },
                { title: 'Account security' },
              ]}
            />

            <section className="shoply-password-intro">
              <div>
                <Text className="shoply-password-eyebrow">
                  ACCOUNT SETTINGS / SECURITY
                </Text>

                <Title level={1} className="shoply-password-title">
                  Update password<span>.</span>
                </Title>

                <Paragraph className="shoply-password-description">
                  Keep your account secure by using a strong password that you
                  do not use for other websites.
                </Paragraph>
              </div>

              <div className="shoply-password-intro-icon">
                <SafetyCertificateOutlined />
              </div>
            </section>

            <Divider className="shoply-password-divider" />

            <div className="shoply-password-grid">
              <section className="shoply-password-form-section">
                <div className="shoply-password-section-heading">
                  <div>
                    <Text className="shoply-password-section-label">
                      SECURITY CREDENTIALS
                    </Text>
                    <Title level={3} className="shoply-password-section-title">
                      Change your password
                    </Title>
                  </div>

                  <LockOutlined className="shoply-password-lock-icon" />
                </div>

                <Paragraph className="shoply-password-form-description">
                  Enter your current password, then choose and confirm a new
                  one.
                </Paragraph>

                <Form
                  form={form}
                  layout="vertical"
                  name="shoply-update-password"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  requiredMark={false}
                  autoComplete="off"
                  className="shoply-password-form"
                >
                  <Item
                    name="currentPassword"
                    label="Current password"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your current password.',
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined />}
                      placeholder="Enter current password"
                      autoComplete="current-password"
                    />
                  </Item>

                  <Item
                    name="password"
                    label="New password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a new password.',
                      },
                      {
                        min: 6,
                        message: 'Password must contain at least 6 characters.',
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={<KeyOutlined />}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                  </Item>

                  <Item
                    name="confirm"
                    label="Confirm new password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your new password.',
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
                      size="large"
                      prefix={<KeyOutlined />}
                      placeholder="Re-enter new password"
                      autoComplete="new-password"
                    />
                  </Item>

                  <div className="shoply-password-form-actions">
                    <Button
                      className="shoply-password-back-button"
                      icon={<ArrowLeftOutlined />}
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Back to dashboard
                    </Button>

                    <Button
                      className="shoply-password-submit-button"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      icon={<KeyOutlined />}
                      loading={updatePasswordInProgress}
                    >
                      Update password
                    </Button>
                  </div>
                </Form>
              </section>

              <aside className="shoply-password-guidelines">
                <Text className="shoply-password-section-label">
                  PASSWORD GUIDELINES
                </Text>

                <Title level={4} className="shoply-password-guidelines-title">
                  A little extra security goes a long way.
                </Title>

                <Paragraph className="shoply-password-guidelines-description">
                  Choose a password that is difficult for others to guess and
                  easy for you to manage securely.
                </Paragraph>

                <Divider className="shoply-password-guidelines-divider" />

                <div className="shoply-password-guideline">
                  <span className="shoply-password-guideline-number">01</span>
                  <div>
                    <Text className="shoply-password-guideline-title">
                      Use at least 6 characters
                    </Text>
                    <Text className="shoply-password-guideline-text">
                      A longer password is generally harder to guess.
                    </Text>
                  </div>
                </div>

                <div className="shoply-password-guideline">
                  <span className="shoply-password-guideline-number">02</span>
                  <div>
                    <Text className="shoply-password-guideline-title">
                      Make it unique
                    </Text>
                    <Text className="shoply-password-guideline-text">
                      Avoid reusing a password from another account.
                    </Text>
                  </div>
                </div>

                <div className="shoply-password-guideline">
                  <span className="shoply-password-guideline-number">03</span>
                  <div>
                    <Text className="shoply-password-guideline-title">
                      Keep it private
                    </Text>
                    <Text className="shoply-password-guideline-text">
                      Never share your password or store it in plain text.
                    </Text>
                  </div>
                </div>

                <div className="shoply-password-security-note">
                  <SafetyCertificateOutlined />
                  <Text>
                    Your password update is handled by your existing account
                    authentication flow.
                  </Text>
                </div>
              </aside>
            </div>

            <footer className="shoply-password-footer">
              <Text>SHOPLY ADMINISTRATION</Text>
              <Text>ACCOUNT SECURITY</Text>
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Password;
