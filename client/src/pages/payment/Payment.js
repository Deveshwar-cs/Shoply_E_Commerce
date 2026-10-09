import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../../components/forms/CheckoutForm/CheckoutForm';

import './Payment.css';

// Make sure loadStripe is called outside the component
// so the Stripe object is not recreated on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <main className="payment-page">
      {/* ============================
          HEADER
      ============================ */}

      <section className="payment-header">
        <div className="payment-header-inner">
          <div className="payment-header-label">
            <span className="payment-header-line"></span>
            <span>SHOPLY / PAYMENT</span>
          </div>

          <div className="payment-header-content">
            <div>
              <h1 className="payment-title">
                Complete
                <span> your purchase.</span>
              </h1>

              <p className="payment-description">
                Enter your card details securely to complete your order.
              </p>
            </div>

            <div className="payment-header-number">
              <strong>04</strong>
              <span>PAYMENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          PAYMENT CONTENT
      ============================ */}

      <section className="payment-content">
        <div className="payment-container">
          <div className="payment-layout">
            {/* ============================
                LEFT INFORMATION
            ============================ */}

            <div className="payment-intro">
              <span className="payment-eyebrow">SECURE CHECKOUT</span>

              <h2>
                One final
                <span> step.</span>
              </h2>

              <p>
                Your payment is processed securely through Stripe. Your card
                information is handled by Stripe and is never stored directly by
                SHOPLY.
              </p>

              <div className="payment-security">
                <div className="payment-security-number">01</div>

                <div>
                  <strong>Secure payment</strong>
                  <span>Protected by Stripe</span>
                </div>
              </div>

              <div className="payment-security">
                <div className="payment-security-number">02</div>

                <div>
                  <strong>Card protection</strong>
                  <span>Your card details stay secure</span>
                </div>
              </div>

              <div className="payment-security">
                <div className="payment-security-number">03</div>

                <div>
                  <strong>Order confirmation</strong>
                  <span>You'll be redirected after payment</span>
                </div>
              </div>
            </div>

            {/* ============================
                STRIPE FORM
            ============================ */}

            <div className="payment-card">
              <div className="payment-card-header">
                <div>
                  <span className="payment-eyebrow">PAYMENT DETAILS</span>

                  <h2>
                    Card
                    <span> payment.</span>
                  </h2>
                </div>

                <span className="payment-card-number">04</span>
              </div>

              <div className="payment-card-body">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Payment;
