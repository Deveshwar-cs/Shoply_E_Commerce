import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Spin, Row, Col } from 'antd';

import AdminNav from '../../../components/nav/AdminNav';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import {
  getAllProductsAction,
  clearAllProducts,
} from '../../../store/actions/productActions';

const { Header, Content } = Layout;
const { Title } = Typography;

const AllProducts = () => {
  const { getProductsInProgress, allProducts, deleteProductInProgress } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAction(20));
  }, []);

  useEffect(
    () => () => {
      dispatch(clearAllProducts());
    },
    []
  );

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin All Products Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
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
