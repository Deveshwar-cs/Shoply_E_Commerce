import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Spin, Grid, Button, Space } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import UserNav from '../../components/nav/UserNav';
import OrderHistoryCard from '../../components/cards/OrderHistoryCard';
import MobileSideDrawer from '../../components/drawer/MobileSideDrawer';

import { getAllOrdersByUserAction } from '../../store/actions/orderActions';
import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allOrdersByUser, getAllOrdersByUserInProgress } = useSelector(
    (state) => state.order
  );
  const screens = useBreakpoint();
  useEffect(() => {
    dispatch(getAllOrdersByUserAction(user.token));
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
              User History Page
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <UserNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <UserNav />}
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col lg={{ span: 16, offset: 4 }} xs={{ span: 20, offset: 2 }}>
                <Title level={2} style={{ marginTop: 40 }}>
                  {allOrdersByUser && allOrdersByUser.length
                    ? 'User purchase orders'
                    : 'No purchase orders'}
                </Title>
                {getAllOrdersByUserInProgress ? (
                  <div style={{ width: 40, margin: '100px auto' }}>
                    <Spin size="large" />
                  </div>
                ) : (
                  allOrdersByUser &&
                  allOrdersByUser.map((order) => (
                    <OrderHistoryCard order={order} key={order._id} />
                  ))
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default History;
