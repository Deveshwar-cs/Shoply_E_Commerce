import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Select, Tag, Spin } from 'antd';
import {
  MailOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

import ShowPaymentInfo from '../../cards/showPaymentInfo/ShowPaymentInfo';
import AdminOrderTable from '../../tables/AdminOrderTable';
import { updateOrderStatusByAdminAction } from '../../../store/actions/orderActions';

import './AdminOrderList.css';

const { Text } = Typography;

const ORDER_STATUSES = [
  'Not Processed',
  'Cash On Delivery',
  'Processing',
  'Dispatched',
  'Canceled',
  'Completed',
];

const getStatusClass = (status = '') => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'completed';
    case 'dispatched':
      return 'dispatched';
    case 'processing':
      return 'processing';
    case 'canceled':
      return 'canceled';
    case 'cash on delivery':
      return 'cash-on-delivery';
    default:
      return 'not-processed';
  }
};

const AdminOrderList = ({ orders = [] }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { updateOrderStatusInProgress } = useSelector((state) => state.order);

  const handleChange = (orderStatus, orderId) => {
    if (!user?.token || !orderId) return;

    dispatch(updateOrderStatusByAdminAction(orderId, orderStatus, user.token));
  };

  if (!orders.length) {
    return (
      <div className="shoply-order-empty">
        <div className="shoply-order-empty-icon">
          <ShoppingOutlined />
        </div>

        <Typography.Title level={4}>No orders yet</Typography.Title>

        <Text type="secondary">
          Customer orders will appear here when they are placed.
        </Text>
      </div>
    );
  }

  return (
    <div className="shoply-admin-orders">
      {orders.map((order) => {
        const customerEmail = order.orderedBy?.email;
        const shippingAddress = order.orderedBy?.address;
        const paymentId = order.paymentIntent?.id || order._id;

        const emailSubject = `SHOPLY Order ${paymentId}`;
        const emailBody = customerEmail
          ? `Hello ${customerEmail},\n\nI am contacting you regarding your SHOPLY order ${paymentId}.`
          : '';

        const mailto = customerEmail
          ? `mailto:${customerEmail}?subject=${encodeURIComponent(
              emailSubject
            )}&body=${encodeURIComponent(emailBody)}`
          : undefined;

        return (
          <Card key={order._id} className="shoply-admin-order-card" bordered>
            <div className="shoply-admin-order-top">
              <div className="shoply-admin-order-heading">
                <Text className="shoply-admin-order-eyebrow">
                  ORDER REFERENCE
                </Text>

                <Typography.Title level={4} className="shoply-admin-order-id">
                  #
                  {String(order._id || '')
                    .slice(-8)
                    .toUpperCase()}
                </Typography.Title>
              </div>

              <div className="shoply-admin-order-status">
                <Text className="shoply-admin-order-eyebrow">
                  CURRENT STATUS
                </Text>

                <Tag
                  className={`shoply-order-status-tag ${getStatusClass(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus || 'Not Processed'}
                </Tag>
              </div>
            </div>

            <div className="shoply-admin-payment-info">
              <ShowPaymentInfo order={order} displayOrderStatus={false} />
            </div>

            <div className="shoply-admin-status-control">
              <div>
                <Text className="shoply-admin-field-label">
                  UPDATE ORDER STATUS
                </Text>

                <Text className="shoply-admin-field-hint">
                  Select the latest fulfillment stage.
                </Text>
              </div>

              <Select
                value={order.orderStatus || 'Not Processed'}
                className="shoply-admin-status-select"
                disabled={updateOrderStatusInProgress}
                onChange={(orderStatus) => handleChange(orderStatus, order._id)}
                options={ORDER_STATUSES.map((status) => ({
                  label: status,
                  value: status,
                }))}
              />
            </div>

            {updateOrderStatusInProgress && (
              <div className="shoply-admin-order-updating">
                <Spin size="small" />
                <Text type="secondary">Updating order…</Text>
              </div>
            )}

            <div className="shoply-admin-products">
              <div className="shoply-admin-section-heading">
                <Text className="shoply-admin-field-label">ORDER ITEMS</Text>
              </div>

              <AdminOrderTable order={order} />
            </div>

            <div className="shoply-admin-customer">
              <div className="shoply-admin-section-heading">
                <Text className="shoply-admin-field-label">
                  CUSTOMER DETAILS
                </Text>
              </div>

              <div className="shoply-admin-customer-grid">
                <div className="shoply-admin-customer-item">
                  <div className="shoply-admin-customer-icon">
                    <MailOutlined />
                  </div>

                  <div className="shoply-admin-customer-copy">
                    <Text className="shoply-admin-customer-label">
                      EMAIL ADDRESS
                    </Text>

                    {customerEmail ? (
                      <a className="shoply-admin-customer-link" href={mailto}>
                        {customerEmail}
                      </a>
                    ) : (
                      <Text type="secondary">Not provided</Text>
                    )}
                  </div>
                </div>

                <div className="shoply-admin-customer-item">
                  <div className="shoply-admin-customer-icon">
                    <EnvironmentOutlined />
                  </div>

                  <div className="shoply-admin-customer-copy">
                    <Text className="shoply-admin-customer-label">
                      SHIPPING ADDRESS
                    </Text>

                    <Text className="shoply-admin-address">
                      {shippingAddress || 'No shipping address provided'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminOrderList;
