import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import { sendEmail } from '../../store/actions/authActions';

const { Title, Text } = Typography;
const { Item } = Form;

const Register = ({ history }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isAuthenticated, sendEmailInProgress } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) return history.push('/');
  }, [history, isAuthenticated]);

  // submit user email and get link to complete registration via email
  // const submitEmail = async (email) => {
  //   const config = {
  //     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  //     handleCodeInApp: true,
  //   };

  //   await auth.sendSignInLinkToEmail(email, config);

  //   toast.success(
  //     `Email is sent to ${email}. Click the link to complete your registration.`
  //   );

  //   // Save user email in localStorage
  //   window.localStorage.setItem('emailForRegistration', email);
  //   // Claer input from email
  //   form.resetFields();
  // };

  const onFinish = ({ email }) => {
    dispatch(sendEmail(email));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const registerForm = () => (
    <Form
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
          placeholder="Enter your email and check inbox"
          size="large"
          autoFocus
        />
      </Item>
      <Button
        type="primary"
        style={{ marginTop: 10 }}
        size="large"
        icon={<MailOutlined />}
        block
        loading={sendEmailInProgress}
        htmlType="submit"
      >
        Send Email
      </Button>
    </Form>
  );

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            Register
          </Title>
          <Text>Please send a registration link to a valid email!</Text>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          {registerForm()}
        </Col>
      </Row>
    </>
  );
};

export default Register;
