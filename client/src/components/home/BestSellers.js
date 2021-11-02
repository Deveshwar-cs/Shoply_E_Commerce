import { useState, useEffect } from 'react';

import { Row, Col, Pagination } from 'antd';

import LoadinCardList from '../cards/LoadingCardList';
import ProductCard from '../cards/ProductCard';

import {
  getCustomProductList,
  getProductsTotal,
} from '../../functions/productFunctions';

const BestSellers = () => {
  // Here we use component local state instead of Redux global state because on Home page we can have several different product lists based on custom parameters and use it only here
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getCustomProductList('sold', 'desc', page)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    getProductsTotal().then((res) => {
      setProductsTotal(res.data);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadinCardList count={3} />
      ) : (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {products.map((product) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={product._id}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
      )}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
        <Pagination
          style={{ margin: '20px 0' }}
          current={page}
          total={(productsTotal / 3) * 10}
          onChange={(page) => setPage(page)}
        />
      </Row>
    </>
  );
};

export default BestSellers;
