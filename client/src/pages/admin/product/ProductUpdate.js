import { Layout, Typography, Divider, Row, Col } from 'antd';

import AdminNav from '../../../components/nav/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';

const { Header, Content } = Layout;
const { Title } = Typography;

const ProductUpdate = ({ match }) => (
  <>
    <Layout>
      <Header>
        <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
          Admin Update Product Page
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
                Update Product
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
              <Divider style={{ fontWeight: 'bold' }}>Update product</Divider>
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

export default ProductUpdate;
