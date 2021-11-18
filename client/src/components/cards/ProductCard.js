import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import defaultImage from '../../images/placeholder.png';
import RatingAverage from './RatingAverage';
import { addToCart } from '../../store/actions/cartActions';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { ratings, price, title, images, slug, _id, description } = product;
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
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
          <a onClick={() => handleAddToCart(product)}>
            <ShoppingCartOutlined style={{ color: '#73d13d' }} />
            <br /> Add to Cart
          </a>,
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
