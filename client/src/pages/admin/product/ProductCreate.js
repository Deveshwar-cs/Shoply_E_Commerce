import { Layout, Typography, Divider, Row, Col } from 'antd';

import AdminNav from '../../../components/nav/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';

const { Header, Content } = Layout;
const { Title } = Typography;

// This component is only markup, all logic in ProductCreateForm. Maybe it's a not good practice
const ProductCreate = () => (
  <>
    <Layout>
      <Header>
        <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
          Admin Create Product Page
        </Title>
      </Header>
      <Layout hasSider>
        <AdminNav />
        <Content style={{ backgroundColor: 'white' }}>
          <Row>
            <Col
              xl={{ span: 10, offset: 7 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Title level={2} style={{ marginTop: 40 }}>
                Create New Product
              </Title>
            </Col>
          </Row>
          <Row>
            <Col
              xl={{ span: 10, offset: 7 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Divider style={{ fontWeight: 'bold' }}>
                Create new product
              </Divider>
            </Col>
          </Row>
          <Row>
            <Col
              xl={{ span: 10, offset: 7 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 20, offset: 2 }}
            >
              <ProductCreateForm />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  </>
);

export default ProductCreate;
