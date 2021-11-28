import { useSelector, useDispatch } from 'react-redux';

import { Drawer, Button, Image, Space, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';

import { setCartDrawerVisability } from '../../store/actions/drawerActions';

import Placeholder from '../../images/placeholder.png';

const { Text } = Typography;

const SideCartDrawer = () => {
  const dispatch = useDispatch();

  const { items, totalQuantity } = useSelector((state) => state.cart);
  const { cartIsVisibile } = useSelector((state) => state.drawer);

  return (
    <Drawer
      title={`Cart / ${totalQuantity} ${
        totalQuantity > 1 ? 'products' : 'product'
      }`}
      visible={cartIsVisibile}
      closable
      keyboard
      onClose={() => dispatch(setCartDrawerVisability(false))}
    >
      {items.map((item) => (
        <div key={item._id} style={{ textAlign: 'center' }}>
          <Space
            key={item._id}
            direction="vertical"
            align="center"
            size={[8, 16]}
            //style={{ borderBottom: '1px solid #d9d9d9', padding: '8px 0' }}
          >
            <Image
              style={{ width: '100%', height: '100px' }}
              preview={false}
              src={
                item.images && item.images.length
                  ? item.images[0].url
                  : Placeholder
              }
            />
            <Text>
              {item.title} x {item.cartQuantity}
            </Text>
          </Space>
          <Divider />
        </div>
      ))}
      <Link to="/cart">
        <Button
          type="primary"
          block
          size="large"
          style={{ marginTop: 20 }}
          onClick={() => dispatch(setCartDrawerVisability(false))}
        >
          Go to Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideCartDrawer;
