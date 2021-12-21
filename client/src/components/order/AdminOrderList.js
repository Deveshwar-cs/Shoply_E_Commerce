import { useDispatch, useSelector } from 'react-redux';

import { List, Card, Table, Typography, Space, Select } from 'antd';

import ShowPaymentInfo from '../cards/ShowPaymentInfo';

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
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ margin: '10px 0' }}>
            <ShowPaymentInfo order={order} displayOrderStatus={false} />
          </div>
          <Space direction="horizontal">
            <Text>Order status:</Text>
            <Select
              defaultValue={order.orderStatus}
              style={{ width: 180 }}
              onChange={(orderStatus) => handleChange(orderStatus, order._id)}
              loading={updateOrderStatusInProgress}
            >
              <Option value="Not Processed">Not Processed</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Dispatched">Dispatched</Option>
              <Option value="Canceled">Canceled</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Space>
          {/* <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered={true}
      scroll={{ x: true }}
    /> */}
        </Card>
      ))}
    </>
  );
};

export default AdminOrderList;
