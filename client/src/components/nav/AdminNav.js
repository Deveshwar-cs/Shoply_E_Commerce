import { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Menu, Layout } from 'antd';
import {
  HistoryOutlined,
  UnlockOutlined,
  ShoppingCartOutlined,
  LaptopOutlined,
  PercentageOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const AdminNav = () => {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <HistoryOutlined />,
      },
      {
        key: '2',
        label: 'Product',
        path: '/admin/product',
        icon: <FileAddOutlined />,
      },
      {
        key: '3',
        label: 'All Products',
        path: '/admin/products',
        icon: <ShoppingCartOutlined />,
      },
      {
        key: '4',
        label: 'Category',
        path: '/admin/category',
        icon: <LaptopOutlined />,
      },
      {
        key: '5',
        label: 'Sub Category',
        path: '/admin/sub-category',
        icon: <LaptopOutlined />,
      },
      {
        key: '6',
        label: 'Coupon',
        path: '/admin/coupon',
        icon: <PercentageOutlined />,
      },
      {
        key: '7',
        label: 'Password',
        path: '/admin/password',
        icon: <UnlockOutlined />,
      },
    ],
    []
  );

  const location = useLocation();
  const history = useHistory();
  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => location.pathname.startsWith(_item.path)).key
  );

  const onClickMenu = (item) => {
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

export default AdminNav;
