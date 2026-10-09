import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout, Typography, Button, Grid, Breadcrumb, Space } from 'antd';

import {
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  EditOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../../components/nav/AdminNav/AdminNav';
import ProductUpdateForm from '../../../../components/forms/ProductUpdateForm';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import { setMobileDrawerVisability } from '../../../../store/actions/drawerActions';

import './ProductUpdate.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProductUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  return (
    <Layout className="shoply-update-page">
      <Header className="shoply-update-header">
        <div className="shoply-update-header__inner">
          <Space size="middle" align="center">
            {!screens.md && (
              <Button
                className="shoply-update-menu-btn"
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={showMobileMenuDrawer}
                aria-label="Open admin navigation"
              />
            )}

            <div className="shoply-update-brand">
              <span className="shoply-update-brand__name">SHOPLY</span>
              <span className="shoply-update-brand__divider">/</span>
              <span className="shoply-update-brand__label">ADMIN</span>
            </div>
          </Space>

          <Text className="shoply-update-header__status">
            PRODUCT MANAGEMENT
          </Text>
        </div>
      </Header>

      <Layout className="shoply-update-layout">
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-update-content">
          <div className="shoply-update-container">
            <Breadcrumb
              className="shoply-update-breadcrumb"
              items={[
                {
                  title: (
                    <span
                      className="shoply-update-breadcrumb__link"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Dashboard
                    </span>
                  ),
                },
                {
                  title: (
                    <span
                      className="shoply-update-breadcrumb__link"
                      onClick={() => navigate('/admin/allproducts')}
                    >
                      Products
                    </span>
                  ),
                },
                {
                  title: 'Edit product',
                },
              ]}
            />

            <section className="shoply-update-intro">
              <div className="shoply-update-intro__text">
                <Text className="shoply-update-eyebrow">
                  CATALOGUE / PRODUCT DETAILS
                </Text>

                <Title className="shoply-update-title" level={1}>
                  Edit product.
                </Title>

                <Text className="shoply-update-subtitle">
                  Refine your product information, images, and details.
                </Text>
              </div>

              <Button
                className="shoply-update-back-btn"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/allproducts')}
              >
                All products
              </Button>
            </section>

            <div className="shoply-update-section-heading">
              <div>
                <EditOutlined className="shoply-update-section-icon" />
                <Title level={4}>Product information</Title>
              </div>

              <Text>Update the details below and save your changes.</Text>
            </div>

            <section className="shoply-update-form-card">
              <ProductUpdateForm />
            </section>

            <footer className="shoply-update-footer">
              <span>SHOPLY / ADMINISTRATION</span>
              <span>PRODUCT MANAGEMENT</span>
            </footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductUpdate;
