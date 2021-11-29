import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Menu, Row, Col, Badge } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { logout } from '../../store/actions/authActions';
import SearchInput from '../forms/SearchInput';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const {
    cart: { totalQuantity },
  } = useSelector((state) => state.cart);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const onLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Row style={{ borderBottom: '1px solid #f0f0f0' }}>
      <Col
        xl={{ span: 12 }}
        lg={{ span: 12 }}
        md={{ span: 12 }}
        xs={{ span: 24 }}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ borderBottom: 'none' }}
        >
          <Item key="home" icon={<AppstoreOutlined />}>
            <Link to="/">Home</Link>
          </Item>
          <Item key="shop" icon={<ShoppingOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>
          <Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">
              <Badge count={totalQuantity} offset={[14, 0]} overflowCount={9}>
                Cart
              </Badge>
            </Link>
          </Item>
          {user && (
            <SubMenu
              key="SubMenu"
              icon={<SettingOutlined />}
              title={user.email}
            >
              {user && user.role === 'subscriber' && (
                <Item key="setting:1">
                  <Link to="/user/history">Dashboard</Link>
                </Item>
              )}
              {user && user.role === 'admin' && (
                <Item key="setting:1">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Item>
              )}
              <Item
                key="setting:2"
                icon={<LogoutOutlined />}
                onClick={onLogout}
              >
                Logout
              </Item>
            </SubMenu>
          )}
          {!user && (
            <Item key="login" icon={<UserOutlined />}>
              <Link to="/login">Login</Link>
            </Item>
          )}

          {!user && (
            <Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Item>
          )}
        </Menu>
      </Col>
      <Col
        xl={{ span: 8, offset: 4 }}
        lg={{ span: 12 }}
        md={{ span: 12 }}
        xs={{ span: 24 }}
      >
        <SearchInput />
      </Col>
    </Row>
  );
};

export default Header;
