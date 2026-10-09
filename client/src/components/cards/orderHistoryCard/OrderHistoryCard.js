import { PDFDownloadLink } from '@react-pdf/renderer';

import Invoice from '../../order/Invoice';
import ShowPaymentInfo from '../showPaymentInfo/ShowPaymentInfo';
import UserOrderTable from '../../tables/userOrderTable/UserOrderTable';

import './OrderHistoryCard.css';

const OrderHistoryCard = ({ order }) => {
  return (
    <article className="order-history-card">
      {/* Card header */}
      <div className="order-history-card-header">
        <div className="order-history-card-label">
          <span className="order-history-card-line"></span>
          <span>SHOPLY / ORDER</span>
        </div>

        <span className="order-history-card-number">
          {order.paymentIntent?.id?.slice(-6).toUpperCase() || '------'}
        </span>
      </div>

      {/* Payment information */}
      <div className="order-history-payment">
        <ShowPaymentInfo order={order} />
      </div>

      {/* Products */}
      <div className="order-history-products">
        <div className="order-history-products-header">
          <div>
            <span className="order-history-eyebrow">ORDERED PRODUCTS</span>

            <h3>What you ordered.</h3>
          </div>

          <span className="order-history-product-count">
            {String(order.products?.length || 0).padStart(2, '0')}
          </span>
        </div>

        <UserOrderTable order={order} />
      </div>

      {/* Invoice */}
      <div className="order-history-card-footer">
        <div className="order-history-footer-note">
          <span className="order-history-footer-dot"></span>
          <span>YOUR INVOICE IS READY</span>
        </div>

        <PDFDownloadLink
          document={<Invoice order={order} />}
          fileName="invoice.pdf"
          className="order-history-invoice-button"
        >
          <span>Download invoice</span>
          <span className="order-history-invoice-arrow">↗</span>
        </PDFDownloadLink>
      </div>
    </article>
  );
};

export default OrderHistoryCard;
