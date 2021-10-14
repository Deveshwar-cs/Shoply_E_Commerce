import { Link } from 'react-router-dom';

import { Row, Col, Card, Carousel, Image, Typography } from 'antd';

import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';

import ProductInfoList from './ProductInfoList';
import Placeholder from '../../images/placeholder.png';

const { Title } = Typography;

const SingleProduct = ({ product }) => {
  const { title, images, price } = product;

  return (
    <Row gutter={[16]} style={{ marginTop: 16 }}>
      <Col
        xl={{ span: 16 }}
        lg={{ span: 16 }}
        md={{ span: 24 }}
        xs={{ span: 24 }}
      >
        {images && images.length ? (
          <Carousel
            autoplay
            dots
            style={{
              textAlign: 'center',
            }}
          >
            {images &&
              images.map((image) => (
                <div key={image.public_id}>
                  <Image
                    src={image.url}
                    style={{
                      objectFit: 'cover',
                      height: 450,
                    }}
                  />
                </div>
              ))}
          </Carousel>
        ) : (
          <div
            style={{
              backgroundColor: '#f1eff0',
              textAlign: 'center',
            }}
          >
            <Image
              src={Placeholder}
              preview={false}
              style={{
                objectFit: 'cover',
                height: 450,
              }}
            />
          </div>
        )}
      </Col>
      <Col
        xl={{ span: 8 }}
        lg={{ span: 8 }}
        md={{ span: 24 }}
        xs={{ span: 24 }}
      >
        <Title
          style={{ padding: 10, backgroundColor: '#d3adf7', fontSize: 26 }}
        >
          {`${title} – $${price}`}
        </Title>
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
          <ProductInfoList product={product} />
        </Card>
      </Col>
    </Row>
  );
};

export default SingleProduct;
