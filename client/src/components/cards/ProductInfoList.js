import { Link } from 'react-router-dom';

import { List, Typography } from 'antd';

const { Item } = List;

const ProductInfoList = ({ product }) => {
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
    { field: 'Price', value: `$ ${price}` },
    {
      field: 'Category',
      value: <Link to={`/category/${category.slug}`}>{category.name}</Link>,
    },
    {
      field: 'Subcategories',
      value: subcategory.map((sub) => (
        <Link
          key={sub._id}
          to={`/subcategory/${sub.slug}`}
          style={{ display: 'inline-block', marginLeft: 10 }}
        >
          {sub.name}
        </Link>
      )),
    },
    { field: 'Shipping', value: shipping },
    { field: 'Color', value: color },
    { field: 'Brand', value: brand },
    { field: 'Quantity', value: quantity },
    { field: 'Sold', value: sold },
  ];
  console.log('ProductInfoList ===> ', product);

  return (
    <>
      {product && (
        <List
          dataSource={data}
          renderItem={(item) => (
            <Item
              key={item.field}
              extra={
                <Typography.Text
                  style={{
                    marginLeft: 'auto',
                    textAlign: 'right',
                  }}
                >
                  {item.value}
                </Typography.Text>
              }
            >
              <Typography.Text strong>{item.field}</Typography.Text>
            </Item>
          )}
        />
      )}
    </>
  );
};

export default ProductInfoList;
