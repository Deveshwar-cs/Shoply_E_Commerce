import { Link } from 'react-router-dom';

import { Row, Col, Card } from 'antd';

import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

  return (
    <Row>
      <Col
        xl={{ span: 16 }}
        lg={{ span: 16 }}
        md={{ span: 24 }}
        xs={{ span: 24 }}
      >
        Product Images
      </Col>
      <Col
        xl={{ span: 8 }}
        lg={{ span: 8 }}
        md={{ span: 24 }}
        xs={{ span: 24 }}
      >
        <Card
          actions={[
            <>
              <ShoppingCartOutlined style={{ color: '#73d13d' }} />
              <br /> Add to Cart
            </>,
            <Link to={`/`}>
              <HeartOutlined style={{ color: '#69c0ff' }} /> <br />
              Add to Wishlist
            </Link>,
            <>
              <StarOutlined style={{ color: '#ff7a45' }} />
              <br /> Leave Rating
            </>,
          ]}
        >
          <Meta title={title} description={description} />
        </Card>
      </Col>
    </Row>
  );
};

export default SingleProduct;
