import { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Menu, Layout } from 'antd';
import {
  HistoryOutlined,
  UnlockOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

const { Sider } = Layout;

const UserNav = () => {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'History',
        path: '/user/history',
        icon: <HistoryOutlined />,
      },
      {
        key: '2',
        label: 'Password',
        path: '/user/password',
        icon: <UnlockOutlined />,
      },
      {
        key: '3',
        label: 'Wishlist',
        path: '/user/wishlist',
        icon: <ShoppingCartOutlined />,
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => location.pathname.startsWith(_item.path)).key
  );

  const onClickMenu = (item) => {
    dispatch(setMobileDrawerVisability(false));
    const clicked = items.find((_item) => _item.key === item.key);
    history.push(clicked.path);
  };

  useEffect(() => {
    setSelectedKey(
      items.find((_item) => location.pathname.startsWith(_item.path)).key
    );
  }, [location, items]);

  return (
    <Sider style={{ backgroundColor: 'white' }}>
      <Menu
        theme="light"
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={onClickMenu}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default UserNav;
