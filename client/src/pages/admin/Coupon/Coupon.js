import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Layout,
  Typography,
  Form,
  Spin,
  Grid,
  Breadcrumb,
  Divider,
  notification,
  Empty,
} from 'antd';

import {
  TagOutlined,
  PlusOutlined,
  PercentageOutlined,
} from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav/AdminNav';
import CouponForm from '../../../components/forms/CouponForm';
import CouponTable from '../../../components/tables/CouponTable';
import MobileSideDrawer from '../../../components/drawer/mobileSideDrawer/MobileSideDrawer';

import {
  createCouponAction,
  getAllCouponsAction,
} from '../../../store/actions/couponActions';

import './Coupon.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Coupon = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const { user } = useSelector((state) => state.auth);

  const {
    createCouponInProgress,
    getAllCouponsInProgress,
    allCoupons = [],
  } = useSelector((state) => state.coupon);

  useEffect(() => {
    if (user?.token) {
      dispatch(getAllCouponsAction(user.token));
    }
  }, [user?.token, dispatch]);

  const onFinish = async ({ name, discount, expiry }) => {
    const trimmedName = name?.trim();
    const numericDiscount = Number(discount);

    if (!trimmedName) {
      notification.warning({
        message: 'Coupon name is required',
        description: 'Enter a name for the coupon before saving.',
      });
      return;
    }

    if (!Number.isFinite(numericDiscount) || numericDiscount <= 0) {
      notification.warning({
        message: 'Invalid discount',
        description: 'Enter a valid discount amount.',
      });
      return;
    }

    if (!expiry) {
      notification.warning({
        message: 'Expiry date is required',
        description: 'Choose when this coupon should expire.',
      });
      return;
    }

    try {
      await dispatch(
        createCouponAction(
          {
            name: trimmedName,
            discount: numericDiscount,
            expiry,
          },
          user.token
        )
      );

      await dispatch(getAllCouponsAction(user.token));

      form.resetFields();

      notification.success({
        message: 'Coupon created',
        description: `${trimmedName} has been added successfully.`,
      });
    } catch (error) {
      notification.error({
        message: 'Unable to create coupon',
        description:
          error?.response?.data?.message ||
          error?.message ||
          'Please check your details and try again.',
      });
    }
  };

  const onFinishFailed = () => {
    notification.warning({
      message: 'Check the coupon details',
      description: 'Please correct the highlighted fields.',
    });
  };

  const isMobile = !screens.md;

  return (
    <Layout className="shoply-coupon-layout">
      <Layout className="shoply-coupon-body">
        {isMobile ? (
          <MobileSideDrawer>
            <AdminNav />
          </MobileSideDrawer>
        ) : (
          <AdminNav />
        )}

        <Content className="shoply-coupon-content">
          <main className="shoply-coupon-page">
            <Breadcrumb
              className="shoply-coupon-breadcrumb"
              items={[
                {
                  title: <Link to="/admin/dashboard">Dashboard</Link>,
                },
                {
                  title: 'Coupons',
                },
              ]}
            />

            <section className="shoply-coupon-intro">
              <div>
                <Text className="shoply-coupon-eyebrow">
                  PROMOTIONS / DISCOUNT MANAGEMENT
                </Text>

                <Title level={1} className="shoply-coupon-title">
                  Coupons.
                </Title>

                <Paragraph className="shoply-coupon-description">
                  Create and manage promotional discounts for your store. Keep
                  track of active offers, discount values, and expiry dates from
                  one place.
                </Paragraph>
              </div>
            </section>

            <section className="shoply-coupon-stats">
              <div className="shoply-coupon-stat">
                <span className="shoply-coupon-stat-label">TOTAL COUPONS</span>
                <span className="shoply-coupon-stat-value">
                  {allCoupons.length}
                </span>
              </div>

              <div className="shoply-coupon-stat">
                <span className="shoply-coupon-stat-label">
                  DIRECTORY STATUS
                </span>
                <span className="shoply-coupon-stat-status">
                  {getAllCouponsInProgress ? 'SYNCING' : 'UP TO DATE'}
                </span>
              </div>

              <div className="shoply-coupon-stat">
                <span className="shoply-coupon-stat-label">MANAGEMENT</span>
                <span className="shoply-coupon-stat-description">
                  Create and review
                </span>
              </div>
            </section>

            <div className="shoply-coupon-workspace">
              <section className="shoply-coupon-panel shoply-coupon-create-panel">
                <div className="shoply-coupon-panel-heading">
                  <div className="shoply-coupon-panel-icon">
                    <PlusOutlined />
                  </div>

                  <div>
                    <Text className="shoply-coupon-panel-kicker">
                      NEW PROMOTION
                    </Text>
                    <Title level={3} className="shoply-coupon-panel-title">
                      Create a coupon
                    </Title>
                  </div>
                </div>

                <Paragraph className="shoply-coupon-panel-description">
                  Set a coupon name, discount value, and expiry date to create a
                  new promotional offer.
                </Paragraph>

                <Divider className="shoply-coupon-divider" />

                <div className="shoply-coupon-field-label">
                  <PercentageOutlined />
                  <span>COUPON DETAILS</span>
                </div>

                <CouponForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={createCouponInProgress}
                />

                <div className="shoply-coupon-panel-note">
                  <TagOutlined />
                  <Text>
                    Double-check the discount and expiry date before creating
                    the coupon.
                  </Text>
                </div>
              </section>

              <section className="shoply-coupon-panel shoply-coupon-directory-panel">
                <div className="shoply-coupon-directory-heading">
                  <div>
                    <Text className="shoply-coupon-panel-kicker">
                      PROMOTION DIRECTORY
                    </Text>
                    <Title level={3} className="shoply-coupon-panel-title">
                      All coupons
                    </Title>
                  </div>

                  <span className="shoply-coupon-count">
                    {allCoupons.length} ITEMS
                  </span>
                </div>

                <Divider className="shoply-coupon-divider" />

                {getAllCouponsInProgress ? (
                  <div className="shoply-coupon-loading">
                    <Spin size="large" />
                    <Text>Loading coupons...</Text>
                  </div>
                ) : allCoupons.length === 0 ? (
                  <div className="shoply-coupon-empty">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No coupons available yet."
                    />
                    <Text className="shoply-coupon-empty-hint">
                      Create your first coupon using the form.
                    </Text>
                  </div>
                ) : (
                  <div className="shoply-coupon-table-wrap">
                    <CouponTable allCoupons={allCoupons} />
                  </div>
                )}

                <div className="shoply-coupon-directory-footer">
                  <Text>
                    {allCoupons.length} coupon
                    {allCoupons.length === 1 ? '' : 's'} in your directory
                  </Text>
                </div>
              </section>
            </div>

            <footer className="shoply-coupon-footer">
              <span>SHOPLY / ADMINISTRATION</span>
              <span>PROMOTIONS MANAGEMENT</span>
            </footer>
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Coupon;
