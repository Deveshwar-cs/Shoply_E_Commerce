import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Row,
  Col,
  List,
  Button,
  Image,
  Table,
  InputNumber,
  Modal,
} from 'antd';

import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
  DeleteTwoTone,
} from '@ant-design/icons';

import { setItemQuantity } from '../store/actions/cartActions';

const { Title, Text } = Typography;
const { confirm } = Modal;

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const listItemsData =
    items.map((item) => ({
      title: item.title,
      imgUrl: item.images[0].url,
      price: item.price,
      cartQuantity: item.cartQuantity,
    })) || [];

  const saveOrderToDB = () => {
    console.log('SAVE ERDER REQUEST');
  };

  // Table //////////////

  const handleDeleteConfirm = (id, title) => {
    confirm({
      title: `Do you want to delete '${title}' from cart?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        console.log(`PRODUCT ${title} DELETED FROM CART. ID: ${id}`);
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
      render: (image) => (
        <Image src={image} style={{ width: 80, objectFit: 'cover' }} />
      ),
      fixed: 'left',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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

  /// Table END ////////////
  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#ffffb8',
              fontSize: 30,
            }}
          >
            Cart
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 22, offset: 1 }}
          md={{ span: 22, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Row gutter={[16, 16]}>
            <Col
              xl={{ span: 16 }}
              lg={{ span: 16 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>{totalQuantity} Products in Cart</Title>
              </Row>
              <Row>
                {items.length === 0 && (
                  <Text style={{ fontSize: 20, margin: '20px 0' }}>
                    No products in cart.{' '}
                    <Link to="/shop">Continue shopping.</Link>
                  </Text>
                )}
                {items.length > 0 && (
                  <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    bordered={true}
                    scroll={{ x: true }}
                  />
                )}
              </Row>
            </Col>
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>Order Summary</Title>
              </Row>
              <hr />
              <Row>
                <List
                  itemLayout="vertical"
                  dataSource={listItemsData}
                  renderItem={(item) => (
                    <List.Item>
                      <Text strong style={{ display: 'block' }}>
                        {item.title}
                      </Text>
                      <Text style={{ display: 'block' }}>
                        Quantity: {item.cartQuantity}
                      </Text>
                      <Text style={{ display: 'block' }}>
                        Price: ${item.price}
                      </Text>
                    </List.Item>
                  )}
                />
              </Row>
              <hr />
              <Row>
                <Text strong style={{ fontSize: 20 }}>
                  Total price: ${totalPrice}
                </Text>
              </Row>
              <Row style={{ marginTop: 40 }}>
                {user ? (
                  <Button
                    type="primary"
                    size="large"
                    disabled={!items.length}
                    onClick={saveOrderToDB}
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button type="primary" size="large">
                    <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                      Login to Checkout
                    </Link>
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
