import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Row, Col, Layout, Spin } from 'antd';

import LoadinCardList from '../components/cards/LoadingCardList';
import ProductCard from '../components/cards/ProductCard';

import {
  getProductByFilter,
  getAllProductsByCount,
} from '../functions/productFunctions';

const { Header, Content } = Layout;
const { Title } = Typography;

const Shop = () => {
  const dispatch = useDispatch();
  const { allProducts, getProductsInProgress } = useSelector(
    (state) => state.product
  );
  const { text } = useSelector((state) => state.search);

  // use component local state because we don't need share this data with other component
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get products by search
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (text.length > 0) {
        setIsLoading(true);
        getProductByFilter({ query: text })
          .then((res) => {
            setProducts(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  // Get products by default with Redux action
  useEffect(() => {
    if (text.length === 0) {
      setIsLoading(true);
      getAllProductsByCount(12)
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [text]);

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
                Products
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
                {(isLoading || getProductsInProgress) && products.length === 0 && (
                  <Col span={24}>
                    <div className="spiner">
                      <Spin size="large" />
                    </div>
                  </Col>
                )}

                {!isLoading && products.length === 0 && (
                  <Col span={24}>
                    <div className="spiner">
                      <Title level={4} style={{ marginTop: 16 }}>
                        No matches
                      </Title>
                    </div>
                  </Col>
                )}

                {products &&
                  products.map((product) => (
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
