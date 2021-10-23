import { Skeleton, Col, Row } from 'antd';

const LoadinCardList = ({ count }) => {
  // count props describe how many Skeleton cards we want to display
  const cards = () => {
    let skeletonArray = [];

    for (let i = 0; i < count; i++) {
      skeletonArray.push(
        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={i}>
          <Skeleton active></Skeleton>
        </Col>
      );
    }
    return skeletonArray;
  };
  // Row height is equal to maximum product card height + average rating height = 466px
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ height: 466 }}>
      {cards()}
    </Row>
  );
};

export default LoadinCardList;
