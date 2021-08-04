import { Layout, Typography } from 'antd';

import UserNav from '../../components/nav/UserNav';

const { Header, Content } = Layout;
const { Title } = Typography;

const Wishlist = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            User Wishlist Page
          </Title>
        </Header>
        <Layout hasSider>
          <UserNav />
          <Content style={{ backgroundColor: 'white' }}>
            Wishlist Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Wishlist;
