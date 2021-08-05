import { Layout, Typography } from 'antd';

// import UserNav from '../../components/nav/UserNav';

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
          {/* <UserNav /> */}
          <Content style={{ backgroundColor: 'white' }}>
            Dashboard Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
