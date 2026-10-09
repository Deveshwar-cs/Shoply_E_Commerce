import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import CartTable from '../../components/tables/cartTable/CartTable';
import ConfirmationModal from '../../components/modal/confirmationModal/ConfirmationModal';
import Placeholder from '../../images/placeholder.png';

import {
  clearCart,
  createCartAction,
  emptyCartInDBAction,
} from '../../store/actions/cartActions';

import { setCashOnDelivery } from '../../store/actions/cashOnDeliveryActions';

import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { cart, createCartInProgress } = useSelector((state) => state.cart);

  const { items, totalQuantity, totalPrice } = cart;

  // Loading state for checkout buttons
  const [paymentOption, setPaymentOption] = useState('');

  // Confirmation popup state
  const [confirmation, setConfirmation] = useState({
    open: false,
    type: '',
    title: '',
    description: '',
    confirmText: 'Confirm',
  });

  // ============================
  // CART SUMMARY ITEMS
  // ============================

  const listItemsData =
    items.map((item) => ({
      title: item.title,
      imgUrl: item.images.length ? item.images[0].url : Placeholder,
      price: item.price,
      cartQuantity: item.cartQuantity,
    })) || [];

  // ============================
  // OPEN CONFIRMATION POPUP
  // ============================

  const saveOrderToDB = () => {
    setConfirmation({
      open: true,
      type: 'card',
      title: 'Proceed to checkout',
      description:
        'Your cart is ready. Continue to the checkout page to complete your order using card payment.',
      confirmText: 'Continue to checkout',
    });
  };

  // ============================
  // CASH ON DELIVERY
  // ============================

  const saveCashOnDeliveryOrderToDB = () => {
    setConfirmation({
      open: true,
      type: 'cash',
      title: 'Cash on delivery',
      description:
        'Continue to checkout with cash on delivery selected as your payment method.',
      confirmText: 'Continue',
    });
  };

  // ============================
  // REMOVE ALL PRODUCTS
  // ============================

  const removeAllFromCart = () => {
    setConfirmation({
      open: true,
      type: 'remove',
      title: 'Empty your cart',
      description:
        'This will remove every product from your shopping bag. This action cannot be undone.',
      confirmText: 'Remove all',
    });
  };

  // ============================
  // CLOSE CONFIRMATION POPUP
  // ============================

  const closeConfirmation = () => {
    if (createCartInProgress) {
      return;
    }

    setConfirmation({
      open: false,
      type: '',
      title: '',
      description: '',
      confirmText: 'Confirm',
    });
  };

  // ============================
  // CONFIRM POPUP ACTION
  // ============================

  const confirmAction = () => {
    // ============================
    // CARD CHECKOUT
    // ============================

    if (confirmation.type === 'card') {
      setPaymentOption('card');

      dispatch(setCashOnDelivery(false));

      console.log('🔥 STARTING CREATE CART');

      dispatch(createCartAction(cart, user.token))
        .then((response) => {
          console.log('🔥 CREATE CART RESPONSE:', response);
          console.log('🔥 RESPONSE.OK:', response?.ok);
          console.log('🔥 BEFORE NAVIGATION');

          if (response?.ok === true) {
            console.log('🔥 NAVIGATING TO CHECKOUT');

            closeConfirmation();

            navigate('/checkout');
          }
        })
        .catch((error) => {
          console.log('🔥 CHECKOUT CART SAVE ERROR:', error);

          closeConfirmation();
        });

      return;
    }

    // ============================
    // CASH ON DELIVERY CHECKOUT
    // ============================

    if (confirmation.type === 'cash') {
      setPaymentOption('cash');

      dispatch(setCashOnDelivery(true));

      console.log('🔥 STARTING CREATE CASH CART');

      dispatch(createCartAction(cart, user.token))
        .then((response) => {
          console.log('🔥 CREATE CASH CART RESPONSE:', response);
          console.log('🔥 RESPONSE.OK:', response?.ok);
          console.log('🔥 BEFORE CASH NAVIGATION');

          if (response?.ok === true) {
            console.log('🔥 NAVIGATING TO CHECKOUT');

            closeConfirmation();

            navigate('/checkout');
          }
        })
        .catch((error) => {
          console.log('🔥 CASH CHECKOUT CART SAVE ERROR:', error);

          closeConfirmation();
        });

      return;
    }

    // ============================
    // REMOVE ALL PRODUCTS
    // ============================

    if (confirmation.type === 'remove') {
      console.log('🔥 STARTING EMPTY CART');

      dispatch(emptyCartInDBAction(user.token))
        .then(() => {
          console.log('🔥 CART EMPTIED');

          dispatch(clearCart());

          closeConfirmation();
        })
        .catch((error) => {
          console.log('🔥 EMPTY CART ERROR:', error);

          closeConfirmation();
        });
    }
  };

  // ============================
  // UI
  // ============================

  return (
    <main className="cart-page">
      {/* ============================
          HEADER
      ============================ */}

      <section className="cart-header">
        <div className="cart-header-inner">
          <div className="cart-header-label">
            <span className="cart-header-line"></span>

            <span>SHOPLY / SHOPPING BAG</span>
          </div>

          <div className="cart-header-content">
            <div>
              <h1 className="cart-title">
                Your
                <span> cart.</span>
              </h1>

              <p className="cart-description">
                Review your selection and complete your purchase when you're
                ready.
              </p>
            </div>

            <div className="cart-header-count">
              <strong>{String(totalQuantity).padStart(2, '0')}</strong>

              <span>{totalQuantity === 1 ? 'ITEM' : 'ITEMS'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          CART CONTENT
      ============================ */}

      <section className="cart-content">
        <div className="cart-container">
          <div className="cart-main">
            {/* ============================
                PRODUCTS
            ============================ */}

            <div className="cart-products">
              <div className="cart-section-header">
                <div>
                  <span className="cart-eyebrow">YOUR SELECTION</span>

                  <h2>
                    Shopping
                    <span> bag.</span>
                  </h2>
                </div>

                <span className="cart-section-count">
                  {totalQuantity} PRODUCTS
                </span>
              </div>

              {/* EMPTY CART */}

              {items.length === 0 ? (
                <div className="cart-empty">
                  <span className="cart-empty-label">YOUR BAG IS EMPTY</span>

                  <h3>
                    Nothing here
                    <span> yet.</span>
                  </h3>

                  <p>Discover something you'll love from our collection.</p>

                  <Link to="/shop" className="cart-shop-link">
                    <span>Continue shopping</span>

                    <span>↗</span>
                  </Link>
                </div>
              ) : (
                <div className="cart-table-wrapper">
                  <CartTable items={items} />
                </div>
              )}
            </div>

            {/* ============================
                ORDER SUMMARY
            ============================ */}

            <aside className="cart-summary">
              <div className="cart-summary-header">
                <div>
                  <span className="cart-eyebrow">ORDER</span>

                  <h2>Summary</h2>
                </div>

                <span className="cart-summary-number">02</span>
              </div>

              {/* SUMMARY ITEMS */}

              <div className="cart-summary-items">
                {listItemsData.map((item, index) => (
                  <div
                    className="cart-summary-item"
                    key={`${item.title}-${index}`}
                  >
                    <div className="cart-summary-item-image">
                      <img src={item.imgUrl} alt={item.title} />
                    </div>

                    <div className="cart-summary-item-info">
                      <strong>{item.title}</strong>

                      <span>Qty. {item.cartQuantity}</span>
                    </div>

                    <div className="cart-summary-item-price">${item.price}</div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}

              <div className="cart-summary-total">
                <span>TOTAL</span>

                <strong>${totalPrice}</strong>
              </div>

              {/* ============================
                  CHECKOUT
              ============================ */}

              <div className="cart-checkout">
                {user ? (
                  <>
                    {/* CARD CHECKOUT */}

                    <button
                      type="button"
                      className="cart-checkout-primary"
                      disabled={!items.length || createCartInProgress}
                      onClick={saveOrderToDB}
                    >
                      <span>
                        {paymentOption === 'card' && createCartInProgress
                          ? 'Preparing checkout...'
                          : 'Proceed to checkout'}
                      </span>

                      <span>↗</span>
                    </button>

                    {/* CASH ON DELIVERY */}

                    <button
                      type="button"
                      className="cart-checkout-secondary"
                      disabled={!items.length || createCartInProgress}
                      onClick={saveCashOnDeliveryOrderToDB}
                    >
                      {paymentOption === 'cash' && createCartInProgress
                        ? 'Preparing...'
                        : 'Pay cash on delivery'}
                    </button>
                  </>
                ) : (
                  /* LOGIN */

                  <Link
                    to="/login"
                    state={{
                      from: 'cart',
                    }}
                    className="cart-checkout-primary"
                  >
                    <span>Login to checkout</span>

                    <span>↗</span>
                  </Link>
                )}
              </div>

              {/* ============================
                  REMOVE ALL
              ============================ */}

              {items.length > 0 && (
                <button
                  type="button"
                  className="cart-remove-all"
                  disabled={createCartInProgress}
                  onClick={removeAllFromCart}
                >
                  Remove all products
                </button>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ============================
          CONFIRMATION POPUP
      ============================ */}

      <ConfirmationModal
        open={confirmation.open}
        title={confirmation.title}
        description={confirmation.description}
        confirmText={confirmation.confirmText}
        cancelText="Cancel"
        onConfirm={confirmAction}
        onCancel={closeConfirmation}
        loading={createCartInProgress}
      />
    </main>
  );
};

export default Cart;
