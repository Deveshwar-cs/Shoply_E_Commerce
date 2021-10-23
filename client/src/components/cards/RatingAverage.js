import { Rate } from 'antd';

const RatingAverage = ({ ratings }) => {
  // calculate average product rating
  const average = (ratings) => {
    const totalStars = ratings
      .map((item) => item.star)
      .reduce((sum, current) => {
        return sum + current;
      }, 0);

    const averageRating = totalStars / ratings.length;

    return Math.round(parseFloat((averageRating * 5) / 5) * 100) / 100;
  };

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
      }}
    >
      <Rate
        style={{ fontSize: 30, marginBottom: 10 }}
        value={average(ratings)}
        disabled
      />
      <span
        style={{ fontSize: 18, paddingLeft: 4 }}
      >{`(${ratings.length})`}</span>
    </div>
  );
};

export default RatingAverage;
