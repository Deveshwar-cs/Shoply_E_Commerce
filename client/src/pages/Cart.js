import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, List, Button, Image } from 'antd';

const { Title, Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const listItemsData =
    items.map((item) => ({
      title: item.title,
      imgUrl: item.images[0].url,
      price: item.price,
      quantity: item.quantity,
    })) || [];
  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#ffffb8',
              fontSize: 30,
            }}
          >
            Cart
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 20, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
        >
          <Row>
            <Col
              xl={{ span: 16 }}
              lg={{ span: 16 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>{totalQuantity} Products in Cart</Title>
              </Row>
              <Row>
                {items.length === 0 && (
                  <Text style={{ fontSize: 20, margin: '20px 0' }}>
                    No products in cart.{' '}
                    <Link to="/shop">Continue shopping.</Link>
                  </Text>
                )}
              </Row>
            </Col>
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>Order Summary</Title>
              </Row>
              <hr />
              <Row>
                <List
                  itemLayout="vertical"
                  dataSource={listItemsData}
                  renderItem={(item) => (
                    <List.Item>
                      <Text strong style={{ display: 'block' }}>
                        {item.title}
                      </Text>
                      <Text style={{ display: 'block' }}>
                        Quantity: {item.quantity}
                      </Text>
                      <Text style={{ display: 'block' }}>
                        Price: ${item.price}
                      </Text>
                    </List.Item>
                  )}
                />
              </Row>
              <hr />
              <Row>
                <Text strong style={{ fontSize: 20 }}>
                  Total price: ${totalPrice}
                </Text>
              </Row>
              <Row style={{ marginTop: 40 }}>
                {user ? (
                  <Button type="primary" size="large">
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button type="primary" size="large">
                    <Link to="/login">Login to Checkout</Link>
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
