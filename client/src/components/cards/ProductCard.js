import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import defaultImage from '../../images/placeholder.png';
import {
  deleteProductAction,
  getAllProductsAction,
} from '../../store/actions/productActions';

const { Meta } = Card;

const ProductCard = ({ title, images, description, slug, price }) => {
  return (
    <Card
      bordered
      size="small"
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
  );
};

export default ProductCard;
