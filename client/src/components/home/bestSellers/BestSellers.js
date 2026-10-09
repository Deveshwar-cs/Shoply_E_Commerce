import { useState, useEffect } from 'react';

import { Pagination } from 'antd';

import LoadinCardList from '../../cards/LoadingCardList';

import ProductCard from '../../cards/ProductCard/ProductCard';

import {
  getCustomProductList,
  getProductsTotal,
} from '../../../functions/productFunctions';

import './BestSellers.css';

const BestSellers = () => {
  // We use local state because this product collection
  // is only needed inside the Best Sellers section.

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [productsTotal, setProductsTotal] = useState(0);

  useEffect(() => {
    let componentMounted = true;

    setIsLoading(true);

    getCustomProductList('sold', 'desc', page)
      .then((res) => {
        if (!componentMounted) return;

        setProducts(res.data);

        setIsLoading(false);
      })

      .catch((error) => {
        console.log('getCustomProductList error ===>', error);

        setIsLoading(false);
      });

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
    <section className="best-sellers">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="best-sellers-header">
        <div className="best-sellers-heading">
          <div className="best-sellers-label">
            <span className="best-sellers-number">02</span>

            <span className="best-sellers-label-text">CUSTOMER FAVOURITES</span>
          </div>

          <h3>
            Most
            <span> wanted.</span>
          </h3>

          <p>
            The products people are choosing again and again. Discover what's
            currently making an impression.
          </p>
        </div>

        <div className="best-sellers-side-note">
          <span className="best-sellers-side-line"></span>

          <span>
            SORTED BY
            <strong> SALES</strong>
          </span>
        </div>
      </div>

      {/* =====================================
          PRODUCT GRID
      ===================================== */}

      <div className="best-sellers-products">
        {isLoading ? (
          <div className="best-sellers-loading">
            <LoadinCardList count={3} />
          </div>
        ) : (
          <div className="best-sellers-grid">
            {products.map((product, index) => (
              <div className="best-sellers-item" key={product._id}>
                {/* Ranking number */}

                <div className="best-sellers-rank">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>

                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================
          PAGINATION
      ===================================== */}

      <div className="best-sellers-pagination">
        <div className="best-sellers-pagination-info">
          <span>TOP PICKS</span>

          <span className="best-sellers-pagination-dot">•</span>

          <span>PAGE {String(page).padStart(2, '0')}</span>
        </div>

        <Pagination
          current={page}
          total={productsTotal}
          pageSize={3}
          showSizeChanger={false}
          onChange={(page) => setPage(page)}
        />
      </div>
    </section>
  );
};

export default BestSellers;
