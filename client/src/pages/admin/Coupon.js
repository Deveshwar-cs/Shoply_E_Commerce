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
  Grid,
  Space,
  Button,
} from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';
import CouponForm from '../../components/forms/CouponForm';
import CouponTable from '../../components/tables/CouponTable';
import MobileSideDrawer from '../../components/drawer/MobileSideDrawer';

import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

import {
  createCouponAction,
  getAllCouponsAction,
} from '../../store/actions/couponActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const screens = useBreakpoint();

  const { user } = useSelector((state) => state.auth);
  const { createCouponInProgress, getAllCouponsInProgress, allCoupons } =
    useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getAllCouponsAction(user.token));
  }, [user.token, dispatch]);

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

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  return (
    <>
      <Layout>
        <Header>
          <Space direction="horizontal" size="middle">
            {!screens.md && (
              <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                size="large"
                onClick={showMobileMenuDrawer}
              />
            )}
            <Title
              level={2}
              style={{ color: 'white', marginTop: '10px', fontSize: 18 }}
            >
              Manage Coupons
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <AdminNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <AdminNav />}
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
                    <CouponTable allCoupons={allCoupons} />
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
