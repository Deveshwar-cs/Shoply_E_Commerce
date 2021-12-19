import { Link } from 'react-router-dom';

import { Card, Table, Button } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import Invoice from '../order/Invoice';

import { PDFDownloadLink } from '@react-pdf/renderer';

import ShowPaymentInfo from './ShowPaymentInfo';

const OrderHistoryCard = ({ order }) => {
  const showPDFDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
    >
      Download Invoice PDF
    </PDFDownloadLink>
  );
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
    slug: item.product.slug,
  }));

  /// Table END ////////////

  return (
    <Card style={{ width: '100%', textAlign: 'center', marginBottom: 20 }}>
      <div style={{ margin: '10px 0' }}>
        <ShowPaymentInfo order={order} />
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered={true}
        scroll={{ x: true }}
      />
      <div style={{ margin: '20px 0 0' }}>
        {/* <Button size="large">PDF Download</Button> */}
        {showPDFDownloadLink(order)}
      </div>
    </Card>
  );
};

export default OrderHistoryCard;
