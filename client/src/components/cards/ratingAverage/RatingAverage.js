import { Rate } from 'antd';
import './RatingAverage.css';

const RatingAverage = ({ ratings = [] }) => {
  const average = (ratings) => {
    if (!ratings.length) return 0;

    const totalStars = ratings.reduce((sum, item) => sum + item.star, 0);

    return Math.round((totalStars / ratings.length) * 100) / 100;
  };

  const averageRating = average(ratings);

  return (
    <div className="rating-average">
      <div className="rating-average-stars">
        <Rate value={averageRating} disabled allowHalf />
      </div>

      <div className="rating-average-info">
        <span className="rating-average-score">{averageRating.toFixed(1)}</span>

        <span className="rating-average-divider">/</span>

        <span className="rating-average-count">
          {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
        </span>
      </div>
    </div>
  );
};

export default RatingAverage;
