import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Layout, Button, Grid, Spin } from 'antd';

import {
  DeleteOutlined,
  MenuUnfoldOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import UserNav from '../../../components/nav/UserNav/UserNav';

import MobileSideDrawer from '../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  getWishlistAction,
  deleteProductFromWishlistAction,
} from '../../../store/actions/wishlistActions';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

import './Wishlist.css';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const Wishlist = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { wishlist, getWishlistInProgress, deleteFromWishlistInProgress } =
    useSelector((state) => state.wishlist);

  const screens = useBreakpoint();

  const [idOfClickedItem, setIdOfClickedItem] = useState('');

  useEffect(() => {
    if (!user?.token) return;

    dispatch(getWishlistAction(user.token));
  }, [user?.token, dispatch]);

  const handleDeleteFromWishlist = (productId) => {
    setIdOfClickedItem(productId);

    dispatch(deleteProductFromWishlistAction(productId, user.token));
  };

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const hasWishlist = Array.isArray(wishlist) && wishlist.length > 0;

  return (
    <Layout className="wishlist-layout">
      {/* Header */}
      <Header className="wishlist-header">
        <div className="wishlist-header-inner">
          {!screens.md && (
            <Button
              type="text"
              className="wishlist-mobile-menu"
              icon={<MenuUnfoldOutlined />}
              onClick={showMobileMenuDrawer}
              aria-label="Open navigation"
            />
          )}

          <div className="wishlist-header-label">
            <span className="wishlist-header-line"></span>
            <span>SHOPLY / ACCOUNT</span>
          </div>
        </div>
      </Header>

      <Layout className="wishlist-body">
        {/* Mobile navigation */}
        {!screens.md && (
          <MobileSideDrawer>
            <UserNav />
          </MobileSideDrawer>
        )}

        {/* Desktop navigation */}
        {screens.md && <UserNav />}

        <Content className="wishlist-content">
          <div className="wishlist-container">
            {/* Intro */}
            <section className="wishlist-intro">
              <div className="wishlist-intro-top">
                <span className="wishlist-eyebrow">SAVED PRODUCTS</span>

                <span className="wishlist-count">
                  {String(
                    Array.isArray(wishlist) ? wishlist.length : 0
                  ).padStart(2, '0')}
                </span>
              </div>

              <div className="wishlist-intro-content">
                <div>
                  <h1>
                    Your
                    <span> wishlist.</span>
                  </h1>

                  <p>
                    Products you've saved for later. Keep your favorites close
                    until you're ready to make them yours.
                  </p>
                </div>

                <div className="wishlist-intro-mark">
                  <span>SHOPLY</span>
                  <span>FAVORITES</span>
                </div>
              </div>
            </section>

            {/* Wishlist */}
            <section className="wishlist-products">
              {getWishlistInProgress ? (
                <div className="wishlist-loading">
                  <Spin size="large" />

                  <span>Loading your wishlist...</span>
                </div>
              ) : hasWishlist ? (
                <>
                  <div className="wishlist-products-header">
                    <div>
                      <span className="wishlist-eyebrow">YOUR SELECTION</span>

                      <h2>
                        Saved
                        <span> for later.</span>
                      </h2>
                    </div>

                    <span className="wishlist-products-total">
                      {String(wishlist.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="wishlist-list">
                    {wishlist.map((product, index) => {
                      const isDeleting =
                        deleteFromWishlistInProgress &&
                        idOfClickedItem === product._id;

                      return (
                        <article className="wishlist-item" key={product._id}>
                          <div className="wishlist-item-number">
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          <div className="wishlist-item-main">
                            <div className="wishlist-item-details">
                              <span className="wishlist-item-label">
                                SAVED PRODUCT
                              </span>

                              <Link
                                to={`/product/${product.slug}`}
                                className="wishlist-item-title"
                              >
                                {product.title}
                              </Link>

                              <div className="wishlist-item-meta">
                                {product.brand && <span>{product.brand}</span>}

                                {product.price !== undefined && (
                                  <span>${product.price}</span>
                                )}
                              </div>
                            </div>

                            <div className="wishlist-item-actions">
                              <Link
                                to={`/product/${product.slug}`}
                                className="wishlist-view-button"
                              >
                                <span>View product</span>
                                <ArrowRightOutlined />
                              </Link>

                              <button
                                type="button"
                                className="wishlist-delete-button"
                                onClick={() =>
                                  handleDeleteFromWishlist(product._id)
                                }
                                disabled={isDeleting}
                                aria-label={`Remove ${product.title} from wishlist`}
                              >
                                {isDeleting ? (
                                  <span className="wishlist-delete-loading">
                                    <Spin size="small" />
                                  </span>
                                ) : (
                                  <>
                                    <DeleteOutlined />
                                    <span>Remove</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="wishlist-empty">
                  <div className="wishlist-empty-number">00</div>

                  <div className="wishlist-empty-content">
                    <span className="wishlist-eyebrow">SAVED PRODUCTS</span>

                    <h2>
                      Nothing
                      <span> saved yet.</span>
                    </h2>

                    <p>
                      Your wishlist is waiting for something special. Explore
                      the collection and save the products you love.
                    </p>

                    <Link to="/shop" className="wishlist-shop-button">
                      <span>Explore shop</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Wishlist;
