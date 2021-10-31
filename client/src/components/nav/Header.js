import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { logout } from '../../store/actions/authActions';
import SearchInput from '../forms/SearchInput';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const onLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="search" className="ml-auto">
        <SearchInput />
      </Item>
      {user && (
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email}>
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
          <Item key="setting:2" icon={<LogoutOutlined />} onClick={onLogout}>
            Logout
          </Item>
        </SubMenu>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="ml-auto">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
