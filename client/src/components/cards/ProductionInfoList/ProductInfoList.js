import { Link } from 'react-router-dom';

import './ProductInfoList.css';

const ProductInfoList = ({ product }) => {
  if (!product) {
    return null;
  }

  const {
    price,
    category,
    subcategory,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  const data = [
    {
      field: 'Price',
      value: `$ ${price}`,
    },

    {
      field: 'Category',
      value: category ? (
        <Link to={`/category/${category.slug}`}>{category.name}</Link>
      ) : (
        '-'
      ),
    },

    {
      field: 'Subcategories',
      value:
        subcategory && subcategory.length > 0 ? (
          <div className="product-info-subcategories">
            {subcategory.map((sub) => (
              <Link
                key={sub._id}
                to={`/subcategory/${sub.slug}`}
                className="product-info-link"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        ) : (
          '-'
        ),
    },

    {
      field: 'Shipping',
      value: shipping || '-',
    },

    {
      field: 'Color',
      value: color || '-',
    },

    {
      field: 'Brand',
      value: brand || '-',
    },

    {
      field: 'Quantity',
      value: quantity ?? '-',
    },

    {
      field: 'Sold',
      value: sold ?? '-',
    },
  ];

  return (
    <div className="product-info-list">
      <div className="product-info-list-header">
        <span>PRODUCT DETAILS</span>
        <span>08</span>
      </div>

      <div className="product-info-list-items">
        {data.map((item, index) => (
          <div className="product-info-row" key={item.field}>
            <div className="product-info-label">
              <span className="product-info-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{item.field}</span>
            </div>

            <div className="product-info-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfoList;
