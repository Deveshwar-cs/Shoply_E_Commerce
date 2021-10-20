import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Modal, Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const RatingModal = () => {
  const history = useHistory();
  const { oneProduct } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const showModal = () => {
    if (user && user.token) {
      setIsModalVisible(true);
    } else {
      history.push('/login');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log('handleOk ratingValue', ratingValue);
    console.log('handleOk product ID', oneProduct._id);
    console.log('handleOk user ID', user._id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectRateHandler = (value) => {
    console.log('rate value', value);
    setRatingValue(value);
  };

  return (
    <>
      <div onClick={showModal}>
        <StarOutlined style={{ color: '#ff7a45' }} />
        <br /> {user ? 'Leave Rating' : 'Login to Leave Rating'}
      </div>

      <Modal
        title="Rate the Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: 'center' }}
      >
        <Rate style={{ fontSize: 50 }} onChange={selectRateHandler} />
      </Modal>
    </>
  );
};

export default RatingModal;
