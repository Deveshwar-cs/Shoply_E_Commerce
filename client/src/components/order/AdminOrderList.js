import { useDispatch, useSelector } from 'react-redux';

import { Card, Typography, Space, Select, Button } from 'antd';

import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import AdminOrderTable from '../tables/AdminOrderTable';

import { updateOrderStatusByAdminAction } from '../../store/actions/orderActions';

const { Text } = Typography;
const { Option } = Select;

const AdminOrderList = ({ orders }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { updateOrderStatusInProgress } = useSelector((state) => state.order);

  const handleChange = (orderStatus, orderId) => {
    dispatch(updateOrderStatusByAdminAction(orderId, orderStatus, user.token));
  };

  return (
    <>
      {orders.map((order) => (
        <Card
          key={order._id}
          style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: 20,
            backgroundColor: '#e6f7ff',
          }}
        >
          <div style={{ margin: '10px 0' }}>
            <ShowPaymentInfo order={order} displayOrderStatus={false} />
          </div>
          <Space direction="horizontal" style={{ margin: '10px 0' }}>
            <Text>Order status:</Text>
            <Select
              defaultValue={order.orderStatus}
              style={{ width: 180 }}
              onChange={(orderStatus) => handleChange(orderStatus, order._id)}
              loading={updateOrderStatusInProgress}
            >
              <Option value="Not Processed">Not Processed</Option>
              <Option value="Cash On Delivery">Cash On Delivery</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Dispatched">Dispatched</Option>
              <Option value="Canceled">Canceled</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Space>
          <AdminOrderTable order={order} />
          <Space direction="vertical" style={{ margin: '10px 0' }}>
            <Text>
              Customer email:
              <Button
                type="link"
                href={`mailto:${order.orderedBy.email}?subject=MERN Ecommerce – Order ID: ${order.paymentIntent.id}&body=Hello ${order.orderedBy.email}!`}
              >
                {order.orderedBy.email}
              </Button>
            </Text>
            <Text>Customer shipping address: {order.orderedBy.address}</Text>
          </Space>
        </Card>
      ))}
    </>
  );
};

export default AdminOrderList;
