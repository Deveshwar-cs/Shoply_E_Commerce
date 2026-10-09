import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout, Typography, Spin, Button, Grid, Breadcrumb } from 'antd';

import { PlusOutlined, ShoppingOutlined } from '@ant-design/icons';

import AdminNav from '../../../../components/nav/AdminNav/AdminNav';
import AdminProductCard from '../../../../components/cards/AdminProductCard/AdminProductCard';
import MobileSideDrawer from '../../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  getAllProductsAction,
  clearAllProducts,
} from '../../../../store/actions/productActions';

import './AllProducts.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const {
    getProductsInProgress,
    allProducts = [],
    deleteProductInProgress,
  } = useSelector((state) => state.product);

  const isLoading = getProductsInProgress || deleteProductInProgress;

  useEffect(() => {
    dispatch(getAllProductsAction(20));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearAllProducts());
    };
  }, [dispatch]);

  return (
    <Layout className="shoply-all-products-page">
      <Layout className="shoply-all-products-body">
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-all-products-content">
          <div className="shoply-all-products-main">
            <Breadcrumb
              className="shoply-all-products-breadcrumb"
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
                { title: 'Products' },
              ]}
            />

            <div className="shoply-all-products-intro">
              <div>
                <Text className="shoply-all-products-eyebrow">
                  YOUR STORE INVENTORY
                </Text>

                <Title level={1} className="shoply-all-products-title">
                  All products.
                </Title>

                <Text className="shoply-all-products-description">
                  Manage your catalog, review product details, and keep your
                  store up to date.
                </Text>
              </div>

              <Button
                className="shoply-all-products-add-button"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/admin/product')}
              >
                Add product
              </Button>
            </div>

            <div className="shoply-all-products-toolbar">
              <div>
                <Text className="shoply-all-products-section-label">
                  PRODUCT CATALOG
                </Text>

                <Text className="shoply-all-products-count">
                  {allProducts.length}{' '}
                  {allProducts.length === 1 ? 'product' : 'products'}
                </Text>
              </div>

              <Text className="shoply-all-products-limit">
                Showing up to 20 products
              </Text>
            </div>

            {isLoading ? (
              <div className="shoply-all-products-loading">
                <Spin size="large" />
                <Text>Loading your catalog…</Text>
              </div>
            ) : allProducts.length > 0 ? (
              <div className="shoply-all-products-grid">
                {allProducts.map((product) => (
                  <div
                    className="shoply-all-products-grid-item"
                    key={product._id}
                  >
                    <AdminProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="shoply-all-products-empty">
                <div className="shoply-all-products-empty-icon">
                  <ShoppingOutlined />
                </div>

                <Title level={4}>Your catalog is empty</Title>

                <Text>
                  Add your first product to start building your store.
                </Text>

                <Button
                  className="shoply-all-products-add-button"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/admin/product')}
                >
                  Create your first product
                </Button>
              </div>
            )}

            <div className="shoply-all-products-footer">
              <Text>SHOPLY ADMINISTRATION</Text>
              <Text>Product catalog</Text>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AllProducts;
