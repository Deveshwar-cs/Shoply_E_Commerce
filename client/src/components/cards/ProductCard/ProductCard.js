import { useEffect, useState } from 'react';

import { message } from 'antd';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import defaultImage from '../../../images/placeholder.png';

import RatingAverage from '../ratingAverage/RatingAverage';

import { addToCart } from '../../../store/actions/cartActions';

import { setCartDrawerVisability } from '../../../store/actions/drawerActions';

import { createCartAction } from '../../../store/actions/cartActions';

import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { ratings, price, title, images, slug, _id, description, quantity } =
    product;

  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart.cart);

  const { cart } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  // Product quantity in cart
  const [itemQuantityInCart, setItemQuantityInCart] = useState(0);

  useEffect(() => {
    const cartItem = items.find((item) => item._id === _id);

    if (cartItem) {
      setItemQuantityInCart(cartItem.cartQuantity);
    } else {
      setItemQuantityInCart(0);
    }
  }, [items, _id]);

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

  const imageUrl = images && images.length ? images[0].url : defaultImage;

  const isOutOfStock = quantity === 0;

  return (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        <Link to={`/product/${slug}`}>
          <img src={imageUrl} alt={title} className="product-image" />
        </Link>

        {/* Stock Badge */}
        {isOutOfStock && <span className="stock-badge">Sold out</span>}

        {/* Cart Quantity */}
        {itemQuantityInCart > 0 && (
          <span className="cart-quantity-badge">
            {itemQuantityInCart} in cart
          </span>
        )}

        {/* Quick View */}
        <Link to={`/product/${slug}`} className="quick-view">
          <EyeOutlined />
          <span>Quick view</span>
        </Link>
      </div>

      {/* Product Information */}
      <div className="product-info">
        {/* Rating */}
        <div className="product-rating">
          <RatingAverage ratings={ratings} />
        </div>

        {/* Product Title */}
        <Link to={`/product/${slug}`} className="product-title">
          {title}
        </Link>

        {/* Description */}
        <p className="product-description">
          {description
            ? `${description.substring(0, 95)}...`
            : 'Discover more about this product.'}
        </p>

        {/* Bottom Row */}
        <div className="product-bottom">
          <div className="product-price">${price}</div>

          <button
            type="button"
            className={
              isOutOfStock ? 'add-cart-button disabled' : 'add-cart-button'
            }
            onClick={() => !isOutOfStock && handleAddToCart(product)}
            disabled={isOutOfStock}
          >
            <ShoppingCartOutlined />

            <span>{isOutOfStock ? 'Out of stock' : 'Add to cart'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
