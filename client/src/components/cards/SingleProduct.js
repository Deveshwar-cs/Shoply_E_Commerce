import { useEffect, useState } from 'react';
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
  Button,
  Space,
} from 'antd';

import {
  HeartOutlined,
  ShoppingCartOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import ProductInfoList from './ProductInfoList';
import Placeholder from '../../images/placeholder.png';
import RatingModal from '../modal/RatingModal';
import RatingAverage from './RatingAverage';

import { addToCart } from '../../store/actions/cartActions';
import { setCartDrawerVisability } from '../../store/actions/drawerActions';
import {
  addProductToWishlistAction,
  getWishlistAction,
} from '../../store/actions/wishlistActions';

const { Title } = Typography;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, price, description, ratings, _id, quantity } = product;

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart.cart);
  const { user } = useSelector((state) => state.auth);
  const { addToWishlistInProgress, wishlist, getWishlistInProgress } =
    useSelector((state) => state.wishlist);

  // product quantity in cart
  const [itemQuantityInCart, setItemQuantityInCart] = useState(0);

  useEffect(() => {
    const cartItem = items.find((item) => item._id === _id);
    if (cartItem) setItemQuantityInCart(cartItem.cartQuantity);
  }, [items, _id]);

  useEffect(() => {
    if (user) dispatch(getWishlistAction(user.token));
  }, [user, dispatch]);

  const handleAddToCart = (product) => {
    if (itemQuantityInCart >= product.quantity)
      return message.warning(`There are no more items in stock!`);
    dispatch(addToCart(product));
    dispatch(setCartDrawerVisability(true));
  };

  const handleAddToWishlist = (product) => {
    if (!user)
      return message.error('Please login to add the product to wishlist!');
    dispatch(addProductToWishlistAction(product._id, user.token)).then(() =>
      dispatch(getWishlistAction(user.token))
    );
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
              <Space direction="vertical">
                <Badge count={itemQuantityInCart}>
                  <ShoppingCartOutlined
                    style={{ color: '#73d13d', fontSize: 26 }}
                  />
                </Badge>
                <Button
                  type="link"
                  onClick={() => handleAddToCart(product)}
                  disabled={quantity === 0}
                >
                  <span style={{ color: quantity === 0 && '#ff4d4f' }}>
                    {quantity === 0 ? 'Out of stock' : 'Add to Cart'}
                  </span>
                </Button>
              </Space>,

              <Space direction="vertical">
                {getWishlistInProgress ? (
                  <LoadingOutlined style={{ color: '#69c0ff', fontSize: 26 }} />
                ) : (
                  <HeartOutlined style={{ color: '#69c0ff', fontSize: 26 }} />
                )}
                <Button
                  type="link"
                  onClick={() => handleAddToWishlist(product)}
                  style={{ marginBottom: '3px' }}
                  disabled={wishlist.some((item) => item._id === product._id)}
                  loading={addToWishlistInProgress}
                >
                  {wishlist.some((item) => item._id === product._id)
                    ? 'In wishlist'
                    : 'Add to Wishlist'}
                </Button>
              </Space>,
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
