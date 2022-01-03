import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Spin, Space, Button, Grid } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';
import AdminOrderList from '../../components/order/AdminOrderList';
import MobileSideDrawer from '../../components/drawer/MobileSideDrawer';

import { getAllOrdersByAdminAction } from '../../store/actions/orderActions';
import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const { user } = useSelector((state) => state.auth);
  const { allOrdersByAdmin, getAllOrdersInProgress } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersByAdminAction(user.token));
  }, [user.token, dispatch]);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };
  return (
    <>
      <Layout>
        <Header>
          <Space direction="horizontal" size="middle">
            {!screens.md && (
              <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                size="large"
                onClick={showMobileMenuDrawer}
              />
            )}
            <Title
              level={2}
              style={{ color: 'white', marginTop: '10px', fontSize: 18 }}
            >
              Admin Dashboard Page
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <AdminNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <AdminNav />}
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
                <Title level={2} style={{ marginTop: 40 }}>
                  All orders
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
