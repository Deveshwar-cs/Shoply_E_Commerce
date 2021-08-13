import { Layout, Typography } from 'antd';

import AdminNav from '../../components/nav/AdminNav';

const { Header, Content } = Layout;
const { Title } = Typography;

const CategoryCreate = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin Category Create Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            Category Create Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryCreate;
