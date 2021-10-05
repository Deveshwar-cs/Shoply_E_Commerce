import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Spin, Row, Col } from 'antd';

import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';

import {
  getAllProductsAction,
  clearAllProducts,
} from '../store/actions/productActions';

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const { getProductsInProgress, allProducts } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAllProductsAction(3));
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <Jumbotron text={['New Arrivals', 'Best Sellers']} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#f0f5ff',
              fontSize: 30,
            }}
          >
            New Arrivals
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 20, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
        >
          {getProductsInProgress ? (
            <Row>
              <Col span={24}>
                <div className="spiner">
                  <Spin />
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {allProducts.map((product) => (
                <Col xs={24} sm={24} md={12} lg={8} xl={8} key={product._id}>
                  <ProductCard {...product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
