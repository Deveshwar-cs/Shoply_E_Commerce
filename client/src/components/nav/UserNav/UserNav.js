import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Layout } from 'antd';
import {
  HistoryOutlined,
  UnlockOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

import './UserNav.css';

const { Sider } = Layout;

const UserNav = () => {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'History',
        path: '/user/history',
        icon: <HistoryOutlined />,
        number: '01',
      },
      {
        key: '2',
        label: 'Password',
        path: '/user/password',
        icon: <UnlockOutlined />,
        number: '02',
      },
      {
        key: '3',
        label: 'Wishlist',
        path: '/user/wishlist',
        icon: <ShoppingCartOutlined />,
        number: '03',
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    const matchedItem = items.find((item) =>
      location.pathname.startsWith(item.path)
    );

    return matchedItem?.key || '1';
  };

  const [selectedKey, setSelectedKey] = useState(getSelectedKey);

  const onClickMenu = (item) => {
    const clicked = items.find((menuItem) => menuItem.key === item.key);

    if (!clicked) return;

    dispatch(setMobileDrawerVisability(false));
    navigate(clicked.path);
  };

  useEffect(() => {
    setSelectedKey(getSelectedKey());
  }, [location.pathname]);

  return (
    <Sider className="shoply-user-nav" width={240}>
      <div className="shoply-user-nav-inner">
        {/* Navigation header */}
        <div className="shoply-user-nav-header">
          <div className="shoply-user-nav-heading">
            <span className="shoply-user-nav-line"></span>

            <div>
              <span className="shoply-user-nav-eyebrow">SHOPLY / ACCOUNT</span>

              <h2>My account.</h2>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="shoply-user-nav-menu">
          <div className="shoply-user-nav-label">
            <span>ACCOUNT MENU</span>
            <span>03</span>
          </div>

          <Menu
            theme="light"
            selectedKeys={[selectedKey]}
            mode="inline"
            onClick={onClickMenu}
            items={items.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: (
                <div className="shoply-user-nav-item">
                  <span className="shoply-user-nav-item-label">
                    {item.label}
                  </span>

                  <span className="shoply-user-nav-item-number">
                    {item.number}
                  </span>
                </div>
              ),
            }))}
          />
        </nav>

        {/* Footer */}
        <div className="shoply-user-nav-footer">
          <span>SHOPLY</span>
          <span>ACCOUNT</span>
        </div>
      </div>
    </Sider>
  );
};

export default UserNav;
