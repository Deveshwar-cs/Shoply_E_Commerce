import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Button, Spin } from 'antd';

import { getAllCategoriesAction } from '../../store/actions/categoryActions';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { allCategories, getCategoriesInProgress } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  return (
    <>
      {getCategoriesInProgress ? (
        <Row>
          <Col span={24} style={{ textAlign: 'center', paddingBottom: 40 }}>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            paddingBottom: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          {allCategories.map((category) => (
            <Button
              type="primary"
              shape="round"
              size="large"
              key={category._id}
              style={{ marginRight: 16 }}
            >
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </Row>
      )}
    </>
  );
};

export default CategoryList;
