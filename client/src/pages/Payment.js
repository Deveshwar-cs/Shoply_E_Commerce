import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Button, Modal } from 'antd';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../stripe.css';

import { DeleteTwoTone } from '@ant-design/icons';
import CheckoutForm from '../components/forms/CheckoutForm';

import { getCartAction } from '../store/actions/cartActions';

const { Title, Text } = Typography;
const { confirm } = Modal;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartFromDB, getCartFromDBInProgress } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCartAction(user.token));
  }, []);
  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#ffffb8',
              fontSize: 30,
            }}
          >
            Payment
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 8, offset: 8 }}
          lg={{ span: 22, offset: 1 }}
          md={{ span: 22, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Title
            level={3}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
            }}
          >
            Complete your purchase
          </Title>
          <Elements stripe={stripePromise}>
            <CheckoutForm cartFromDB={cartFromDB} />
          </Elements>
        </Col>
      </Row>
    </>
  );
};

export default Payment;
