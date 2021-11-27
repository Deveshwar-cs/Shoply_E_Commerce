import { useSelector, useDispatch } from 'react-redux';

import { Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';

import Placeholder from '../../images/placeholder.png';

const SideCartDrawer = ({ children }) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const { cartIsVisibile } = useSelector((state) => state.drawer);

  return <Drawer visible={cartIsVisibile}>{JSON.stringify(items)}</Drawer>;
};

export default SideCartDrawer;
