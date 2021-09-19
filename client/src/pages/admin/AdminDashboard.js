import { Layout, Typography, Row, Col } from 'antd';

import AdminNav from '../../components/nav/AdminNav';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin Dashboard Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col
                xl={{ span: 20, offset: 2 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  All products
                </Title>
              </Col>
            </Row>

            <Row>
              <Col
                xl={{ span: 20, offset: 2 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                Admin Dashboard page content
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
