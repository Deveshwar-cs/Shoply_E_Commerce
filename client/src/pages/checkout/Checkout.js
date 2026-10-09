import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import {
  PercentageOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { notification, message, Spin } from 'antd';

import {
  getCartAction,
  emptyCartInDBAction,
  clearCart,
  saveUserAddressAction,
  getShippingAddressAction,
  applyCouponAction,
} from '../../store/actions/cartActions';

import { createOrderCashPaymentAction } from '../../store/actions/orderActions';

import ConfirmationModal from '../../components/modal/confirmationModal/ConfirmationModal';

import placeholder from '../../images/placeholder.png';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    cartFromDB,
    getCartFromDBInProgress,
    shippingAddress,
    applyCouponInProgress,
    cart,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const { cashOnDelivery } = useSelector((state) => state.COD);

  // ============================
  // SHIPPING ADDRESS
  // ============================

  const [textAreaValue, setTextAreaValue] = useState('');

  // ============================
  // COUPON
  // ============================

  const [coupon, setCoupon] = useState('');

  // ============================
  // CONFIRMATION POPUP
  // ============================

  const [confirmation, setConfirmation] = useState({
    open: false,
    type: '',
  });

  // ============================
  // GET CART
  // ============================

  useEffect(() => {
    dispatch(getCartAction(user.token));
  }, [user.token, dispatch]);

  // ============================
  // CHECK EMPTY CART
  // ============================

  useEffect(() => {
    if (cashOnDelivery) {
      return;
    }

    if (!cart.items.length) {
      navigate('/shop');
    }
  }, [cart, cashOnDelivery, navigate]);

  // ============================
  // GET SHIPPING ADDRESS
  // ============================

  useEffect(() => {
    dispatch(getShippingAddressAction(user.token));
  }, [user.token, dispatch]);

  // ============================
  // UPDATE ADDRESS VALUE
  // ============================

  useEffect(() => {
    setTextAreaValue(shippingAddress);
  }, [shippingAddress]);

  // ============================
  // OPEN EMPTY CART POPUP
  // ============================

  const emptyUserCartHandler = () => {
    setConfirmation({
      open: true,
      type: 'empty-cart',
    });
  };

  // ============================
  // CLOSE POPUP
  // ============================

  const closeConfirmation = () => {
    if (getCartFromDBInProgress) {
      return;
    }

    setConfirmation({
      open: false,
      type: '',
    });
  };

  // ============================
  // CONFIRM EMPTY CART
  // ============================

  const confirmEmptyCart = () => {
    dispatch(emptyCartInDBAction(user.token))
      .then(() => {
        dispatch(clearCart());

        closeConfirmation();

        navigate('/shop');
      })
      .catch((error) => {
        console.log('🔥 EMPTY CART ERROR:', error);

        closeConfirmation();
      });
  };

  // ============================
  // TEXTAREA
  // ============================

  const onTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  // ============================
  // COUPON INPUT
  // ============================

  const onChangeCoupon = (e) => {
    setCoupon(e.target.value);
  };

  // ============================
  // SAVE ADDRESS
  // ============================

  const saveUserAddress = () => {
    if (textAreaValue.length < 10) {
      return notification.warning({
        message: "Please enter your correct shipping address. It's required!",
      });
    }

    if (textAreaValue === shippingAddress) {
      return message.info(
        'You tried to save the same shipping address! Change it if you need.'
      );
    }

    dispatch(saveUserAddressAction(textAreaValue, user.token)).then(() =>
      dispatch(getShippingAddressAction(user.token))
    );
  };

  // ============================
  // APPLY COUPON
  // ============================

  const applyCouponHandler = () => {
    if (!coupon.length) {
      return notification.warning({
        message: 'Please enter your coupon if you have one!',
      });
    }

    dispatch(applyCouponAction(coupon, user.token));
  };

  // ============================
  // CREATE ORDER
  // ============================

  const createOrder = () => {
    if (cashOnDelivery) {
      dispatch(createOrderCashPaymentAction(cashOnDelivery, user.token)).then(
        (orderCreated) => {
          if (orderCreated) {
            navigate('/user/history');
          }
        }
      );
    } else {
      navigate('/payment');
    }
  };

  // ============================
  // PRODUCT COUNT
  // ============================

  const totalProducts =
    cartFromDB?.products?.reduce((sum, product) => sum + product.quantity, 0) ||
    0;

  // ============================
  // EMPTY STATE
  // ============================

  if (!cartFromDB) {
    return (
      <main className="checkout-page checkout-loading">
        <Spin size="large" />
      </main>
    );
  }

  return (
    <main className="checkout-page">
      {/* ============================
          HEADER
      ============================ */}

      <section className="checkout-header">
        <div className="checkout-header-inner">
          <div className="checkout-header-label">
            <span className="checkout-header-line"></span>

            <span>SHOPLY / CHECKOUT</span>
          </div>

          <div className="checkout-header-content">
            <div>
              <h1 className="checkout-title">
                Complete
                <span> your order.</span>
              </h1>

              <p className="checkout-description">
                Confirm your delivery details, review your order, and choose
                your payment method.
              </p>
            </div>

            <div className="checkout-header-count">
              <strong>{String(totalProducts).padStart(2, '0')}</strong>

              <span>{totalProducts === 1 ? 'PRODUCT' : 'PRODUCTS'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          CHECKOUT CONTENT
      ============================ */}

      <section className="checkout-content">
        <div className="checkout-container">
          <div className="checkout-grid">
            {/* ============================
                LEFT COLUMN
            ============================ */}

            <div className="checkout-left">
              {/* ============================
                  SHIPPING ADDRESS
              ============================ */}

              <section className="checkout-section">
                <div className="checkout-section-header">
                  <div>
                    <span className="checkout-eyebrow">01 / DELIVERY</span>

                    <h2>
                      Delivery
                      <span> address.</span>
                    </h2>
                  </div>

                  <HomeOutlined className="checkout-section-icon" />
                </div>

                <p className="checkout-section-description">
                  Where should we deliver your order?
                </p>

                <div className="checkout-address">
                  <textarea
                    rows="5"
                    placeholder="Enter your complete shipping address..."
                    value={textAreaValue}
                    onChange={onTextAreaChange}
                  />

                  <div className="checkout-address-footer">
                    <span>Minimum 10 characters</span>

                    <button
                      type="button"
                      className="checkout-save-button"
                      onClick={saveUserAddress}
                    >
                      <span>Save address</span>

                      <HomeOutlined />
                    </button>
                  </div>
                </div>

                {shippingAddress && (
                  <div className="checkout-address-status">
                    <span className="checkout-status-dot"></span>

                    <span>Saved delivery address available</span>
                  </div>
                )}
              </section>

              {/* ============================
                  COUPON
              ============================ */}

              <section className="checkout-section checkout-coupon-section">
                <div className="checkout-section-header">
                  <div>
                    <span className="checkout-eyebrow">02 / SAVINGS</span>

                    <h2>
                      Got a<span> coupon?</span>
                    </h2>
                  </div>

                  <PercentageOutlined className="checkout-section-icon" />
                </div>

                <p className="checkout-section-description">
                  Have a discount code? Apply it before placing your order.
                </p>

                <div className="checkout-coupon">
                  <input
                    type="text"
                    placeholder={
                      cartFromDB.totalPriceAfterDiscount
                        ? 'Coupon already applied'
                        : 'Paste coupon code here'
                    }
                    value={coupon}
                    onChange={onChangeCoupon}
                    disabled={Boolean(cartFromDB.totalPriceAfterDiscount)}
                  />

                  <button
                    type="button"
                    onClick={applyCouponHandler}
                    disabled={
                      Boolean(cartFromDB.totalPriceAfterDiscount) ||
                      applyCouponInProgress
                    }
                  >
                    <span>
                      {applyCouponInProgress ? 'Applying...' : 'Apply'}
                    </span>

                    <PercentageOutlined />
                  </button>
                </div>

                {cartFromDB.totalPriceAfterDiscount && (
                  <div className="checkout-discount-message">
                    <span className="checkout-status-dot"></span>

                    <span>Coupon applied successfully</span>
                  </div>
                )}
              </section>
            </div>

            {/* ============================
                RIGHT COLUMN
            ============================ */}

            <aside className="checkout-summary">
              <div className="checkout-summary-header">
                <div>
                  <span className="checkout-eyebrow">03 / ORDER</span>

                  <h2>
                    Order
                    <span> summary.</span>
                  </h2>
                </div>

                <span className="checkout-summary-number">
                  {String(totalProducts).padStart(2, '0')}
                </span>
              </div>

              {/* ============================
                  LOADING
              ============================ */}

              {getCartFromDBInProgress ? (
                <div className="checkout-summary-loading">
                  <Spin size="large" />

                  <span>Loading your order...</span>
                </div>
              ) : (
                <>
                  {/* ============================
                      PRODUCTS
                  ============================ */}

                  <div className="checkout-products">
                    {cartFromDB.products.map((item, index) => {
                      const imageUrl = item.product?.images?.length
                        ? item.product.images[0].url
                        : placeholder;

                      return (
                        <div
                          className="checkout-product"
                          key={
                            item.product?._id ||
                            `${item.product?.title}-${index}`
                          }
                        >
                          <div className="checkout-product-number">
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          <div className="checkout-product-image">
                            <img
                              src={imageUrl}
                              alt={item.product?.title || 'Product'}
                            />
                          </div>

                          <div className="checkout-product-info">
                            <strong>{item.product?.title || 'Product'}</strong>
                            <span>Qty. {item.quantity}</span>
                          </div>

                          <div className="checkout-product-price">
                            ${item.quantity * item.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ============================
                      TOTALS
                  ============================ */}

                  <div className="checkout-totals">
                    <div className="checkout-total-row">
                      <span>Products</span>

                      <span>{totalProducts}</span>
                    </div>

                    <div className="checkout-total-row">
                      <span>Cart total</span>

                      <strong>${cartFromDB.totalPrice}</strong>
                    </div>

                    {cartFromDB.totalPriceAfterDiscount && (
                      <div className="checkout-total-row checkout-discount-row">
                        <span>After discount</span>

                        <strong>${cartFromDB.totalPriceAfterDiscount}</strong>
                      </div>
                    )}
                  </div>

                  {/* ============================
                      FINAL TOTAL
                  ============================ */}

                  <div className="checkout-final-total">
                    <span>TOTAL</span>

                    <strong>
                      $
                      {cartFromDB.totalPriceAfterDiscount ||
                        cartFromDB.totalPrice}
                    </strong>
                  </div>

                  {/* ============================
                      PAYMENT
                  ============================ */}

                  <div className="checkout-payment">
                    <div className="checkout-payment-label">PAYMENT METHOD</div>

                    <div className="checkout-payment-method">
                      <span className="checkout-payment-dot"></span>

                      <div>
                        <strong>
                          {cashOnDelivery ? 'Cash on delivery' : 'Card payment'}
                        </strong>

                        <span>
                          {cashOnDelivery
                            ? 'Pay when your order arrives'
                            : 'Secure online payment'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ============================
                      ACTIONS
                  ============================ */}

                  <div className="checkout-actions">
                    <button
                      type="button"
                      className="checkout-place-order"
                      disabled={
                        shippingAddress.length < 10 ||
                        !cartFromDB.products.length
                      }
                      onClick={createOrder}
                    >
                      <span>
                        {cashOnDelivery ? 'Place order' : 'Continue to payment'}
                      </span>

                      <DollarCircleOutlined />
                    </button>

                    <button
                      type="button"
                      className="checkout-empty-cart"
                      disabled={!cartFromDB.products.length}
                      onClick={emptyUserCartHandler}
                    >
                      <ShoppingCartOutlined />

                      <span>Empty cart</span>
                    </button>
                  </div>

                  <Link to="/shop" className="checkout-continue-shopping">
                    ← Continue shopping
                  </Link>
                </>
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
        title="Remove this order"
        description="This will remove all products from your current cart and take you back to the shop."
        confirmText="Empty cart"
        cancelText="Keep order"
        onConfirm={confirmEmptyCart}
        onCancel={closeConfirmation}
        loading={getCartFromDBInProgress}
      />
    </main>
  );
};

export default Checkout;
