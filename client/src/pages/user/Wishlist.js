import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Typography, Row, Col, Spin, Button, Grid, Space } from 'antd';
import { DeleteOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import UserNav from '../../components/nav/UserNav';
import MobileSideDrawer from '../../components/drawer/MobileSideDrawer';

import {
  getWishlistAction,
  deleteProductFromWishlistAction,
} from '../../store/actions/wishlistActions';
import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const Wishlist = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, getWishlistInProgress, deleteFromWishlistInProgress } =
    useSelector((state) => state.wishlist);
  const screens = useBreakpoint();

  // Delete Button id
  const [idOfClickedItem, setIdOfClickedItem] = useState('');

  useEffect(() => {
    dispatch(getWishlistAction(user.token));
  }, [user.token, dispatch]);

  const handleDeleteFromWishlist = (productId) => {
    setIdOfClickedItem(productId);

    dispatch(deleteProductFromWishlistAction(productId, user.token));
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
              ></Button>
            )}
            <Title
              level={2}
              style={{ color: 'white', marginTop: '10px', fontSize: 18 }}
            >
              User Wishlist Page
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <UserNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <UserNav />}
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 20, offset: 2 }}>
                <Title level={2} style={{ marginTop: 40 }}>
                  {wishlist && wishlist.length
                    ? 'Your wishlist'
                    : 'Wishlist is empty'}
                </Title>
                {getWishlistInProgress ? (
                  <div style={{ width: 40, margin: '100px auto' }}>
                    <Spin size="large" />
                  </div>
                ) : (
                  wishlist &&
                  wishlist.map((product) => (
                    <div
                      key={product._id}
                      style={{
                        width: '100%',
                        backgroundColor: '#e6f7ff',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: screens.xs ? 'column' : 'row',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: screens.xs ? 'block' : 'inline-block',
                          marginBottom: screens.xs ? '20px' : '0px',
                        }}
                      >
                        <Link to={`/product/${product.slug}`}>
                          {product.title}
                        </Link>
                      </div>
                      <div
                        style={{
                          display: screens.xs ? 'block' : 'inline-block',
                        }}
                      >
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleDeleteFromWishlist(product._id)}
                          icon={<DeleteOutlined />}
                          loading={
                            deleteFromWishlistInProgress && // show loading state on clicked Delete button
                            idOfClickedItem === product._id
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Wishlist;
