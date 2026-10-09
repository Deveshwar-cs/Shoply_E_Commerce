import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { Spin } from 'antd';

import ProductCard from '../../components/cards/ProductCard/ProductCard';

import { getOneSubCategoryAction } from '../../store/actions/subCategoryActions';

import './SubcategoryHome.css';

const SubcategoryHome = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();

  const { oneSubCategory, getOneSubCategoryInProgress } = useSelector(
    (state) => state.sub
  );

  useEffect(() => {
    dispatch(getOneSubCategoryAction(slug));
  }, [slug, dispatch]);

  if (getOneSubCategoryInProgress) {
    return (
      <main className="subcategory-home">
        <div className="subcategory-home-loading">
          <Spin size="large" />
        </div>
      </main>
    );
  }

  const subcategoryName = oneSubCategory?.subcategory?.name || 'Subcategory';

  const products = oneSubCategory?.products || [];

  return (
    <main className="subcategory-home">
      {/* Header */}
      <section className="subcategory-home-header">
        <div className="subcategory-home-header-inner">
          <div className="subcategory-home-label">
            <span className="subcategory-home-label-line"></span>
            <span>SHOPLY / SUBCATEGORY</span>
          </div>

          <h1 className="subcategory-home-title">
            {subcategoryName}
            <span> edit.</span>
          </h1>

          <div className="subcategory-home-meta">
            <p>
              A closer look at our {subcategoryName.toLowerCase()} collection,
              selected for everyday living and modern style.
            </p>

            <div className="subcategory-home-count">
              <strong>{products.length}</strong>

              <span>{products.length === 1 ? 'PRODUCT' : 'PRODUCTS'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="subcategory-home-products">
        <div className="subcategory-home-container">
          <div className="subcategory-home-products-header">
            <div>
              <span className="subcategory-home-eyebrow">THE SELECTION</span>

              <h2>
                Explore
                <span> {subcategoryName}.</span>
              </h2>
            </div>

            <span className="subcategory-home-product-total">
              {products.length} ITEMS
            </span>
          </div>

          {products.length > 0 ? (
            <div className="subcategory-home-grid">
              {products.map((product, index) => (
                <div className="subcategory-home-item" key={product._id}>
                  <div className="subcategory-home-item-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="subcategory-home-empty">
              <span>NO PRODUCTS</span>

              <h3>
                Nothing here
                <span> yet.</span>
              </h3>

              <p>
                There are currently no products available in this subcategory.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SubcategoryHome;
