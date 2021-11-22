import { useState, useEffect } from 'react';

import { Row, Col, Pagination } from 'antd';

import LoadinCardList from '../cards/LoadingCardList';
import ProductCard from '../cards/ProductCard';

import {
  getCustomProductList,
  getProductsTotal,
} from '../../functions/productFunctions';

const NewArrivals = () => {
  // Here we use component local state instead of Redux global state because on Home page we can have several different product lists based on custom parameters
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);

  useEffect(() => {
    let componentMounted = true;
    setIsLoading(true);
    getCustomProductList('createdAt', 'desc', page)
      .then((res) => {
        if (!componentMounted) return;
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('getCustomProductList error ===>', error);
        setIsLoading(false);
      });
    // cleanup function is called when useEffect is called again or on unmount
    // By leveraging lexical scoping, we can share a variable between the callback function and the cleanup function.
    // We use the cleanup function to modify the componentMounted variable and trigger an early return in the callback function to prevent the state update.
    // Promises cannot be cancelled but you can use lexical scoping to change the behavior of the callback from the useEffect cleanup function by triggering an early return or short-circuiting the state update.
    return () => {
      componentMounted = false;
    };
  }, [page]);

  useEffect(() => {
    let componentMounted = true;
    setIsLoading(true);
    getProductsTotal()
      .then((res) => {
        if (!componentMounted) return;

        setProductsTotal(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('getProductsTotal error ===>', error);
        setIsLoading(false);
      });
    // cleanup function is called when useEffect is called again or on unmount
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadinCardList count={3} />
      ) : (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {products.map((product) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={product._id}>
              <ProductCard product={product} />
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

export default NewArrivals;
