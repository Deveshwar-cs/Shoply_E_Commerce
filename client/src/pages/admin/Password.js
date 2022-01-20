import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Form, Input, Button, Grid, Space, notification } from 'antd';
import { Layout, Typography } from 'antd';
import { KeyOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';
import MobileSideDrawer from '../../components/drawer/MobileSideDrawer';

import { updatePassword } from '../../store/actions/authActions';
import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Item } = Form;
const { useBreakpoint } = Grid;

const Password = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const { updatePasswordInProgress } = useSelector((state) => state.auth);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinish = ({ currentPassword, password: newPassword }) => {
    // simple validation
    if (newPassword.length < 6) {
      notification.error({
        message: `Password must be at least 6 characters!`,
      });
      return;
    }
    dispatch(updatePassword(currentPassword, newPassword));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const resetPasswordForm = () => (
    <Form
      {...formItemLayout}
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
      initialValues={{
        email: form.email,
      }}
    >
      <Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: 'Please input your current password!',
          },
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Enter your current password"
          autoFocus
        />
      </Item>
      <Item
        name="password"
        label="New Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Enter your new password" size="large" />
      </Item>
      <Item
        name="confirm"
        label="Confirm New Password"
        dependencies={['password']}
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
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Confirm your new password" size="large" />
      </Item>
      <Item {...tailFormItemLayout}>
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          size="large"
          block
          icon={<KeyOutlined />}
          loading={updatePasswordInProgress}
          htmlType="submit"
        >
          Update Password
        </Button>
      </Item>
    </Form>
  );

  return (
    <>
      <Layout>
        <Header>
          <Space direction="horizontal" size="middle">
            {!screens.md && (
              <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                size="large"
                onClick={showMobileMenuDrawer}
              />
            )}
            <Title
              level={2}
              style={{ color: 'white', marginTop: '10px', fontSize: 18 }}
            >
              User Password Page
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <AdminNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <AdminNav />}
          <Content style={{ backgroundColor: 'white' }}>
            <>
              <Row>
                <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
                  <Title level={2} style={{ marginTop: 40 }}>
                    Update Password
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
                  {resetPasswordForm()}
                </Col>
              </Row>
            </>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Password;
