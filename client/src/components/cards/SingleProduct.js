import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  Card,
  Carousel,
  Image,
  Typography,
  Tabs,
  message,
  Badge,
} from 'antd';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import ProductInfoList from './ProductInfoList';
import Placeholder from '../../images/placeholder.png';
import RatingModal from '../modal/RatingModal';
import RatingAverage from './RatingAverage';

import { addToCart } from '../../store/actions/cartActions';

const { Title } = Typography;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, price, description, ratings, _id } = product;

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // product quantity in cart
  const [itemQuantityInCart, setItemQuantityInCart] = useState(0);

  useEffect(() => {
    const cartItem = items.find((item) => item._id === _id);
    if (cartItem) setItemQuantityInCart(cartItem.quantity);
  }, [items]);

  const handleAddToCart = (product) => {
    if (itemQuantityInCart >= 3)
      return message.warning(`Limit: 3 product at once!`);
    dispatch(addToCart(product));
  };

  return (
    <>
      <Row style={{ marginTop: 16 }}>
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
          <RatingAverage ratings={ratings} />
          <Card
            actions={[
              <Badge count={itemQuantityInCart}>
                <a onClick={() => handleAddToCart(product)}>
                  <ShoppingCartOutlined style={{ color: '#73d13d' }} />
                  <br /> Add to Cart
                </a>
              </Badge>,
              <Link to={`/`}>
                <HeartOutlined style={{ color: '#69c0ff' }} /> <br />
                Add to Wishlist
              </Link>,
              <>
                <RatingModal />
              </>,
            ]}
          >
            <ProductInfoList product={product} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs type="card">
            <TabPane
              tab="Description"
              key="1"
              style={{ maxWidth: '100%', padding: 8 }}
            >
              {description}
            </TabPane>
            <TabPane
              tab="More"
              key="2"
              style={{ maxWidth: '100%', padding: 8 }}
            >
              More static content about product, ordering, shipping etc.
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default SingleProduct;
