import { Space, Typography, Tag } from 'antd';
// Here we use the Tag component only for styling purpose

const { Text, Title } = Typography;
const ShowPaymentInfo = ({ order }) => {
  return (
    <Space direction="vertical">
      <Title level={4}>Order details</Title>
      <Text>Order ID: {order.paymentIntent.id}</Text>
      <Text>
        Amount:{' '}
        {(order.paymentIntent.amount / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </Text>
      <Text>Currency: {order.paymentIntent.currency.toUpperCase()}</Text>
      <Text>Method: {order.paymentIntent.payment_method_types[0]}</Text>
      <Text>Payment: {order.paymentIntent.status.toUpperCase()}</Text>
      <Text>
        Ordered on:{' '}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </Text>
      {/* <Text>STATUS: {order.orderStatus.toUpperCase()}</Text> */}
      <Tag color="#2db7f5">STATUS: {order.orderStatus.toUpperCase()}</Tag>
    </Space>
  );
};

export default ShowPaymentInfo;
