import { useSelector, useDispatch } from 'react-redux';

import { Drawer } from 'antd';

import { setMobileDrawerVisability } from '../../store/actions/drawerActions';

const MobileSideDrawer = ({ children }) => {
  const dispatch = useDispatch();

  const { mobileIsVisible } = useSelector((state) => state.drawer);

  return (
    <Drawer
      title="Menu"
      visible={mobileIsVisible}
      closable
      placement="left"
      width={224}
      keyboard
      onClose={() => dispatch(setMobileDrawerVisability(false))}
      style={{ margin: 0, padding: 0 }}
    >
      {children}
    </Drawer>
  );
};

export default MobileSideDrawer;
