import { useSelector, useDispatch } from 'react-redux';

import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

import './MobileSideDrawer.css';

const MobileSideDrawer = ({ children, width }) => {
  const dispatch = useDispatch();

  const { mobileIsVisible } = useSelector((state) => state.drawer);

  const closeDrawer = () => {
    dispatch(setMobileDrawerVisability(false));
  };

  return (
    <Drawer
      open={mobileIsVisible}
      closable={false}
      placement="left"
      width={width || 280}
      keyboard
      onClose={closeDrawer}
      className="shoply-mobile-drawer"
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div className="shoply-mobile-drawer-content">
        <div className="shoply-mobile-drawer-header">
          <div className="shoply-mobile-drawer-brand">
            <span className="shoply-mobile-drawer-line"></span>

            <div>
              <span className="shoply-mobile-drawer-eyebrow">SHOPLY</span>

              <span className="shoply-mobile-drawer-label">NAVIGATION</span>
            </div>
          </div>

          <button
            type="button"
            className="shoply-mobile-drawer-close"
            onClick={closeDrawer}
            aria-label="Close navigation"
          >
            <CloseOutlined />
          </button>
        </div>

        <div className="shoply-mobile-drawer-body">{children}</div>

        <div className="shoply-mobile-drawer-footer">
          <span>SHOPLY / 2026</span>
          <span>MENU</span>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileSideDrawer;
