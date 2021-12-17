import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Spin } from 'antd';

import UserNav from '../../components/nav/UserNav';
import OrderHistoryCard from '../../components/cards/OrderHistoryCard';

import { getAllOrdersByUserAction } from '../../store/actions/orderActions';

const { Header, Content } = Layout;
const { Title } = Typography;

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allOrdersByUser, getAllOrdersByUserInProgress } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersByUserAction(user.token));
  }, [user.token, dispatch]);

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            User History Page
          </Title>
        </Header>
        <Layout hasSider>
          <UserNav />
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
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
