import { Link } from 'react-router-dom';
import { Typography, Row, Col, Space, Button, Input, Divider } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Checkout = () => {
  //

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
              backgroundColor: '#b5f5ec',
              fontSize: 30,
            }}
          >
            Checkout
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 22, offset: 1 }}
          md={{ span: 22, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Row gutter={[16, 16]}>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}> Deliver Address</Title>
              </Row>
              <Row>
                <Space direction="vertical" size={30} style={{ width: '100%' }}>
                  <TextArea
                    rows={4}
                    placeholder="Please enter your shipping address"
                  />
                  <Button type="primary">Save address</Button>
                </Space>
              </Row>
              <Divider />
              <Row>
                <Title level={3}>Got Coupon?</Title>
              </Row>
              <Space direction="vertical" size={30} style={{ width: '100%' }}>
                <Input placeholder="Paste coupon here if you have one" />
                <Button type="primary">Apply coupon</Button>
              </Space>
            </Col>
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>Order Summary</Title>
              </Row>
              <hr />
              <Row>Products</Row>
              <hr />
              <Row>List o products</Row>
              <hr />
              <Row>Cart total: $x</Row>
              <hr />

              <Row style={{ marginBottom: 30 }}>
                <Space
                  direction="horizontal"
                  size={20}
                  style={{ width: '100%' }}
                  align="center"
                >
                  <Button type="primary">Place Order</Button>
                  <Button type="primary">Empty Cart</Button>
                </Space>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
