import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Row, Col, Layout, Spin } from 'antd';

import LoadinCardList from '../components/cards/LoadingCardList';
import ProductCard from '../components/cards/ProductCard';

import { getAllProductsAction } from '../store/actions/productActions';
import { getOneSubCategory } from '../functions/subCategoryFunctions';

const { Header, Content } = Layout;
const { Title } = Typography;

const Shop = () => {
  const dispatch = useDispatch();
  const { allProducts, getProductsInProgress } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAllProductsAction(12));
  }, []);

  return (
    <>
      <Row>
        <Col span={4} style={{ backgroundColor: '#f5f5f5' }}>
          <Title level={3}>Filter</Title>
        </Col>
        <Col span={20}>
          <Row>
            <Col
              xl={{ span: 16, offset: 4 }}
              lg={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Title level={3} style={{ marginTop: 16 }}>
                All Products
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {getProductsInProgress && (
                  <Col span={24}>
                    <div className="spiner">
                      <Spin size="large" />
                    </div>
                  </Col>
                )}
                {allProducts &&
                  allProducts.map((product) => (
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      key={product._id}
                      style={{ marginBottom: 40 }}
                    >
                      <ProductCard {...product} />
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Shop;
