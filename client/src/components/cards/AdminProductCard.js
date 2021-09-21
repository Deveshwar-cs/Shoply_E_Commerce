import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal } from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import defaultImage from '../../images/placeholder.png';
import {
  deleteProductAction,
  getAllProductsAction,
} from '../../store/actions/productActions';

const { Meta } = Card;
const { confirm } = Modal;

const AdminProductCard = ({ title, images, description, slug }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDeleteConfirm = (slug) => {
    confirm({
      title: `Do you Want to delete ${title} product?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(deleteProductAction(slug, user.token)).then(() =>
          dispatch(getAllProductsAction(20))
        );
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <Card
      bordered
      size="small"
      cover={
        <img
          alt={title}
          src={images && images.length ? images[0].url : defaultImage}
          style={{ objectFit: 'cover', height: 200 }}
        />
      }
      actions={[
        <EditOutlined key="edit" style={{ color: 'green' }} />,
        <DeleteOutlined
          key="delete"
          style={{ color: 'red' }}
          onClick={() => handleDeleteConfirm(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={description && `${description.substring(0, 200)} ...`}
      />
    </Card>
  );
};

export default AdminProductCard;
