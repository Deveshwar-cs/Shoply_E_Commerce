import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Spin, Typography, notification } from 'antd';

import { createPaymentIntent } from '../../functions/stripeFunctions';

const { Text } = Typography;

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(''); // store client secret
  const [isLoadingClientSecret, setIsLoadingClientSecret] = useState(false); // show spinner when get client secret

  const stripe = useStripe();
  const elements = useElements(); // through elements we can get access to card element

  useEffect(() => {
    let componentMounted = true;

    setIsLoadingClientSecret(true);

    createPaymentIntent(user.token)
      .then((res) => {
        console.log('createPaymentIntent res.data ===>', res.data);
        if (!componentMounted) return;
        setClientSecret(res.data.client_secret);
        setIsLoadingClientSecret(false);
      })
      .catch((error) => {
        setIsLoadingClientSecret(false);
        console.log(error);
      });

    return () => {
      componentMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setProcessing(true);

    const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    console.log('paymentIntent ===>', paymentIntent);

    if (paymentIntent.error) {
      setError(paymentIntent.error.message);
      setProcessing(false);
    } else {
      // if success
      // create order and save it in DB for admin to process
      // empty user cart in redux store and localStorage
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      notification.success({
        message: `Payment successful!`,
      });
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

  return isLoadingClientSecret ? (
    <div style={{ width: 40, margin: '100px auto' }}>
      <Spin size="large" />
    </div>
  ) : (
    <>
      <div
        className={succeeded ? 'result-message' : 'result-message hidden'}
        style={{ textAlign: 'center', marginBottom: 20 }}
      >
        <Text type="success">
          Payment successful!{' '}
          <Link to="/user/history">See it in your purchase history.</Link>
        </Text>
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
            {processing ? (
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
      </form>
    </>
  );
};

export default CheckoutForm;
