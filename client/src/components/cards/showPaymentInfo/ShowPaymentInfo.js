import './ShowPaymentInfo.css';

const ShowPaymentInfo = ({ order, displayOrderStatus = true }) => {
  const paymentIntent = order?.paymentIntent;

  if (!paymentIntent) return null;

  const amount = (paymentIntent.amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const paymentMethod = paymentIntent.payment_method_types?.[0] || '-';

  const paymentStatus = paymentIntent.status?.toUpperCase() || '-';

  const orderDate = paymentIntent.created
    ? new Date(paymentIntent.created * 1000).toLocaleString()
    : '-';

  return (
    <div className="show-payment-info">
      <div className="show-payment-info-header">
        <div>
          <span className="show-payment-info-eyebrow">PAYMENT INFORMATION</span>

          <h3>Order details.</h3>
        </div>

        {displayOrderStatus && (
          <span
            className={`show-payment-status ${
              order.orderStatus?.toLowerCase() === 'completed'
                ? 'completed'
                : ''
            }`}
          >
            <span className="show-payment-status-dot"></span>
            {order.orderStatus?.toUpperCase() || 'UNKNOWN'}
          </span>
        )}
      </div>

      <div className="show-payment-info-grid">
        <div className="show-payment-info-item">
          <span>ORDER ID</span>
          <strong>{paymentIntent.id}</strong>
        </div>

        <div className="show-payment-info-item">
          <span>AMOUNT</span>
          <strong>{amount}</strong>
        </div>

        <div className="show-payment-info-item">
          <span>CURRENCY</span>
          <strong>{paymentIntent.currency?.toUpperCase() || '-'}</strong>
        </div>

        <div className="show-payment-info-item">
          <span>METHOD</span>
          <strong>{paymentMethod}</strong>
        </div>

        <div className="show-payment-info-item">
          <span>PAYMENT</span>
          <strong>{paymentStatus}</strong>
        </div>

        <div className="show-payment-info-item">
          <span>ORDERED ON</span>
          <strong>{orderDate}</strong>
        </div>
      </div>
    </div>
  );
};

export default ShowPaymentInfo;
