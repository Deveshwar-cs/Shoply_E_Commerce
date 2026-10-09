import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  HeartOutlined,
  ShoppingCartOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

import { message } from 'antd';

import ProductInfoList from '../ProductionInfoList/ProductInfoList';

import Placeholder from '../../../images/placeholder.png';

import RatingModal from '../../modal/RatingModal';

import RatingAverage from '../ratingAverage/RatingAverage';

import {
  addToCart,
  createCartAction,
} from '../../../store/actions/cartActions';

import { setCartDrawerVisability } from '../../../store/actions/drawerActions';

import {
  addProductToWishlistAction,
  getWishlistAction,
} from '../../../store/actions/wishlistActions';

import './SingleProduct.css';

const SingleProduct = ({ product }) => {
  const { title, images, price, description, ratings, _id, quantity } = product;

  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart.cart);

  const { cart } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const { addToWishlistInProgress, wishlist, getWishlistInProgress } =
    useSelector((state) => state.wishlist);

  // Product quantity currently in cart
  const [itemQuantityInCart, setItemQuantityInCart] = useState(0);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const cartItem = items.find((item) => item._id === _id);

    if (cartItem) {
      setItemQuantityInCart(cartItem.cartQuantity);
    } else {
      setItemQuantityInCart(0);
    }
  }, [items, _id]);

  useEffect(() => {
    if (user) {
      dispatch(getWishlistAction(user.token));
    }
  }, [user, dispatch]);

  // Reset image when product changes
  useEffect(() => {
    setActiveImage(0);
  }, [_id]);

  const handleAddToCart = (product) => {
    if (!user) {
      return message.error('Please login to add products to cart!');
    }

    if (itemQuantityInCart >= product.quantity) {
      return message.warning('There are no more items in stock!');
    }

    const existingItem = cart.items.find((item) => item._id === product._id);

    let updatedCart;

    if (existingItem) {
      updatedCart = {
        items: cart.items.map((item) =>
          item._id === product._id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1,
              }
            : item
        ),

        totalQuantity: cart.totalQuantity + 1,

        totalPrice: cart.totalPrice + product.price,
      };
    } else {
      updatedCart = {
        items: [
          ...cart.items,
          {
            ...product,
            cartQuantity: 1,
          },
        ],

        totalQuantity: cart.totalQuantity + 1,

        totalPrice: cart.totalPrice + product.price,
      };
    }

    console.log('OLD CART:', cart);
    console.log('NEW CART:', updatedCart);

    // Update Redux
    dispatch(addToCart(product));

    // Send new cart to backend
    dispatch(createCartAction(updatedCart, user.token));

    // Open cart drawer
    dispatch(setCartDrawerVisability(true));
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      return message.error('Please login to add the product to wishlist!');
    }

    dispatch(addProductToWishlistAction(product._id, user.token)).then(() =>
      dispatch(getWishlistAction(user.token))
    );
  };

  const hasImages = images && images.length > 0;

  const currentImage = hasImages ? images[activeImage] : null;

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const isOutOfStock = quantity === 0;

  const goToPreviousImage = () => {
    if (!hasImages) return;

    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNextImage = () => {
    if (!hasImages) return;

    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="single-product">
      {/* =========================
          PRODUCT MAIN AREA
      ========================= */}

      <div className="single-product-main">
        {/* Gallery */}

        <div className="single-product-gallery">
          <div className="single-product-gallery-label">
            <span>01</span>
            <span>PRODUCT VIEW</span>
          </div>

          <div className="single-product-image-wrapper">
            {hasImages ? (
              <img
                src={currentImage.url}
                alt={title}
                className="single-product-main-image"
              />
            ) : (
              <img
                src={Placeholder}
                alt={title}
                className="single-product-main-image"
              />
            )}

            {hasImages && images.length > 1 && (
              <>
                <button
                  type="button"
                  className="single-product-image-button single-product-prev"
                  onClick={goToPreviousImage}
                  aria-label="Previous image"
                >
                  <LeftOutlined />
                </button>

                <button
                  type="button"
                  className="single-product-image-button single-product-next"
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  <RightOutlined />
                </button>
              </>
            )}

            <div className="single-product-image-counter">
              <span>{String(activeImage + 1).padStart(2, '0')}</span>

              <span>/</span>

              <span>
                {String(hasImages ? images.length : 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Thumbnails */}

          {hasImages && images.length > 1 && (
            <div className="single-product-thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image.public_id}
                  className={
                    index === activeImage
                      ? 'single-product-thumbnail active'
                      : 'single-product-thumbnail'
                  }
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image.url} alt={`${title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product information */}

        <div className="single-product-details">
          <div className="single-product-category">SHOPLY / ESSENTIAL</div>

          <h1 className="single-product-title">{title}</h1>

          <div className="single-product-rating">
            <RatingAverage ratings={ratings} />
          </div>

          <div className="single-product-price">${price}</div>

          <div className="single-product-divider"></div>

          <p className="single-product-description">{description}</p>

          {/* Stock */}

          <div className="single-product-stock">
            <span
              className={isOutOfStock ? 'stock-dot out' : 'stock-dot'}
            ></span>

            <span>{isOutOfStock ? 'Out of stock' : 'In stock'}</span>

            {!isOutOfStock && (
              <span className="stock-quantity">{quantity} available</span>
            )}
          </div>

          {/* Actions */}

          <div className="single-product-actions">
            <button
              type="button"
              className={
                isOutOfStock
                  ? 'single-product-cart disabled'
                  : 'single-product-cart'
              }
              onClick={() => !isOutOfStock && handleAddToCart(product)}
              disabled={isOutOfStock}
            >
              <ShoppingCartOutlined />

              <span>{isOutOfStock ? 'Out of stock' : 'Add to cart'}</span>

              {!isOutOfStock && itemQuantityInCart > 0 && (
                <small>{itemQuantityInCart} in cart</small>
              )}
            </button>

            <button
              type="button"
              className={
                isInWishlist
                  ? 'single-product-wishlist active'
                  : 'single-product-wishlist'
              }
              onClick={() => handleAddToWishlist(product)}
              disabled={isInWishlist || addToWishlistInProgress}
            >
              {getWishlistInProgress ? <LoadingOutlined /> : <HeartOutlined />}

              <span>{isInWishlist ? 'In wishlist' : 'Add to wishlist'}</span>
            </button>
          </div>

          {/* Rating */}

          <div className="single-product-rating-action">
            <span>SHARE YOUR EXPERIENCE</span>

            <RatingModal />
          </div>

          {/* Product info */}

          <div className="single-product-info">
            <ProductInfoList product={product} />
          </div>
        </div>
      </div>

      {/* =========================
          DESCRIPTION
      ========================= */}

      <div className="single-product-tabs">
        <div className="single-product-tab">
          <div className="single-product-tab-number">01</div>

          <div className="single-product-tab-content">
            <h2>Description</h2>

            <p>{description}</p>
          </div>
        </div>

        <div className="single-product-tab">
          <div className="single-product-tab-number">02</div>

          <div className="single-product-tab-content">
            <h2>More information</h2>

            <p>
              More static content about product, ordering, shipping and
              everything you need to know before completing your purchase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
