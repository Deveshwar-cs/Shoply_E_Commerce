import { Card } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import defaultImage from '../../images/placeholder.png';

const { Meta } = Card;

const AdminProductCard = ({ title, images, description }) => {
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
        <DeleteOutlined key="delete" style={{ color: 'red' }} />,
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
