import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';

import { createPaymentIntent } from '../../functions/stripeFunctions';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [proccesing, setProccesing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token)
      .then((res) => {
        console.log('createPaymentIntent res.data ===>', res.data);
        setClientSecret(res.data.client_secret);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMIT CARD DATA');
  };

  const handleChange = (e) => {
    console.log('onChange ===>', e);
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

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardElementsOptions}
        onChange={handleChange}
      />
      <button
        disabled={proccesing || !stripe || !elements}
        className="stripe-button"
      >
        <span id="button-text">
          {proccesing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
