import { useState, useEffect } from 'react';

import { Row, Col } from 'antd';

import LoadinCardList from '../cards/LoadingCardList';
import ProductCard from '../cards/ProductCard';

import { getCustomProductList } from '../../functions/productFunctions';

const BestSellers = () => {
  // Here we use component local state instead of Redux global state because on Home page we can have several different product lists based on custom parameters
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCustomProductList('sold', 'desc', 3).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
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
    </>
  );
};

export default BestSellers;
