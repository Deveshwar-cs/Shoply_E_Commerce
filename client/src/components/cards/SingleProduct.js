import { Link } from 'react-router-dom';

import { Row, Col, Card, Carousel, Image } from 'antd';

import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';

import Placeholder from '../../images/placeholder.png';

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
        {images && images.length ? (
          <Carousel
            autoplay
            dots
            style={{
              backgroundColor: '#f5f5f5',
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
              backgroundColor: '#f5f5f5',
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
