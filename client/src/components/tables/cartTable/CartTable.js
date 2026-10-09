import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  removeProductFromCartDB,
  updateProductCartQuantityAction,
} from '../../../store/actions/cartActions';

import ConfirmationModal from '../../modal/confirmationModal/ConfirmationModal';
import Placeholder from '../../../images/placeholder.png';

import './CartTable.css';

const CartTable = ({ items }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [removingProductId, setRemovingProductId] = useState(null);

  // ============================
  // CONFIRMATION POPUP
  // ============================

  const [confirmation, setConfirmation] = useState({
    open: false,
    productId: null,
    productTitle: '',
  });

  // ============================
  // OPEN DELETE CONFIRMATION
  // ============================

  const handleDeleteConfirm = (id, title) => {
    setConfirmation({
      open: true,
      productId: id,
      productTitle: title,
    });
  };

  // ============================
  // CLOSE DELETE CONFIRMATION
  // ============================

  const closeConfirmation = () => {
    if (removingProductId) {
      return;
    }

    setConfirmation({
      open: false,
      productId: null,
      productTitle: '',
    });
  };

  // ============================
  // DELETE PRODUCT
  // ============================

  const confirmDelete = () => {
    const { productId } = confirmation;

    if (!productId) {
      return;
    }

    setRemovingProductId(productId);

    dispatch(removeProductFromCartDB(productId, user.token))
      .then(() => {
        setRemovingProductId(null);

        setConfirmation({
          open: false,
          productId: null,
          productTitle: '',
        });
      })
      .catch((error) => {
        console.log('🔥 REMOVE PRODUCT ERROR:', error);

        setRemovingProductId(null);

        setConfirmation({
          open: false,
          productId: null,
          productTitle: '',
        });
      });
  };

  // ============================
  // UPDATE QUANTITY
  // ============================

  const onChangeProductCount = (quantity, id) => {
    if (!quantity) {
      return;
    }

    dispatch(updateProductCartQuantityAction(id, quantity, user.token));
  };

  // ============================
  // DECREASE QUANTITY
  // ============================

  const decreaseQuantity = (item) => {
    if (item.cartQuantity <= 1) {
      return;
    }

    onChangeProductCount(item.cartQuantity - 1, item._id);
  };

  // ============================
  // INCREASE QUANTITY
  // ============================

  const increaseQuantity = (item) => {
    if (item.cartQuantity >= item.quantity) {
      return;
    }

    onChangeProductCount(item.cartQuantity + 1, item._id);
  };

  // ============================
  // EMPTY STATE
  // ============================

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="cart-table">
        {/* =================================
            DESKTOP HEADER
        ================================= */}

        <div className="cart-table-header">
          <span className="cart-table-header-product">PRODUCT</span>

          <span>PRICE</span>

          <span>BRAND</span>

          <span>QUANTITY</span>

          <span>SHIPPING</span>

          <span></span>
        </div>

        {/* =================================
            PRODUCTS
        ================================= */}

        <div className="cart-table-items">
          {items.map((item, index) => {
            const imageUrl =
              item.images && item.images.length > 0
                ? item.images[0].url
                : Placeholder;

            const isAtMaxQuantity = item.cartQuantity >= item.quantity;

            const isRemoving = removingProductId === item._id;

            return (
              <article className="cart-table-row" key={item._id}>
                {/* ===========================
                    PRODUCT
                =========================== */}

                <div className="cart-table-product">
                  <div className="cart-table-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <Link
                    to={`/product/${item.slug}`}
                    className="cart-table-image"
                  >
                    <img src={imageUrl} alt={item.title} />
                  </Link>

                  <div className="cart-table-product-info">
                    <Link
                      to={`/product/${item.slug}`}
                      className="cart-table-title"
                    >
                      {item.title}
                    </Link>

                    <span className="cart-table-mobile-brand">
                      {item.brand}
                    </span>
                  </div>
                </div>

                {/* ===========================
                    PRICE
                =========================== */}

                <div className="cart-table-price" data-label="PRICE">
                  ${item.price}
                </div>

                {/* ===========================
                    BRAND
                =========================== */}

                <div className="cart-table-brand" data-label="BRAND">
                  {item.brand}
                </div>

                {/* ===========================
                    QUANTITY
                =========================== */}

                <div className="cart-table-quantity" data-label="QUANTITY">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => decreaseQuantity(item)}
                    disabled={item.cartQuantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="quantity-value">{item.cartQuantity}</span>

                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => increaseQuantity(item)}
                    disabled={isAtMaxQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* ===========================
                    SHIPPING
                =========================== */}

                <div className="cart-table-shipping" data-label="SHIPPING">
                  <span
                    className={
                      item.shipping === 'Yes'
                        ? 'shipping-status available'
                        : 'shipping-status unavailable'
                    }
                  >
                    <span className="shipping-dot"></span>

                    {item.shipping === 'Yes' ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* ===========================
                    REMOVE
                =========================== */}

                <div className="cart-table-remove">
                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => handleDeleteConfirm(item._id, item.title)}
                    disabled={isRemoving}
                    aria-label={`Remove ${item.title}`}
                  >
                    {isRemoving ? '...' : 'Remove'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* =================================
          DELETE CONFIRMATION POPUP
      ================================= */}

      <ConfirmationModal
        open={confirmation.open}
        title="Remove product"
        description={`Remove "${confirmation.productTitle}" from your shopping bag?`}
        confirmText="Remove product"
        cancelText="Keep product"
        onConfirm={confirmDelete}
        onCancel={closeConfirmation}
        loading={Boolean(removingProductId)}
      />
    </>
  );
};

export default CartTable;
