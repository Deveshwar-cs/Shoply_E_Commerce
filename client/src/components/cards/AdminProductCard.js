import { Card } from 'antd';

const { Meta } = Card;

const AdminProductCard = ({ title, images, description }) => {
  return (
    <Card
      bordered
      size="small"
      cover={
        <img
          alt={title}
          src={images && images.length ? images[0].url : ''}
          style={{ objectFit: 'cover', height: 200 }}
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
