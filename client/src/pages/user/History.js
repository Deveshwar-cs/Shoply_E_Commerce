import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography } from 'antd';

import UserNav from '../../components/nav/UserNav';

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
            History Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default History;
