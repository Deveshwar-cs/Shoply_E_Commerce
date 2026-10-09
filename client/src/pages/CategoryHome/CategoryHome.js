import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Spin } from 'antd';

import { useParams } from 'react-router-dom';

import ProductCard from '../../components/cards/ProductCard/ProductCard';

import { getOneCategoryAction } from '../../store/actions/categoryActions';

import './CategoryHome.css';

const CategoryHome = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();

  const { oneCategory, getOneCategoryInProgress } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getOneCategoryAction(slug));
  }, [slug, dispatch]);

  if (getOneCategoryInProgress) {
    return (
      <main className="category-home">
        <div className="category-home-loading">
          <Spin size="large" />
        </div>
      </main>
    );
  }

  const categoryName = oneCategory?.category?.name || 'Category';

  const products = oneCategory?.products || [];

  return (
    <main className="category-home">
      {/* Header */}
      <section className="category-home-header">
        <div className="category-home-header-inner">
          <div className="category-home-label">
            <span className="category-home-label-line"></span>
            <span>SHOPLY / CATEGORY</span>
          </div>

          <h1 className="category-home-title">
            {categoryName}
            <span> collection.</span>
          </h1>

          <div className="category-home-meta">
            <p>
              Explore products curated from our {categoryName.toLowerCase()}{' '}
              collection.
            </p>

            <div className="category-home-count">
              <strong>{products.length}</strong>

              <span>{products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="category-home-products">
        <div className="category-home-container">
          <div className="category-home-products-header">
            <div>
              <span className="category-home-eyebrow">THE COLLECTION</span>

              <h2>
                Discover
                <span> more.</span>
              </h2>
            </div>

            <span className="category-home-product-total">
              {products.length} ITEMS
            </span>
          </div>

          {products.length > 0 ? (
            <div className="category-home-grid">
              {products.map((product, index) => (
                <div className="category-home-item" key={product._id}>
                  <div className="category-home-item-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="category-home-empty">
              <span>NO PRODUCTS</span>

              <h3>
                Nothing here
                <span> yet.</span>
              </h3>

              <p>There are currently no products available in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryHome;
