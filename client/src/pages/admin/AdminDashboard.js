import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col } from 'antd';

import AdminNav from '../../components/nav/AdminNav';

import { getAllOrdersByAdminAction } from '../../store/actions/orderActions';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allOrdersByAdmin, getAllOrdersInProgress } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersByAdminAction(user.token));
  }, [user.token, dispatch]);

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
                <br />
                All orders:{' '}
                {getAllOrdersInProgress ? (
                  <span>LOADING ...</span>
                ) : (
                  allOrdersByAdmin.length
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
