import { useState, useEffect } from 'react';

import { Pagination } from 'antd';

import LoadinCardList from '../../cards/LoadingCardList';

import ProductCard from '../../cards/ProductCard/ProductCard';

import {
  getCustomProductList,
  getProductsTotal,
} from '../../../functions/productFunctions';

import './NewArrivals.css';

const NewArrivals = () => {
  // Here we use component local state instead of Redux global state
  // because on Home page we can have several different product lists
  // based on custom parameters.

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

    // Cleanup function prevents state updates
    // after the component has unmounted.

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

    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <section className="new-arrivals">
      {/* =====================================
          SECTION HEADER
      ===================================== */}

      <div className="new-arrivals-header">
        <div className="new-arrivals-heading">
          <div className="new-arrivals-label">
            <span className="new-arrivals-line"></span>

            <span>JUST IN</span>
          </div>

          <h3>
            Fresh
            <span> arrivals.</span>
          </h3>

          <p>
            The latest additions to our collection, selected for you to discover
            first.
          </p>
        </div>

        {/* Product count */}

        <div className="new-arrivals-meta">
          <span className="new-arrivals-count">{productsTotal}</span>

          <span className="new-arrivals-count-label">PRODUCTS</span>
        </div>
      </div>

      {/* =====================================
          PRODUCT LIST
      ===================================== */}

      <div className="new-arrivals-products">
        {isLoading ? (
          <div className="new-arrivals-loading">
            <LoadinCardList count={3} />
          </div>
        ) : (
          <div className="new-arrivals-grid">
            {products.map((product) => (
              <div className="new-arrivals-item" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================
          PAGINATION
      ===================================== */}

      <div className="new-arrivals-pagination">
        <div className="pagination-label">
          <span>PAGE</span>

          <strong>{String(page).padStart(2, '0')}</strong>

          <span>/</span>

          <span>
            {Math.max(1, Math.ceil(productsTotal / 3))
              .toString()
              .padStart(2, '0')}
          </span>
        </div>

        <Pagination
          current={page}
          total={productsTotal}
          pageSize={3}
          showSizeChanger={false}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </section>
  );
};

export default NewArrivals;
