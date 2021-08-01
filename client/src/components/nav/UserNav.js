import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const UserNav = () => {
  //   handleClick = e => {
  //     console.log('click ', e);
  //   };

  return (
    <Menu
      //   onClick={this.handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      mode="inline"
    >
      <Menu.Item key="1">
        <Link to="/user/history">History</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user/password">Password</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/user/wishlist">Wishlist</Link>
      </Menu.Item>
    </Menu>
  );
};

export default UserNav;
