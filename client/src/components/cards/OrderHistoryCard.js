import { Card } from 'antd';

import Invoice from '../order/Invoice';

import { PDFDownloadLink } from '@react-pdf/renderer';

import ShowPaymentInfo from './ShowPaymentInfo';
import UserOrderTable from '../tables/UserOrderTable';

const OrderHistoryCard = ({ order }) => {
  const showPDFDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
    >
      Download Invoice PDF
    </PDFDownloadLink>
  );

  return (
    <Card
      style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#e6f7ff',
      }}
    >
      <div style={{ margin: '10px 0' }}>
        <ShowPaymentInfo order={order} />
      </div>
      <UserOrderTable order={order} />
      <div style={{ margin: '20px 0 0' }}>{showPDFDownloadLink(order)}</div>
    </Card>
  );
};

export default OrderHistoryCard;
