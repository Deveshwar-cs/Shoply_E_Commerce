import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Table, Typography, Space, Select, Button } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

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

  // Table //////////////

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      render: (title, record) => (
        <Link to={`/product/${record.slug}`}>{title}</Link>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'center',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Shipping',
      key: 'shipping',
      dataIndex: 'shipping',
      align: 'center',
      render: (shipping) =>
        shipping === 'Yes' ? (
          <CheckCircleTwoTone style={{ fontSize: 30 }} twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone style={{ fontSize: 30 }} twoToneColor="#ff4d4f" />
        ),
    },
  ];

  const tableData = (order) =>
    order.products.map((item) => ({
      key: item._id,
      id: item._id,
      title: item.product.title,
      color: item.product.color,
      price: `$${item.product.price}`,
      brand: item.product.brand,
      quantity: item.quantity,
      shipping: item.product.shipping,
      slug: item.product.slug,
    }));

  /// Table END ////////////

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
          <Table
            columns={columns}
            dataSource={tableData(order)}
            pagination={false}
            bordered={true}
            scroll={{ x: true }}
          />
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
