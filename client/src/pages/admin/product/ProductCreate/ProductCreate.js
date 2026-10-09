import { useDispatch } from 'react-redux';
import { Layout, Typography, Button, Grid, Space, Breadcrumb } from 'antd';

import {
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import AdminNav from '../../../../components/nav/AdminNav/AdminNav';
import ProductCreateForm from '../../../../components/forms/ProductCreateForm';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import './ProductCreate.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProductCreate = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <Layout className="shoply-product-create-page">
      <Layout className="shoply-product-create-body">
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-product-create-content">
          <div className="shoply-product-create-main">
            <Breadcrumb
              className="shoply-product-create-breadcrumb"
              items={[
                {
                  title: (
                    <button
                      type="button"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      Dashboard
                    </button>
                  ),
                },
                {
                  title: 'Products',
                },
                {
                  title: 'Create product',
                },
              ]}
            />

            <div className="shoply-product-create-intro">
              <div>
                <Text className="shoply-product-create-eyebrow">
                  CATALOG MANAGEMENT
                </Text>

                <Title level={1} className="shoply-product-create-title">
                  Create a product.
                </Title>

                <Text className="shoply-product-create-description">
                  Add a new item to your store catalog. Complete the product
                  details below before publishing it to SHOPLY.
                </Text>
              </div>

              <Button
                className="shoply-product-create-back"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/allproducts')}
              >
                All products
              </Button>
            </div>

            <div className="shoply-product-create-section-heading">
              <div className="shoply-product-create-section-icon">
                <FileAddOutlined />
              </div>

              <div>
                <Title
                  level={4}
                  className="shoply-product-create-section-title"
                >
                  Product information
                </Title>

                <Text className="shoply-product-create-section-description">
                  Enter the details customers will see in your store.
                </Text>
              </div>
            </div>

            <div className="shoply-product-create-form-card">
              <ProductCreateForm />
            </div>

            <div className="shoply-product-create-footer">
              <Text>SHOPLY ADMINISTRATION</Text>
              <Text>Product catalog</Text>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductCreate;
