import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Spin } from 'antd';

import AdminNav from '../../components/nav/AdminNav';
import AdminOrderList from '../../components/order/AdminOrderList';

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
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
                <Title level={2} style={{ marginTop: 40 }}>
                  All products
                </Title>
              </Col>
            </Row>

            <Row>
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
                {getAllOrdersInProgress ? (
                  <div style={{ width: 40, margin: '100px auto' }}>
                    <Spin size="large" />
                  </div>
                ) : (
                  <AdminOrderList orders={allOrdersByAdmin} />
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
