import { Link } from 'react-router-dom';

import { Card, Typography, Table, Button } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Text } = Typography;

const OrderHistoryCard = ({ order }) => {
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

  const tableData = order.products.map((item) => ({
    key: item._id,
    id: item._id,
    title: item.product.title,
    color: item.product.color,
    price: `$${item.product.price}`,
    brand: item.product.brand,
    quantity: item.quantity,
    shipping: item.product.shipping,
  }));

  /// Table END ////////////

  return (
    <Card style={{ width: '100%', textAlign: 'center', marginBottom: 20 }}>
      <div style={{ margin: '30px 0' }}>
        <Text>Show payment info</Text>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered={true}
        scroll={{ x: true }}
      />
      <div style={{ margin: '30px 0' }}>
        <Button size="large">PDF Download</Button>
      </div>
    </Card>
  );
};

export default OrderHistoryCard;
