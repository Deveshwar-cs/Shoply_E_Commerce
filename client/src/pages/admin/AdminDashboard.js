import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Divider, Row, Col } from 'antd';

import AdminNav from '../../components/nav/AdminNav';
import AdminProductCard from '../../components/cards/AdminProductCard';
import { getAllProductsAction } from '../../store/actions/productActions';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const { getProductsInProgress, allProducts } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAction(20));
  }, []);

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
                <Row gutter={[16, 16]}>
                  {allProducts.map((product) => (
                    <Col span={8} key={product._id}>
                      <AdminProductCard {...product} />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
