import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Spin } from 'antd';

import {
  getOneProductAction,
  clearOneProduct,
} from '../../store/actions/productActions';

import { getRelatedProducts } from '../../functions/productFunctions';

import SingleProduct from '../../components/cards/SingleProduct/SingleProduct';

import ProductCard from '../../components/cards/ProductCard/ProductCard';

import LoadinCardList from '../../components/cards/LoadingCardList';

import { useParams } from 'react-router-dom';

import './Product.css';

const Product = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const { oneProduct, getOneProductInProgress } = useSelector(
    (state) => state.product
  );

  // Local state because related products
  // are only needed on the Product page.
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [relatedIsLoading, setRelatedIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getOneProductAction(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    let componentMounted = true;

    if (oneProduct) {
      setRelatedIsLoading(true);

      getRelatedProducts(oneProduct._id)
        .then((res) => {
          if (!componentMounted) return;

          setRelatedProducts(res.data);
          setRelatedIsLoading(false);
        })
        .catch((error) => {
          console.log('Get Related products error ===>', error);

          setRelatedIsLoading(false);
        });
    }

    // Cleanup function runs when the effect
    // runs again or the component unmounts.
    return () => {
      componentMounted = false;
    };
  }, [oneProduct]);

  useEffect(
    () => () => {
      dispatch(clearOneProduct());
    },
    [dispatch]
  );

  if (getOneProductInProgress) {
    return (
      <main className="product-page">
        <div className="product-page-loading">
          <Spin size="large" />
        </div>
      </main>
    );
  }

  return (
    <main className="product-page">
      {/* Product detail */}
      {oneProduct && (
        <section className="product-detail-section">
          <div className="product-detail-container">
            <div className="product-detail-label">
              <span className="product-detail-label-line"></span>
              <span>SHOPLY / PRODUCT</span>
            </div>

            <SingleProduct product={oneProduct} />
          </div>
        </section>
      )}

      {/* Related products */}
      <section className="related-products-section">
        <div className="related-products-container">
          <div className="related-products-header">
            <div className="related-products-heading">
              <div className="related-products-label">
                <span>YOU MAY ALSO LIKE</span>
              </div>

              <h2>
                Related
                <span> products.</span>
              </h2>

              <p>
                Discover more products that pair well with what you're viewing.
              </p>
            </div>

            <div className="related-products-meta">
              <span className="related-products-number">
                {relatedProducts.length}
              </span>

              <span className="related-products-count">PRODUCTS</span>
            </div>
          </div>

          <div className="related-products-content">
            {relatedIsLoading ? (
              <div className="related-products-loading">
                <LoadinCardList count={3} />
              </div>
            ) : relatedProducts.length > 0 ? (
              <div className="related-products-grid">
                {relatedProducts.map((product, index) => (
                  <div className="related-product-item" key={product._id}>
                    <span className="related-product-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="related-products-empty">
                <span>END OF COLLECTION</span>

                <h3>
                  No related
                  <span> products.</span>
                </h3>

                <p>
                  There are no related products available for this item yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
