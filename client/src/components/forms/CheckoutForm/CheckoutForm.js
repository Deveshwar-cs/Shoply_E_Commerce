import { useState, useEffect } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Spin, Typography, notification } from 'antd';

import { CheckOutlined, DollarCircleOutlined } from '@ant-design/icons';

import { createPaymentIntent } from '../../../functions/stripeFunctions';

import { createOrderAction } from '../../../store/actions/orderActions';

import './CheckoutForm.css';

const { Text } = Typography;

const CheckoutForm = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { cartFromDB, getCartFromDBInProgress } = useSelector(
    (state) => state.cart
  );

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [isLoadingClientSecret, setIsLoadingClientSecret] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
  const [toPay, setToPay] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  // ============================
  // UPDATE PAYMENT TOTALS
  // ============================

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

  // ============================
  // SUBMIT PAYMENT
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // ============================
      // CREATE PAYMENT INTENT
      // ============================

      setIsLoadingClientSecret(true);

      const clientSecretResponse = await createPaymentIntent(user.token);

      if (clientSecretResponse.data.client_secret.length > 0) {
        setIsLoadingClientSecret(false);
      }

      // ============================
      // CONFIRM PAYMENT
      // ============================

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

      // ============================
      // PAYMENT ERROR
      // ============================

      if (paymentIntent.error) {
        setError(paymentIntent.error.message);
        setProcessing(false);
      } else {
        // ============================
        // PAYMENT SUCCESS
        // ============================

        // Create order and save it in DB
        dispatch(createOrderAction(paymentIntent, user.token));

        setError(null);
        setProcessing(false);
        setSucceeded(true);

        notification.success({
          message: 'Payment successful!',
        });
      }
    } catch (error) {
      console.log('PAYMENT ERROR ===>', error);
      setIsLoadingClientSecret(false);
      setProcessing(false);
    }
  };

  // ============================
  // CARD CHANGE
  // ============================

  const handleChange = (e) => {
    setDisabled(e.empty);

    setError(e.error ? e.error.message : '');
  };

  // ============================
  // CARD ELEMENT OPTIONS
  // ============================

  const cardElementsOptions = {
    style: {
      base: {
        color: '#171717',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '15px',

        '::placeholder': {
          color: '#999791',
        },
      },

      invalid: {
        color: '#b42318',
        iconColor: '#b42318',
      },
    },
  };

  // ============================
  // LOADING
  // ============================

  if (getCartFromDBInProgress) {
    return (
      <div className="checkout-form-loading">
        <Spin size="large" />

        <span>Loading payment details...</span>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      {/* ============================
          DISCOUNT STATUS
      ============================ */}

      {!succeeded && (
        <div
          className={
            totalPriceAfterDiscount
              ? 'checkout-form-discount success'
              : 'checkout-form-discount warning'
          }
        >
          <div className="checkout-form-discount-icon">
            {totalPriceAfterDiscount ? (
              <CheckOutlined />
            ) : (
              <DollarCircleOutlined />
            )}
          </div>

          <div className="checkout-form-discount-content">
            <span className="checkout-form-discount-label">
              {totalPriceAfterDiscount ? 'DISCOUNT APPLIED' : 'NO DISCOUNT'}
            </span>

            <strong>
              {totalPriceAfterDiscount
                ? `Total after discount: $${totalPriceAfterDiscount}`
                : 'No coupon applied'}
            </strong>
          </div>
        </div>
      )}

      {/* ============================
          PURCHASE DETAILS
      ============================ */}

      <div className="checkout-form-details">
        <div className="checkout-form-details-header">
          <span>PURCHASE DETAILS</span>
          <span>01</span>
        </div>

        <div className="checkout-form-total-row">
          <div className="checkout-form-total-label">
            <div className="checkout-form-icon">
              <DollarCircleOutlined />
            </div>

            <div>
              <span>ORDER TOTAL</span>
              <strong>${totalPrice}</strong>
            </div>
          </div>

          <div className="checkout-form-total-label">
            <div className="checkout-form-icon">
              <CheckOutlined />
            </div>

            <div>
              <span>AMOUNT TO PAY</span>
              <strong>${toPay}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ============================
          PAYMENT FORM
      ============================ */}

      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="checkout-form-payment"
      >
        <div className="checkout-form-field">
          <label htmlFor="name">CARDHOLDER NAME</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter cardholder name"
            required
            disabled={processing || succeeded}
          />
        </div>

        <div className="checkout-form-field">
          <label>CARD DETAILS</label>

          <div className="checkout-form-card-element">
            <CardElement
              id="card-element"
              options={cardElementsOptions}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ============================
            ERROR
        ============================ */}

        {error && (
          <div id="card-error" className="checkout-form-error" role="alert">
            {error}
          </div>
        )}

        {/* ============================
            PAY BUTTON
        ============================ */}

        <button
          type="submit"
          disabled={processing || disabled || succeeded || !stripe || !elements}
          className="checkout-form-pay-button"
        >
          <span>
            {processing || isLoadingClientSecret
              ? 'Processing payment...'
              : succeeded
              ? 'Payment completed'
              : `Pay $${toPay}`}
          </span>

          {!processing && !isLoadingClientSecret && (
            <span className="checkout-form-pay-arrow">↗</span>
          )}

          {(processing || isLoadingClientSecret) && (
            <span className="checkout-form-spinner"></span>
          )}
        </button>

        {/* ============================
            SUCCESS
        ============================ */}

        {succeeded && (
          <div className="checkout-form-success">
            <div className="checkout-form-success-icon">
              <CheckOutlined />
            </div>

            <div>
              <strong>Payment successful</strong>

              <span>Your order has been created successfully.</span>

              <Link to="/user/history">See your purchase history ↗</Link>
            </div>
          </div>
        )}
      </form>

      {/* ============================
          SECURITY NOTE
      ============================ */}

      {!succeeded && (
        <div className="checkout-form-security">
          <span className="checkout-form-security-dot"></span>

          <span>Secure payment powered by Stripe</span>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
