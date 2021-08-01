import { Layout, Typography } from 'antd';

import UserNav from '../../components/nav/UserNav';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

const History = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            History Page
          </Title>
        </Header>
        <Layout hasSider>
          <UserNav />
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default History;
