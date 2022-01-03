import { useDispatch } from 'react-redux';

import {
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Space,
  Button,
  Grid,
} from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import MobileSideDrawer from '../../../components/drawer/MobileSideDrawer';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

// This component is only markup, all logic in ProductCreateForm. Maybe it's a not good practice
const ProductCreate = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();

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
              Admin Create Product Page
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
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Product
                </Title>
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>
                  Create new product
                </Divider>
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <ProductCreateForm />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ProductCreate;
