import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Form,
  Spin,
  Modal,
  Table,
} from 'antd';

import { ExclamationCircleOutlined, DeleteTwoTone } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';
import CouponForm from '../../components/forms/CouponForm';

import {
  createCouponAction,
  getAllCouponsAction,
  deleteCouponAction,
} from '../../store/actions/couponActions';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { confirm } = Modal;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { createCouponInProgress, getAllCouponsInProgress, allCoupons } =
    useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getAllCouponsAction(user.token));
  }, []);

  const onFinish = ({ name, discount, expiry }) => {
    // the expiry here is the momentjs object and we can choose date format if we need – for example expiry.format(moment.defaultFormatUtc). moment.defaultFormatUtc === 'YYYY-MM-DDTHH:mm:ss:SS[Z]'
    // https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/

    dispatch(
      createCouponAction({ name, discount: +discount, expiry }, user.token)
    ).then(() => dispatch(getAllCouponsAction(user.token)));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Table //////////////

  const handleDeleteConfirm = (couponId, couponName) => {
    confirm({
      title: `Do you want to delete ${couponName} coupon?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        // return promise (dispatch is the promise here) to display loading state on the confirm button
        return dispatch(deleteCouponAction(couponId, user.token)).then(() =>
          dispatch(getAllCouponsAction(user.token))
        );
      },
      onCancel() {
        console.log('Cancel delete coupon!');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (name) => <Text>{name}</Text>,
    },
    {
      title: 'Expiry (Year/Month/Day)',
      dataIndex: 'expiry',
      key: 'expiry',
      align: 'center',
      render: (expiry) => <Text>{expiry.substring(0, 10)}</Text>,
    },
    {
      title: 'Discount, %',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
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
          onClick={() => handleDeleteConfirm(id, record.name)}
        />
      ),
    },
  ];

  const tableData = allCoupons.map((item) => ({
    key: item._id,
    id: item._id,
    name: item.name,
    expiry: item.expiry,
    discount: item.discount,
    remove: item._id,
  }));

  /// Table END ////////////

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Manage Coupons
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Coupon
                </Title>
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <CouponForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={createCouponInProgress}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 30 }}>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                {getAllCouponsInProgress ? (
                  <div className="spiner">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Divider style={{ fontWeight: 'bold' }}>
                      All Coupons
                    </Divider>
                    <Table
                      columns={columns}
                      dataSource={tableData}
                      pagination={false}
                      bordered={true}
                      scroll={{ x: true }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryCreate;
