import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Spin, Space, Button, Grid } from 'antd';

import {
  MenuUnfoldOutlined,
  ShoppingOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav/AdminNav';

import AdminOrderList from '../../../components/order/AdminOrderList/AdminOrderList';

import MobileSideDrawer from '../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import { getAllOrdersByAdminAction } from '../../../store/actions/orderActions';

import './AdminDashboard.css';

const { Content } = Layout;

const { Title, Text } = Typography;

const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const screens = useBreakpoint();

  const { user } = useSelector((state) => state.auth);

  const { allOrdersByAdmin, getAllOrdersInProgress } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (user?.token) {
      dispatch(getAllOrdersByAdminAction(user.token));
    }
  }, [user?.token, dispatch]);

  const orders = allOrdersByAdmin || [];

  return (
    <Layout className="shoply-admin-dashboard">
      <Layout className="shoply-admin-dashboard-body">
        {!screens.md && (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        )}

        {screens.md && <AdminNav />}

        <Content className="shoply-admin-dashboard-content">
          <div className="shoply-admin-dashboard-container">
            {/* Page introduction */}
            <div className="shoply-admin-page-topline">
              <span>OVERVIEW / ORDERS</span>
              <span>01 — ORDER MANAGEMENT</span>
            </div>

            <div className="shoply-admin-page-intro">
              <div>
                <Text className="shoply-admin-eyebrow">
                  YOUR STORE AT A GLANCE
                </Text>

                <Title level={1} className="shoply-admin-page-title">
                  Order <span>management.</span>
                </Title>

                <Text className="shoply-admin-page-description">
                  Review customer purchases and keep your store operations
                  moving.
                </Text>
              </div>

              <div className="shoply-admin-orders-indicator">
                <div className="shoply-admin-orders-icon">
                  <ShoppingOutlined />
                </div>

                <div>
                  <span className="shoply-admin-indicator-label">
                    TOTAL ORDERS LOADED
                  </span>

                  <span className="shoply-admin-indicator-value">
                    {getAllOrdersInProgress ? '—' : orders.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Orders section */}
            <section className="shoply-admin-orders-section">
              <div className="shoply-admin-section-heading">
                <div>
                  <Text className="shoply-admin-eyebrow">ORDER DIRECTORY</Text>

                  <Title level={3} className="shoply-admin-section-title">
                    All orders
                  </Title>
                </div>

                <div className="shoply-admin-order-count">
                  {getAllOrdersInProgress
                    ? 'LOADING ORDERS'
                    : `${orders.length} ${
                        orders.length === 1 ? 'ORDER' : 'ORDERS'
                      }`}
                </div>
              </div>

              <div className="shoply-admin-orders-content">
                {getAllOrdersInProgress ? (
                  <div className="shoply-admin-loading">
                    <Spin size="large" />

                    <Text className="shoply-admin-loading-text">
                      Retrieving orders...
                    </Text>
                  </div>
                ) : orders.length > 0 ? (
                  <AdminOrderList orders={orders} />
                ) : (
                  <div className="shoply-admin-empty">
                    <div className="shoply-admin-empty-icon">
                      <ShoppingOutlined />
                    </div>

                    <Title level={4} className="shoply-admin-empty-title">
                      No orders yet.
                    </Title>

                    <Text className="shoply-admin-empty-description">
                      Customer orders will appear here when purchases are
                      placed.
                    </Text>
                  </div>
                )}
              </div>
            </section>

            {/* Page footer */}
            <div className="shoply-admin-dashboard-footer">
              <span>SHOPLY / ADMINISTRATION</span>

              <span>
                ORDER MANAGEMENT <ArrowRightOutlined />
              </span>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
