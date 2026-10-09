import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import { Rate } from 'antd';

import {
  rateProductAction,
  getOneProductAction,
} from '../../store/actions/productActions';

import './RatingModal.css';

const RatingModal = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();

  const { oneProduct, rateProductInProgress } = useSelector(
    (state) => state.product
  );

  const { user } = useSelector((state) => state.auth);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [ratingValue, setRatingValue] = useState(0);

  // Current user's rating
  useEffect(() => {
    if (oneProduct?.ratings && user?._id) {
      const existingRatingObject = oneProduct.ratings.find(
        (rating) =>
          rating?.postedBy && rating.postedBy.toString() === user._id.toString()
      );

      if (existingRatingObject) {
        setRatingValue(existingRatingObject.star);
      }
    }
  }, [oneProduct?.ratings, user?._id]);

  const showModal = () => {
    if (user && user.token) {
      setIsModalVisible(true);
    } else {
      navigate({
        pathname: '/login',
        state: {
          from: `/product/${slug}`,
        },
      });
    }
  };

  const handleOk = () => {
    if (!ratingValue) {
      return;
    }

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
      <button type="button" className="rating-trigger" onClick={showModal}>
        <span className="rating-trigger-star">★</span>

        <span>{user ? 'Leave a rating' : 'Login to leave a rating'}</span>

        <span className="rating-trigger-arrow">↗</span>
      </button>

      {isModalVisible && (
        <div className="rating-modal-overlay" onClick={handleCancel}>
          <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="rating-modal-close"
              onClick={handleCancel}
              aria-label="Close rating modal"
            >
              ×
            </button>

            <div className="rating-modal-label">SHOPLY / YOUR EXPERIENCE</div>

            <div className="rating-modal-number">01</div>

            <h2 className="rating-modal-title">
              How was
              <span> your experience?</span>
            </h2>

            <p className="rating-modal-description">
              Share your experience with this product by giving it a rating.
            </p>

            <div className="rating-modal-stars">
              <Rate onChange={selectRateHandler} value={ratingValue} />
            </div>

            <div className="rating-modal-selected">
              {ratingValue > 0
                ? `${ratingValue} ${
                    ratingValue === 1 ? 'star' : 'stars'
                  } selected`
                : 'Select a rating'}
            </div>

            <div className="rating-modal-actions">
              <button
                type="button"
                className="rating-modal-cancel"
                onClick={handleCancel}
                disabled={rateProductInProgress}
              >
                Cancel
              </button>

              <button
                type="button"
                className="rating-modal-submit"
                onClick={handleOk}
                disabled={!ratingValue || rateProductInProgress}
              >
                {rateProductInProgress ? 'Submitting...' : 'Submit rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingModal;
