import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Modal, Image, Table, InputNumber } from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
  DeleteTwoTone,
} from '@ant-design/icons';
import {
  setItemQuantity,
  removeFromCart,
} from '../../store/actions/cartActions';

const { confirm } = Modal;

const CartTable = ({ items }) => {
  const dispatch = useDispatch();

  const handleDeleteConfirm = (id, title) => {
    confirm({
      title: `Do you want to delete '${title}' from cart?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(removeFromCart(id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onChangeProductCount = (quantity, id) => {
    dispatch(setItemQuantity({ quantity, id }));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (image) => <Image src={image} className="cart-table-img" />,
      fixed: 'left',
      responsive: ['xl'],
      width: 190,
    },
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
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'cartQuantity',
      align: 'center',
      render: (cartQuantity, record) => (
        <>
          <InputNumber
            size="small"
            min={1}
            max={record.quantity}
            defaultValue={cartQuantity}
            onChange={(value) => onChangeProductCount(value, record.id)}
            style={{ width: 46 }}
          />
        </>
      ),
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
    {
      title: 'Remove',
      key: 'remove',
      dataIndex: 'remove',
      align: 'center',
      render: (id, record) => (
        <DeleteTwoTone
          twoToneColor="#ff4d4f"
          style={{ fontSize: 26 }}
          onClick={() => handleDeleteConfirm(id, record.title)}
        />
      ),
    },
  ];

  const tableData = items.map((item) => ({
    key: item._id,
    id: item._id,
    title: item.title,
    image: item.images[0].url,
    price: `$${item.price}`,
    brand: item.brand,
    quantity: item.quantity,
    cartQuantity: item.cartQuantity,
    shipping: item.shipping,
    remove: item._id,
    slug: item.slug,
  }));

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered={true}
      scroll={{ x: true }}
    />
  );
};

export default CartTable;
