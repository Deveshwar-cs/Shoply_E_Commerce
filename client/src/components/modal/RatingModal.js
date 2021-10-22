import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Modal, Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';

import {
  rateProductAction,
  getOneProductAction,
} from '../../store/actions/productActions';

const RatingModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const { oneProduct, rateProductInProgress } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const showModal = () => {
    if (user && user.token) {
      setIsModalVisible(true);
    } else {
      history.push({
        pathname: '/login',
        state: { from: `/product/${slug}` },
      });
    }
  };

  const handleOk = () => {
    dispatch(rateProductAction(oneProduct._id, ratingValue, user.token)).then(
      () => {
        setIsModalVisible(false);
        dispatch(getOneProductAction(slug));
      }
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectRateHandler = (value) => {
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
        confirmLoading={rateProductInProgress}
      >
        <Rate style={{ fontSize: 50 }} onChange={selectRateHandler} />
      </Modal>
    </>
  );
};

export default RatingModal;
