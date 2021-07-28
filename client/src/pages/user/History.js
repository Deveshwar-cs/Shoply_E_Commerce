import { Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const History = () => {
  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            User History
          </Title>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
          <Text>User History Page</Text>
        </Col>
      </Row>
    </>
  );
};

export default History;
