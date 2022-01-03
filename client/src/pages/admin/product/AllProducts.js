import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Spin, Row, Col, Space, Button, Grid } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import MobileSideDrawer from '../../../components/drawer/MobileSideDrawer';

import {
  getAllProductsAction,
  clearAllProducts,
} from '../../../store/actions/productActions';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const AllProducts = () => {
  const { getProductsInProgress, allProducts, deleteProductInProgress } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const screens = useBreakpoint();

  useEffect(() => {
    dispatch(getAllProductsAction(20));
  }, []);

  useEffect(
    () => () => {
      dispatch(clearAllProducts());
    },
    []
  );

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
              Admin All Products Page
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
                xl={{ span: 20, offset: 2 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  All products
                </Title>
              </Col>
            </Row>

            <Row>
              <Col
                xl={{ span: 20, offset: 2 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                {getProductsInProgress || deleteProductInProgress ? (
                  <Row>
                    <Col span={24}>
                      <div className="spiner">
                        <Spin />
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row gutter={[16, 16]}>
                    {allProducts.map((product) => (
                      <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={6}
                        key={product._id}
                      >
                        <AdminProductCard {...product} />
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AllProducts;
