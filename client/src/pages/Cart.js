import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
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
              <Title level={3}>Products in Cart</Title>
            </Col>
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Title level={3}>Order Summary</Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
