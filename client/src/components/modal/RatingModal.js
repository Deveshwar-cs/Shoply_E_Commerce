import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Modal, Rate, Space, Button } from 'antd';
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

  // current user rating
  useEffect(() => {
    if (oneProduct.ratings && user) {
      const existingRatnigObject = oneProduct.ratings.find(
        (rating) => rating.postedBy.toString() === user._id.toString()
      );
      existingRatnigObject && setRatingValue(existingRatnigObject.star);
    }
  }, []);

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
      <Space direction="vertical">
        <StarOutlined style={{ color: '#ff7a45', fontSize: 26 }} />
        <Button type="link" onClick={showModal}>
          {user ? 'Leave Rating' : 'Login to Leave Rating'}
        </Button>
      </Space>

      <Modal
        title="Rate the Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: 'center' }}
        confirmLoading={rateProductInProgress}
      >
        <Rate
          style={{ fontSize: 50 }}
          onChange={selectRateHandler}
          value={ratingValue}
        />
      </Modal>
    </>
  );
};

export default RatingModal;
