import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import defaultImage from '../../images/placeholder.png';
import RatingAverage from './RatingAverage';

const { Meta } = Card;

const ProductCard = ({ title, images, description, slug, ratings, price }) => {
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
          <>
            <ShoppingCartOutlined style={{ color: '#73d13d' }} />
            <br /> Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={description && `${description.substring(0, 200)} ...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
