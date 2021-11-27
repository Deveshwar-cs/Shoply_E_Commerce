import { useEffect, useState } from 'react';
import { Card, Badge, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import defaultImage from '../../images/placeholder.png';
import RatingAverage from './RatingAverage';
import { addToCart } from '../../store/actions/cartActions';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { ratings, price, title, images, slug, _id, description } = product;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // product quantity in cart
  const [itemQuantityInCart, setItemQuantityInCart] = useState(0);

  useEffect(() => {
    const cartItem = items.find((item) => item._id === _id);
    if (cartItem) setItemQuantityInCart(cartItem.cartQuantity);
  }, [items]);

  const handleAddToCart = (product) => {
    if (itemQuantityInCart >= product.quantity)
      return message.warning(`There are no more items in stock!`);
    dispatch(addToCart(product));
  };
  return (
    <>
      <RatingAverage ratings={ratings} />
      <Card
        bordered
        size="small"
        extra={
          <span
            style={{ fontSize: 20, fontWeight: 'bold' }}
          >{`Price: $${price}`}</span>
        }
        cover={
          <img
            alt={title}
            src={images && images.length ? images[0].url : defaultImage}
            style={{ objectFit: 'cover', height: 200 }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined style={{ color: '#69c0ff' }} /> <br />
            View Product
          </Link>,
          <Badge count={itemQuantityInCart}>
            <a onClick={() => handleAddToCart(product)}>
              <ShoppingCartOutlined style={{ color: '#73d13d' }} />
              <br /> Add to Cart
            </a>
          </Badge>,
        ]}
      >
        <Meta
          title={title}
          description={description && `${description.substring(0, 175)} ...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
