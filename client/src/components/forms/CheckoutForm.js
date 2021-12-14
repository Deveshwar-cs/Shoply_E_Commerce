import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Spin, Typography, notification, Card, Space } from 'antd';

import { CheckOutlined, DollarCircleOutlined } from '@ant-design/icons';

import { createPaymentIntent } from '../../functions/stripeFunctions';
import { createOrderAction } from '../../store/actions/orderActions';
import { getCartAction } from '../../store/actions/cartActions';

const { Text } = Typography;

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { cartFromDB, getCartFromDBInProgress, cart } = useSelector(
    (state) => state.cart
  );

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isLoadingClientSecret, setIsLoadingClientSecret] = useState(false); // show spinner when get client secret

  // data from createPaymentIntent request (it not necessary because we have all data in cartFromDB already)
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
  const [toPay, setToPay] = useState(0);

  const stripe = useStripe();
  const elements = useElements(); // through elements we can get access to card element

  useEffect(() => {
    // if purchase succeeded we don't want to redirect immediately (or make request to get cart from DB) even with empty cart
    if (succeeded) return;
    dispatch(getCartAction(user.token)).then((data) => {
      // if the user somehow got to the '/payment' page with empty cart in the DB or redux store (for example typed manually the url in the search bar) – redirect user to the '/shop' page
      if (!cart.items.length || data.cartIsEmpty) history.push('/shop');
    });
  }, [user.token, dispatch, cart, history, succeeded]);

  useEffect(() => {
    let componentMounted = true;

    if (cartFromDB) {
      if (!componentMounted) return;
      setTotalPrice(cartFromDB.totalPrice);
      setToPay(cartFromDB.totalPriceAfterDiscount || cartFromDB.totalPrice);
      setTotalPriceAfterDiscount(cartFromDB.totalPriceAfterDiscount);
    }

    return () => {
      componentMounted = false;
    };
  }, [cartFromDB]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    try {
      // Create payment intent on the server
      setIsLoadingClientSecret(true);
      const clientSecretResponse = await createPaymentIntent(user.token);

      if (clientSecretResponse.data.client_secret.length > 0) {
        setIsLoadingClientSecret(false);
      }

      // Confirm the payment on the cleint
      setProcessing(true);
      const paymentIntent = await stripe.confirmCardPayment(
        clientSecretResponse.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: e.target.name.value,
            },
          },
        }
      );

      if (paymentIntent.error) {
        setError(paymentIntent.error.message);
        setProcessing(false);
      } else {
        // if success
        // create order and save it in DB for admin to process
        dispatch(createOrderAction(paymentIntent, user.token));
        // empty user cart in redux store and localStorage
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        notification.success({
          message: `Payment successful!`,
        });
      }
    } catch (error) {
      console.log('PAYMENT ERROR ===>', error);
    }
  };

  const handleChange = (e) => {
    // listen for changes in the card element
    // and display any errors when customer type invalid card ditails
    setDisabled(e.empty); // disable Pay button if got errors
    setError(e.error ? e.error.message : ''); // show error message
  };

  // CardElement options
  const cardElementsOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    //hidePostalCode: true,
  };

  return getCartFromDBInProgress ? (
    <div style={{ width: 40, margin: '100px auto' }}>
      <Spin size="large" />
    </div>
  ) : (
    <>
      {!succeeded && (
        <div
          style={{
            textAlign: 'center',
            margin: '20px auto',
            backgroundColor: totalPriceAfterDiscount ? '#f6ffed' : '#fff1f0',
            padding: '20px 0',
          }}
        >
          {cartFromDB && cartFromDB.totalPriceAfterDiscount ? (
            <Text strong type="success" style={{ fontSize: 20 }}>
              Total after discount: ${totalPriceAfterDiscount}
            </Text>
          ) : (
            <Text strong style={{ fontSize: 20, color: '#cf1322' }}>
              No coupon applied!
            </Text>
          )}
        </div>
      )}
      <div style={{ textAlign: 'center', margin: '20px auto' }}>
        <Card title="Purchase details">
          <Space
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Space style={{ fontSize: 20 }} direction="vertical">
              <DollarCircleOutlined style={{ color: '#73d13d' }} />
              <Text>Total: ${totalPrice}</Text>
            </Space>
            <Space style={{ fontSize: 20 }} direction="vertical">
              <CheckOutlined style={{ color: '#73d13d' }} />
              <Text>Total to pay: ${toPay}</Text>
            </Space>
          </Space>
        </Card>
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardElementsOptions}
          onChange={handleChange}
        />
        <button
          disabled={processing || disabled || succeeded || !stripe || !elements}
          className="stripe-button"
        >
          <span id="button-text">
            {processing || isLoadingClientSecret ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {error && (
          <div id="card-error" role="alert">
            {error}
          </div>
        )}
        <div
          className={succeeded ? 'result-message' : 'result-message hidden'}
          style={{ textAlign: 'center', margin: '20px 0' }}
        >
          <Text type="success" style={{ fontSize: 20 }}>
            Payment successful!{' '}
            <Link to="/user/history">See it in your purchase history.</Link>
          </Text>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
