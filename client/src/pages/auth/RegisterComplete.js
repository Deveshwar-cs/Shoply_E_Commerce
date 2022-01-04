import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';

import { signUp } from '../../store/actions/authActions';

const { Title } = Typography;
const { Item } = Form;

const RegisterComplete = ({ history }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { signupInProgress, isAuthenticated, signupError } = useSelector(
    (state) => state.auth
  );
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const signupError = useSelector((state) => state.auth.signupError);

  // get user email from localStorage and put it to form.email
  useEffect(() => {
    form.setFieldsValue({
      email: window.localStorage.getItem('emailForRegistration'),
    });
  }, [form]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.info('You are logged in already.');
      return history.push('/');
    }

    if (signupError) {
      history.push('/register');
    }
  }, [history, signupError, isAuthenticated]);

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

  const onFinish = ({ email, password }) => {
    // simple validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(signUp(email, password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const completeRegistrationForm = () => (
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
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail again!',
          },
        ]}
      >
        <Input size="large" autoFocus />
      </Item>
      <Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Enter your password" size="large" />
      </Item>
      <Item
        name="confirm"
        label="Confirm Password"
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
        <Input.Password placeholder="Enter your password" size="large" />
      </Item>
      <Item {...tailFormItemLayout}>
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          size="large"
          htmlType="submit"
          loading={signupInProgress}
        >
          Complete Registration
        </Button>
      </Item>
    </Form>
  );

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            Register Complete
          </Title>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
          {completeRegistrationForm()}
        </Col>
      </Row>
    </>
  );
};

export default RegisterComplete;
