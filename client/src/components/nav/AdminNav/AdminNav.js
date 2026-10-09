import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Menu, Typography } from 'antd';

import {
  HistoryOutlined,
  UnlockOutlined,
  ShoppingCartOutlined,
  LaptopOutlined,
  PercentageOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';
import './AdminNav.css';

const { Sider } = Layout;
const { Text } = Typography;

const items = [
  {
    key: '/admin/dashboard',
    label: 'Dashboard',
    icon: <HistoryOutlined />,
  },
  {
    key: '/admin/product',
    label: 'Add Product',
    icon: <FileAddOutlined />,
  },
  {
    key: '/admin/allproducts',
    label: 'All Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    key: '/admin/category',
    label: 'Category',
    icon: <LaptopOutlined />,
  },
  {
    key: '/admin/subcategory',
    label: 'Subcategory',
    icon: <LaptopOutlined />,
  },
  {
    key: '/admin/coupon',
    label: 'Coupons',
    icon: <PercentageOutlined />,
  },
  {
    key: '/admin/password',
    label: 'Password',
    icon: <UnlockOutlined />,
  },
];

const getSelectedKey = (pathname) => {
  // Prefer exact matches.
  const exactMatch = items.find((item) => item.key === pathname);

  if (exactMatch) return exactMatch.key;

  // For nested pages, match only when the path has a slash boundary.
  const parentMatch = items
    .filter((item) => pathname.startsWith(`${item.key}/`))
    .sort((a, b) => b.key.length - a.key.length)[0];

  return parentMatch?.key || '';
};

const AdminNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState(() =>
    getSelectedKey(location.pathname)
  );

  useEffect(() => {
    setSelectedKey(getSelectedKey(location.pathname));
  }, [location.pathname]);

  const onClickMenu = ({ key }) => {
    dispatch(setMobileDrawerVisability(false));
    navigate(key);
  };

  return (
    <Sider
      className="shoply-admin-sider"
      width={248}
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      trigger={null}
    >
      <div className="shoply-admin-nav">
        <div className="shoply-admin-nav-brand">
          <Text className="shoply-admin-nav-logo">SHOPLY</Text>
          <Text className="shoply-admin-nav-caption">ADMINISTRATION</Text>
        </div>

        <div className="shoply-admin-nav-section-label">WORKSPACE</div>

        <Menu
          className="shoply-admin-menu"
          theme="light"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={onClickMenu}
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
            icon: item.icon,
          }))}
        />

        <div className="shoply-admin-nav-footer">
          <span className="shoply-admin-nav-status-dot" />
          <Text>Admin workspace</Text>
        </div>
      </div>
    </Sider>
  );
};

export default AdminNav;
