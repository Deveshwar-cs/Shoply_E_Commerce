import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Layout, Grid, Button } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import UserNav from '../../components/nav/UserNav/UserNav';

import OrderHistoryCard from '../../components/cards/orderHistoryCard/OrderHistoryCard';

import MobileSideDrawer from '../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import { getAllOrdersByUserAction } from '../../store/actions/orderActions';

import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

import './History.css';

const { Header, Content } = Layout;

const { useBreakpoint } = Grid;

const History = () => {
  const dispatch = useDispatch();

  const screens = useBreakpoint();

  const user = useSelector((state) => state.auth.user);

  const allOrdersByUser = useSelector((state) => state.order.allOrdersByUser);

  const getAllOrdersByUserInProgress = useSelector(
    (state) => state.order.getAllOrdersByUserInProgress
  );

  useEffect(() => {
    if (!user?.token) return;

    dispatch(getAllOrdersByUserAction(user.token));
  }, [user?.token, dispatch]);

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  const hasOrders =
    Array.isArray(allOrdersByUser) && allOrdersByUser.length > 0;

  return (
    <Layout className="history-layout">
      <Header className="history-header">
        <div className="history-header-inner">
          {!screens.md && (
            <Button
              type="text"
              className="history-mobile-menu"
              icon={<MenuUnfoldOutlined />}
              onClick={showMobileMenuDrawer}
              aria-label="Open navigation"
            />
          )}

          <div className="history-header-label">
            <span className="history-header-line"></span>
            <span>SHOPLY / ACCOUNT</span>
          </div>
        </div>
      </Header>

      <Layout className="history-body">
        {!screens.md && (
          <MobileSideDrawer>
            <UserNav />
          </MobileSideDrawer>
        )}

        {screens.md && <UserNav />}

        <Content className="history-content">
          <div className="history-container">
            {/* Page heading */}
            <section className="history-intro">
              <div className="history-intro-top">
                <span className="history-eyebrow">PURCHASE HISTORY</span>

                <span className="history-order-count">
                  {String(
                    Array.isArray(allOrdersByUser) ? allOrdersByUser.length : 0
                  ).padStart(2, '0')}
                </span>
              </div>

              <div className="history-intro-content">
                <div>
                  <h1>
                    Your
                    <span> orders.</span>
                  </h1>

                  <p>
                    Review your purchases, payment details, products, and
                    invoices.
                  </p>
                </div>

                <div className="history-intro-mark">
                  <span>SHOPLY</span>
                  <span>ORDERS</span>
                </div>
              </div>
            </section>

            {/* Orders */}
            <section className="history-orders">
              {getAllOrdersByUserInProgress ? (
                <div className="history-loading">
                  <div className="history-loading-spinner"></div>

                  <span>Loading your orders...</span>
                </div>
              ) : hasOrders ? (
                allOrdersByUser.map((order, index) => (
                  <div className="history-order-wrapper" key={order._id}>
                    <div className="history-order-index">
                      ORDER {String(index + 1).padStart(2, '0')}
                    </div>

                    <OrderHistoryCard order={order} />
                  </div>
                ))
              ) : (
                <div className="history-empty">
                  <div className="history-empty-number">00</div>

                  <div className="history-empty-content">
                    <span className="history-eyebrow">PURCHASE HISTORY</span>

                    <h2>
                      No orders
                      <span> yet.</span>
                    </h2>

                    <p>
                      You haven't placed any orders yet. Explore the collection
                      and find something you'll love.
                    </p>

                    <a href="/shop" className="history-shop-button">
                      <span>Explore shop</span>
                      <span>↗</span>
                    </a>
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

export default History;
