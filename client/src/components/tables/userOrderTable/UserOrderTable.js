import { Link } from 'react-router-dom';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './UserOrderTable.css';

const UserOrderTable = ({ order }) => {
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

  return (
    <div className="user-order-table">
      <div className="user-order-table-header">
        <span className="user-order-table-product-heading">PRODUCT</span>
        <span>PRICE</span>
        <span>BRAND</span>
        <span>COLOR</span>
        <span>QTY</span>
        <span>SHIPPING</span>
      </div>

      <div className="user-order-table-body">
        {tableData.map((item, index) => (
          <article className="user-order-table-row" key={item.key}>
            <div className="user-order-table-product">
              <span className="user-order-table-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <Link
                to={`/product/${item.slug}`}
                className="user-order-table-title"
              >
                {item.title}
              </Link>
            </div>

            <div className="user-order-table-cell" data-label="PRICE">
              {item.price}
            </div>

            <div className="user-order-table-cell" data-label="BRAND">
              {item.brand || '-'}
            </div>

            <div className="user-order-table-cell" data-label="COLOR">
              <span className="user-order-table-color">
                {item.color || '-'}
              </span>
            </div>

            <div
              className="user-order-table-cell user-order-table-quantity"
              data-label="QUANTITY"
            >
              {item.quantity}
            </div>

            <div
              className="user-order-table-cell user-order-table-shipping"
              data-label="SHIPPING"
            >
              {item.shipping === 'Yes' ? (
                <span className="shipping-available">
                  <CheckCircleOutlined />
                  <span>Available</span>
                </span>
              ) : (
                <span className="shipping-unavailable">
                  <CloseCircleOutlined />
                  <span>Unavailable</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UserOrderTable;
